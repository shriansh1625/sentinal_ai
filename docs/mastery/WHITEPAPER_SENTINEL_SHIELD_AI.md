# Sentinel Shield AI

## Designing a Local-First Privacy Firewall for Browser-Based Generative AI Systems

**Document type:** Engineering whitepaper (internal review committee style)  
**Version:** 0.2.1 (extension package)  
**Date:** 2026-07-13  
**Status:** Engineering Release Candidate / Public Chrome Web Store **NO-GO**  
**Classification:** Technical — not marketing

---

## Abstract

Browser-based generative AI systems create a new exfiltration path: users paste or upload sensitive text and files directly into third-party web applications. Traditional endpoint antivirus and network DLP often miss this path because content never crosses a corporate network boundary as a distinct protocol transaction—it is delivered through ordinary web APIs inside a trusted browser session.

Sentinel Shield AI is a Chromium Manifest V3 extension that intercepts paste, file upload, and drag-and-drop events on user-enabled AI host origins, performs **on-device Tier-1 detection** (regex, checksum validation, entropy heuristics, and bounded decode/rescan), and returns a policy decision (allow, hold/warn, redact, or block) before content is released to the page. Detection executes in a pure library with **no network I/O**.

This paper describes the threat model, architecture, security decisions, evaluation methodology, red-team results, limitations, and residual risks. We explicitly distinguish **implemented** capabilities from **flagged-but-unavailable** paths (notably OCR) and from **future** work. We do not claim enterprise DLP parity, Chrome Web Store readiness, or production-traffic-validated precision.

---

## 1. Problem Statement

Knowledge workers paste credentials, personal data, and proprietary text into AI assistants (chat UIs, coding agents, search copilots). The browser is the control plane. Once content reaches page JavaScript, the confidentiality boundary has effectively moved to a third party.

**Requirements derived from the problem:**

1. Intercept before page consumption where DOM events exist.
2. Detect on-device (sending paste content to a cloud scanner recreates the failure).
3. Prefer fail-closed honesty over silent unscanned release.
4. Minimize permissions (AI hosts, not `<all_urls>`).
5. Keep claims auditable.

---

## 2. Threat Landscape

| Path                 | Description                                  |
| -------------------- | -------------------------------------------- |
| Accidental paste     | Secrets in clipboard pasted into AI chat     |
| Upload               | Config files, exports, screenshots           |
| Drag-drop            | Same as upload via drop events               |
| Encoding bypass      | Spacing, HTML entities, hex/base64 wrapping  |
| Channel bypass       | `clipboard.readText()`, native apps, iframes |
| User override        | “Allow anyway” after warning                 |
| Extension compromise | Malicious update, storage theft              |

Attack trees and STRIDE detail: `blueprint/PART_06_THREAT_MODEL_STRIDE_ABUSE.md`.

---

## 3. Related Work (honest positioning)

| Class                       | Relation                                                                        |
| --------------------------- | ------------------------------------------------------------------------------- |
| Enterprise DLP / CASB       | Broader channels, often network/endpoint; different trust and deployment        |
| Secret scanners (CI)        | Similar regex/entropy ideas; different runtime and UX constraints               |
| Browser security extensions | Overlap in MV3 constraints; product goals differ                                |
| On-device ML privacy tech   | Blueprint includes NER/OCR; **not enabled** as working modalities in current RC |

We claim a **narrow, local-first AI-host paste/upload firewall**, not superiority over commercial DLP.

---

## 4. Threat Model and Trust Boundaries

**Trusted:** Extension service worker, extension pages, encrypted storage, pure detection library.  
**Untrusted:** Web page JavaScript, AI host DOM, network (unused by detection).

**Invariant:** Content scripts do not speak to offscreen documents directly; the service worker is the coordinator.

Accepted platform residuals include clipboard API reads outside paste handlers, iframe gaps (`allFrames: false`), and user overrides.

---

## 5. Architecture

### 5.1 Delivery

