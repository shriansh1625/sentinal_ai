# BROWSER_COMPATIBILITY_REPORT.md

| Check                                | Result               |
| ------------------------------------ | -------------------- |
| MV3 + Chrome ≥120                    | PASS                 |
| Module SW + dynamic CS               | PASS                 |
| CSP wasm-unsafe-eval, no unsafe-eval | PASS                 |
| WAR matches path exactly `/*`        | PASS (fixed)         |
| Load unpacked package shape          | PASS                 |
| `--load-extension` SW observe        | PASS (this ISVV run) |
| Firefox / non-Chromium               | OUT OF SCOPE         |

**Residual:** KI-006 live AI host page intercept not automated.
