# Technical Debt Report — Implementation RC

**Date:** 2026-07-12

| ID            | Item                                     | Severity   | Disposition                      |
| ------------- | ---------------------------------------- | ---------- | -------------------------------- |
| TD-OCR        | Tesseract/PDF WASM not vendored          | P1 pre-CWS | Fail-closed; pins file ready     |
| TD-E2E-LIVE   | No live Chromium extension CDP e2e       | P2         | Package e2e covers load shape    |
| TD-ICONS      | Generated geometric icons                | P3         | Acceptable for RC                |
| TD-PART28     | Extra `core`/`browser-adapters` packages | P3         | Documented drift; freeze allows  |
| TD-POPUP-VIEW | Legacy `popup-view.ts` string shell      | P3         | Lit popup is SoT; keep for tests |

No post-v1 features opened.
