# PHASE_05_REPORT — Performance & Memory

**Date:** 2026-07-12  
**Protocol:** EOS  
**Model:** Cursor Grok 4.5 Medium  
**Freeze:** Intact

## Objectives

Empirically validate PART_23 / Ownership Matrix budgets for the shipped Tier-1 path (Freeze Implementation Gate G0).

## Work completed

| Item                                          | Result                                                |
| --------------------------------------------- | ----------------------------------------------------- |
| Expanded `tools/benchmarks/check-budgets.mjs` | PASS — constants + latency + dist size                |
| Tier-1 median 1KB                             | **0.19ms** (design 10ms, CI limit 80ms)               |
| Tier-1 median 10KB                            | **1.59ms** (design 300ms / L09)                       |
| Tier-1 median 100KB                           | **16.65ms** (base 800ms × slack)                      |
| Extension dist                                | **0.31MB** total / **0.10MB** without maps ≪ 25MB CRX |
| MemoryMonitor peak 256MB                      | PASS (unit)                                           |
| Mocked SW bootstrap                           | PASS ≪ 500ms                                          |
| Engine purity preserved                       | PASS (no core import in engine)                       |

## Tests executed

- `detection-engine` performance + adversarial + engine — 20 tests
- `extension` phase5 + prior — 52 tests
- Full gates + `bench:budgets` — **`PHASE5_GATES:0`**

## Security findings

None introduced. Perf gate is measurement-only aside from existing monitors.

## Performance findings

| Metric            | Measured       | Budget           | Status |
| ----------------- | -------------- | ---------------- | ------ |
| Full scan 1KB     | 0.19ms median  | 10ms P99 design  | PASS   |
| Full scan 10KB    | 1.59ms median  | 300ms L09        | PASS   |
| Full scan 100KB   | 16.65ms median | 800ms base ×8 CI | PASS   |
| Dist size         | 0.10MB code    | 25MB CRX         | PASS   |
| Peak RAM constant | 256MB          | Freeze           | PASS   |

CI uses `SENTINEL_BENCH_SLACK` (default 8) so only egregious regressions fail on shared runners; raw medians are far under design P99.

## Architecture compliance

- No architecture change
- Engine remains pure
- Budgets match Ownership Matrix §3

## Requirements covered

NFR-PERF-_, NFR-MEM-_, NFR-SIZE-001 (CRX), PART_23 L01/L03/L09/L13/M01/S01 (text path subset)

## Risks closed

- “Bench gate is constant-smoke only” — **CLOSED** (empirical G0)

## Remaining risks

| ID                            | Note                                                             |
| ----------------------------- | ---------------------------------------------------------------- |
| KI-001                        | No git commits                                                   |
| KI-002                        | OCR WASM — OCR P99 not measurable yet                            |
| Device P99                    | Not measured on reference Chromebook/Windows laptop lab hardware |
| Overlay/popup paint (L14/L15) | Deferred Phase 6/7 browser                                       |

## Self-review

| Role                  | Verdict                                                 |
| --------------------- | ------------------------------------------------------- |
| Principal Performance | Accepted — medians ≪ design; slack documented           |
| Principal QA          | Rejected engine→core import; fixed                      |
| Principal Architect   | Freeze constants unchanged                              |
| Principal Security    | No new attack surface                                   |
| Principal Browser     | SW timing is mocked; real Chromium cold start → Phase 6 |

## Go / No-Go

### **GO for Phase 5** — Performance & Memory **PASS**

Production still **NOT READY** (Phases 6–10 + KI-001/002).

## STOP

Awaiting approval before **Phase 6 — Browser Compatibility**.
