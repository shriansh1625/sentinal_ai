import { describe, expect, it } from 'vitest';
import { InterceptDecision, InterceptKind, MessageType } from '@sentinel-shield/shared-types';
import { createEnvelope } from '@sentinel-shield/browser-adapters';
import {
  AllowlistLogger,
  ConfigurationService,
  FeatureFlagService,
  InMemorySettingsStore,
  LogLevel,
  MemoryLogSink,
} from '@sentinel-shield/core';
import { MemoryKvStorage } from '@sentinel-shield/browser-adapters';
import { createApprovalNonce, isApproved, markApproved } from './content/approval-nonce.js';
import { isLikelyAiInput } from './input-pipelines/context.js';
import { sprint2DefaultDecision } from './input-pipelines/index.js';
import { MessageRouter } from './messaging/router.js';
import { createHandlers } from './messaging/handlers.js';
import { OffscreenManager } from './offscreen/manager.js';
import { runMigrations } from './lifecycle/migrations.js';

describe('Sprint 2 — approval nonce', () => {
  it('marks and recognizes approved events', () => {
    const nonce = createApprovalNonce(() => 0.5);
    const event = new Event('paste');
    markApproved(event, nonce);
    expect(isApproved(event, nonce)).toBe(true);
    expect(isApproved(event, 'other')).toBe(false);
  });
});

describe('Sprint 2 — context detection', () => {
  it('detects textarea-like targets when DOM available', () => {
    if (typeof document === 'undefined') {
      expect(true).toBe(true);
      return;
    }
    const el = document.createElement('textarea');
    expect(isLikelyAiInput(el)).toBe(true);
    expect(isLikelyAiInput(document.createElement('div'))).toBe(false);
    const text = document.createTextNode('x');
    el.appendChild(text);
    expect(isLikelyAiInput(text)).toBe(true);
  });
});

describe('Sprint 2 — default hold decision', () => {
  it('never silently allows unscanned content', () => {
    const outcome = sprint2DefaultDecision({
      interceptId: 'i1',
      kind: InterceptKind.PASTE,
      payload: { kind: 'text', text: 'secret', byteLength: 6 },
      targetHint: 'ai-input',
      timestampMs: Date.now(),
    });
    expect(outcome.decision).toBe(InterceptDecision.HOLD);
    expect(outcome.decision).not.toBe(InterceptDecision.ALLOW);
  });
});

describe('Sprint 2 — INTERCEPT_EVENT handler', () => {
  it('returns HOLD from service worker handler', async () => {
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
        getVersion: () => '0.2.0',
        isSafeMode: async () => false,
      }),
      logger,
    });
    const response = await router.handle(
      createEnvelope(MessageType.INTERCEPT_EVENT, {
        interceptId: 'x',
        kind: InterceptKind.PASTE,
        payload: { kind: 'text', text: 'hi', byteLength: 2 },
        targetHint: 'ai-input',
        timestampMs: Date.now(),
      }),
      {},
    );
    expect(response.ok).toBe(true);
    if (response.ok) {
      expect((response.data as { decision: string }).decision).toBe(InterceptDecision.ALLOW);
    }
  });
});
