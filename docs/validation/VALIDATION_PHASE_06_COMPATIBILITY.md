# Independent Product Validation Lab — Phase 6

## Browser / Host Compatibility Evidence

| Field                | Value                                                                |
| -------------------- | -------------------------------------------------------------------- |
| Product              | Sentinel Shield AI                                                   |
| Lab role             | Independent verification (break / prove)                             |
| Phase                | **6 of 8 — Browser / host compatibility**                            |
| Extension under test | `0.2.1`                                                              |
| Lab date             | 2026-07-13                                                           |
| Prior phase          | `VALIDATION_PHASE_05_PRIVACY.md` (approved)                          |
| Next phase           | **Paused — awaiting human approval for Phase 7 (a11y / CWS claims)** |

---

## 1. Lab posture

Rules observed:

- No new product features / redesign
- Validation-only probes allowed
- Fix only **proven** defects (none this phase)
- Pause before Phase 7

---

## 2. Compatibility surface under test

| Area      | Contract                                                      |
| --------- | ------------------------------------------------------------- |
| Browser   | Chromium MV3, `minimum_chrome_version` **120**                |
| Hosts     | ADR-035 AI platforms only (9); optional host permissions      |
| Injection | Dynamic content scripts only (no static `content_scripts`)    |
| Packaging | Classic IIFE `content.js`; module SW `background.js`          |
| WAR       | Origin-only `/*` matches derived from host permissions        |
| Live G3   | Host-page paste/upload CDP sign-off — **still open** (KI-006) |

---

## 3. Suite matrix × execution

| Suite ID | Focus                                                | Coverage                   | Result                     |
| -------- | ---------------------------------------------------- | -------------------------- | -------------------------- |
| SC-01    | Manifest MV3 / Chrome 120 / module SW                | A — phase6                 | **PASS**                   |
| SC-02    | Optional hosts = `AI_HOST_PERMISSIONS`               | A — phase6 + Lab P6        | **PASS**                   |
| SC-03    | WAR origin-only (no path WAR)                        | A — phase6 + shared-types  | **PASS**                   |
| SC-04    | No static content_scripts                            | A — phase6 + Lab P6 dist   | **PASS**                   |
| SC-05    | Nine platforms; no mail/Drive/Slack                  | A — Lab P6                 | **PASS**                   |
| SC-06    | Platform patterns ⊆ host permissions + stable CS ids | A — Lab P6                 | **PASS**                   |
| SC-07    | Dist IIFE content.js (no ES imports)                 | A — Lab P6 + verify-bundle | **PASS**                   |
| SC-08    | Composer heuristics (ChatGPT / ProseMirror)          | A — Lab P6                 | **PASS**                   |
| SC-09    | Playwright package-shape e2e                         | A — `harness.spec`         | **PASS**                   |
| SC-10    | Chromium `--load-extension` SW observe               | A — e2e harness            | **PASS** (this lab host)   |
| SC-11    | Beta local fixture + screenshot smoke                | A — e2e beta specs         | **PASS**                   |
| SC-12    | Live multi-host paste/upload G3                      | M / blocked                | **NOT CERTIFIED** (KI-006) |

**Lab-focused file:** `packages/extension/src/validation.phase6.compat.test.ts` (5 tests) — all green.

---

## 4. Commands / counts

| Gate                            | Result                              |
| ------------------------------- | ----------------------------------- |
| Extension build                 | **PASS**                            |
| phase6 + Lab P6 + related unit  | **35/35 PASS** (4 files)            |
| shared-types WAR/host constants | **5/5 PASS**                        |
| `verify:bundle`                 | **ok**                              |
| `pnpm test:e2e`                 | **4/4 PASS** (incl. SW start ~3.7s) |

---

## 5. G3 / residual honesty

| Item                   | Lab note                                                                                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `G3_e2e`               | Remains **`FAIL_PUBLIC_CONDITIONAL_ENG`** — package/fixture gates green; **live host-page sign-off absent** (KI-006)                               |
| KI-014                 | Documented as unreliable SW observe in some CI/headless setups; **this lab run observed SW successfully** — residual stands for other environments |
| KI-004                 | WAR subset issue remains **Closed** (origin projection verified)                                                                                   |
| Firefox / non-Chromium | Out of v1 freeze — N/A                                                                                                                             |

Manual prior evidence (ChatGPT paste overlay) is **operational beta signal**, not a substitute for recorded multi-host G3 certification.

---

## 6. Defects found

None proven. No code or tracker changes required.

---

## 7. Phase 6 verdict

MV3 packaging, ADR-035 host/WAR alignment, dynamic CS model, and Chromium load-unpacked package shape are **proven** on this lab host (including SW observation). **Public G3 remains blocked** until live host-page CDP / recorded sign-off closes KI-006.

---

## 8. STOP — Phase 6 complete

**Paused for human approval.**

Reply **approve** to proceed to **Phase 7 (a11y / CWS claims evidence)**.

No Phase 7 work will start until you approve.
