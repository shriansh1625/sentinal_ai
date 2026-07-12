/**
 * Phase 3 — Security Validation.
 * PART_06 / PART_14 / PART_19 / ADR-036.
 */

import { describe, expect, it } from 'vitest';
import {
  AllowlistLogger,
  ConfigurationService,
  FeatureFlagService,
  InMemorySettingsStore,
  LogLevel,
  MemoryLogSink,
  createIpcRateLimiter,
} from '@sentinel-shield/core';
import {
  MemoryKvStorage,
  MemorySessionKeyStore,
  EncryptedKvStorage,
  assertIpcEnvelope,
  createEnvelope,
  encryptJson,
  decryptJson,
  generateDataKey,
  importAesKey,
} from '@sentinel-shield/browser-adapters';
import {
  InterceptKind,
  MAX_IPC_MSG_PER_MIN_PER_TAB,
  MessageType,
} from '@sentinel-shield/shared-types';
import { runThreatSimulation as runEngineThreatSim } from '@sentinel-shield/detection-engine';
import { createApprovalNonce, isApproved, markApproved } from './content/approval-nonce.js';
import { MessageRouter } from './messaging/router.js';
import { createHandlers } from './messaging/handlers.js';
import { authorizeMessageSender } from './messaging/sender-auth.js';
import { OffscreenManager } from './offscreen/manager.js';
import { runMigrations } from './lifecycle/migrations.js';
import { verifyWasmAsset } from './offscreen/wasm-integrity.js';

async function buildRouter(safeMode = false) {
  const storage = new MemoryKvStorage();
  const logger = new AllowlistLogger(new MemoryLogSink(), LogLevel.DEBUG);
  await runMigrations(storage, logger);
  const config = new ConfigurationService(new InMemorySettingsStore());
  await config.initialize();
  const flags = new FeatureFlagService(config);
  const offscreen = new OffscreenManager(
    { createDocument: async () => undefined, closeDocument: async () => undefined },
    { getContexts: async () => [], getURL: (p) => p },
    logger,
  );
  return new MessageRouter({
    handlers: createHandlers({
      storage,
      scripting: {
        registerContentScripts: async () => undefined,
        unregisterContentScripts: async () => undefined,
        getRegisteredContentScripts: async () => [],
      },
      config,
      flags,
      offscreen,
      logger,
      getVersion: () => '0.2.1',
      isSafeMode: async () => safeMode,
    }),
    logger,
    rateLimiter: createIpcRateLimiter(),
    isSafeMode: async () => safeMode,
  });
}

describe('Phase 3 — IPC validation fail-closed', () => {
  it('rejects malformed envelopes', async () => {
    const router = await buildRouter();
    const response = await router.handle({ evil: true }, {});
    expect(response.ok).toBe(false);
    if (!response.ok) expect(response.error).toBe('INVALID_MESSAGE');
  });

  it('rejects prototype-pollution shaped non-envelopes', () => {
    expect(() =>
      assertIpcEnvelope(Object.assign(Object.create(null), { __proto__: { type: 'PING' } })),
    ).toThrow();
  });
});

describe('Phase 3 — PART_14 sender authorization', () => {
  it('rejects privileged CONFIG_SET from tab sender', async () => {
    const router = await buildRouter();
    const envelope = createEnvelope(MessageType.CONFIG_SET, {
      featureFlags: { telemetryEnabled: true },
    });
    const response = await router.handle(envelope, {
      tab: { id: 42 } as chrome.tabs.Tab,
    });
    expect(response.ok).toBe(false);
    if (!response.ok) expect(response.error).toBe('FORBIDDEN');
  });

  it('allows CONFIG_SET from extension page (no tab)', async () => {
    const router = await buildRouter();
    const envelope = createEnvelope(MessageType.CONFIG_SET, {
      featureFlags: { telemetryEnabled: true },
    });
    const response = await router.handle(envelope, {
      id: 'extension-id',
      url: 'chrome-extension://abc/popup.html',
    });
    expect(response.ok).toBe(true);
  });

  it('authorizeMessageSender blocks PLATFORM_DISABLE from tab', () => {
    const result = authorizeMessageSender(MessageType.PLATFORM_DISABLE, {
      tab: { id: 7 } as chrome.tabs.Tab,
    });
    expect(result.ok).toBe(false);
  });
});

