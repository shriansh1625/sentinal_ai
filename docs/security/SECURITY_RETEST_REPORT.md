# SECURITY_RETEST_REPORT.md

| Control                            | Result | Evidence                       |
| ---------------------------------- | ------ | ------------------------------ |
| detection-engine network purity    | PASS   | `pnpm purity`                  |
| Privileged IPC from tab/CS         | PASS   | phase3.security                |
| Sender auth FORBIDDEN              | PASS   | phase3                         |
| PART_20 ZW/homoglyph/B64/concat    | PASS   | adversarial.test               |
| PEM / spaced PAN / IBAN            | PASS   | isvv.stress (post-fix)         |
| Oversize text DoS                  | PASS   | ISVV-BUG-001 fixed             |
| Encrypted storage AES-GCM          | PASS   | crypto.test                    |
| Telemetry/history default off      | PASS   | constants + phase10            |
| Remote code in package             | PASS   | disclosure + verify            |
| WAR host expansion AI-only origins | PASS   | phase6 (x.com/_, github.com/_) |

**Residual:** KI-002 OCR stub; KI-018 counsel; live G3; scan rate limiter unwired (ISVV-RES-006).
