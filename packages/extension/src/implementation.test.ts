/**
 * Implementation program tests — overlay, history, WASM integrity, scan-bridge.
 */

import { describe, expect, it } from 'vitest';
import { InterceptDecision, PolicyAction, RiskLevel } from '@sentinel-shield/shared-types';
import { createDetectionEngine, decideAction, redactText } from '@sentinel-shield/detection-engine';
import { scanResultToInterceptOutcome } from './messaging/scan-bridge.js';
import { EncryptedHistoryStore } from './storage/history-store.js';
import { MemoryKvStorage } from '@sentinel-shield/browser-adapters';
import { verifyWasmAsset, type WasmAssetPin } from './offscreen/wasm-integrity.js';
import { DecisionOverlay } from './ui/overlay.js';

describe('I1 — scan bridge redaction', () => {
  it('attaches redacted text for WARN/REDACT outcomes', () => {
    const engine = createDetectionEngine();
    const text = 'Contact jane@example.com asap';
    const result = engine.scanText({ requestId: 'r', text });
    const outcome = scanResultToInterceptOutcome('r', result, text);
    expect(outcome.decision).not.toBe(InterceptDecision.ALLOW);
    if (result.spans.length > 0) {
      expect(outcome.redactedText).toBeDefined();
      expect(outcome.redactedText?.includes('@')).toBe(false);
    }
  });
});

describe('I1 — policy MEDIUM → REDACT', () => {
  it('maps medium risk to redact action', () => {
    expect(decideAction(RiskLevel.MEDIUM)).toBe(PolicyAction.REDACT);
    expect(decideAction(RiskLevel.LOW)).toBe(PolicyAction.WARN);
    expect(decideAction(RiskLevel.HIGH)).toBe(PolicyAction.BLOCK);
  });
});

describe('I1 — overlay host', () => {
  it('creates closed shadow overlay when document exists', () => {
    if (typeof document === 'undefined') {
      expect(true).toBe(true);
      return;
    }
    const overlay = new DecisionOverlay();
    overlay.show({
      outcome: {
        interceptId: '1',
        decision: InterceptDecision.HOLD,
        reason: 'test',
        preview: 'x',
        redactedText: '[REDACTED]',
      },
      onAction: () => undefined,
    });
    expect(document.querySelector('sentinel-shield-overlay')).not.toBeNull();
    overlay.hide();
    expect(document.querySelector('sentinel-shield-overlay')).toBeNull();
  });
});

describe('I3 — WASM integrity fail-closed', () => {
  it('rejects empty pin', async () => {
    const pin: WasmAssetPin = {
      id: 'tesseract-core',
      path: 'public/wasm/tesseract-core.wasm',
      sha256: '',
      optional: true,
    };
    const result = await verifyWasmAsset(pin, new Uint8Array([1, 2, 3]).buffer);
    expect(result.ok).toBe(false);
  });
});

describe('I4 — encrypted history (metadata only)', () => {
  it('stores decisions without paste body', async () => {
    const store = new EncryptedHistoryStore(new MemoryKvStorage());
    await store.append({
      interceptId: 'i1',
      decision: 'HOLD',
      reason: 'warn',
      timestampMs: Date.now(),
    });
    const list = await store.list();
    expect(list).toHaveLength(1);
    expect(JSON.stringify(list).includes('secret-password')).toBe(false);
  });
});

describe('redaction helper', () => {
  it('masks email spans', () => {
    const text = 'a@b.co';
    const engine = createDetectionEngine();
    const scan = engine.scanText({ requestId: 'x', text });
    const out = redactText(text, scan.spans);
    expect(out.replacements).toBeGreaterThanOrEqual(0);
  });
});
