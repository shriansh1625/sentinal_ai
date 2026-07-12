/**
 * Phase 2 — Functional Validation suite.
 * RTM: FR-DET-*, FR-INP-*, FR-UX-001/003/006, ADR-036.
 * Goal: disprove Engineering RC functional claims.
 */

import { describe, expect, it } from 'vitest';
import {
  AI_PLATFORMS,
  DEFAULT_FEATURE_FLAGS,
  EntityType,
  InterceptDecision,
  InterceptKind,
  MAX_TEXT_SCAN_BYTES,
  MessageType,
  PolicyAction,
  RiskLevel,
  getPlatform,
} from '@sentinel-shield/shared-types';
import {
  AllowlistLogger,
  ConfigurationService,
  FeatureFlagService,
  InMemorySettingsStore,
  LogLevel,
  MemoryLogSink,
} from '@sentinel-shield/core';
import { MemoryKvStorage, createEnvelope } from '@sentinel-shield/browser-adapters';
import {
  MimeFamily,
  createDetectionEngine,
  redactText,
  sniffMagicBytes,
} from '@sentinel-shield/detection-engine';
import { createHandlers } from './messaging/handlers.js';
import { MessageRouter } from './messaging/router.js';
import { scanResultToInterceptOutcome } from './messaging/scan-bridge.js';
import { OffscreenManager } from './offscreen/manager.js';
import { runMigrations } from './lifecycle/migrations.js';
import { enablePlatform, listEnabledPlatforms } from './lifecycle/registration.js';
import { EncryptedHistoryStore } from './storage/history-store.js';
import { DecisionOverlay } from './ui/overlay.js';
import { sprint2DefaultDecision } from './input-pipelines/index.js';

async function buildRouter(opts?: { historyEnabled?: boolean; permissionsGranted?: boolean }) {
  const storage = new MemoryKvStorage();
  const logger = new AllowlistLogger(new MemoryLogSink(), LogLevel.DEBUG);
  await runMigrations(storage, logger);
  const store = new InMemorySettingsStore();
  const config = new ConfigurationService(store);
  await config.initialize();
  if (opts?.historyEnabled) {
    await config.update({ featureFlags: { historyEnabled: true } });
  }
  const flags = new FeatureFlagService(config);
  const offscreen = new OffscreenManager(
    { createDocument: async () => undefined, closeDocument: async () => undefined },
    { getContexts: async () => [], getURL: (p) => p },
    logger,
  );
  const historyStore = new EncryptedHistoryStore(storage);
  const router = new MessageRouter({
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
      historyStore,
      permissions: {
        request: async () => opts?.permissionsGranted !== false,
        contains: async () => true,
        remove: async () => true,
      },
    }),
    logger,
  });
  return { router, storage, historyStore, flags };
}

describe('Phase 2 — FR-DET Tier-1 functional', () => {
  const engine = createDetectionEngine();

  it('allows clean text (FR-DET negative)', () => {
    const r = engine.scanText({ requestId: 'c1', text: 'Ship the release notes tomorrow.' });
    expect(r.action).toBe(PolicyAction.ALLOW);
    expect(r.riskLevel).toBe(RiskLevel.NONE);
  });

  it('detects contact email (FR-DET-004)', () => {
    const r = engine.scanText({
      requestId: 'c2',
      text: 'Reach alice@company.com for access',
    });
    expect(r.spans.some((s) => s.entityType === EntityType.EMAIL)).toBe(true);
    expect(r.action).not.toBe(PolicyAction.ALLOW);
  });

  it('detects API secrets (FR-DET-003)', () => {
    const r = engine.scanText({
      requestId: 'c3',
      text: 'token sk-abcdefghijklmnopqrstuvwxyz123456',
    });
    expect(r.spans.length).toBeGreaterThan(0);
    expect([RiskLevel.HIGH, RiskLevel.CRITICAL, RiskLevel.MEDIUM]).toContain(r.riskLevel);
  });

  it('detects Luhn card patterns (FR-DET-002)', () => {
    const r = engine.scanText({
      requestId: 'c4',
      text: 'card 4111111111111111 on file',
    });
    expect(r.spans.length).toBeGreaterThan(0);
    expect(r.action).not.toBe(PolicyAction.ALLOW);
  });
});