Chromium MV3 extension (`ADR-001`). Architecture Freeze v1.0 binds scope.

### 5.2 Packages

| Package              | Role                           | Status                |
| -------------------- | ------------------------------ | --------------------- |
| `shared-types`       | Constants, IPC types           | Implemented           |
| `core`               | Flags, logging, rate limits    | Implemented           |
| `browser-adapters`   | Storage/crypto/IPC assert      | Implemented           |
| `detection-engine`   | Pure Tier-1                    | Implemented           |
| `extension`          | SW, CS, UI, offscreen scaffold | Implemented           |
| `enterprise-backend` | Placeholder                    | **Unsupported in v1** |

### 5.3 Runtime path (implemented)

Capture-phase interception → `INTERCEPT_EVENT` → validate/auth/rate-limit → Tier-1 `scanText` for text → policy → overlay. Binary/non-text → **HOLD** (OCR unavailable).

### 5.4 Blueprint vs implementation

The blueprint describes Tier-2 NER and Tier-3 OCR/CV. **Current intercept handlers run Tier-1 text only.** OCR is default-enabled as a **feature flag** but **capability is absent** (WASM not vendored) → fail-closed HOLD (`KI-002`). NER/CV remain **disabled by design** (`ADR-037`).

---

## 6. Detection Pipeline

**Implemented:**

1. Size gate (`MAX_TEXT_SCAN_BYTES = 1 MiB`) fail-closed
2. Adversarial preprocess (space/tab collapse, newline join, HTML entities)
3. Catalog regex + entropy
4. Bounded base64/hex decode+rescan (`MAX_DECODE_DEPTH = 3`)
5. Luhn (PAN) / MOD-97 (IBAN)
6. Risk score → policy action

**Implemented but disabled by design:** NER, CV, telemetry, cloud explain, history (default off).

**Planned / unsupported today:** Working OCR/PDF WASM; typing interception; Firefox; enterprise policy backend.

---

## 7. Security Decisions

| Decision           | Summary                                    |
| ------------------ | ------------------------------------------ |
| Local-first        | No detection network I/O                   |
| IPC auth           | Privileged messages blocked from tabs      |
| Dual rate limits   | 30 IPC/min/tab; 20 scans/min/tab           |
| Closed Shadow DOM  | Overlay isolation                          |
| Approval nonce     | Prevent forged re-dispatch                 |
| AES-GCM + Argon2id | At-rest encryption; history off by default |
| ADR-036            | No silent unscanned release                |
| Allowlist logging  | Avoid deny-list false safety               |

---

## 8. Performance

Design contracts exist in `shared-types` (e.g., peak memory 256 MB, OCR P99 3000 ms).  
**Empirical CI gate:** `pnpm bench:budgets` validates selected latency medians under slack and extension dist ≪ 25 MB.

**OCR timing is not empirically verified** because WASM is absent. Tier-1 Node/eval latencies are sub-millisecond to low-millisecond on synthetic inputs—useful for engineering, not device-lab marketing (`KI-012`).

---

## 9. Evaluation Methodology

Harness: `tools/eval-harness/run-eval.mjs`  
Seed: `1581719041` (reproducibility contract)  
Corpus: synthetic benign + malicious (including adversarial slices)

**Honesty constraints:** synthetic ≠ production; `malicious_exact` is in-distribution optimistic; holdout metrics excluding exact catalog positives are reported for scientific humility.

### Published Phase B → Phase C (same seed)

| Metric        | BEFORE | AFTER (Phase C)            |
| ------------- | ------ | -------------------------- |
| Precision     | 0.9022 | 0.9941                     |
| Recall        | 0.8388 | 0.8694                     |
| F1            | 0.8694 | 0.9276                     |
| FPR           | 0.0909 | 0.0052                     |
| Spaced recall | 0.000  | 0.7032                     |
| Hard-neg FPR  | 0.303  | 0.0173                     |
| ROT13 recall  | 0.710  | 0.2592 (accepted tradeoff) |

