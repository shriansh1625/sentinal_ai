# PROJECT_KNOWLEDGE_GRAPH.md

**Product:** Sentinel Shield AI `0.2.1`  
**Freeze:** Architecture Freeze v1.0 (`blueprint/ARCHITECTURE_FREEZE_v1.0.md`)  
**Purpose:** Nothing important remains unexplained for interview defense.  
**Honesty rule:** Distinguish **implemented**, **flagged but fail-closed**, **blueprint aspirational**, **out of scope**.

---

## 1. System identity

| Field                 | Value                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What it is            | Chromium MV3 extension that intercepts paste/upload/drag-drop on **enabled AI hosts** and runs **on-device Tier-1** detection before content reaches the page |
| What it is not        | Network DLP, OCR product (today), enterprise SOC, CWS-published product                                                                                       |
| Engineering verdict   | `GO_CERTIFIED_RC` / load-unpacked beta OK                                                                                                                     |
| Public verdict        | `NO_GO` — blockers G3, KI-006, KI-018                                                                                                                         |
| Detection network I/O | **None** in `@sentinel-shield/detection-engine`                                                                                                               |

---

## 2. Package graph (dependencies)

```
shared-types  (constants, IPC types, entities, policy enums)
     ↑
     ├── core  (config, flags, logging, rate-limit, perf, telemetry iface)
     │     ↑
     │     └── browser-adapters  (chrome storage/crypto, envelope assert)
     │              ↑
     │              └── extension  (MV3 shell — integrates everything)
     │
     └── detection-engine  (pure Tier-1; Node-testable; no chrome/fetch)
                ↑
                └── extension

enterprise-backend  → PLACEHOLDER ONLY (v1 not ready)
```

| Package              | Path                          | Implements                                         | Does not implement   |
| -------------------- | ----------------------------- | -------------------------------------------------- | -------------------- |
| `shared-types`       | `packages/shared-types`       | Freeze constants, message types                    | Runtime logic        |
| `core`               | `packages/core`               | Rate limiters, flags, logger, config               | Chrome APIs          |
| `browser-adapters`   | `packages/browser-adapters`   | Encrypted KV, AES-GCM, Argon2id/PBKDF2, IPC assert | Detection            |
| `detection-engine`   | `packages/detection-engine`   | Tier-1 scan, catalog, checksum, preprocess         | Browser UI, OCR WASM |
| `extension`          | `packages/extension`          | SW, CS, overlay, offscreen stub, Lit UI            | Enterprise backend   |
| `enterprise-backend` | `packages/enterprise-backend` | Empty shell                                        | Anything             |

---

## 3. Trust boundaries

```
TB-1 User device (clipboard, files)
        │
TB-2 Browser process / sandbox
        │
TB-3 Extension (TRUSTED)
     ├── Service Worker (coordinator)
     ├── Offscreen document (WASM host — stub today)
     ├── Popup / Options (Lit)
     └── Encrypted storage
        │  IPC only (validated, auth, rate-limited)
TB-4 Page world (UNTRUSTED)
     ├── AI host JS
     └── Content script (isolated world; still untrusted relative to SW)
```

**Invariant:** Content script never talks to offscreen directly. All coordination via Service Worker (`PART_04`).

---

## 4. Runtime modules (extension)

