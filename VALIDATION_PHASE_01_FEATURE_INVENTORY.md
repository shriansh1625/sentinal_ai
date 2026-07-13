# Independent Product Validation Lab — Phase 1

## Feature Inventory Report

| Field                | Value                                                                        |
| -------------------- | ---------------------------------------------------------------------------- |
| Product              | Sentinel Shield AI                                                           |
| Lab role             | Independent verification (break / prove)                                     |
| Phase                | **1 of 8 — Feature Discovery Only**                                          |
| Extension under test | `0.2.1` (`packages/extension`)                                               |
| Freeze               | Architecture Freeze v1.0                                                     |
| Repo tip (evidence)  | `bf21ed2` on `origin/master` (`https://github.com/shriansh1625/sentinal_ai`) |
| Lab date             | 2026-07-13                                                                   |
| Next phase           | **Paused — awaiting human approval for Phase 2**                             |

---

## 1. Lab posture

This phase **does not approve** the product. It only inventories what exists in code versus what is claimed.

Rules observed:

- No new features
- No redesign / refactor
- No implementation in this phase
- Evidence-backed status only

---

## 2. Package map

| Package                               | Path                          | Role                                                          |
| ------------------------------------- | ----------------------------- | ------------------------------------------------------------- |
| `@sentinel-shield/extension`          | `packages/extension`          | MV3 SW, content script, Lit popup/options, overlay, offscreen |
| `@sentinel-shield/detection-engine`   | `packages/detection-engine`   | Pure Tier-1 text detection (no Chrome)                        |
| `@sentinel-shield/shared-types`       | `packages/shared-types`       | Constants, entities, messages, platforms                      |
| `@sentinel-shield/core`               | `packages/core`               | Config, flags, logging, rate-limit, perf, telemetry façade    |
| `@sentinel-shield/browser-adapters`   | `packages/browser-adapters`   | Encrypted storage, IPC envelopes                              |
| `@sentinel-shield/enterprise-backend` | `packages/enterprise-backend` | Stub / Phase 4 placeholder                                    |
| Store / cert                          | `store/`                      | CWS materials, `CERTIFICATION_STATUS.json`                    |
| E2E                                   | `tests/e2e/`                  | Playwright fixture harness                                    |

---

## 3. Manifest / permission surface (facts)

| Item            | Evidence                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| MV3             | `packages/extension/manifest.json`                                                                            |
| Version         | `0.2.1`                                                                                                       |
| Min Chrome      | `120`                                                                                                         |
| Permissions     | `storage`, `activeTab`, `scripting`, `offscreen`, `alarms`                                                    |
| Host access     | Optional AI hosts only (ChatGPT, Gemini, Claude, DeepSeek, Perplexity, Grok, Copilot, GitHub Copilot, Cursor) |
| Content scripts | **Dynamic only** (no static `content_scripts`)                                                                |
| CSP             | `script-src 'self' 'wasm-unsafe-eval'`                                                                        |

---

## 4. Inventory summary counts

| Status                                    | Count (approx.) |
| ----------------------------------------- | --------------- |
| IMPLEMENTED                               | 52              |
| PARTIAL                                   | 14              |
| STUB                                      | 3               |
| DOCUMENTED_ONLY                           | 6               |
| ABSENT (in-scope claim gaps or out-of-v1) | 18+             |

**Working product core:** on-device **text** interception (paste / text file / text drop) on user-enabled AI hosts, with overlay decisions.

**Not shipping as working capability:** OCR/PDF/binary scan, NER/CV, Indian ID entities, badge, history dashboard, live G3 automation.

---

## 5. Feature inventory (complete)

### 5.1 Shared types & config

| ID    | Name                        | Status      | Trigger           | Evidence                                          |
| ----- | --------------------------- | ----------- | ----------------- | ------------------------------------------------- |
| F-001 | Canonical budgets/constants | IMPLEMENTED | Any scan          | `packages/shared-types/src/constants/index.ts`    |
| F-002 | Privacy-first feature flags | IMPLEMENTED | Fresh install     | `packages/shared-types/src/config/index.ts`       |
| F-003 | IPC message taxonomy        | IMPLEMENTED | Any message       | `packages/shared-types/src/messages/index.ts`     |
| F-004 | Entity/risk/policy enums    | IMPLEMENTED | Scan              | `packages/shared-types/src/entities/index.ts`     |
| F-005 | Scan request/result types   | IMPLEMENTED | Scan              | `packages/shared-types/src/detection/index.ts`    |
| F-006 | AI platform registry (9)    | IMPLEMENTED | Popup enable      | `packages/shared-types/src/platforms/index.ts`    |
| F-007 | Interception types          | IMPLEMENTED | Paste/upload/drop | `packages/shared-types/src/interception/index.ts` |
| F-008 | WAR origin helpers          | IMPLEMENTED | Build/manifest    | `packages/shared-types/src/constants/index.ts`    |

