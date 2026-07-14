# INTERVIEW_READINESS_ASSESSMENT.md

**Audience:** Palo Alto Networks / Chrome Security–style principal interviewer  
**Date:** 2026-07-13  
**Candidate artifact:** Sentinel Shield AI engineering RC

---

## Overall

| Dimension              | Ready?               | Notes                                            |
| ---------------------- | -------------------- | ------------------------------------------------ |
| Architecture story     | **Yes**              | Freeze, MV3, local-first, fail-closed — coherent |
| Detection story        | **Yes with honesty** | Precision-focused; residuals named               |
| Threat model story     | **Yes**              | Accepted vs fixed residuals documented           |
| Eval story             | **Yes with caveats** | Synthetic + holdout; not production              |
| Production / CWS claim | **No — correctly**   | Must say NO-GO                                   |
| Enterprise claim       | **No**               | Do not claim                                     |

**Interview readiness:** **GO for engineering deep-dive** if candidate leads with limitations and evidence paths.  
**Not ready** to claim public production or OCR capability.

---

## Subsystem challenge table

| Subsystem                   | Would I believe?  | Defendable?          | Evidence                           | Min work if weak       |
| --------------------------- | ----------------- | -------------------- | ---------------------------------- | ---------------------- |
| MV3 SW + offscreen          | Yes               | Yes                  | Package tests, fail-closed OCR     | None for RC            |
| IPC auth                    | Yes               | Yes                  | Phase 3/4 security tests           | —                      |
| Rate limits                 | **Now yes**       | Yes                  | KI-022 wired + unit test           | Done (was A)           |
| Tier-1 regex + checksum     | Yes               | Yes                  | Luhn/IBAN; catalog tests           | —                      |
| Preprocess (space/hex/html) | Yes               | Yes                  | Red-team 37/39; regressions        | —                      |
| Entropy                     | Yes               | Yes                  | Phase C FP collapse                | —                      |
| Phone PII                   | **Improved**      | Yes                  | Negatives + eval FPR 0 (synthetic) | Done                   |
| Policy actions              | Yes               | Yes                  | Engine + overlay tests             | —                      |
| OCR                         | Only as HOLD      | Yes if phrased       | Worker unavailable string          | Do not claim OCR works |
| Eval harness                | Conditional       | Yes if holdout cited | Seed + artifacts                   | Done (B)               |
| Perf budgets                | Yes for CI        | Yes                  | `bench:budgets`                    | Device-lab = residual  |
| Privacy defaults            | Yes               | Yes                  | history/telemetry off              | Counsel URL separate   |
| Live host e2e               | **No for public** | Honest NO-GO         | KI-006                             | Manual sign-off        |

---

## Likely hard questions & answers

1. **“You said 115 detectors — so what?”**  
   Optimize precision, not count. Catalog is research metadata; runtime quality shown by eval FPR, red-team, and checksum gates.

2. **“Show me a bypass.”**  
   ROT13 AWS key → ALLOW. Documented. Fix rejected for v1 FP risk.

3. **“Does OCR work?”**  
   No. Flag arms the path; WASM absent → fail-closed HOLD. Default ON is Freeze/ownership; capability is not present.

4. **“Are your 99–100% precision numbers real?”**  
   Synthetic harness, fixed seed. Holdout excludes exact catalog positives. Not production traffic. Do not put on CWS listing.

5. **“How do you stop DoS?”**  
   Text byte cap + IPC 30/min + **scan 20/min** per tab + safe mode + decode depth.

6. **“Why should we trust architecture?”**  
   Freeze + ADRs + fail-closed defaults + pure detection package + measured benches — not feature breadth.

---

## Candidate prep checklist

- [ ] Memorize public blockers: G3, KI-006, KI-018
- [ ] Memorize accepted residuals: ROT13, OCR HOLD, unformatted phone FN
- [ ] Cite Phase B baseline vs Phase C vs Gap board metrics without conflating
- [ ] Demo load-unpacked paste on fixture host (not CWS)
- [ ] Do not say “enterprise ready” or “OCR detects PII in images”
