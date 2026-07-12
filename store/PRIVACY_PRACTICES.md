# PRIVACY_PRACTICES.md — CWS privacy disclosure (engineering source)

**Refs:** PART_07 inventory, Freeze privacy principles  
**Counsel note:** PART_07 states published privacy policy requires counsel sign-off before public launch. This file is the **engineering disclosure draft** for CWS Privacy practices form.

## Single purpose

Local on-device scanning of user-initiated paste/upload/drag-drop content on AI sites the user enables, to warn and allow allow/block/redact decisions.

## Data collected

| Category                                 | Collected?                                                          | Notes                                           |
| ---------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------- |
| Personally identifiable information      | **Processed in RAM only** during a scan                             | Raw values are **not** persisted (NOBJ-005)     |
| Health / financial / authentication info | May appear in scanned content ephemerally                           | Same: memory-only; never uploaded for detection |
| Website content                          | Content the user pastes/uploads on protected AI sites               | Scanned locally                                 |
| User activity                            | Optional encrypted history of **types/masks/scores/decisions** only | **Off by default**                              |
| Website browsing history                 | **No**                                                              | No `history` permission                         |
| Location / personal communications       | **No**                                                              |                                                 |

## Data usage

- Detection and user warning / redaction UX
- Optional local history dashboard (if user enables history)
- Optional aggregate telemetry (**off by default**, never raw values)
- Optional enterprise audit metadata when admin configures (enterprise path; not individual CWS default)

## Data sharing

- **Not sold**
- **Not used for third-party advertising**
- No detection cloud: core engine has no network dependency
- Optional cloud explain (entity **types** only) requires explicit consent — default off

## Data security

- `chrome.storage.local` / IndexedDB encryption per PART_19 when history enabled
- CSP without `unsafe-eval` (wasm-unsafe-eval only for WASM)
- Minimal permissions; optional hosts per platform

## Data retention

- Ephemeral scan buffers discarded after decision
- History (if enabled): default 30 days, user-configurable purge
- Uninstall removes extension storage

## User controls

- Per-platform host grant / revoke
- Telemetry / history / OCR / NER toggles in options (defaults: telemetry/history/NER off)
- Clear/disable history when enabled

## Remote code

**None.** All executable code ships in the CWS package. No remote script fetch.