### 5.2 Detection engine

| ID    | Name                    | Status          | Trigger             | Evidence                               | Limits                                        |
| ----- | ----------------------- | --------------- | ------------------- | -------------------------------------- | --------------------------------------------- |
| F-010 | Tier-1 text scan        | IMPLEMENTED     | Paste risky text    | `detection-engine/src/tier1.ts`        | Text only; 1 MiB cap                          |
| F-011 | Regex detectors         | IMPLEMENTED     | Paste PII/secrets   | `detectors/regex.ts`                   | No Aadhaar/PAN-IN/JWT/UPI (KI-021)            |
| F-012 | Entropy heuristic       | IMPLEMENTED     | High-entropy tokens | `detectors/entropy.ts`                 | FP risk                                       |
| F-013 | Luhn / IBAN checksum    | IMPLEMENTED     | Card/IBAN paste     | `checksum/index.ts`                    | —                                             |
| F-014 | PART_20 preprocess      | IMPLEMENTED     | Obfuscated paste    | `preprocess/*`                         | Homoglyph subset KI-010; no AST concat KI-011 |
| F-015 | Risk scoring            | IMPLEMENTED     | Non-clean scan      | `risk/score.ts`                        | —                                             |
| F-016 | Policy decide           | IMPLEMENTED     | After scan          | `policy/decide.ts`                     | WARN→HOLD in bridge                           |
| F-017 | Redaction + preview     | IMPLEMENTED     | Medium+ text        | `redaction/index.ts`, `scan-bridge.ts` | Text only                                     |
| F-018 | Document sniff/plan     | PARTIAL         | Binary upload       | `input/document.ts`                    | OCR/PDF unavailable                           |
| F-019 | Entity knowledge base   | IMPLEMENTED     | Programmatic        | `knowledge/index.ts`                   | Not shown in overlay detail UI                |
| F-020 | Oversize fail-closed    | IMPLEMENTED     | >1 MiB text         | `tier1.ts`, `handlers.ts`              | —                                             |
| F-021 | Threat-sim harness      | IMPLEMENTED     | Tests               | `security/threat-sim.ts`               | —                                             |
| F-110 | NER Tier-2              | DOCUMENTED_ONLY | Flag only           | config flags                           | No engine                                     |
| F-111 | CV                      | DOCUMENTED_ONLY | Flag only           | —                                      | No engine                                     |
| F-112 | Aadhaar/PAN-IN/Passport | ABSENT          | —                   | EntityType gap                         | KI-021                                        |
| F-113 | UPI/IFSC/SWIFT          | ABSENT          | —                   | —                                      | —                                             |
| F-114 | JWT/Mongo URI           | ABSENT          | —                   | —                                      | —                                             |
| F-115 | Doc classifiers         | ABSENT          | —                   | —                                      | —                                             |
| F-116 | QR/barcode              | ABSENT          | —                   | —                                      | —                                             |
| F-117 | Password-context AST    | PARTIAL         | Entropy only        | —                                      | KI-011                                        |

### 5.3 Lifecycle / permissions

| ID    | Name                                    | Status      | Trigger                | Evidence                          |
| ----- | --------------------------------------- | ----------- | ---------------------- | --------------------------------- |
| F-050 | SW bootstrap                            | IMPLEMENTED | Install/open           | `extension/src/background.ts`     |
| F-051 | Early `onMessage` registration          | IMPLEMENTED | SW wake                | `background.ts`                   |
| F-052 | Lifecycle coordinator                   | IMPLEMENTED | Install/update/startup | `lifecycle/index.ts`              |
| F-053 | Migrations + Safe Mode                  | IMPLEMENTED | Migration failure      | `lifecycle/migrations.ts`         |
| F-054 | Dynamic CS registration                 | IMPLEMENTED | Enable platform        | `lifecycle/registration.ts`       |
| F-055 | Host permission request (popup gesture) | IMPLEMENTED | Popup checkbox         | `popup-app.ts`, `registration.ts` |
| F-056 | Inject into open tabs                   | IMPLEMENTED | Enable while tab open  | `registration.ts`                 |
| F-061 | Keep-alive alarm helper                 | IMPLEMENTED | Bootstrap              | `lifecycle/index.ts`              |

