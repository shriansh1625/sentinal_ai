/**
 * Detection research library — catalog integrity + positive/negative examples.
 * Does not invent precision/recall; only verifies declared examples.
 */

import { describe, expect, it } from 'vitest';
import { EntityType, PolicyAction } from '@sentinel-shield/shared-types';
import {
  DETECTOR_CATALOG,
  assertCatalogIntegrity,
  createDetectionEngine,
  findCatalogSpans,
  getDetectorById,
} from '../index.js';

describe('Detection research catalog integrity', () => {
  it('has 100+ detectors with unique ids and compilable patterns', () => {
    expect(DETECTOR_CATALOG.length).toBeGreaterThanOrEqual(100);
    expect(() => assertCatalogIntegrity()).not.toThrow();
  });

  it('every detector positive example produces at least one span for that pattern', () => {
    const failures: string[] = [];
    for (const detector of DETECTOR_CATALOG) {
      for (const example of detector.positiveExamples) {
        const spans = findCatalogSpans(example, [detector]);
        if (spans.length < 1) {
          failures.push(`${detector.id} :: ${example}`);
        }
      }
    }
    expect(failures, failures.join('\n')).toEqual([]);
  });

  it('negative examples (when present) do not match that detector alone', () => {
    const failures: string[] = [];
    for (const detector of DETECTOR_CATALOG) {
      for (const example of detector.negativeExamples ?? []) {
        const spans = findCatalogSpans(example, [detector]);
        if (spans.length > 0) {
          failures.push(`${detector.id} :: ${example}`);
        }
      }
    }
    expect(failures, failures.join('\n')).toEqual([]);
  });

  it('exposes lookup by id', () => {
    expect(getDetectorById('aws.access_key_id')?.name).toMatch(/AWS access key/i);
    expect(getDetectorById('missing.detector')).toBeUndefined();
  });
});

describe('Detection research — engine integration smoke', () => {
  const engine = createDetectionEngine();

  it.each([
    ['github classic', 'token ghp_abcdefghijklmnopqrstuvwxyz0123456789'],
    ['gitlab', 'token glpat-abcdefghijklmnopqrstuv'],
    ['stripe live', 'key sk_live_abcdefghijklmnopqrstuv'],
    ['anthropic', 'key sk-ant-api03-abcdefghijklmnopqrstuv'],
    [
      'slack webhook',
      'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
    ],
    ['mongo uri', 'mongodb+srv://user:p4ssw0rd@cluster0.example.mongodb.net/db'],
    [
      'jwt',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signatureplaceholder12',
    ],
  ])('detects %s', (_label, text) => {
    const result = engine.scanText({ requestId: _label, text });
    expect(result.action).not.toBe(PolicyAction.ALLOW);
  });

  it('still allows clean prose', () => {
    const result = engine.scanText({
      requestId: 'clean',
      text: 'Please summarize the quarterly roadmap for the design team.',
    });
    expect(result.action).toBe(PolicyAction.ALLOW);
  });

  it('rejects contiguous 10-digit runs for phone (precision gate)', () => {
    const local = createDetectionEngine();
    const fp = local.scanText({ requestId: 'phone-fp', text: 'Yz0123456789 order 4155552671' });
    expect(fp.spans.every((s) => s.entityType !== EntityType.PHONE)).toBe(true);
    const tp = local.scanText({ requestId: 'phone-tp', text: 'Call 415-555-2671 please' });
    expect(tp.spans.some((s) => s.entityType === EntityType.PHONE)).toBe(true);
  });
});
