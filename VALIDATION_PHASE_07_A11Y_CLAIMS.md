# Independent Product Validation Lab — Phase 7

## A11y / CWS Claims Evidence

| Field                | Value                                                                |
| -------------------- | -------------------------------------------------------------------- |
| Product              | Sentinel Shield AI                                                   |
| Lab role             | Independent verification (break / prove)                             |
| Phase                | **7 of 8 — A11y / CWS claims**                                       |
| Extension under test | `0.2.1`                                                              |
| Lab date             | 2026-07-13                                                           |
| Prior phase          | `VALIDATION_PHASE_06_COMPATIBILITY.md` (approved)                    |
| Next phase           | **Paused — awaiting human approval for Phase 8 (final lab verdict)** |

---

## 1. Lab posture

Rules observed:

- No new product features / redesign
- Validation-only probes allowed
- Fix only **proven** defects (none this phase)
- Pause before Phase 8

---

## 2. Claims & a11y surface under test

| Area                    | Contract                                                                          |
| ----------------------- | --------------------------------------------------------------------------------- |
| G4 Claims               | Listing matches Ownership Matrix honesty; no absolute leak-prevention marketing   |
| WCAG 2.1 AA (v1 subset) | Overlay / popup / options — no serious/critical axe; dialog/focus/Escape patterns |
| i18n                    | EN `_locales`; description ≤132 chars; action strings resolve                     |
| Store assets            | Engineering screenshots exist; promo quality soft residual (KI-017)               |

---

## 3. Suite matrix × execution

| Suite ID | Focus                                                | Coverage               | Result                     |
| -------- | ---------------------------------------------------- | ---------------------- | -------------------------- |
| SA-01    | Overlay dialog ARIA / live region / Escape→block     | A — phase7             | **PASS**                   |
| SA-02    | Focus restore + closed shadow                        | A — phase7             | **PASS**                   |
| SA-03    | BLOCK-only actions; Lit focus/reduced-motion markers | A — phase7             | **PASS**                   |
| SA-04    | axe overlay (WCAG 2.1 A/AA)                          | A — phase9             | **PASS**                   |
| SA-05    | axe popup                                            | A — phase9             | **PASS**                   |
| SA-06    | axe options                                          | A — phase9 + Lab P7    | **PASS**                   |
| SA-07    | Listing forbidden absolute claims                    | A — phase8 + Lab P7    | **PASS**                   |
| SA-08    | Disclosure / permissions / i18n CWS readiness        | A — phase8             | **PASS**                   |
| SA-09    | G4 PASS without CWS authorize                        | A — Lab P7 + cert JSON | **PASS**                   |
| SA-10    | REDACT overlay a11y variant                          | A — Lab P7             | **PASS**                   |
| SA-11    | Engineering PNG fixtures (popup/options)             | A — phase9 + Lab P7    | **PASS**                   |
| SA-12    | Human promo screenshot quality                       | Soft residual          | **KI-017 open** (accepted) |

**Lab-focused file:** `packages/extension/src/validation.phase7.claims.test.ts` (6 tests) — all green.

---

## 4. Commands / counts

| Gate                              | Result                                        |
| --------------------------------- | --------------------------------------------- |
| phase7 + phase8 + phase9 + Lab P7 | **29/29 PASS** (4 files)                      |
| Assets observed                   | `popup-en.png`, `options-en.png`, `README.md` |

---

## 5. G4 / residual honesty

| Item                   | Lab note                                                            |
| ---------------------- | ------------------------------------------------------------------- |
| `G4_claims`            | **PASS** — listing language matches eng honesty gates               |
| `authorizesCwsPublish` | Still **false** (public NO-GO via G3/KI-006/KI-018, not G4 failure) |
| KI-016                 | Closed — axe automation present and green                           |
| KI-017                 | Soft residual — engineering PNGs exist; human promo still preferred |
| KI-007                 | Overlay test seams remain documented info residual                  |

---

## 6. Defects found

None proven. No code or tracker changes required.

---

## 7. Phase 7 verdict

A11y v1 surfaces and CWS **claims honesty** are **proven** for Engineering RC. G4 remains **PASS**. Public store publish is still correctly unauthorized for unrelated blockers (G3, KI-018).

---

## 8. STOP — Phase 7 complete

**Paused for human approval.**

Reply **approve** to proceed to **Phase 8 (final independent lab verdict / rollup)**.

No Phase 8 work will start until you approve.