| Module          | Path                                   | Role                                            |
| --------------- | -------------------------------------- | ----------------------------------------------- |
| SW entry        | `packages/extension/src/background.ts` | Bootstrap storage/config/flags/lifecycle/router |
| Content entry   | `packages/extension/src/content.ts`    | Idempotent boot → interception controller       |
| Paste pipeline  | `.../input-pipelines/paste.ts`         | Capture-phase paste                             |
| Upload pipeline | `.../input-pipelines/file-upload.ts`   | File input; text sniff vs HOLD                  |
| Drag-drop       | `.../input-pipelines/drag-drop.ts`     | Drop capture                                    |
| Controller      | `.../input-pipelines/index.ts`         | Wire pipelines; SW-down → HOLD                  |
| Router          | `.../messaging/router.ts`              | Validate → auth → IPC 30 → scan 20 → dispatch   |
| Handlers        | `.../messaging/handlers.ts`            | `INTERCEPT_EVENT` → Tier-1 or OCR HOLD          |
| Scan bridge     | `.../messaging/scan-bridge.ts`         | PolicyAction → InterceptDecision (WARN→HOLD)    |
| Sender auth     | `.../messaging/sender-auth.js`         | Privileged messages blocked from tabs           |
| Overlay         | `.../ui/overlay.ts`                    | Closed Shadow DOM decisions                     |
| Approval nonce  | `.../content/approval-nonce.ts`        | Prevent forged re-dispatch                      |
| Offscreen mgr   | `.../offscreen/manager.ts`             | Ensure offscreen document                       |
| Worker pool     | `.../offscreen/worker-pool.ts`         | **Stub:** OCR fail-closed                       |
| Lifecycle       | `.../lifecycle/*`                      | Install, migrations, platform registration      |
| Popup/Options   | `.../ui/popup-*.ts`, `options-*.ts`    | Lit UI                                          |

---

## 5. Detection-engine modules

| Module            | Path                             | Role                                                                            |
| ----------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| Engine            | `tier1.ts`                       | Size gate → prepare → regex+entropy → b64/hex rescan → checksum → risk → policy |
| Catalog matcher   | `research/matcher.ts`            | 100+ research detectors → spans                                                 |
| Regex entry       | `detectors/regex.ts`             | Delegates to catalog                                                            |
| Entropy           | `detectors/entropy.ts`           | High-entropy secret heuristic (hardened Phase C)                                |
| Checksum          | `checksum/index.ts`              | Luhn (PAN), MOD-97 (IBAN)                                                       |
| Normalize         | `preprocess/normalize.ts`        | Space/tab collapse, NL join, HTML entities                                      |
| Base64/Hex        | `preprocess/base64.ts`, `hex.ts` | Depth-bounded decode+rescan                                                     |
| Risk              | `risk/score.ts`                  | Spans → RiskLevel                                                               |
| Policy            | `policy/decide.ts`               | RiskLevel → ALLOW/WARN/REDACT/BLOCK                                             |
| Redaction         | `redaction/index.ts`             | Span replacement tokens                                                         |
| Document pipeline | `input/document.ts`              | OCR ports — unavailable without port                                            |

---

## 6. Data flow (implemented paste)

```
User pastes on enabled AI host
  → CS capture-phase (preventDefault + stopImmediatePropagation)
  → Build InterceptEvent (text payload + byteLength)
  → chrome.runtime.sendMessage(INTERCEPT_EVENT)
  → MessageRouter:
       assertIpcEnvelope
       authorizeMessageSender
       IPC SlidingWindow (30/min/tab)
       Scan SlidingWindow (20/min/tab)   [KI-022 closed]
       safe-mode gate
  → handlers.INTERCEPT_EVENT
       if text > MAX_TEXT_SCAN_BYTES → HOLD
       else detectionEngine.scanText()
  → Tier1DetectionEngine:
       prepareForDetection
       findRegexSpans + findEntropySpans
       collectBase64Spans / collectHexSpans (depth ≤ MAX_DECODE_DEPTH)
       enrichWithChecksums
       scoreRisk → decideAction
  → scan-bridge → InterceptDecision
  → CS overlay if HOLD/BLOCK/REDACT
  → User Allow → approval nonce → re-dispatch once
  → User Block/Redact → clear / replace
```

**Binary/file non-text:** HOLD with reason OCR/PDF WASM unavailable (ADR-036 / KI-002).

---

## 7. Control flow (lifecycle)

```
Install / Startup
  → migrations
  → ConfigurationService + FeatureFlagService
  → register content scripts for enabled platforms (ADR-013/035)
  → attach onMessage (early sync registration)

Platform enable (popup user gesture)
  → permissions.request(host)
  → chrome.scripting.registerContentScripts
  → inject into open matching tabs

Safe mode
  → only PING/HEALTH/CONFIG_GET/FEATURE_FLAGS_GET allowed
```

