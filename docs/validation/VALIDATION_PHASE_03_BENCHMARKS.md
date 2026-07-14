# Independent Product Validation Lab — Phase 3

## Benchmarks / Performance Evidence

| Field                | Value                                                                |
| -------------------- | -------------------------------------------------------------------- |
| Product              | Sentinel Shield AI                                                   |
| Lab role             | Independent verification (break / prove)                             |
| Phase                | **3 of 8 — Benchmarks & performance evidence**                       |
| Extension under test | `0.2.1`                                                              |
| Lab date             | 2026-07-13                                                           |
| Host (this run)      | Windows 10.0.26200 (lab machine; not PART_23 reference i5-1235U)     |
| Prior phase          | `VALIDATION_PHASE_02_TEST_SUITES.md` (approved)                      |
| Next phase           | **Paused — awaiting human approval for Phase 4 (security evidence)** |

---

## 1. Lab posture

Rules observed:

- No new features / redesign
- Fix only **proven** defects (none found this phase)
- Re-run existing PART_23 / Phase 5 / ISVV budget gates; record numbers
- Pause before Phase 4

---

## 2. Budget contract under test (canonical)

| Constant / gate               | Contract                             | Source                                        |
| ----------------------------- | ------------------------------------ | --------------------------------------------- |
| `EXT_PEAK_MEM_MB`             | 256                                  | shared-types                                  |
| `EXT_IDLE_MEM_MB`             | 50                                   | shared-types                                  |
| `MAX_SCANS_PER_MIN_PER_TAB`   | 20                                   | shared-types                                  |
| `MAX_IPC_MSG_PER_MIN_PER_TAB` | 30                                   | shared-types                                  |
| `SW_COLD_START_MS`            | 500 (design)                         | shared-types                                  |
| `CRX_MAX_MB`                  | 25                                   | shared-types                                  |
| `MAX_TEXT_SCAN_BYTES`         | 1_048_576                            | shared-types                                  |
| CI latency slack              | ×8 (`SENTINEL_BENCH_SLACK`, default) | `tools/benchmarks/check-budgets.mjs` / KI-013 |

Design P99 targets (PART_23 text path shipped in v1): 1KB ≤10ms design · 10KB ≤300ms · 100KB empirical base 800ms (gate uses design×slack).

---

## 3. Gates executed

| Gate                        | Command / suite                                     | Result                |
| --------------------------- | --------------------------------------------------- | --------------------- |
| PART_23 empirical budget    | `pnpm bench:budgets` (×2 runs)                      | **PASS** both         |
| Detection perf smoke        | `detection-engine` performance + full package tests | **PASS** (29/29)      |
| Mocked SW bootstrap timing  | `phase5.performance.test.ts`                        | **PASS**              |
| Oversize fail-closed timing | Lab probe + ISVV                                    | **PASS** (~1ms BLOCK) |
| Extension rebuild           | `vite build`                                        | **PASS**              |

No product code changes in this phase.

---

## 4. Measured latency (lab machine)

### 4.1 `pnpm bench:budgets` — Run A

| Metric     | Median      | Design | Gate limit (×8) | Verdict |
| ---------- | ----------- | ------ | --------------- | ------- |
| full_1kb   | **0.10 ms** | 10 ms  | 80 ms           | PASS    |
| full_10kb  | **1.02 ms** | 300 ms | 2400 ms         | PASS    |
| full_100kb | **7.93 ms** | 800 ms | 6400 ms         | PASS    |

### 4.2 `pnpm bench:budgets` — Run B (repeatability)

| Metric     | Median       | Design | Gate limit (×8) | Verdict |
| ---------- | ------------ | ------ | --------------- | ------- |
| full_1kb   | **0.19 ms**  | 10 ms  | 80 ms           | PASS    |
| full_10kb  | **0.59 ms**  | 300 ms | 2400 ms         | PASS    |
| full_100kb | **11.34 ms** | 800 ms | 6400 ms         | PASS    |

**Lab note:** Medians are ≪ design budgets on this host. CI slack ×8 (KI-013) means the automated gate would only catch severe regressions — not device-lab P99 certification (KI-012).

### 4.3 DoS / oversize path

| Probe                                     | Result                                       |
| ----------------------------------------- | -------------------------------------------- |
| `scanText` with `MAX_TEXT_SCAN_BYTES + 1` | `PolicyAction.BLOCK`, **~1.07 ms** wall time |
| ISVV bound                                | elapsed &lt; 2000 ms                         | Covered by existing `isvv.stress.test.ts` |

---

## 5. Size / packaging

| Metric                                | Measured    | Limit            | Verdict |
| ------------------------------------- | ----------- | ---------------- | ------- |
| `packages/extension/dist` (with maps) | **0.38 MB** | &lt; 25 MB       | PASS    |
| Dist without `.map`                   | **0.13 MB** | &lt; 5 MB sanity | PASS    |
| Manifest version                      | `0.2.1`     | present          | PASS    |

Largest shipped scripts (vite gzip report): `background.js` ~13.4 KB gzip · `content.js` ~7.4 KB gzip · `popup.js` ~2.5 KB gzip.

---

## 6. What this phase does **not** certify

| Area                                  | Why                                                          | Tracker                       |
| ------------------------------------- | ------------------------------------------------------------ | ----------------------------- |
| Device-lab Chrome P99 / overlay paint | Not run on PART_23 reference hardware; no live paint harness | KI-012                        |
| Real SW cold-start in Chrome          | Phase 5 measures mocked handler wiring only                  | KI-012 / PERFORMANCE_FINDINGS |
| OCR / PDF / NER latency               | Stubs; not release-channel capabilities                      | KI-002                        |
| Peak RAM under soak                   | Constants + monitor exist; no 500-scan soak executed here    | PART_23 M06 residual          |
| Live host paste latency (G3)          | Public G3 still open                                         | KI-006                        |

Certification status remains **`G0_perf`: `PASS_WITH_FINDINGS`** — consistent with eng GO / public NO-GO.

---

## 7. Defects found

None proven. No code or tracker changes required for Phase 3.

---

## 8. Phase 3 verdict

Automated PART_23 budget gate **passes with large margin** on this lab host for Tier-1 text latency and package size. G0 remains **PASS WITH FINDINGS** because device-lab P99, real SW cold-start, and OCR P99 are still honest residuals — not because the CI gate failed.

---

## 9. STOP — Phase 3 complete

**Paused for human approval.**

Reply **approve** to proceed to **Phase 4 (security evidence)**.

No Phase 4 work will start until you approve.
