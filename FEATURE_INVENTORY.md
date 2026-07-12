# FEATURE_INVENTORY.md — ISVV v1.0

**Date:** 2026-07-12  
**Scope:** Implemented v1 only (Architecture Freeze)  
**Method:** RTM + code + tests + adversarial disprove

| Feature ID | Description                  | Owner Module                                | Dependencies      | Threat Model     | Acceptance Criteria          | Status                 | Coverage                   |
| ---------- | ---------------------------- | ------------------------------------------- | ----------------- | ---------------- | ---------------------------- | ---------------------- | -------------------------- |
| F-001      | Canonical constants          | `shared-types/constants`                    | Freeze §3         | DoS budgets      | Deterministic limits         | **VERIFIED**           | Unit                       |
| F-002      | Feature-flag defaults        | `shared-types/config`, `core/feature-flags` | ADR-037           | Privacy          | History/telemetry/NER off    | **VERIFIED**           | Unit                       |
| F-003      | IPC message taxonomy         | `shared-types/messages`                     | PART_14           | Spoofing         | Typed envelopes              | **VERIFIED**           | Unit/Sec                   |
| F-006      | AI platform registry + hosts | `shared-types/platforms`                    | ADR-035           | Overbroad hosts  | AI-only                      | **VERIFIED**           | Unit/Manifest              |
| F-010      | Tier-1 text scan             | `detection-engine/tier1`                    | PART_13/20        | TS-*             | Pure on-device               | **VERIFIED**           | Unit/Adv/ISVV              |
| F-011      | Regex detectors              | `detectors/regex`                           | FR-DET-001..004   | Bypass           | Email/phone/SSN/CC/IBAN/keys | **VERIFIED**           | Unit/ISVV                  |
| F-012      | Entropy heuristic            | `detectors/entropy`                         | FR-DET-003        | FP risk          | High-entropy tokens          | **VERIFIED**           | Unit                       |
| F-013      | Luhn/IBAN checksum           | `checksum`                                  | FR-DET-002        | False PAN        | Drop invalid                 | **VERIFIED**           | Unit                       |
| F-014      | PART_20 preprocess           | `preprocess/*`                              | PART_20           | ZW/homoglyph/B64 | Strip+rescan                 | **VERIFIED**           | Adv                        |
| F-015      | Risk scoring                 | `risk/score`                                | PART_18           | Under-block      | Weighted levels              | **VERIFIED**           | Unit                       |
| F-016      | Policy decide                | `policy/decide`                             | PART_18           | Silent allow     | HIGH→BLOCK                   | **VERIFIED**           | Unit                       |
| F-017      | Redaction                    | `redaction`                                 | FR-UX-003         | Residual leak    | Masks spans                  | **VERIFIED**           | Unit                       |
| F-018      | Document sniff/plan          | `input/document`                            | FR-INP-004/005    | ZIP/PDF          | Sniff; OCR unavailable       | **PARTIALLY VERIFIED** | Unit (fail-closed)         |
| F-023      | OCR WASM path                | `offscreen/worker-pool`                     | ADR-032           | Silent fail      | Fail-closed stub             | **PARTIALLY VERIFIED** | Unit (KI-002)              |
| F-031      | Allowlist logger             | `core/logging`                              | DER-LOG           | PII logs         | Strip forbidden keys         | **VERIFIED**           | Unit                       |
| F-036      | IPC rate limit               | `core/rate-limit`, router                   | NFR               | Flood            | IPC limited                  | **PARTIALLY VERIFIED** | Unit (scan limiter unused) |
| F-041      | AES-GCM storage              | `browser-adapters/crypto`                   | PART_19           | At-rest          | Encrypt settings/history     | **VERIFIED**           | Unit/Sec                   |
| F-050      | MV3 SW bootstrap             | `extension/background`                      | PART_10/11        | Lifecycle        | Boots encrypted              | **VERIFIED**           | Unit/E2E SW                |
| F-054      | Dynamic CS registration      | `lifecycle/registration`                    | ADR-035           | Host creep       | Optional hosts               | **VERIFIED**           | Unit                       |
| F-057      | IPC sender auth              | `messaging/sender-auth`                     | PART_14           | Privilege        | FORBIDDEN from tab           | **VERIFIED**           | Sec                        |
| F-059      | Scan→intercept bridge        | `messaging/scan-bridge`                     | ADR-036           | Fail-open        | Prepared redaction           | **VERIFIED**           | Func                       |
| F-060      | Encrypted history            | `storage/history-store`                     | ADR-033           | Retention        | Default off                  | **VERIFIED**           | Func                       |
| F-071      | Paste intercept              | `input-pipelines/paste`                     | FR-INP-001        | 29A              | Capture+HOLD                 | **VERIFIED**           | Func (fixture E2E)         |
| F-072      | Upload intercept             | `input-pipelines/file-upload`               | FR-INP-002        | 29B              | Text scan; binary HOLD       | **PARTIALLY VERIFIED** | Func                       |
| F-073      | Drag-drop intercept          | `input-pipelines/drag-drop`                 | FR-INP-003        | 29C              | Same as upload               | **PARTIALLY VERIFIED** | Func                       |
| F-080      | Decision overlay             | `ui/overlay`                                | FR-UX-001/PART_22 | Tamper           | Closed shadow+a11y           | **VERIFIED**           | A11y/Unit                  |
| F-081/082  | Popup/options Lit            | `ui/popup-app`, `options-app`               | ADR-034           | —                | Flags+platforms              | **VERIFIED**           | A11y                       |
| F-083      | i18n                         | `ui/i18n`, `_locales`                       | PART_22           | —                | `__MSG_*`                    | **VERIFIED**           | CWS tests                  |
| F-100      | Manifest MV3+WAR             | `manifest.json`                             | PART_10           | WAR path rule    | Origin `/*` only             | **VERIFIED**           | Browser/E2E                |
| F-101      | CWS materials                | `store/*`                                   | G4                | Overclaim        | Honest listing               | **VERIFIED**           | Phase8                     |
| F-103      | Dual certification           | `CERTIFICATION_STATUS.json`                 | G0–G5             | False GO         | Public NO-GO                 | **VERIFIED**           | Phase10                    |

**Out of scope / not implemented (honest):** NER/CV (F-021/022), Aadhaar/PAN-IN entity detectors, Firefox, Clipboard API intercept, enterprise backend, history dashboard UI, live ChatGPT G3 automation.
