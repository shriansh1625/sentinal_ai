# RISK_REGISTER.md

**Updated:** 2026-07-12 (Phase 10)

| ID    | Risk                                    | Likelihood | Impact  | Mitigation                                       | Status                    |
| ----- | --------------------------------------- | ---------- | ------- | ------------------------------------------------ | ------------------------- |
| R-V01 | No git commits                          | Certain    | High    | Initial commit when approved                     | **OPEN** (public blocker) |
| R-V02 | OCR WASM absent                         | Certain    | Medium  | Fail-closed + listing; OCR not release-certified | **MITIGATED**             |
| R-V03 | Overclaim vs capabilities               | Low        | High    | Listing + dual certification verdict             | **MITIGATED**             |
| R-V05 | Privileged IPC from CS                  | —          | High    | Sender auth                                      | **CLOSED**                |
| R-V06 | False detection bypasses                | —          | High    | PART_20 preprocess                               | **CLOSED**                |
| R-V08 | Perf regressions                        | Low        | Medium  | `bench:budgets`                                  | **MITIGATED**             |
| R-V09 | WAR host mismatch                       | —          | Medium  | Align WAR to AI hosts                            | **CLOSED**                |
| R-V10 | CI cannot prove live extension SW       | Medium     | Low–Med | Budgeted skip + package-shape                    | **ACCEPTED**              |
| R-V11 | Incomplete axe automation               | —          | Medium  | Phase 9 axe gates                                | **CLOSED**                |
| R-V12 | Overlay a11y keyboard/ARIA gap          | —          | Medium  | Phase 7 + axe                                    | **MITIGATED**             |
| R-V13 | Public launch without counsel policy    | Medium     | High    | KI-018 + cert `authorizesCwsPublish:false`       | **OPEN** (enforced)       |
| R-V14 | Test-only deps shipping in CS bundle    | Low        | High    | verify-bundle axe ban                            | **MITIGATED**             |
| R-V15 | False “production ready” after Phase 10 | Low        | High    | Dual verdict CI check                            | **MITIGATED**             |
| R-02  | Clipboard API gaps                      | Medium     | Medium  | Freeze §7 + listing                              | ACCEPTED                  |
