# REGRESSION_REPORT.md

## Phase C post-fix regression

| Gate                                                   | Result                                             |
| ------------------------------------------------------ | -------------------------------------------------- |
| `pnpm --filter @sentinel-shield/detection-engine test` | **49/49 PASS** (includes `redteam.phasec.test.ts`) |
| `pnpm --filter @sentinel-shield/extension test`        | **139/139 PASS**                                   |
| `pnpm purity`                                          | **ok** (31 files)                                  |
| `pnpm bench:budgets`                                   | **PASS** (100KB median ~11.6ms)                    |
| Red-team probes                                        | **37 PASS / 2 accepted bypass (ROT13) / 0 FP**     |
| Eval harness                                           | Regenerated — see `POST_REMEDIATION_EVALUATION.md` |

### Code touched (minimal)

- `preprocess/normalize.ts` — space/tab collapse, newline join, HTML entities
- `preprocess/hex.ts` — hex decode+rescan
- `tier1.ts` — wire hex spans
- `detectors/entropy.ts` — FP harden
- `research/catalog/cloud.ts` — AWS-40 requires `/+=`
- `redteam.phasec.test.ts` — regressions

No architecture freeze amendments. No new product features.
