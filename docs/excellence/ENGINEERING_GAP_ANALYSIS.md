# ENGINEERING_GAP_ANALYSIS.md

**Board:** Independent Engineering Review Board (Interview Defense)  
**Date:** 2026-07-13  
**Product:** Sentinel Shield AI `0.2.1`  
**Constraint:** Architecture Freeze v1.0 — no redesign, no feature expansion  
**Objective:** Identify high-impact engineering gaps that reduce interview / senior-security credibility

---

## Verdict (executive)

Architecture and Tier-1 text detection are **defensible for engineering RC / load-unpacked beta**. Public CWS remains **NO-GO** (G3/KI-006, KI-018). This review found a small set of **credibility gaps** (unused DoS control, phone FP class, eval optimism, typecheck/lint greenness). Category A/B remediations were implemented in this pass. Remaining work is documentation, external validation, and interview preparation — not more product surface.

---

## Method

Compared: Architecture Freeze + ADRs, source (`packages/*`), threat/bypass docs, detector catalog, eval harness, red-team probes, manual runbook scenarios, certification status, known issues, performance benches.

**Ignored:** cosmetics, detector-count inflation, nice-to-have features, architecture redesign proposals.

---

## Gap inventory

| ID     | Gap                                                                         | Evidence                                                               | Category        | Disposition                                                            |
| ------ | --------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------- |
| GAP-01 | `createScanRateLimiter` unused while PART_12 claims 20 scans/min/tab        | `VALIDATION_PHASE_01` F-035 STUB; router only used IPC limiter         | **A**           | **Fixed** — wired on `INTERCEPT_EVENT` / `SCAN_REQUEST`                |
| GAP-02 | US phone regex matched contiguous 10-digit runs (order IDs / hash suffixes) | Catalog `pii.phone.us`; hard-negative FP class                         | **A**           | **Fixed** — separators/parentheses required                            |
| GAP-03 | Typecheck / lint not green (TabsApi exactOptional; useless escapes)         | `pnpm typecheck` / `pnpm lint` failures                                | **A**           | **Fixed** — adapters + lint cleanup                                    |
| GAP-04 | Eval headline mixes in-distribution `malicious_exact` (optimistic)          | `run-eval.mjs` generator mode 0                                        | **B**           | **Fixed** — holdout metrics excluding exact catalog positives          |
| GAP-05 | Manual validation scenarios incomplete vs supported surfaces                | Runbook has many; no single matrix covering crash/offline/multi-window | **B**           | **Documented** — see `UPDATED_LIMITATIONS` + matrix in this board pack |
| GAP-06 | OCR flag default ON while WASM absent                                       | `OCR_DEFAULT_ENABLED=true`; fail-closed HOLD                           | **B→Keep**      | Document honesty; **do not flip constant** (Ownership Matrix / Freeze) |
| GAP-07 | ROT13 residual bypass                                                       | Red team 2/39 bypass; accepted                                         | **Keep / C**    | Keep as documented limitation                                          |
| GAP-08 | Live host G3 unsigned                                                       | KI-006                                                                 | **B (process)** | External manual sign-off — not code                                    |
| GAP-09 | Privacy policy URL pending                                                  | KI-018                                                                 | **D (eng)**     | Counsel — not engineering code                                         |
| GAP-10 | Typing interception absent                                                  | Freeze                                                                 | **D**           | Out of v1 by design                                                    |
| GAP-11 | Vendor OCR WASM / enable image detection                                    | KI-002                                                                 | **C**           | v2 / ADR — large complexity                                            |
| GAP-12 | Device-lab P99 / energy                                                     | KI-012                                                                 | **C**           | Lab residual                                                           |
| GAP-13 | Homoglyph / AST concat                                                      | KI-010 / KI-011                                                        | **D / Keep**    | Accepted residuals                                                     |
| GAP-14 | Unformatted NANP phone FN after GAP-02                                      | Expected FN class                                                      | **Keep**        | Precision > recall for phone                                           |
| GAP-15 | Enterprise / multi-tenant claims                                            | `enterprise-backend` stub                                              | **D**           | Do not claim                                                           |

