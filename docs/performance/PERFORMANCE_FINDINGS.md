# PERFORMANCE_FINDINGS.md

**Document ID:** SS-AUDIT-PERF-001  
**Date:** 2026-07-12  
**Budgets reference:** SS-OWN-001 §3 / PART_23

---

## Findings

### PERF-001 — No empirical cold-start measurement

- **ID:** PERF-001
- **Severity:** Medium
- **Category:** Cold start
- **Affected Files:** `background.ts` (PerformanceMonitor sample only)
- **Evidence:** No CI benchmark of SW cold start vs `SW_COLD_START_MS=500`
- **Root Cause:** Budget constants checked; runtime not measured
- **Impact:** Cannot certify PART_23 G0 empirical gate
- **Likelihood:** High (unknown)
- **Recommendation:** Add micro-bench in CI for bootstrap path
- **Effort:** M
- **Priority:** P2

### PERF-002 — Detection runs on Service Worker main thread

- **ID:** PERF-002
- **Severity:** Medium
- **Category:** CPU hotspot
- **Affected Files:** `handlers.ts` INTERCEPT_EVENT → `scanText`
- **Evidence:** Tier-1 regex/entropy synchronous on SW
- **Root Cause:** Coordinator does detection inline (OK for Tier-1 text size; risk for large pastes)
- **Impact:** SW jank / termination risk on large clipboard text
- **Likelihood:** Medium
- **Recommendation:** Enforce byte cap before scan; consider offscreen for large jobs
- **Effort:** M
- **Priority:** P1

### PERF-003 — Entropy detector scans all long tokens

- **ID:** PERF-003
- **Severity:** Low–Medium
- **Category:** Algorithmic cost
- **Affected Files:** `detectors/entropy.ts`
- **Evidence:** Global token regex ≥20 chars + Shannon per token
- **Impact:** O(n) with higher constant on dense random-looking text
- **Likelihood:** Medium
- **Recommendation:** Cap tokens inspected per scan; early exit on CRITICAL
- **Effort:** S
- **Priority:** P2

### PERF-004 — Bundle size unknown / unoptimized

- **ID:** PERF-004
- **Severity:** High (blocked by missing bundle)
- **Category:** Bundle size
- **Affected Files:** extension build
- **Evidence:** No Vite; no CRX size gate vs `CRX_MAX_MB=25`
- **Impact:** Cannot measure tree-shaking or CRX budget
- **Likelihood:** Certain until bundler exists
- **Recommendation:** Bundle + `tools/bundle-size` gate (PART_28)
- **Effort:** M
- **Priority:** P0

### PERF-005 — MemoryMonitor depends on non-standard `performance.memory`

- **ID:** PERF-005
- **Severity:** Low
- **Category:** Memory footprint
- **Affected Files:** `core/src/perf/index.ts`
- **Evidence:** Returns null when API absent → `withinBudget` true
- **Impact:** False confidence on memory ceiling in browsers without heap API
- **Likelihood:** High (Chromium SW may lack it)
- **Recommendation:** Alternative budgeting (payload accounting)
- **Effort:** M
- **Priority:** P2

### PERF-006 — Offscreen idle close configured; workers stubbed

- **ID:** PERF-006
- **Severity:** Low
- **Category:** Background activity
- **Affected Files:** `offscreen/manager.ts`, `worker-pool.ts`
- **Evidence:** 60s idle close; stub pool holds Map entries
- **Impact:** Minimal today; real WASM will need memory accounting
- **Recommendation:** Revisit when WASM lands
- **Effort:** M
- **Priority:** P3

### PERF-007 — Streaming helpers unused by scan path

- **ID:** PERF-007
- **Severity:** Low
- **Category:** Dead capability
- **Affected Files:** `core/src/streaming/*`
- **Evidence:** Not wired into INTERCEPT_EVENT
- **Impact:** YAGNI surface until large-file path
- **Recommendation:** Wire or quarantine
- **Effort:** S
- **Priority:** P3

### PERF-008 — Positive: rate limits match freeze

- **ID:** PERF-008
- **Severity:** Info
- **Category:** Control plane
- **Evidence:** IPC 30/min, scans 20/min constants + SlidingWindowRateLimiter
- **Recommendation:** Keep; add tests for scan limiter in router path

---

## Performance Verdict

Contracts exist; **measurement and packaging gates do not**. Not performance-certified.
