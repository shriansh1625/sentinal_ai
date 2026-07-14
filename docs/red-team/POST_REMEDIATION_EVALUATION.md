# POST_REMEDIATION_EVALUATION.md

## Measured BEFORE vs AFTER (same harness, same seed)

Harness: `tools/eval-harness/run-eval.mjs`  
Seed: `1581719041`  
n: 20,000 (10k benign + 10k malicious)

### BEFORE (Phase B — recorded in `ENGINEERING_EXCELLENCE_PHASE_B_EVALUATION.md`)

| Metric                     | Value                 |
| -------------------------- | --------------------- |
| Precision                  | 0.9022                |
| Recall                     | 0.8388                |
| F1                         | 0.8694                |
| FPR                        | 0.0909                |
| FNR                        | 0.1612                |
| ROC-AUC                    | 0.9090                |
| P50 / P95 / P99 ms         | 0.075 / 0.258 / 0.460 |
| `benign_hard_negative` FPR | **0.303**             |
| `malicious_spaced` recall  | **0.000**             |
| `malicious_rot13` recall   | **0.710**             |

### AFTER (Phase C remediations — regenerated 2026-07-13)

| Metric                     | Value                     | Δ                        |
| -------------------------- | ------------------------- | ------------------------ |
| Precision                  | **0.9941**                | +0.0919                  |
| Recall                     | **0.8694**                | +0.0306                  |
| F1                         | **0.9276**                | +0.0582                  |
| FPR                        | **0.0052**                | −0.0857                  |
| FNR                        | **0.1306**                | −0.0306                  |
| ROC-AUC                    | **0.9342**                | +0.0252                  |
| P50 / P95 / P99 ms         | **0.073 / 0.207 / 0.373** | ≈ flat / slightly better |
| `benign_hard_negative` FPR | **0.0173**                | −0.2857                  |
| `malicious_spaced` recall  | **0.7032**                | +0.7032                  |
| `malicious_rot13` recall   | **0.2592**                | −0.4512                  |

Phase B headline numbers are **not deleted**; they remain the pre-remediation baseline.

---

## Why metrics changed

1. **FPR drop:** Entropy no longer treats pure alnum / assignment `=` tokens as secrets; AWS-40 requires `/+=`. Hard-negative FPs collapsed.
2. **Spaced recall up:** Preprocess collapses space/tab-chunked identifiers and joins broken alnum lines — closes the Phase B spaced total-miss.
3. **ROT13 recall down:** Expected side-effect of killing entropy FP on opaque transformed strings; ROT13 accepted as residual bypass.
4. **Overall recall up modestly:** Spaced/HTML/hex wins outweigh ROT13 losses on this synthetic mix.
5. **Latency:** Remains well within PART_23 CI slack; no budget failure.

---

## Honesty constraints

- Still synthetic. Not production traffic.
- `malicious_exact/*` remain in-distribution optimistic.
- Do not market “99% precision” as CWS claim language without production sampling.
