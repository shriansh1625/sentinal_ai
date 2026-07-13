# RED_TEAM_REPORT.md

## Sentinel Shield AI — Phase C Independent Red Team

| Field                                  | Value                                                                                     |
| -------------------------------------- | ----------------------------------------------------------------------------------------- |
| Role                                   | Independent Red Team (Unit 42 / Project Zero posture)                                     |
| Scope                                  | Detection engine text path (`scanText`) + documented extension limits                     |
| Out of scope for live proof this cycle | Clipboard races, multi-tab SW races, OCR (WASM absent) — no reproducible harness evidence |
| Catalog                                | 115 detectors                                                                             |
| Probe tool                             | `tools/red-team/run-probes.mjs`                                                           |
| Date                                   | 2026-07-13                                                                                |

---

## C.1 Threat-driven attack planning

### Trust boundaries

1. **Untrusted host page DOM** → content script (isolated world)
2. **Content script** → service worker IPC (`INTERCEPT_EVENT`)
3. **Service worker** → pure `detection-engine` (no network)
4. **Optional host permissions** / WAR origin surface
5. **User overlay decisions** (allow once / block / redact)

### Attacker goals

| Goal                                     | Priority                                    |
| ---------------------------------------- | ------------------------------------------- |
| Paste secret past detector (FN / bypass) | P0                                          |
| Induce FP fatigue (cry-wolf)             | P1                                          |
| Exhaust SW / large payload               | P2                                          |
| Abuse OCR stub / binary HOLD UX          | P3 (documented stub)                        |
| Privilege via IPC                        | Covered prior (Phase 4 lab) — not re-opened |

### Ranked attack classes (pre-execution)

| ID  | Class                     | Likelihood | Impact | Exploitability | Business risk                 |
| --- | ------------------------- | ---------- | ------ | -------------- | ----------------------------- |
| A1  | Whitespace / tab chunking | High       | High   | Trivial        | High                          |
| A2  | Newline fragmentation     | High       | High   | Trivial        | High                          |
| A3  | HTML entity encoding      | Med        | High   | Easy           | High                          |
| A4  | Hex encoding              | Med        | High   | Easy           | High                          |
| A5  | ROT13 / weak ciphers      | Med        | Med    | Easy           | Med                           |
| A6  | Entropy FP (alnum/hex)    | High       | Med    | Trivial        | Med                           |
| A7  | ZW / bidi / homoglyph     | Med        | High   | Easy           | Med (often mitigated)         |
| A8  | Base64 / nested           | Med        | High   | Easy           | Med                           |
| A9  | Multi-paste split         | High       | High   | Easy           | High — **architecture limit** |
| A10 | Clipboard / DnD races     | Med        | High   | Med            | High — needs live host proof  |

---

## C.2 Campaign execution summary

39 automated probes executed against built engine.

### Pre-remediation (initial probe)

- **Bypass:** 9 (SPACE×3, TAB, NL×2, HEX, ROT13-AWS, HTML)
- **False positive:** 2 (ALNUM40, SHORT-B64)
- **Pass:** 28

### Post-remediation (final probe)

- **Bypass:** 2 (`RT-ROT13-AWS`, `RT-ROT13-SK`) — **accepted limitation**
- **False positive:** 0 (on updated ALNUM40 sample)
- **Pass:** 37

---

## C.3 Finding index

See `BYPASS_DATABASE.md` for full evidence records.

| ID                                 | Result                | Disposition                 |
| ---------------------------------- | --------------------- | --------------------------- |
| RT-SPACE-* / RT-TAB / RT-NL-*      | Bypass → **Fixed**    | Preprocess defrag           |
| RT-HTML-AWS                        | Bypass → **Fixed**    | HTML entity decode          |
| RT-HEX-AWS                         | Bypass → **Fixed**    | Hex decode+rescan           |
| RT-ROT13-*                         | Bypass → **Accepted** | Documented limitation       |
| RT-FP-ALNUM40 / SHORT-B64          | FP → **Fixed**        | Entropy + AWS secret harden |
| ZW / bidi / homoglyph / PI wrapper | Pass                  | Existing PART_20            |
| Multi-paste / races / OCR          | Not proven here       | Out of scope / architecture |

---

## C.7 Engineering judgment (board)

| Item                                 | Decision                                        | Why                                                                |
| ------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------ |
| Whitespace/newline/HTML/hex bypasses | **Fix before public release** (done in Phase C) | Trivial attacker; high leak impact; PART_20-aligned                |
| Entropy / bare AWS alnum FPs         | **Fix before public release** (done)            | FP fatigue undermines product                                      |
| ROT13                                | **Accept as documented limitation**             | Decode-all-rot13 is high FP; rare in real pastes vs spaced secrets |
| Multi-paste secret split             | **Accept / architecture**                       | Single-scan Tier-1 cannot correlate pastes without redesign        |
| Clipboard/DnD races                  | **Fix before public if proven on live hosts**   | Not reproduced this cycle                                          |
| OCR bypass                           | **Out of scope**                                | WASM absent; fail-closed HOLD                                      |

---

## Bottom line

Red team **broke** the detector on whitespace, newline, HTML entities, and hex. Targeted PART_20/encoding fixes closed those paths. **ROT13 remains an intentional residual.** Metrics re-measured in `POST_REMEDIATION_EVALUATION.md`.