---

## Detection engine quality (not quantity)

| Area              | Finding                                                         | Action                                     |
| ----------------- | --------------------------------------------------------------- | ------------------------------------------ |
| Regex sufficiency | Prefix/token detectors (AWS/GitHub/Stripe) remain appropriate   | Keep                                       |
| Checksums         | PAN Luhn + IBAN MOD-97 already applied                          | Keep                                       |
| Entropy           | Hardened in Phase C (len≥32, `/+`/`=`)                          | Keep                                       |
| Context           | Phone lacked separator context → FP                             | **Improved**                               |
| Confidence        | Phone raised slightly (0.75→0.78) after tighter pattern         | OK                                         |
| Weak detectors    | Contiguous-phone was the clear precision offender               | Tightened; **did not** mass-delete catalog |
| Trivial bypass    | ROT13, OCR images, chunked beyond preprocess                    | Documented residuals                       |
| Usefulness        | Catalog still research-backed; precision prioritized over count | Count unchanged intentionally              |

---

## Threat model residuals

| Residual                 | Decision                           | Reasoning                                            |
| ------------------------ | ---------------------------------- | ---------------------------------------------------- |
| ROT13                    | **Keep documented**                | Universal decode → FP risk; red-team documents ALLOW |
| Whitespace / NL chunking | **Fixed (Phase C)**                | Preprocess collapse/join                             |
| HTML entities / hex      | **Fixed (Phase C)**                | Decode+rescan                                        |
| Unicode ZWSP / bidi      | **Keep** (non-finding / mitigated) | Probes pass                                          |
| OCR / images             | **Keep fail-closed**               | No WASM; HOLD correct                                |
| Encoded secrets (deep)   | **Keep depth bound**               | MAX_DECODE_DEPTH                                     |
| Chunked beyond heuristic | **Defer v2**                       | More aggressive join → prose FP                      |
| Browser / iframe         | **Keep**                           | `allFrames: false` residual                          |
| User override Allow      | **Keep**                           | Product threat acceptance                            |

---

## Evaluation scientific credibility

| Question                | Answer                                              |
| ----------------------- | --------------------------------------------------- |
| Overfit?                | Partial — `malicious_exact` reuses catalog examples | Mitigated via **holdout** metrics |
| Balanced?               | 10k/10k by construction                             | Yes for synthetic                 |
| Independent validation? | Same generator family                               | Holdout + red-team separate       |
| Benign realistic?       | Partial (templates + hard negatives)                | Honest limitation                 |
| Adversarial sufficient? | Spaced/ROT13/ZWSP/b64 + red-team                    | Adequate for RC; not production   |
| Reproducible?           | Fixed seed `1581719041`                             | Yes                               |

**Post-gap measured (same seed, not fabricated):**  
Headline: P=1.000 R=0.853 F1=0.921 FPR=0.000  
Holdout (−exact): P=1.000 R=0.832 F1=0.908 FPR=0.000

Do **not** market as production precision.

---

## Performance

Empirical `pnpm bench:budgets` **PASS**. Scan p50≈0.07ms in Node harness. Dist ≪ 25MB. No complexity-increasing optimization justified.

---

## Interview defense hotspots (pre-fix → post-fix)

| Claim                      | Pre                    | Post                            |
| -------------------------- | ---------------------- | ------------------------------- |
| “We rate-limit scans”      | False (IPC only)       | True (KI-022 closed)            |
| “Phone detector is low-FP” | Contiguous 10-digit FP | Separator-gated                 |
| “Eval is scientific”       | Optimistic exact mix   | Holdout reported                |
| “Typecheck green”          | Failed                 | Pass                            |
| “OCR works”                | Misleading if claimed  | Must say fail-closed path armed |

---

## Absolute non-goals confirmed

No architecture redesign · No detector-count inflation · No fabricated metrics · No enterprise readiness claim · No CWS authorization.