describe('Phase 3 — rate limit & safe mode', () => {
  it('rate limits after MAX_IPC_MSG_PER_MIN_PER_TAB', async () => {
    const router = await buildRouter();
    const sender = { tab: { id: 99 } as chrome.tabs.Tab };
    let limited = false;
    for (let i = 0; i < MAX_IPC_MSG_PER_MIN_PER_TAB + 2; i += 1) {
      const response = await router.handle(
        createEnvelope(MessageType.PING, { nonce: String(i) }),
        sender,
      );
      if (!response.ok && response.error === 'RATE_LIMITED') {
        limited = true;
        break;
      }
    }
    expect(limited).toBe(true);
  });

  it('safe mode blocks INTERCEPT_EVENT', async () => {
    const router = await buildRouter(true);
    const response = await router.handle(
      createEnvelope(MessageType.INTERCEPT_EVENT, {
        interceptId: 'x',
        kind: InterceptKind.PASTE,
        payload: { kind: 'text', text: 'hi', byteLength: 2 },
        targetHint: 'ai-input',
        timestampMs: Date.now(),
      }),
      { tab: { id: 1 } as chrome.tabs.Tab },
    );
    expect(response.ok).toBe(false);
    if (!response.ok) expect(response.error).toBe('SAFE_MODE');
  });
});

describe('Phase 3 — approval nonce', () => {
  it('does not accept forged nonce', () => {
    const nonce = createApprovalNonce(() => 0.42);
    const event = new Event('paste');
    expect(isApproved(event, nonce)).toBe(false);
    markApproved(event, nonce);
    expect(isApproved(event, nonce)).toBe(true);
    expect(isApproved(event, 'ss-forged')).toBe(false);
    expect(() => {
      Object.defineProperty(event, '__sentinelShieldApproved', {
        value: 'hijack',
        writable: true,
      });
    }).toThrow();
  });
});

describe('Phase 3 — PART_19 crypto', () => {
  it('fails decrypt on AAD mismatch', async () => {
    const key = await importAesKey(await generateDataKey());
    const envelope = await encryptJson(key, { a: 1 }, 'aad-correct');
    await expect(decryptJson(key, envelope, 'aad-wrong')).rejects.toBeTruthy();
  });

  it('stores opaque ciphertext in EncryptedKvStorage', async () => {
    const backing = new MemoryKvStorage();
    const secure = new EncryptedKvStorage(backing, new MemorySessionKeyStore());
    await secure.initialize();
    await secure.set('secret', { token: 'plaintext-leak-check' });
    const raw = await backing.get<string>('secret');
    expect(typeof raw).toBe('string');
    expect(raw?.includes('plaintext-leak-check')).toBe(false);
    expect(await secure.get<{ token: string }>('secret')).toEqual({
      token: 'plaintext-leak-check',
    });
  });
});

describe('Phase 3 — threat simulation & WASM pin', () => {
  it('engine threat harness passes expanded cases', () => {
    const result = runEngineThreatSim();
    expect(result.failed).toEqual([]);
    expect(result.passed).toBeGreaterThanOrEqual(5);
  });

  it('refuses WASM with empty integrity pin', async () => {
    const result = await verifyWasmAsset(
      {
        id: 'tesseract-core',
        path: 'public/wasm/tesseract-core.wasm',
        sha256: '',
        optional: true,
      },
      new Uint8Array([0, 1, 2]).buffer,
    );
    expect(result.ok).toBe(false);
  });
});
