# PHASE_05_VERIFICATION_PLAN — Performance & Memory

**Refs:** PART_12, PART_23, Ownership Matrix §3, Freeze G0  
**Goal:** Empirically validate design budgets for Tier-1 path, bundle size, memory ceiling constants.

## Objectives

1. Measure Tier-1 full scan latency (1KB / 10KB / 100KB) vs L01/L02/L09
2. Enforce `EXT_PEAK_MEM_MB=256` via MemoryMonitor
3. Enforce extension `dist` size ≪ `CRX_MAX_MB` (25)
4. SW bootstrap mock timing ≪ `SW_COLD_START_MS` (500)
5. Expand `bench:budgets` beyond constant smoke

## CI note

Design P99s are device contracts. CI uses median of warm runs with documented slack factor (×8) to reject only egregious regressions; release notes record raw medians.

## Success

Bench gate PASS; no freeze constant drift; no unbounded growth in soak micro-test.
