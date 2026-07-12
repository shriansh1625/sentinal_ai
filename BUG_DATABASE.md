# BUG_DATABASE.md — ISVV

| Bug ID       | Sev          | Feature            | Title                                                        | Status               | Evidence                      |
| ------------ | ------------ | ------------------ | ------------------------------------------------------------ | -------------------- | ----------------------------- |
| ISVV-BUG-001 | **Critical** | F-010 / NFR-PERF   | `scanText` had no `MAX_TEXT_SCAN_BYTES` gate; 2MB input hung | **FIXED**            | tier1.ts + isvv.stress        |
| ISVV-BUG-002 | High         | F-011 / FR-DET-002 | Spaced/dashed PAN not detected                               | **FIXED**            | regex.ts grouped CC           |
| ISVV-BUG-003 | Medium       | F-011 / FR-DET-002 | Spaced IBAN not detected                                     | **FIXED**            | regex.ts spaced IBAN          |
| ISVV-BUG-004 | High         | F-011 / FR-DET-003 | PEM/OpenSSH private key header not detected                  | **FIXED**            | regex.ts PEM pattern          |
| ISVV-BUG-005 | Medium       | F-100              | WAR path patterns `/i/grok*`, `/copilot*` invalid in Chrome  | **FIXED**            | prior session; AI_WAR_MATCHES |
| ISVV-RES-001 | Info         | FR-DET-001         | Aadhaar / PAN-IN not in Tier-1 EntityType                    | **OPEN** (needs ADR) | isvv honesty test             |
| ISVV-RES-002 | Medium       | F-023              | OCR/PDF WASM not vendored                                    | **OPEN** KI-002      | fail-closed                   |
| ISVV-RES-003 | High         | G3                 | Live ChatGPT/Claude/Gemini E2E not recorded                  | **OPEN** KI-006      | manual                        |
| ISVV-RES-004 | High         | Legal              | Counsel privacy URL                                          | **OPEN** KI-018      | public blocker                |
| ISVV-RES-005 | Medium       | Process            | Zero git commits                                             | **OPEN** KI-001      | public blocker                |
| ISVV-RES-006 | Low          | F-036              | Per-tab scan rate limiter not wired in router                | **OPEN**             | inventory gap                 |
| ISVV-RES-007 | Info         | PART_20            | Homoglyph table subset / AST concat OOS                      | **ACCEPTED**         | KI-010/011                    |
