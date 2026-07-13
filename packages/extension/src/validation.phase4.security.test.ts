/**
 * Independent Validation Lab — Phase 4 security probes.
 * Maps STRIDE / PART_06–14 controls to live code. No product feature work.
 */

import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
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
  assertIpcEnvelope,
  createEnvelope,
} from '@sentinel-shield/browser-adapters';
import {
  InterceptKind,
  MessageType,
  PolicyAction,
  DEFAULT_FEATURE_FLAGS,
} from '@sentinel-shield/shared-types';
import {
  createDetectionEngine,
  runThreatSimulation,
  THREAT_CASES,
} from '@sentinel-shield/detection-engine';
import { MessageRouter } from './messaging/router.js';
import { createHandlers } from './messaging/handlers.js';
import { authorizeMessageSender, PRIVILEGED_MESSAGE_TYPES } from './messaging/sender-auth.js';
import { OffscreenManager } from './offscreen/manager.js';
import { runMigrations } from './lifecycle/migrations.js';
import { verifyWasmAsset } from './offscreen/wasm-integrity.js';
import { isSentinelRelease, createApprovalNonce, markApproved } from './content/approval-nonce.js';

const extRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(extRoot, '..', '..');

async function buildRouter() {
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
      isSafeMode: async () => false,
    }),
    logger,
    rateLimiter: createIpcRateLimiter(),
  });
}

describe('Lab P4 — STRIDE: Tampering / Elevation (IPC)', () => {
  it('rejects all privileged types from https tab senders', () => {
    for (const type of PRIVILEGED_MESSAGE_TYPES) {
      const result = authorizeMessageSender(type, {
        tab: { id: 3 } as chrome.tabs.Tab,
        url: 'https://chatgpt.com/',
      });
      expect(result.ok, String(type)).toBe(false);
    }
  });

  it('rejects INTERCEPT_EVENT without tab when sender claims extension id', async () => {
    const router = await buildRouter();
    const response = await router.handle(
      createEnvelope(MessageType.INTERCEPT_EVENT, {
        interceptId: 'spoof',
        kind: InterceptKind.PASTE,
        payload: { kind: 'text', text: 'x', byteLength: 1 },
        targetHint: 'ai-input',
        timestampMs: Date.now(),
      }),
      { id: 'fake-ext', url: 'https://evil.example/' },
    );
    expect(response.ok).toBe(false);
  });

  it('assertIpcEnvelope rejects arrays and primitives', () => {
    expect(() => assertIpcEnvelope([])).toThrow();
    expect(() => assertIpcEnvelope('PING')).toThrow();
    expect(() => assertIpcEnvelope(null)).toThrow();
  });
});

describe('Lab P4 — STRIDE: Information disclosure', () => {
  it('history and telemetry default OFF', () => {
    expect(DEFAULT_FEATURE_FLAGS.historyEnabled).toBe(false);
    expect(DEFAULT_FEATURE_FLAGS.telemetryEnabled).toBe(false);
  });

  it('detection-engine source tree has no fetch/XMLHttpRequest/WebSocket', () => {
    const engineSrc = join(repoRoot, 'packages', 'detection-engine', 'src');
    const walk = (dir: string): string[] => {
      const out: string[] = [];
      for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        if (statSync(full).isDirectory()) out.push(...walk(full));
        else if (name.endsWith('.ts')) out.push(full);
      }
      return out;
    };
    const hits: string[] = [];
    for (const file of walk(engineSrc)) {
      const src = readFileSync(file, 'utf8');
      if (/\bfetch\s*\(|XMLHttpRequest|new\s+WebSocket\b/.test(src)) {
        hits.push(file);
      }
    }
    expect(hits).toEqual([]);
  });
});

describe('Lab P4 — STRIDE: Denial of service', () => {
  it('threat harness includes clean + secret cases', () => {
    expect(THREAT_CASES.length).toBeGreaterThanOrEqual(7);
    const result = runThreatSimulation();
    expect(result.failed).toEqual([]);
  });

  it('oversize text fails closed without scanning spans', () => {
    const engine = createDetectionEngine();
    const text = 'z'.repeat(1_048_576 + 8);
    const result = engine.scanText({ requestId: 'dos', text });
    expect(result.action).toBe(PolicyAction.BLOCK);
    expect(result.spans).toEqual([]);
  });
});

describe('Lab P4 — Integrity: WASM + approval release', () => {
  it('optional WASM with empty sha256 is refused', async () => {
    const result = await verifyWasmAsset(
      {
        id: 'lab-ocr',
        path: 'public/wasm/missing.wasm',
        sha256: '',
        optional: true,
      },
      new Uint8Array([9, 9, 9]).buffer,
    );
    expect(result.ok).toBe(false);
  });

  it('unregistered forged approval marker is not a sentinel release', () => {
    const forged = new Event('change');
    Object.defineProperty(forged, '__sentinelShieldApproved', {
      value: 'ss-forged-outside-registry',
      enumerable: false,
    });
    expect(isSentinelRelease(forged)).toBe(false);

    const nonce = createApprovalNonce();
    const ok = new Event('change');
    markApproved(ok, nonce);
    expect(isSentinelRelease(ok)).toBe(true);
  });
});

describe('Lab P4 — packaging / CSP honesty anchors', () => {
  it('manifest CSP lacks unsafe-eval and remote script sources', () => {
    const manifestPath = join(extRoot, 'dist', 'manifest.json');
    expect(existsSync(manifestPath)).toBe(true);
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as {
      content_security_policy?: { extension_pages?: string };
    };
    const csp = manifest.content_security_policy?.extension_pages ?? '';
    expect(csp).toMatch(/script-src/);
    expect(csp.includes("'unsafe-eval'")).toBe(false);
    expect(csp.includes('https:')).toBe(false);
  });
});
