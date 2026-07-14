# ENGINEERING_DECISION_MATRIX.md

**Board date:** 2026-07-13  
**Policy:** Implement **A** and **B** only. Never C/D. Never redesign architecture.

---

## Legend

| Cat | Meaning                                       | Implement now?      |
| --- | --------------------------------------------- | ------------------- |
| A   | Critical — must fix before interview          | Yes                 |
| B   | High value — before public beta / credibility | Yes (eng) / process |
| C   | Medium — future enhancement                   | No                  |
| D   | Out of scope                                  | No                  |

---

## Decisions

| Gap                          | Category       | Decision             | Why                                                                       | Requirement / Threat / ADR / Eval / Root cause                                                                  |
| ---------------------------- | -------------- | -------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Wire scan rate limiter       | **A**          | **Implement**        | Claimed PART_12 control unused — indefensible in interview                | Req: SS-OWN-001 §3 `MAX_SCANS_PER_MIN_PER_TAB`; Threat: scan DoS; ADR: Freeze constants unchanged; Root: KI-022 |
| Tighten US phone regex       | **A**          | **Implement**        | Contiguous digits → FP; precision > recall                                | Threat: alert fatigue / credibility; Eval: hard-negative class; Root: optional separators                       |
| Restore typecheck/lint green | **A**          | **Implement**        | Cannot claim engineering rigor with red CI                                | Root: TabsApi EOPT + eslint escapes                                                                             |
| Eval holdout (−exact)        | **B**          | **Implement**        | Methodology honesty without metric gaming                                 | Eval: overfitting risk; does not alter seed headline contract                                                   |
| Manual validation matrix     | **B**          | **Document**         | Close scenario coverage gaps without new features                         | QA credibility                                                                                                  |
| OCR default ON honesty       | **B**          | **Document keep**    | Flipping constant needs Freeze amendment; fail-closed is correct behavior | ADR Ownership Matrix `OCR_DEFAULT_ENABLED=true`; Threat: visual smuggle → HOLD                                  |
| ROT13 decode                 | **C / Keep**   | **Defer / document** | FP risk of universal ROT13                                                | Red team accepted; BYPASS_DATABASE                                                                              |
| Live G3 CDP sign-off         | **B process**  | **External**         | Human host evidence — not code                                            | KI-006 / G3                                                                                                     |
| Privacy policy URL           | **D eng**      | **Counsel**          | Not an engineering deliverable                                            | KI-018                                                                                                          |
| Vendor OCR WASM              | **C**          | **Defer v2**         | Large asset/integrity program                                             | KI-002 / TD-005                                                                                                 |
| Typing interception          | **D**          | **Reject**           | Explicit Freeze exclusion                                                 | Architecture Freeze                                                                                             |
| Enterprise backend           | **D**          | **Reject claims**    | Stub package                                                              | No evidence                                                                                                     |
| Homoglyph expansion          | **D / Keep**   | **Accept**           | Subset table                                                              | KI-010                                                                                                          |
| Aggressive chunk reassembly  | **C**          | **Defer**            | Prose FP risk                                                             | Residual beyond Phase C                                                                                         |
| Detector count growth        | **D**          | **Reject**           | Optimizes vanity metric                                                   | Board policy                                                                                                    |
| Flip OCR default false       | **D (Freeze)** | **Reject now**       | Ownership Matrix lock without ADR                                         | Would violate Freeze without amendment                                                                          |

---

## Residual risk register (accepted)

| Risk                    | Keep / Fix / Defer  | Engineering reasoning                       |
| ----------------------- | ------------------- | ------------------------------------------- |
| ROT13 secrets           | Keep                | Encoding not in v1 threat closure; disclose |
| Unformatted phone       | Keep (post A)       | Precision gate intentional FN               |
| OCR images              | Keep fail-closed    | No WASM → HOLD                              |
| Iframe / allFrames      | Keep                | Browser CS model                            |
| User Allow override     | Keep                | Explicit user residual                      |
| Synthetic eval optimism | Mitigated (holdout) | Still synthetic — disclose                  |
| Live host variance      | Defer process       | KI-006                                      |
| Deep nested encode      | Keep depth bound    | DoS / complexity bound                      |

---

## Implementation gate checklist

After each A/B change:

- [x] Typecheck
- [x] Lint
- [x] Unit / package tests
- [x] Eval harness (seed preserved)
- [x] Performance budgets
- [x] Red-team probes (ROT13 residual only)
- [ ] Full Playwright e2e on live hosts — **blocked KI-006** (process)
