/**
 * ISVV — attempt to disprove Tier-1 detection (FR-DET-*, PART_13/20, NFR-PERF).
 * Refs: REQUIREMENTS_TRACEABILITY_MATRIX, ARCHITECTURE_FREEZE_v1.0
 */

import { describe, expect, it } from 'vitest';
import { MAX_TEXT_SCAN_BYTES, PolicyAction } from '@sentinel-shield/shared-types';
import {
  createDetectionEngine,
  prepareForDetection,
  redactText,
  sniffMagicBytes,
  MimeFamily,
} from './index.js';

describe('ISVV — financial / secrets detection (disprove)', () => {
  it('detects Visa with spaces and dashes (ISVV-BUG-002)', () => {
    const engine = createDetectionEngine();
    for (const text of ['pay 4111 1111 1111 1111', 'pay 4111-1111-1111-1111']) {
      const result = engine.scanText({ requestId: 'cc', text });
      expect(result.action, text).not.toBe(PolicyAction.ALLOW);
      expect(result.spans.length, text).toBeGreaterThan(0);
    }
  });

  it('detects spaced IBAN (ISVV-BUG-003)', () => {
    const engine = createDetectionEngine();
    const result = engine.scanText({
      requestId: 'iban',
      text: 'wire GB82 WEST 1234 5698 7654 32',
    });
    expect(result.action).not.toBe(PolicyAction.ALLOW);
  });

  it('detects PEM private key header (ISVV-BUG-004)', () => {
    const engine = createDetectionEngine();
    const result = engine.scanText({
      requestId: 'pem',
      text: '-----BEGIN OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1rZXktdjE=\n-----END OPENSSH PRIVATE KEY-----',
    });
    expect(result.action).not.toBe(PolicyAction.ALLOW);
  });

  it('still detects continuous PAN and AWS/OpenAI keys', () => {
    const engine = createDetectionEngine();
    expect(engine.scanText({ requestId: 'a', text: '4111111111111111' }).action).not.toBe(
      PolicyAction.ALLOW,
    );
    expect(
      engine.scanText({
        requestId: 'b',
        text: 'AKIAIOSFODNN7EXAMPLE',
      }).action,
    ).not.toBe(PolicyAction.ALLOW);
    expect(
      engine.scanText({
        requestId: 'c',
        text: 'sk-abcdefghijklmnopqrstuvwxyz123456',
      }).action,
    ).not.toBe(PolicyAction.ALLOW);
  });
});

describe('ISVV — budget / DoS (disprove)', () => {
  it('fail-closes when text exceeds MAX_TEXT_SCAN_BYTES (ISVV-BUG-001)', () => {
    const engine = createDetectionEngine();
    const oversized = 'a'.repeat(MAX_TEXT_SCAN_BYTES + 1);
    const started = performance.now();
    const result = engine.scanText({ requestId: 'dos', text: oversized });
    const elapsed = performance.now() - started;
    expect(result.action).toBe(PolicyAction.BLOCK);
    expect(result.spans).toEqual([]);
    expect(elapsed).toBeLessThan(2_000);
  });

  it('completes 100k benign tokens under budget', () => {
    const engine = createDetectionEngine();
    const text = 'word '.repeat(20_000);
    const result = engine.scanText({ requestId: 'load', text });
    expect(result.action).toBe(PolicyAction.ALLOW);
    expect(result.durationMs).toBeLessThan(5_000);
  });
});

describe('ISVV — adversarial residual honesty', () => {
  it('documents Aadhaar/PAN-IN as not Tier-1 entity coverage', () => {
    const engine = createDetectionEngine();
    // EntityType has no AADHAAR/PAN_IN — expect ALLOW until ADR expands Tier-1.
    expect(engine.scanText({ requestId: 'aadhaar', text: 'Aadhaar 2345 6789 0123' }).action).toBe(
      PolicyAction.ALLOW,
    );
    expect(engine.scanText({ requestId: 'pan', text: 'PAN ABCDE1234F' }).action).toBe(
      PolicyAction.ALLOW,
    );
  });

  it('redaction removes email after prepare', () => {
    const engine = createDetectionEngine();
    const text = 'mail jane@example.com';
    const prepared = prepareForDetection(text);
    const scan = engine.scanText({ requestId: 'r', text });
    const redacted = redactText(prepared, scan.spans);
    expect(redacted.redactedText.includes('@')).toBe(false);
  });

  it('sniffs zip magic (archive path hold residual)', () => {
    const bytes = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0, 0, 0, 0]);
    expect(sniffMagicBytes(bytes).family).toBe(MimeFamily.ARCHIVE);
  });
});