---

## 8. Tools & evaluation subgraph

| Tool          | Path                                 | Role                                                      |
| ------------- | ------------------------------------ | --------------------------------------------------------- |
| Eval harness  | `tools/eval-harness/run-eval.mjs`    | Synthetic P/R/F1/FPR; seed `1581719041`; holdout (−exact) |
| Red team      | `tools/red-team/run-probes.mjs`      | Bypass probes; 37/39 pass; ROT13 residual                 |
| Perf budgets  | `tools/benchmarks/check-budgets.mjs` | PART_23 CI slack gates                                    |
| Certification | `tools/certification/check.mjs`      | Gate encoding                                             |

---

## 9. Documentation authority map

| Authority            | Document                                                          |
| -------------------- | ----------------------------------------------------------------- |
| Binding architecture | `blueprint/ARCHITECTURE_FREEZE_v1.0.md`                           |
| Constants owner      | `blueprint/DESIGN_OWNERSHIP_MATRIX.md` + `shared-types/constants` |
| ADRs                 | `blueprint/PART_08_ARCHITECTURAL_DECISION_RECORDS.md`             |
| Threat model         | `blueprint/PART_06_THREAT_MODEL_STRIDE_ABUSE.md`                  |
| Detection design     | `blueprint/PART_13_DETECTION_ENGINE.md`                           |
| Security             | `blueprint/PART_14_SECURITY.md`                                   |
| Non-binding          | `implementation_plan.md`                                          |
| Status truth         | `store/CERTIFICATION_STATUS.json`                                 |
| Limitations          | `UPDATED_LIMITATIONS.md`                                          |
| Bypasses             | `BYPASS_DATABASE.md`                                              |

---

## 10. Blueprint vs implemented (must memorize)

| Blueprint / freeze               | Implemented today                    |
| -------------------------------- | ------------------------------------ |
| Tier-2 NER / Tier-3 CV           | **Not in intercept path**; flags off |
| OCR worker + Tesseract           | **Stub fail-closed HOLD**            |
| `clipboard.read()` intercept     | **Not implemented** (accepted RR-01) |
| Full 11-phase async pipeline     | **Tier-1 sync text + binary HOLD**   |
| Enterprise backend               | **Empty package**                    |
| Live G3 on ChatGPT/Claude/Gemini | **Not signed** (KI-006)              |

**Correct sentence:** “OCR is default-enabled as a _path flag_; capability is absent; binaries HOLD fail-closed.”

---

## 11. Subsystem relationship matrix

| From → To             | Mechanism                  | Trust                         |
| --------------------- | -------------------------- | ----------------------------- |
| CS → SW               | `runtime.sendMessage`      | Validate+auth+rate limit      |
| SW → detection-engine | In-process import          | Pure function                 |
| SW → offscreen        | `offscreen.createDocument` | Stub workers                  |
| Page → CS             | DOM events                 | Untrusted; capture-phase      |
| Overlay → Page        | Shadow DOM closed          | Page cannot style/script into |
| Popup → SW            | Privileged IPC             | Extension page sender         |

---

## 12. Failure modes (control)

| Failure                     | Behavior                         |
| --------------------------- | -------------------------------- |
| Invalid IPC                 | `INVALID_MESSAGE`                |
| Tab sends privileged msg    | `FORBIDDEN`                      |
| Rate exceeded               | `RATE_LIMITED`                   |
| Safe mode                   | `SAFE_MODE`                      |
| Text oversize               | BLOCK/HOLD fail-closed           |
| Binary without OCR          | HOLD                             |
| SW unavailable at intercept | HOLD (ADR-036)                   |
| ROT13 secret                | ALLOW (accepted residual)        |
| User Allow Anyway           | Releases payload (HITL residual) |

---

_End knowledge graph. Cite this file in interviews when asked “how does the system fit together?”_
