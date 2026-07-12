# REGRESSION_REPORT.md

**After ISVV fixes:** full `pnpm run ci` **PASS**; `pnpm test:e2e` **4 passed**.

| Suite                            | Result                           |
| -------------------------------- | -------------------------------- |
| shared-types                     | PASS                             |
| detection-engine (29 incl. ISVV) | PASS                             |
| core                             | PASS                             |
| browser-adapters                 | PASS                             |
| extension (89)                   | PASS                             |
| purity / depcruise / doc-lint    | PASS                             |
| bench:budgets                    | PASS                             |
| verify:bundle + certification    | PASS                             |
| Playwright e2e                   | PASS (incl. SW observe this run) |

**Regression risk of fixes:** Low — detectors additive; budget gate fail-closed only on oversize; WAR already origin-only.
