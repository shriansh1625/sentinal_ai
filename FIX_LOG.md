# FIX_LOG.md — ISVV

| Fix ID  | Bug          | Req/ADR/Owner                                                    | Change                                          | Retest                 |
| ------- | ------------ | ---------------------------------------------------------------- | ----------------------------------------------- | ---------------------- |
| FIX-001 | ISVV-BUG-001 | NFR-PERF; `MAX_TEXT_SCAN_BYTES`; PART_13/17; ADR-036 fail-closed | `tier1.scanText` BLOCK when UTF-8 bytes > 1 MiB | isvv.stress + ci       |
| FIX-002 | ISVV-BUG-002 | FR-DET-002; PART_13                                              | Grouped Visa/MC/etc. regex with `[-\s]?`        | isvv.stress            |
| FIX-003 | ISVV-BUG-003 | FR-DET-002; PART_13; `ibanValid` already strips spaces           | Spaced IBAN regex                               | isvv.stress            |
| FIX-004 | ISVV-BUG-004 | FR-DET-003; PART_13                                              | PEM `BEGIN … PRIVATE KEY` → API_KEY             | isvv.stress            |
| FIX-005 | ISVV-BUG-005 | PART_10 WAR; Chrome WAR origin-only rule                         | `AI_WAR_MATCHES` + manifest WAR `/*`            | phase6 + load unpacked |

No architecture redesign. No post-v1 features.