Gap-board refinements (phone precision gate, holdout reporting) further reduced synthetic FPR; **do not advertise as production precision**.

---

## 10. Red Team

Probe harness: `tools/red-team/run-probes.mjs`  
Result class: **37 / 39** pass; **2** accepted bypasses (`RT-ROT13-AWS`, `RT-ROT13-SK`); **0** false positives in probe set.  
Fixed classes: whitespace/newline chunking, HTML entities, hex, entropy FP.  
Catalog: `BYPASS_DATABASE.md`.

---

## 11. Limitations and Residual Risks

| Item                    | Status                 |
| ----------------------- | ---------------------- |
| ROT13 / weak ciphers    | Accepted residual      |
| OCR images/PDFs         | Fail-closed HOLD       |
| `clipboard.readText()`  | Accepted (RR-01)       |
| Typing interception     | Out of scope           |
| Live host G3 sign-off   | Public blocker KI-006  |
| Privacy policy URL      | Public blocker KI-018  |
| User Allow Anyway       | Product residual RR-09 |
| Enterprise backend      | Unsupported            |
| Production traffic eval | Not done               |

Full list: `UPDATED_LIMITATIONS.md`.

---

## 12. Future Work

1. Integrity-pinned OCR/PDF WASM + G0 empirical benches before release-channel enablement
2. Live host CDP/manual G3 closure
3. Counsel-approved privacy policy
4. External corpora / independent eval
5. Optional enterprise policy plane (new ADR; not current package)

---

## 13. Lessons Learned

1. **Flag ≠ capability.** OCR default true without WASM created narrative hazard.
2. **Unused controls are interview liabilities** (scan rate limiter until wired).
3. **Precision beats detector count.**
4. **Synthetic eval needs holdout honesty.**
5. **Architecture freeze enables mastery;** endless coding does not.

---

## 14. Conclusion

Sentinel Shield AI demonstrates a coherent, local-first approach to reducing accidental secret disclosure into browser AI applications, with Tier-1 detection, adversarial preprocess, explicit fail-closed behavior for unavailable modalities, and documented residuals. It is an **engineering case study and load-unpacked beta candidate**, not a publicly certified production DLP product.

**Engineering implementation has reached diminishing returns** relative to documentation, external validation, and interview defense.

---

## References

1. `blueprint/ARCHITECTURE_FREEZE_v1.0.md`
2. `blueprint/PART_04_SYSTEM_ARCHITECTURE.md`
3. `blueprint/PART_06_THREAT_MODEL_STRIDE_ABUSE.md`
4. `blueprint/PART_08_ARCHITECTURAL_DECISION_RECORDS.md`
5. `blueprint/PART_13_DETECTION_ENGINE.md`
6. `POST_REMEDIATION_EVALUATION.md`
7. `BYPASS_DATABASE.md` / `RED_TEAM_REPORT.md`
8. `store/CERTIFICATION_STATUS.json`
9. `UPDATED_LIMITATIONS.md`
10. `FINAL_ENGINEERING_BOARD_REVIEW.md`
11. `PROJECT_KNOWLEDGE_GRAPH.md`

---

## Capability matrix (normative for this paper)

| Capability                                           | Label                                             |
| ---------------------------------------------------- | ------------------------------------------------- |
| Paste/upload/drag-drop intercept on enabled AI hosts | **Implemented**                                   |
| Tier-1 text detection + policy overlay               | **Implemented**                                   |
| Scan/IPC rate limits                                 | **Implemented**                                   |
| Encrypted settings; history default off              | **Implemented**                                   |
| OCR/PDF visual extraction                            | **Flagged; capability unsupported (fail-closed)** |
| NER / CV                                             | **Disabled by design**                            |
| Enterprise backend                                   | **Unsupported**                                   |
| CWS public distribution                              | **Not authorized**                                |
| Typing interception                                  | **Unsupported (freeze)**                          |
