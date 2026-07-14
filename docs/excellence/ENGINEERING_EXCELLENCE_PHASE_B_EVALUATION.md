# Engineering Excellence — Phase B

## Scientific Evaluation Harness

| Field                | Value                                  |
| -------------------- | -------------------------------------- |
| Program              | Engineering Excellence                 |
| Phase                | **B — Independent evaluation harness** |
| Harness              | `tools/eval-harness/run-eval.mjs`      |
| Command              | `pnpm eval:detection`                  |
| Seed                 | `1581719041` (`0x5e471e01`)            |
| Run timestamp (UTC)  | `2026-07-13T06:39:10.845Z`             |
| Catalog under test   | **115** detectors                      |
| Architecture changes | **None**                               |

---

## 1. What was built

An **independent** Node harness that:

1. Generates seeded synthetic corpora (10k benign + 10k malicious by default)
2. Scores each sample with `createDetectionEngine().scanText`
3. Computes **measured** Precision, Recall, F1, FPR, FNR, Accuracy, Specificity, ROC-AUC
4. Records latency P50/P95/P99, throughput, RSS/heap
5. Emits machine artifacts under `tools/eval-harness/artifacts/` (gitignored; regenerate anytime)

Decision rule (explicit):

> `predicted_positive := action !== ALLOW`

No hand-authored accuracy numbers appear in this report except those copied from the measured JSON.

---

## 2. Dataset design (reproducible)

| Slice                                 | Label | Intent                                                                                                      |
| ------------------------------------- | ----- | ----------------------------------------------------------------------------------------------------------- |
| `benign_easy`                         | 0     | Prose / code / prompts / logs without secret shapes                                                         |
| `benign_hard_negative`                | 0     | UUIDs, git SHAs, sha256 hex, high-entropy 40-char tokens, short `sk-`, malformed `AKIA`, short base64 demos |
| `malicious_exact`                     | 1     | Catalog `positiveExamples` verbatim                                                                         |
| `malicious_embedded` / `env` / `json` | 1     | In-context pastes of catalog positives                                                                      |
| `malicious_zwsp`                      | 1     | Zero-width obfuscation (preprocess target)                                                                  |
| `malicious_base64`                    | 1     | Base64 wrappers (may trip entropy without decode)                                                           |
| `malicious_rot13`                     | 1     | ROT13 transform (adversarial)                                                                               |
| `malicious_spaced`                    | 1     | Character-spaced secrets (adversarial)                                                                      |

---

## 3. Measured overall results (n=20,000)

| Metric                  | Value                               |
| ----------------------- | ----------------------------------- |
| TP / FP / TN / FN       | **8388 / 909 / 9091 / 1612**        |
| Precision               | **0.9022** (90.22%)                 |
| Recall                  | **0.8388** (83.88%)                 |
| F1                      | **0.8694** (86.94%)                 |
| FPR                     | **0.0909** (9.09%)                  |
| FNR                     | **0.1612** (16.12%)                 |
| Accuracy                | **0.8740**                          |
| Specificity             | **0.9091**                          |
| ROC-AUC                 | **0.9090**                          |
| Latency P50 / P95 / P99 | **0.075 / 0.258 / 0.460 ms**        |
| Mean latency            | **0.110 ms**                        |
| Throughput              | **~8954 samples/s**                 |
| RSS / heapUsed          | **~82.3 / ~22.8 MB** (Node process) |

Source: regenerate with `pnpm eval:detection` → `tools/eval-harness/artifacts/last-report.json`.

---

## 4. Measured per-slice (critical reading)

| Slice                  | n    | Recall    | FPR       | Notes                                           |
| ---------------------- | ---- | --------- | --------- | ----------------------------------------------- |
| `benign_easy`          | 7000 | —         | **0.000** | Clean on easy negatives                         |
| `benign_hard_negative` | 3000 | —         | **0.303** | **909 FPs** — entropy / token heuristics        |
| `malicious_exact`      | 1250 | **1.000** | —         | In-distribution (expected)                      |
| `malicious_embedded`   | 1250 | **1.000** | —         | In-distribution                                 |
| `malicious_env`        | 1250 | **1.000** | —         | In-distribution                                 |
| `malicious_zwsp`       | 1250 | **1.000** | —         | Preprocess holds                                |
| `malicious_base64`     | 1250 | **1.000** | —         | Likely entropy-on-encoding, not proof of decode |
| `malicious_json`       | 1250 | **1.000** | —         | In-distribution                                 |
| `malicious_rot13`      | 1250 | **0.710** | —         | **362 FN**                                      |
| `malicious_spaced`     | 1250 | **0.000** | —         | **1250 FN** — total bypass for this transform   |

---

## 5. Self-review

**Credibility gained**

- Metrics are **computed**, not invented.
- Hard negatives expose a real **~30% FPR** on that slice (overall FPR 9.09% diluted by easy benign).
- Spaced obfuscation is a **complete miss** (recall 0) — documented, reproducible.
- Latency under catalog v115 remains sub-millisecond P99 on this host for these sample sizes.

**Credibility not claimed**

- These are **not** production traffic metrics.
- In-distribution malicious slices inflate overall recall.
- Base64 “success” is not certified as decode-aware detection.
- No GPU/OCR/PDF evaluation (stubs remain stubs).
- ROC scores are derived from risk/confidence, not calibrated probabilities.

---

## 6. Adversarial review (reject own work)

| Claim                                | Verdict                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| “F1 ≈ 87% proves enterprise quality” | **Rejected** — synthetic mixture; hard-negative FPR 30%; spaced bypass 100% FN |
| “First run P=R=1 was valid quality”  | **Rejected** — easy corpus artifact; harness was corrected                     |
| “Independent eval exists”            | **Holds** — separate tool, seeded, regenerable                                 |
| “Ready for CWS accuracy claims”      | **Rejected** — no production sample; public still NO-GO                        |

---

## 7. Gates

| Check                 | Result                                  |
| --------------------- | --------------------------------------- |
| `pnpm eval:detection` | **PASS** (completed; artifacts written) |
| Product architecture  | **Unchanged**                           |

(Full package test suite not required to validate the harness; engine build is a prerequisite of `eval:detection`.)

---

## 8. Phase B verdict

Phase B delivers a **real measurement instrument** and **non-inflated** headline metrics under a documented synthetic protocol. The important engineering signals are:

1. Easy negatives are clean.
2. Hard negatives are **not** (FPR ≈ 30% on that slice).
3. Spaced secret pastes are an **unmitigated bypass** in this eval.
4. ROT13 is partially effective as evasion (~29% FN on that slice).

---

## 9. STOP — Phase B complete

**Paused for human approval.**

Reply **approve** to proceed to **Phase C (adversarial security research — prove bypasses, document, fix only with evidence + regression tests)**.