describe('Phase 2 — FR-UX-003 redaction residual', () => {
  it('redacted output contains no original email', () => {
    const engine = createDetectionEngine();
    const text = 'mail jane.doe@example.org please';
    const scan = engine.scanText({ requestId: 'r', text });
    const out = redactText(text, scan.spans);
    expect(out.redactedText.includes('jane.doe@example.org')).toBe(false);
    expect(out.replacements).toBeGreaterThan(0);
  });
});

describe('Phase 2 — policy → intercept (ADR-036)', () => {
  it('maps ALLOW / HOLD / REDACT / BLOCK with redaction payload', () => {
    const engine = createDetectionEngine();
    const clean = engine.scanText({ requestId: 'a', text: 'hello world' });
    expect(scanResultToInterceptOutcome('a', clean, 'hello world').decision).toBe(
      InterceptDecision.ALLOW,
    );

    const email = engine.scanText({
      requestId: 'b',
      text: 'x@y.com',
    });
    const emailOut = scanResultToInterceptOutcome('b', email, 'x@y.com');
    expect(emailOut.decision).not.toBe(InterceptDecision.ALLOW);
    if (email.spans.length > 0) {
      expect(emailOut.redactedText).toBeDefined();
    }

    const secret = engine.scanText({
      requestId: 'c',
      text: 'sk-abcdefghijklmnopqrstuvwxyz123456',
    });
    const secretOut = scanResultToInterceptOutcome(
      'c',
      secret,
      'sk-abcdefghijklmnopqrstuvwxyz123456',
    );
    expect([InterceptDecision.BLOCK, InterceptDecision.HOLD, InterceptDecision.REDACT]).toContain(
      secretOut.decision,
    );
  });

  it('never silently allows unscanned default (FR-INP / ADR-036)', () => {
    const o = sprint2DefaultDecision({
      interceptId: 'h',
      kind: InterceptKind.PASTE,
      payload: { kind: 'text', text: 'x', byteLength: 1 },
      targetHint: 'ai-input',
      timestampMs: Date.now(),
    });
    expect(o.decision).toBe(InterceptDecision.HOLD);
  });
});

describe('Phase 2 — INTERCEPT_EVENT handler', () => {
  it('scans paste text and returns non-ALLOW for secrets', async () => {
    const { router } = await buildRouter();
    const response = await router.handle(
      createEnvelope(MessageType.INTERCEPT_EVENT, {
        interceptId: 'p1',
        kind: InterceptKind.PASTE,
        payload: {
          kind: 'text',
          text: 'key sk-abcdefghijklmnopqrstuvwxyz123456',
          byteLength: 40,
        },
        targetHint: 'ai-input',
        timestampMs: Date.now(),
      }),
      {},
    );
    expect(response.ok).toBe(true);
    if (response.ok) {
      const data = response.data as { decision: string };
      expect(data.decision).not.toBe(InterceptDecision.ALLOW);
    }
  });

  it('holds oversize text (PART_17)', async () => {
    const { router } = await buildRouter();
    const response = await router.handle(
      createEnvelope(MessageType.INTERCEPT_EVENT, {
        interceptId: 'big',
        kind: InterceptKind.PASTE,
        payload: {
          kind: 'text',
          text: 'x',
          byteLength: MAX_TEXT_SCAN_BYTES + 1,
        },
        targetHint: 'ai-input',
        timestampMs: Date.now(),
      }),
      {},
    );
    expect(response.ok).toBe(true);
    if (response.ok) {
      expect((response.data as { decision: string }).decision).toBe(InterceptDecision.HOLD);
    }
  });

  it('holds binary file metadata without OCR (FR-INP-005 fail-closed)', async () => {
    const { router } = await buildRouter();
    const response = await router.handle(
      createEnvelope(MessageType.INTERCEPT_EVENT, {
        interceptId: 'f1',
        kind: InterceptKind.FILE_UPLOAD,
        payload: {
          kind: 'files',
          files: [{ name: 'id.png', mimeType: 'image/png', sizeBytes: 1200 }],
          totalBytes: 1200,
        },
        targetHint: 'file-input',
        timestampMs: Date.now(),
      }),
      {},
    );
    expect(response.ok).toBe(true);
    if (response.ok) {
      expect((response.data as { decision: string }).decision).toBe(InterceptDecision.HOLD);
    }
  });

  it('records history metadata only when enabled (FR-UX-005)', async () => {
    const { router, historyStore } = await buildRouter({ historyEnabled: true });
    await router.handle(
      createEnvelope(MessageType.INTERCEPT_EVENT, {
        interceptId: 'hist',
        kind: InterceptKind.PASTE,
        payload: {
          kind: 'text',
          text: 'secret-password-should-not-persist',
          byteLength: 34,
        },
        targetHint: 'ai-input',
        timestampMs: Date.now(),
      }),
      {},
    );
    const list = await historyStore.list();
    expect(list.length).toBeGreaterThan(0);
    expect(JSON.stringify(list).includes('secret-password-should-not-persist')).toBe(false);
  });
});

