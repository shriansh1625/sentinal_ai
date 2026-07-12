/**
 * Phase 4 — Adversarial / PART_20 bypass catalog.
 */

import { describe, expect, it } from 'vitest';
import { PolicyAction } from '@sentinel-shield/shared-types';
import {
  createDetectionEngine,
  prepareForDetection,
  stripZeroWidth,
  resolveSimpleStringConcat,
} from './index.js';

describe('Phase 4 — PART_20 zero-width (1.1)', () => {
  it('strips ZWSP between AWS key chars and detects', () => {
    const zw = '\u200B';
    const keyed = [
      'A',
      'K',
      'I',
      'A',
      'I',
      'O',
      'S',
      'F',
      'O',
      'D',
      'N',
      'N',
      '7',
      'E',
      'X',
      'A',
      'M',
      'P',
      'L',
      'E',
    ].join(zw);
    expect(stripZeroWidth(keyed)).toBe('AKIAIOSFODNN7EXAMPLE');
    const engine = createDetectionEngine();
    const result = engine.scanText({ requestId: 'zw', text: `creds ${keyed}` });
    expect(result.action).not.toBe(PolicyAction.ALLOW);
  });

  it('detects sk- key with ZWJ between characters', () => {
    const key = 'sk-abcdefghijklmnopqrstuvwxyz123456'.split('').join('\u200D');
    const engine = createDetectionEngine();
    const result = engine.scanText({ requestId: 'zwj', text: key });
    expect(result.action).not.toBe(PolicyAction.ALLOW);
  });
});

describe('Phase 4 — PART_20 homoglyph (1.2)', () => {
  it('maps Cyrillic lookalikes in email local-part domain', () => {
    // Cyrillic 'е' (U+0435) in "exаmple" style — use full Latin email with Cyrillic 'а' in domain
    const text = 'mail user@ex\u0430mple.com please'; // а is Cyrillic
    const prepared = prepareForDetection(text);
    expect(prepared.includes('@example.com') || prepared.includes('example')).toBe(true);
    const engine = createDetectionEngine();
    const result = engine.scanText({ requestId: 'hg', text });
    expect(result.action).not.toBe(PolicyAction.ALLOW);
  });
});

describe('Phase 4 — PART_20 Base64 (1.3)', () => {
  it('detects Base64-encoded AWS key', () => {
    // AKIAIOSFODNN7EXAMPLE
    const b64 = btoa('AKIAIOSFODNN7EXAMPLE');
    const engine = createDetectionEngine();
    const result = engine.scanText({
      requestId: 'b64',
      text: `export TOKEN=${b64}`,
    });
    expect(result.action).not.toBe(PolicyAction.ALLOW);
    expect(result.spans.length).toBeGreaterThan(0);
  });

  it('detects Base64-encoded OpenAI-style key', () => {
    const secret = 'sk-abcdefghijklmnopqrstuvwxyz123456';
    const b64 = btoa(secret);
    const engine = createDetectionEngine();
    const result = engine.scanText({ requestId: 'b64k', text: b64 });
    expect(result.action).not.toBe(PolicyAction.ALLOW);
  });
});

describe('Phase 4 — PART_20 string concat (4)', () => {
  it('merges simple literal concatenation of sk- key', () => {
    const code = 'const k = "sk-" + "abcdefghijklmnopqrstuvwxyz123456";';
    expect(resolveSimpleStringConcat(code).includes('sk-abcdefghijklmnopqrstuvwxyz123456')).toBe(
      true,
    );
    const engine = createDetectionEngine();
    const result = engine.scanText({ requestId: 'cat', text: code });
    expect(result.action).not.toBe(PolicyAction.ALLOW);
  });
});

describe('Phase 4 — exhaustion / benign', () => {
  it('still allows clean text', () => {
    const engine = createDetectionEngine();
    const result = engine.scanText({
      requestId: 'clean',
      text: 'Please summarize the public changelog.',
    });
    expect(result.action).toBe(PolicyAction.ALLOW);
  });

  it('completes large repetitive input without throw', () => {
    const engine = createDetectionEngine();
    const text = 'word '.repeat(50_000);
    const result = engine.scanText({ requestId: 'big', text });
    expect(result.durationMs).toBeGreaterThanOrEqual(0);
    expect(result.action).toBe(PolicyAction.ALLOW);
  });
});
