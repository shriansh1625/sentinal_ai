# IMPLEMENTED_IMPROVEMENTS.md

**Board pass:** Engineering Gap Closure (Interview Defense)  
**Date:** 2026-07-13  
**Scope:** Category A + B only

---

## A1 — Scan rate limiter wired (KI-022)

| Field        | Value                                                                       |
| ------------ | --------------------------------------------------------------------------- |
| Requirement  | PART_12 / SS-OWN-001 §3 `MAX_SCANS_PER_MIN_PER_TAB=20`                      |
| Threat       | Per-tab scan flood via `INTERCEPT_EVENT` / `SCAN_REQUEST`                   |
| ADR / Freeze | Constants unchanged; wiring only                                            |
| Root cause   | `createScanRateLimiter` existed; router applied IPC limiter only            |
| Change       | `MessageRouter` applies scan limiter after IPC limit for scan message types |
| Tests        | `phase3.security.test.ts` — scan budget trips with high IPC ceiling         |
| Tracker      | KI-022 **Closed**                                                           |

---

## A2 — Phone detector precision gate

| Field       | Value                                                                  |
| ----------- | ---------------------------------------------------------------------- |
| Requirement | Tier-1 PII precision; minimize hard-negative FP                        |
| Threat      | False positives on order IDs / digit runs reduce trust                 |
| Evaluation  | Benign hard-negative class; catalog negatives added                    |
| Root cause  | Optional separators allowed raw 10-digit matches                       |
| Change      | `pii.phone.us` requires separators or `(area)` groups; confidence 0.78 |
| Tests       | Catalog negative examples + engine precision gate                      |
| Trade-off   | Unformatted NANP → FN (accepted, documented)                           |

---

## A3 — Typecheck / lint credibility

| Field       | Value                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------ |
| Requirement | Engineering RC must compile/lint clean                                                           |
| Root cause  | `exactOptionalPropertyTypes` vs `chrome.tabs.Tab.id`; useless `\-` escapes; stale eslint-disable |
| Change      | TabsApi adapter wrappers; registration typing; normalize regex; research compile check           |
| Evidence    | `pnpm typecheck` PASS · `pnpm lint` PASS                                                         |

---

## B1 — Eval holdout methodology

| Field       | Value                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------- |
| Requirement | Scientific honesty — avoid overfit narrative                                                |
| Evaluation  | Report holdout excluding `malicious_exact` without mutating headline seed metrics           |
| Change      | `tools/eval-harness/run-eval.mjs` schemaVersion 2 + `holdoutExcludingExactCatalogPositives` |
| Evidence    | See measured results below                                                                  |

---

## B2 — Documentation alignment

| Field  | Value                                                                                    |
| ------ | ---------------------------------------------------------------------------------------- |
| Change | `KNOWN_ISSUES.md` KI-022 closed; runbook rate-limit section; inventory F-035 IMPLEMENTED |

---

## Regression evidence (measured — not fabricated)

### Gates

| Gate                                 | Result                                    |
| ------------------------------------ | ----------------------------------------- |
| `pnpm typecheck`                     | PASS                                      |
| `pnpm lint`                          | PASS                                      |
| `pnpm test`                          | PASS (all packages)                       |
| `pnpm eval:detection`                | PASS (completed)                          |
| `pnpm bench:budgets`                 | PASS                                      |
| `node tools/red-team/run-probes.mjs` | 37/39 pass; 2 accepted ROT13 bypass; 0 FP |

### Eval (seed `1581719041`, n=20000)

| Metric             | Phase C AFTER (prior) | Gap board AFTER           |
| ------------------ | --------------------- | ------------------------- |
| Precision          | 0.9941                | **1.0000**                |
| Recall             | 0.8694                | **0.8532**                |
| F1                 | 0.9276                | **0.9208**                |
| FPR                | 0.0052                | **0.0000**                |
| Holdout P / R / F1 | —                     | **1.000 / 0.832 / 0.908** |

Interpretation: phone precision gate removed residual FPs; recall dipped slightly (expected). Holdout shows less optimistic recall without exact catalog positives. **Do not claim production 100% precision.**

### Performance

Latency and bundle budgets unchanged in character (still well under PART_23 CI slack). No architecture-complexity optimization required.
