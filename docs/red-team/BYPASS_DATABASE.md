# BYPASS_DATABASE.md

Reproducible Phase C findings only. Engine: `@sentinel-shield/detection-engine`.

Decision rule: bypass = `action === ALLOW` when secret present; FP = non-ALLOW on labeled-benign probe.

---

## RT-SPACE-AWS (FIXED)

| Field            | Value                                                            |
| ---------------- | ---------------------------------------------------------------- |
| Category         | Whitespace chunking                                              |
| Severity         | High (approx. CVSS 7.1 confidentiality if paste reaches AI host) |
| Preconditions    | User pastes spaced secret into enabled AI host                   |
| Input            | `A K I A I O S F O D N N 7 E X A M P L E`                        |
| Expected         | Detect / non-ALLOW                                               |
| Actual (pre-fix) | ALLOW                                                            |
| Root cause       | Regex requires contiguous `AKIA…`; no space defrag               |
| Mitigation       | `collapseSpacedAlphanumerics` in `prepareForDetection`           |
| Regression       | `redteam.phasec.test.ts`                                         |
| Status           | **FIXED**                                                        |

## RT-SPACE-SK / RT-SPACE-GHP / RT-TAB-AWS (FIXED)

Same class; tabs/spaces between identifier characters including `-` / `_`.

## RT-NL-AWS / RT-NL-SK (FIXED)

| Field            | Value                                               |
| ---------------- | --------------------------------------------------- |
| Category         | Newline fragmentation                               |
| Input            | `AKIAIOSFO` + `\n` + `DNN7EXAMPLE` (and sk- analog) |
| Actual (pre-fix) | ALLOW                                               |
| Root cause       | Line break splits token                             |
| Mitigation       | `joinBrokenAlnumLines` (≥6 alnum each side)         |
| Status           | **FIXED**                                           |

## RT-HTML-AWS (FIXED)

| Field            | Value                                                |
| ---------------- | ---------------------------------------------------- |
| Category         | HTML entity encoding                                 |
| Input            | `&#65;&#75;&#73;&#65;…` (decimal entities for AKIA…) |
| Actual (pre-fix) | ALLOW                                                |
| Mitigation       | `decodeBasicHtmlEntities`                            |
| Status           | **FIXED**                                            |

## RT-HEX-AWS (FIXED)

| Field            | Value                                           |
| ---------------- | ----------------------------------------------- |
| Category         | Hex encoding                                    |
| Input            | `hex=` + hex(UTF-8 of `AKIAIOSFODNN7EXAMPLE`)   |
| Actual (pre-fix) | ALLOW                                           |
| Mitigation       | `collectHexSpans` decode+rescan (depth-bounded) |
| Status           | **FIXED**                                       |

## RT-ROT13-AWS / RT-ROT13-SK (ACCEPTED)

| Field              | Value                                                |
| ------------------ | ---------------------------------------------------- |
| Category           | Weak encoding / cipher                               |
| Input              | ROT13(`AKIAIOSFODNN7EXAMPLE`) / ROT13(`sk-…`)        |
| Actual (post-fix)  | ALLOW                                                |
| Root cause         | No ROT13 normalization layer                         |
| Mitigation options | Rejected for v1 — universal ROT13 decode → FP risk   |
| Disposition        | **Accepted limitation** — disclose in threat model   |
| Regression         | Documents residual ALLOW in `redteam.phasec.test.ts` |
| Status             | **OPEN (accepted)**                                  |

## RT-FP-ALNUM40 (FIXED)

| Field            | Value                                                                |
| ---------------- | -------------------------------------------------------------------- |
| Category         | False positive                                                       |
| Input (final)    | `marker AbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKl`                      |
| Actual (pre-fix) | REDACT via entropy / AWS-40 heuristic                                |
| Mitigation       | Entropy requires `/+` or trailing `=`; AWS-40 requires `/+=` present |
| Status           | **FIXED**                                                            |

## RT-FP-SHORT-B64 (FIXED)

| Field      | Value                                |
| ---------- | ------------------------------------ |
| Category   | False positive                       |
| Input      | `base64=cHVibGljLWRlbW8tMjc=`        |
| Mitigation | Entropy min length 32 + charset gate |
| Status     | **FIXED**                            |

---

## Non-findings (probes passed)

ZWSP/ZWJ/BOM/soft-hyphen, bidi RLO/LRO, Cyrillic homoglyph email/AWS, markdown/JSON/YAML wrappers, prompt-injection wrapper, URL encoding (plaintext survives), double base64 (depth path), Arabic wrapper, large benign, oversize fail-closed.
