# FEATURE_COVERAGE_REPORT.md

| Metric                                                  | Value                                                   |
| ------------------------------------------------------- | ------------------------------------------------------- |
| Features inventoried                                    | 56 catalog units (see FEATURE_INVENTORY)                |
| VERIFIED (automated evidence)                           | ~38                                                     |
| PARTIALLY VERIFIED                                      | ~10 (OCR stub, file binary, scan limiter, etc.)         |
| PLATFORM LIMITED / OUT OF SCOPE                         | Clipboard API, Firefox, NER/CV, Aadhaar entity          |
| FAILED (blocking public)                                | G3 live E2E, KI-001, KI-018                             |
| Estimated automated coverage of implemented eng surface | **~78%**                                                |
| Estimated coverage of freeze “guaranteed” claims        | **~85%** (paste text path strong; OCR/file binary weak) |

Primary gap classes: live host E2E, OCR WASM, regional gov-ID entities.
