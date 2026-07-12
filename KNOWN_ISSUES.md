# KNOWN_ISSUES.md

**Updated:** 2026-07-12 (Phase 10)

| ID     | Severity                   | Phase    | Issue                                              | Disposition                                    |
| ------ | -------------------------- | -------- | -------------------------------------------------- | ---------------------------------------------- |
| KI-001 | **High** (release process) | 1/10     | Git repository has **zero commits**                | **Public blocker**                             |
| KI-002 | Medium (pre-CWS)           | 1/8      | OCR/PDF WASM not vendored                          | Fail-closed; OCR release-channel not certified |
| KI-003 | Low                        | 1        | Root version `0.0.0` vs extension `0.2.1`          | Align at tagging                               |
| KI-004 | Closed                     | 6        | WAR matches subset of AI hosts                     | **Fixed**                                      |
| KI-005 | Info                       | 1        | `SPRING_0_*` typo filename                         | Debt                                           |
| KI-006 | **High** (public G3)       | 2/6/9/10 | No live host-page CDP / recorded G3 sign-off       | **Public blocker** — manual M2–M4              |
| KI-007 | Info                       | 2/7      | Overlay test seams                                 | Documented                                     |
| KI-008 | Closed                     | 3        | Privileged IPC from tab/CS                         | Fixed                                          |
| KI-009 | Closed                     | 4        | PART_20 text bypasses                              | Fixed                                          |
| KI-010 | Info                       | 4        | Homoglyph table subset                             | Accepted                                       |
| KI-011 | Info                       | 4        | AST concat out of v1                               | Accepted                                       |
| KI-012 | Info                       | 5/7      | Device-lab P99 / overlay paint                     | Lab residual                                   |
| KI-013 | Info                       | 5        | Bench CI slack ×8                                  | Documented                                     |
| KI-014 | Info                       | 6/9/10   | Automated `--load-extension` SW observe unreliable | Skip with budget; package-shape gates          |
| KI-015 | Closed                     | 7/8      | UI strings not wired to `chrome.i18n`              | **Fixed**                                      |
| KI-016 | Closed                     | 7/9      | No axe AA automation                               | **Fixed**                                      |
| KI-017 | Low (CWS assets)           | 8/9      | Promo-quality screenshots                          | Engineering PNGs exist; human promo preferred  |
| KI-019 | Closed                     | ISVV     | Unbounded `scanText` DoS                           | **Fixed** — MAX_TEXT_SCAN_BYTES fail-closed    |
| KI-020 | Closed                     | ISVV     | Spaced PAN / IBAN / PEM gaps                       | **Fixed** — Tier-1 regex                       |
| KI-021 | Info                       | ISVV     | Aadhaar/PAN-IN not Tier-1 entities                 | Needs ADR to expand                            |
| KI-022 | Low                        | ISVV     | Scan rate limiter unused in router                 | Debt                                           |
