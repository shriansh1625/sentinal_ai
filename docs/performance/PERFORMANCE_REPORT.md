# Performance Report — Implementation RC

**Date:** 2026-07-12

| Budget        | Contract                           | Status                   |
| ------------- | ---------------------------------- | ------------------------ |
| Peak RAM      | ≤256MB                             | Constant + MemoryMonitor |
| Text scan     | ≤1 MiB (`MAX_TEXT_SCAN_BYTES`)     | Enforced CS + SW         |
| IPC rate      | 30 msg/min/tab                     | Sliding window           |
| Scan rate     | 20/min/tab                         | Sliding window           |
| SW cold start | ≤500ms design                      | Bootstrap timed          |
| Overlay       | <50ms create / <100ms paint design | Closed shadow inject     |

**Verdict:** Design budgets satisfied for Engineering RC. Empirical OCR P99 deferred until WASM vendored.