### 5.4 Messaging / security

| ID    | Name                            | Status      | Trigger         | Evidence                                  | Limits           |
| ----- | ------------------------------- | ----------- | --------------- | ----------------------------------------- | ---------------- |
| F-057 | Sender auth                     | IMPLEMENTED | Privileged IPC  | `messaging/sender-auth.ts`                | —                |
| F-058 | Router validate/auth/rate-limit | IMPLEMENTED | Any IPC         | `messaging/router.ts`                     | —                |
| F-059 | Scan→intercept bridge           | IMPLEMENTED | Text intercept  | `messaging/scan-bridge.ts`                | —                |
| F-034 | IPC rate limiter                | IMPLEMENTED | Message flood   | `core/src/rate-limit`                     | —                |
| F-035 | Scan rate limiter               | IMPLEMENTED | PASS            | `createScanRateLimiter` on INTERCEPT/SCAN | KI-022 closed    |
| F-060 | Encrypted history append        | IMPLEMENTED | History flag on | `storage/history-store.ts`                | No dashboard UI  |
| F-077 | CS lifecycle IPC                | PARTIAL     | CS boot         | `content.ts`                              | Only `init` sent |

### 5.5 Interception pipelines

| ID    | Name                       | Status      | Trigger            | Evidence                     | Limits                                 |
| ----- | -------------------------- | ----------- | ------------------ | ---------------------------- | -------------------------------------- |
| F-062 | CS bootstrap               | IMPLEMENTED | Visit enabled host | `content.ts`                 | Classic IIFE build required            |
| F-063 | Approval nonce / release   | IMPLEMENTED | Allow once         | `content/approval-nonce.ts`  | —                                      |
| F-064 | AI input heuristics        | IMPLEMENTED | Paste in composer  | `input-pipelines/context.ts` | Best-effort selectors                  |
| F-071 | Paste text intercept       | IMPLEMENTED | Ctrl+V text        | `input-pipelines/paste.ts`   | Not typing; not `clipboard.readText()` |
| F-074 | Paste file intercept       | PARTIAL     | Paste PDF/etc.     | `paste.ts`                   | Binary HOLD (KI-002)                   |
| F-072 | File upload intercept      | PARTIAL     | File picker        | `file-upload.ts`             | Text scan; binary HOLD                 |
| F-073 | Drag-drop intercept        | PARTIAL     | Drop               | `drag-drop.ts`               | Same                                   |
| F-065 | Coordinator + overlay wire | IMPLEMENTED | Risky intercept    | `input-pipelines/index.ts`   | —                                      |
| F-066 | Fail-closed if SW down     | IMPLEMENTED | SW dead            | `index.ts`                   | HOLD                                   |
| F-067 | Oversize IPC fail-closed   | IMPLEMENTED | Huge envelope      | `index.ts`                   | —                                      |

### 5.6 Offscreen / WASM

| ID    | Name                | Status      | Trigger      | Evidence                   | Limits                    |
| ----- | ------------------- | ----------- | ------------ | -------------------------- | ------------------------- |
| F-075 | Offscreen manager   | IMPLEMENTED | Ensure/ping  | `offscreen/manager.ts`     | —                         |
| F-076 | Offscreen ping      | IMPLEMENTED | Ping         | `offscreen/offscreen.ts`   | —                         |
| F-023 | OCR worker pool     | STUB        | Image upload | `offscreen/worker-pool.ts` | Always fail-closed KI-002 |
| F-024 | PDF extraction      | STUB        | PDF upload   | `worker-pool.ts`           | KI-002                    |
| F-026 | WASM integrity pins | PARTIAL     | Load wasm    | `wasm-integrity.ts`        | Empty pins refuse load    |

### 5.7 UI

