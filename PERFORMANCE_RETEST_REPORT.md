# PERFORMANCE_RETEST_REPORT.md

| Gate                                      | Result        |
| ----------------------------------------- | ------------- |
| PART_23 `bench:budgets`                   | PASS          |
| 1KB/10KB/100KB latency medians ≪ design×8 | PASS          |
| Dist ≪ 25MB                               | PASS (0.34MB) |
| Oversize scan returns <2s BLOCK           | PASS (ISVV)   |
| 100k token benign scan <5s                | PASS          |

**Residual:** KI-012 device-lab P99; OCR P99 N/A without WASM.
