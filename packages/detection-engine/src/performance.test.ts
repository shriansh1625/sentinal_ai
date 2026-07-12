/**
 * Phase 5 — Detection-engine performance smoke (PART_23).
 * Keeps engine package free of @sentinel-shield/core (purity / depcruise).
 */

import { describe, expect, it } from 'vitest';
import { EXT_PEAK_MEM_MB, SW_COLD_START_MS, CRX_MAX_MB } from '@sentinel-shield/shared-types';
import { createDetectionEngine } from './index.js';

describe('Phase 5 — budget constants visible to engine', () => {
  it('matches freeze peak / cold-start / CRX ceilings', () => {
    expect(EXT_PEAK_MEM_MB).toBe(256);
    expect(SW_COLD_START_MS).toBe(500);
    expect(CRX_MAX_MB).toBe(25);
  });
});

describe('Phase 5 — Tier-1 latency smoke', () => {
  it('10KB full pipeline finishes under generous unit bound', () => {
    const engine = createDetectionEngine();
    const text = 'Release notes without secrets. '.repeat(400);
    const t0 = performance.now();
    const result = engine.scanText({ requestId: 'p5', text });
    const elapsed = performance.now() - t0;
    expect(result.durationMs).toBeGreaterThanOrEqual(0);
    expect(elapsed).toBeLessThan(2_000);
  });

  it('1KB scan reports duration', () => {
    const engine = createDetectionEngine();
    const result = engine.scanText({
      requestId: 'p5-1k',
      text: 'hello world '.repeat(80),
    });
    expect(result.durationMs).toBeLessThan(500);
  });
});
