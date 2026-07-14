# UPDATED_LIMITATIONS.md

**Updated:** 2026-07-13 (Engineering Gap Board)  
**Supersedes narrative:** Prior runbook / Phase C residuals remain; this file is the interview-facing consolidated limitation set.

---

## Product posture (unchanged)

| Claim                               | Truth                                                        |
| ----------------------------------- | ------------------------------------------------------------ |
| Engineering RC / load-unpacked beta | **Authorized** (`CERTIFICATION_STATUS.json`)                 |
| Public CWS / production             | **NO-GO** — G3, KI-006, KI-018                               |
| Architecture                        | Frozen v1.0 — paste / upload / drag-drop on enabled AI hosts |

---

## Detection & preprocessing

| Limitation                                | Status                            | Notes                                                                                   |
| ----------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------- |
| ROT13 / weak ciphers                      | **Accepted residual**             | Red-team ALLOW; no v1 decode layer                                                      |
| Unformatted 10-digit NANP phones          | **Accepted FN**                   | Precision gate (2026-07-13); use formatted numbers                                      |
| Deep / novel encodings beyond depth bound | **Accepted**                      | `MAX_DECODE_DEPTH`                                                                      |
| Chunking beyond space/tab/NL heuristics   | **Accepted**                      | Aggressive join deferred (FP risk)                                                      |
| Homoglyph subset                          | **Accepted**                      | KI-010                                                                                  |
| AST / code-concat secrets                 | **Out of v1**                     | KI-011                                                                                  |
| Image / scanned PDF text extraction       | **Fail-closed HOLD**              | OCR WASM not vendored (KI-002)                                                          |
| `ocrEnabled` default true                 | **Path armed, capability absent** | Flag means pipeline enabled; runtime still HOLD without WASM — do not claim “OCR works” |
| Synthetic eval optimism                   | **Disclose**                      | Use holdout (−exact) + per-slice; not production traffic                                |

---

## Browser / product

| Limitation                                | Status             | Notes                  |
| ----------------------------------------- | ------------------ | ---------------------- |
| Live host G3 unsigned                     | **Public blocker** | KI-006                 |
| Privacy policy URL                        | **Public blocker** | KI-018                 |
| Typing interception                       | **Out of scope**   | Freeze                 |
| Iframes (`allFrames: false`)              | **Residual**       | Host DOM may bypass CS |
| User Allow / override                     | **User residual**  | Explicit               |
| Multi-paste race / host input replacement | **Residual**       | KI-023 class           |
| SW observe flaky in some CI               | **Soft**           | KI-014                 |
| Device-lab P99                            | **Soft**           | KI-012                 |

---

## Security controls (now accurate)

| Control         | Limit                                                      |
| --------------- | ---------------------------------------------------------- |
| IPC rate limit  | 30 msg / min / tab                                         |
| Scan rate limit | **20 scans / min / tab** on intercept/scan (KI-022 closed) |
| Text scan size  | `MAX_TEXT_SCAN_BYTES` fail-closed                          |
| Safe mode       | Blocks intercept when enabled                              |

---

## Manual validation matrix (gaps closed as scenarios)

Use with `ENGINEERING_RUNBOOK.md`. Mark PASS/FAIL with date + browser build.

| ID    | Scenario                              | Expected                               | Priority           |
| ----- | ------------------------------------- | -------------------------------------- | ------------------ |
| MV-01 | Paste secret on enabled host          | Warn/hold/block/redact ≠ ALLOW         | P0                 |
| MV-02 | Paste clean prose                     | ALLOW                                  | P0                 |
| MV-03 | Clipboard → paste                     | Same as paste path                     | P0                 |
| MV-04 | File upload text ≤ cap                | Text scan                              | P0                 |
| MV-05 | File upload binary/image              | HOLD OCR unavailable                   | P0                 |
| MV-06 | Drag-drop text/file                   | Same as upload/paste class             | P0                 |
| MV-07 | Platform permission grant/revoke      | CS register/unregister                 | P0                 |
| MV-08 | Extension reload mid-session          | Re-inject / re-bind                    | P1                 |
| MV-09 | Browser restart                       | Persistence of flags/platforms         | P1                 |
| MV-10 | Multiple tabs same host               | Independent rate keys; both protect    | P1                 |
| MV-11 | Multiple windows                      | Same                                   | P1                 |
| MV-12 | Offline (no network)                  | Local scan still works                 | P1                 |
| MV-13 | Large text near `MAX_TEXT_SCAN_BYTES` | Hold/fail-closed over cap              | P1                 |
| MV-14 | Rapid paste flood                     | RATE_LIMITED / degraded safely         | P1                 |
| MV-15 | Browser crash recovery                | No secret exfil on reopen without scan | P2                 |
| MV-16 | Safe mode on                          | Intercept rejected                     | P1                 |
| MV-17 | History flag off (default)            | No plaintext history                   | P0                 |
| MV-18 | Spaced AWS key                        | Detect (Phase C)                       | P0                 |
| MV-19 | ROT13 AWS key                         | ALLOW — **known residual**             | P0 (negative test) |
| MV-20 | Contiguous phone digits               | No PHONE FP                            | P1                 |

Live ChatGPT/Claude/Gemini recorded sign-off remains **KI-006**.