describe('Phase 2 — FR-INP document sniff', () => {
  it('classifies text and PNG magic', () => {
    expect(sniffMagicBytes(new TextEncoder().encode('hello')).family).toBe(MimeFamily.TEXT);
    expect(sniffMagicBytes(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a])).family).toBe(
      MimeFamily.IMAGE,
    );
  });
});

describe('Phase 2 — FR-UX-006 defaults', () => {
  it('keeps dangerous flags off and OCR on', () => {
    expect(DEFAULT_FEATURE_FLAGS.nerEnabled).toBe(false);
    expect(DEFAULT_FEATURE_FLAGS.cvEnabled).toBe(false);
    expect(DEFAULT_FEATURE_FLAGS.telemetryEnabled).toBe(false);
    expect(DEFAULT_FEATURE_FLAGS.historyEnabled).toBe(false);
    expect(DEFAULT_FEATURE_FLAGS.ocrEnabled).toBe(true);
  });
});

describe('Phase 2 — platforms ADR-035', () => {
  it('AI hosts only; enable persists when permission granted', async () => {
    expect(AI_PLATFORMS.some((p) => p.id === 'gmail')).toBe(false);
    expect(getPlatform('claude')).toBeDefined();
    const storage = new MemoryKvStorage();
    const logger = new AllowlistLogger(new MemoryLogSink(), LogLevel.DEBUG);
    await enablePlatform(
      storage,
      {
        registerContentScripts: async () => undefined,
        unregisterContentScripts: async () => undefined,
        getRegisteredContentScripts: async () => [],
      },
      logger,
      'claude',
      { request: async () => true, contains: async () => true, remove: async () => true },
    );
    expect(await listEnabledPlatforms(storage)).toContain('claude');
  });

  it('rejects enable when host permission denied', async () => {
    const storage = new MemoryKvStorage();
    const logger = new AllowlistLogger(new MemoryLogSink(), LogLevel.DEBUG);
    await expect(
      enablePlatform(
        storage,
        {
          registerContentScripts: async () => undefined,
          unregisterContentScripts: async () => undefined,
          getRegisteredContentScripts: async () => [],
        },
        logger,
        'openai-chat',
        { request: async () => false, contains: async () => false, remove: async () => true },
      ),
    ).rejects.toThrow(/permission/i);
  });
});

describe('Phase 2 — FR-UX-001 overlay', () => {
  it('injects closed-shadow host and dispatches redact via test seam', () => {
    expect(typeof document).not.toBe('undefined');
    const overlay = new DecisionOverlay();
    let action: string | null = null;
    overlay.show({
      outcome: {
        interceptId: 'o1',
        decision: InterceptDecision.HOLD,
        reason: 'warn',
        preview: 'masked',
        redactedText: '[REDACTED_EMAIL]',
      },
      onAction: (a) => {
        action = a;
      },
    });
    const host = document.querySelector('sentinel-shield-overlay');
    expect(host).not.toBeNull();
    expect(host?.shadowRoot).toBeNull();
    overlay.dispatchActionForTests('redact');
    expect(action).toBe('redact');
    expect(document.querySelector('sentinel-shield-overlay')).toBeNull();
  });
});