| ID     | Name                   | Status      | Trigger            | Evidence                 | Limits                |
| ------ | ---------------------- | ----------- | ------------------ | ------------------------ | --------------------- |
| F-080  | Decision overlay       | IMPLEMENTED | Risky paste/upload | `ui/overlay.ts`          | No entity detail view |
| F-080a | Overlay a11y           | IMPLEMENTED | Overlay            | `overlay.ts`             | KI-007 test seams     |
| F-081  | Popup platforms/health | IMPLEMENTED | Toolbar icon       | `ui/popup-app.ts`        | No badge              |
| F-082  | Options flags          | PARTIAL     | Options page       | `ui/options-app.ts`      | Subset of flags       |
| F-083  | i18n EN                | IMPLEMENTED | UI strings         | `ui/i18n.ts`, `_locales` | EN only               |
| F-120  | History dashboard      | ABSENT      | —                  | —                        | Store-only            |
| F-121  | Toolbar badge          | ABSENT      | —                  | —                        | —                     |
| F-122  | Detection detail view  | ABSENT      | —                  | —                        | —                     |

### 5.8 Core / adapters / build

| ID        | Name                                               | Status              | Evidence                                |
| --------- | -------------------------------------------------- | ------------------- | --------------------------------------- |
| F-031     | Allowlist logger                                   | IMPLEMENTED         | `core/src/logging`                      |
| F-032     | Configuration service                              | IMPLEMENTED         | `core/src/config`                       |
| F-033     | Feature flags                                      | IMPLEMENTED         | `core/src/feature-flags`                |
| F-036–040 | Streaming/perf/memory/telemetry/errors             | PARTIAL/IMPLEMENTED | `core/src/*` (telemetry null transport) |
| F-041–045 | Encrypted KV, Chrome storage, IPC envelope, mocks  | IMPLEMENTED         | `browser-adapters`                      |
| F-090     | Vite MV3 build (+ content IIFE flatten)            | IMPLEMENTED         | `extension/vite.config.ts`              |
| F-093–097 | verify-bundle, purity, depcruise, benches, certify | IMPLEMENTED         | `tools/*`                               |
| F-100–105 | Store materials / e2e fixture                      | PARTIAL             | `store/*`, `tests/e2e/*` (no live G3)   |

---

## 6. Explicit non-features (v1 / freeze)

Do **not** treat these as defects merely for absence:

- Keystroke / typing interception
- `navigator.clipboard.readText()` page reads
- Firefox / non-Chromium
- Mail / Drive / Slack / Teams hosts
- Network DLP / `webRequest` blocking
- Enterprise backend product
- “Blocks all leaks” claims
- Shipping OCR/NER/CV as certified capabilities

---

## 7. Claimed vs implemented (PART_03 highlights)

| Requirement area             | Lab verdict                                            |
| ---------------------------- | ------------------------------------------------------ |
| Paste intercept (FR-INP-001) | IMPLEMENTED (text); live G3 not lab-certified (KI-006) |
| File upload / drag-drop      | PARTIAL — text scanned; binary HOLD                    |
| PDF / OCR (FR-INP-004/005)   | STUB fail-closed                                       |
| Gov IDs / Indian entities    | PARTIAL/ABSENT (SSN yes; Aadhaar/PAN-IN no)            |
| Secrets (keys/PEM)           | PARTIAL (strong prefixes; no JWT/URI suite)            |
| Overlay warn UI              | IMPLEMENTED                                            |
| Badge / detail / dashboard   | ABSENT                                                 |
| Settings UI                  | PARTIAL                                                |

---

## 8. Certification claims vs evidence

From `store/CERTIFICATION_STATUS.json`:

| Claim                              | Lab note                                          |
| ---------------------------------- | ------------------------------------------------- |
| Engineering `GO_CERTIFIED_RC`      | Consistent with load-unpacked beta posture        |
| Public `NO_GO`                     | Consistent (G3/KI-006, privacy URL KI-018, etc.)  |
| `authorizesLoadUnpackedBeta: true` | Matches observed manual paste behavior on ChatGPT |
| `authorizesCwsPublish: false`      | Correct                                           |

**Stale tracker finding (lab):** `KNOWN_ISSUES.md` still lists **KI-001** as “zero commits”. Current evidence: commits `b11f42a`, `bf21ed2` on `origin/master`. KI-001 documentation is **out of date** (not a product runtime defect).

---

## 9. Phase 1 verdict (inventory only)

Sentinel Shield AI **0.2.1** presents a coherent **Tier-1 text DLP-for-AI-hosts** product surface for internal load-unpacked use, with honest fail-closed stubs for OCR/PDF and explicit public NO-GO blockers.

This phase does **not** score quality, security, or production readiness. That begins in later phases.

---

## 10. STOP — Phase 1 complete

**Paused for human approval.**

Reply to proceed to **Phase 2 (exhaustive test suite generation / execution plan)**.

No Phase 2 work will start until you approve.
