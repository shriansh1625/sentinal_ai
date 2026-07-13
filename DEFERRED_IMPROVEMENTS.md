# DEFERRED_IMPROVEMENTS.md

**Policy:** Category C and D — do **not** implement in this phase.

---

## Category C — Future enhancement

| Item                                                   | Why deferred                                                  | Trigger to revisit                           |
| ------------------------------------------------------ | ------------------------------------------------------------- | -------------------------------------------- |
| Vendor OCR/PDF WASM + integrity pins                   | Large asset program; integrity + worker pool; Freeze-adjacent | ADR + KI-002 closure plan                    |
| Device-lab P99 / energy / overlay paint                | Needs hardware lab (KI-012)                                   | Pre-public performance campaign              |
| Aggressive multi-line / multi-paste secret reassembly  | Prose FP risk                                                 | New red-team class with measured FPR         |
| ROT13 / weak-cipher normalization                      | Universal decode FP                                           | Narrow keyed detectors only if FP proven low |
| Broader international phone / Aadhaar / PAN-IN         | Needs entity ADR (KI-021)                                     | Market expansion ADR                         |
| Coverage thresholds / richer Playwright fixture matrix | Value but not interview blocker for eng RC                    | Public beta hardening                        |
| Calibrated probabilistic confidence model              | Research                                                      | Whitepaper / v2 detection science            |

---

## Category D — Out of scope (do not implement)

| Item                                                    | Why out of scope                   |
| ------------------------------------------------------- | ---------------------------------- |
| Typing / keystroke interception                         | Architecture Freeze exclusion      |
| Enterprise multi-tenant backend productization          | Stub only; no evidence for claims  |
| Inflating detector count                                | Vanity; harms precision narrative  |
| Flipping `OCR_DEFAULT_ENABLED` without Freeze amendment | Ownership Matrix lock              |
| CWS publish / marketing claims of production readiness  | Blocked by G3/KI-006/KI-018        |
| Fabricating or cherry-picking eval metrics              | Integrity violation                |
| Homoglyph full Unicode tables / AST concat              | Accepted v1 residuals (KI-010/011) |
| Video frame OCR, NER ON by default, telemetry ON        | Explicitly off / future phases     |

---

## Process items (not code)

| Item                                   | Owner         | Note                   |
| -------------------------------------- | ------------- | ---------------------- |
| Live ChatGPT/Claude/Gemini G3 sign-off | Human QA      | KI-006                 |
| Counsel privacy policy URL             | Counsel       | KI-018                 |
| Whitepaper + external peer review      | Research/docs | Next recommended phase |
