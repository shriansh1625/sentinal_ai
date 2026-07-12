# PART 01 — EXECUTIVE VISION

**Document ID:** SS-BP-001
**Classification:** Internal Engineering — Principal Review
**Version:** 1.0.0
**Last Updated:** 2026-07-12
**Owner:** Product Architect
**Reviewers:** Principal Security Architect, Distinguished AI Engineer, Staff Product Engineer

---

## Executive Summary

Sentinel Shield AI is a **local-first, offline-capable privacy assistant for supported AI websites** that intercepts common paste, file-upload, and drag-drop paths, analyzes content on-device, and **warns** the user before they choose to allow, block, or redact. It is a Chromium Manifest V3 extension; core detection requires zero cloud infrastructure. It does **not** claim to intercept every possible browser data path (see `DESIGN_OWNERSHIP_MATRIX.md` §4 and PART_29 for platform limitations such as Clipboard API reads). The product exists because GenAI use has created a large class of inadvertent disclosure — credentials, documents, and PII pasted or uploaded to AI systems.

This document establishes the engineering vision that every subsequent blueprint references. Every architectural decision, every performance budget, every security control in this repository traces back to the principles defined here.

---

## 1. Objectives

### 1.1 Primary Objectives

| ID | Objective | Measurable Target |
|---|---|---|
| OBJ-001 | Intercept paste, upload, and drag-drop on **supported** AI platforms and require an informed user decision before release (or enterprise hold) | ≥99.5% successful intercept on Guaranteed endpoints (PART_29 A–C) in E2E suite; Clipboard API / programmatic paths = Platform limitation |
| OBJ-002 | Detect structured PII with production-grade accuracy | ≥97% precision, ≥95% recall for structured entities (cards, IDs, keys) |
| OBJ-003 | Operate entirely offline with zero cloud dependency for detection | 0 network requests in detection pipeline |
| OBJ-004 | Ship a browser extension that meets Chrome Web Store review standards | Pass CWS review on first submission |
| OBJ-005 | Achieve sub-200ms detection latency for text inputs under 10KB | P99 < 200ms measured on mid-range hardware (Intel i5, 8GB RAM) |
| OBJ-006 | Support enterprise deployment via CBCM, GPO, and MDM | Verified deployment on all three channels |

### 1.2 Non-Objectives (Explicit Exclusions)

| ID | Non-Objective | Rationale |
|---|---|---|
| NOBJ-001 | We do NOT build a cloud-hosted DLP service | Violates local-first, creates new privacy risk, commoditized market |
| NOBJ-002 | We do NOT monitor browsing history or behavior | Unnecessary for detection, creates privacy liability, increases permissions |
| NOBJ-003 | We do NOT intercept data on non-AI platforms by default | Scope creep, UX degradation, excessive permissions |
| NOBJ-004 | We do NOT provide endpoint security (malware, virus) | Different product category, different expertise, different market |
| NOBJ-005 | We do NOT store any raw detected PII values | Storing the thing we protect against would be architecturally contradictory |
| NOBJ-006 | We do NOT require account creation for individual users | Friction kills adoption, unnecessary for local-only product |

---

## 2. Dependencies

### 2.1 External Dependencies

| Dependency | Type | Risk Level | Mitigation |
|---|---|---|---|
| Chrome Extensions API (Manifest V3) | Platform | Low | Stable API, Google committed to MV3 long-term |
| Tesseract.js (WASM build) | Library | Low | Apache-2.0, large community, vendor if needed |
| Transformers.js / ONNX Runtime Web | Library | Medium | Apache-2.0/MIT, but rapid version churn — pin versions |
| pdf.js | Library | Low | Mozilla-maintained, production-grade, Apache-2.0 |
| TensorFlow.js (BlazeFace model) | Library | Low | Google-maintained, Apache-2.0 |
| ZXing-WASM | Library | Low | Apache-2.0, mature C++ codebase compiled to WASM |

### 2.2 Internal Dependencies

| Dependency | Type | Risk Level |
|---|---|---|
| `shared-types` package | Package | None — fully under our control |
| `detection-engine` package | Package | None — fully under our control |
| Custom fine-tuned NER model | ML Model | Medium — requires ML pipeline and training data |
| Knowledge graph data | Data | Low — curated internally |

---

## 3. Design Principles

These principles are **non-negotiable**. Any proposed change that violates a principle must be escalated to the Principal Security Architect for review.

### Principle 1: Data Never Leaves the Device (Unless the User Explicitly Sends It)

**Implication:** The detection pipeline has zero network calls. No API endpoints are contacted during scanning. The optional cloud LLM explanation feature is the ONLY network call, and it never transmits raw detected values — only entity type metadata.

**Enforcement:** CI pipeline includes a static analysis check that the detection engine package has zero `fetch()`, `XMLHttpRequest`, `WebSocket`, or `navigator.sendBeacon` calls. Any import of networking APIs in the detection engine is a build failure.

### Principle 2: Secure by Default, Degrade Gracefully

**Implication:** Out-of-the-box configuration provides maximum protection. Users opt *down* from security, never *up*. When components fail (OCR crashes, NER times out, Worker dies), the system degrades to the next-best detection tier — never silently fails.

**Enforcement:** Default settings are hardcoded, not loaded from external configuration. Settings schema defines `default` values that represent maximum security. Failure paths are explicitly tested in integration tests.

### Principle 3: Deterministic Detection Before Probabilistic Detection

**Implication:** Regex with checksum validation (deterministic, near-100% accuracy for structured data) always runs before NER inference (probabilistic). This ensures that a Luhn-validated credit card number is detected with certainty even if the NER model fails to load.

**Enforcement:** Detection pipeline architecture enforces tier ordering. Tier 1 (regex+checksum+entropy) MUST complete before Tier 2 (NER) results are awaited.

### Principle 4: The Extension is the Product (No Backend Required)

**Implication:** Individual users install the extension and are fully protected. Zero backend infrastructure. Zero account creation. Zero API keys required. The enterprise backend is a separate, optional product for fleet management — not a dependency.

**Enforcement:** The `extension` package has zero imports from the `enterprise-backend` package. The extension's `manifest.json` declares no host permissions for our own backend.

### Principle 5: Minimal Attack Surface

**Implication:** Every permission, every dependency, every API surface is a potential attack vector. We minimize all three aggressively. Static permissions are limited to `storage`, `activeTab`, `scripting`, `offscreen`. Host permissions are optional and dynamic. Dependencies are minimized and audited.

**Enforcement:** Manifest validator in CI rejects unauthorized permissions. Dependency count is tracked as a CI metric. New dependencies require ADR approval.

### Principle 6: Explainability is a Feature, Not an Afterthought

**Implication:** Every detection must produce a human-readable explanation that tells the user: (1) what was detected, (2) why it's sensitive, (3) what could happen if shared, (4) what they should do. Explanations are generated locally by default.

**Enforcement:** The `DetectionResult` type requires a non-empty `explanation` field. Unit tests verify that every entity type has a corresponding explanation template.

### Principle 7: Human-in-the-Loop Always

**Implication:** Sentinel Shield never silently blocks data. It always presents findings to the user and lets them make an informed decision: allow, block, or redact. The user is the final authority.

**Enforcement:** The content script's overlay must be displayed for every non-trivial detection. There is no "auto-block" mode for individual users. Enterprise "block" mode still shows the user why their upload was blocked.

---

## 4. Threat Model (Vision-Level)

### 4.1 What We Protect Against

| Threat Category | Description | Example |
|---|---|---|
| **Inadvertent PII Disclosure** | Users accidentally share personal information with AI platforms | Pasting an Aadhaar number into ChatGPT |
| **Credential Leakage** | Developers paste secrets, API keys, or private keys into AI code assistants | Pasting AWS secret key into Cursor AI |
| **Document Exposure** | Users upload sensitive documents for AI analysis | Uploading a tax return PDF to Gemini |
| **Visual PII Exposure** | Users share images containing faces, signatures, or identity documents | Uploading a photo of a PAN card to Claude |
| **Clipboard Contamination** | Sensitive data left in clipboard is pasted into AI platforms | Copying a password, then pasting into ChatGPT |

### 4.2 What We Do NOT Protect Against

| Exclusion | Rationale |
|---|---|
| **Data already sent to AI platforms** | We are pre-upload, not post-upload. Data already transmitted is beyond our control. |
| **Malware on the device** | We are a browser extension, not an endpoint security agent. A rootkit can bypass any browser extension. |
| **User intentionally sharing sensitive data after being warned** | We inform and recommend. We do not enforce (except in enterprise block mode). |
| **AI platform behavior after data is received** | We cannot control how OpenAI, Google, or Anthropic handle data. We prevent the data from reaching them. |
| **Side-channel attacks on the browser** | Spectre/Meltdown-class attacks are browser-level concerns, not extension-level. |

### 4.3 Trust Boundaries

| Boundary | Trust Level | Justification |
|---|---|---|
| User's device | Trusted (within reason) | We cannot protect against a compromised OS. This is documented as a shared responsibility. |
| Browser sandbox | Trusted | Chrome's sandbox is the industry standard. We rely on it for process isolation. |
| Extension sandbox | Trusted | Our code, our build, our distribution. We control this entirely. |
| Web page context (AI platform) | Untrusted | The AI platform's JavaScript can attempt to manipulate our content scripts. All DOM interaction is defensive. |
| Network | Untrusted | All optional network calls use TLS 1.3 minimum. Certificate validation is enforced. |
| Other extensions | Untrusted | Other installed extensions may be malicious. We isolate via `chrome.storage.local` encryption and no `externally_connectable`. |

---

## 5. Architecture Decisions (ADR)

### ADR-001: Browser Extension as Primary Delivery Vehicle

**Context:** The product needs to intercept data flowing from users to AI platforms. The interception point must be in the browser, where the user interacts with AI platforms.

**Problem:** What is the optimal delivery mechanism — browser extension, desktop proxy, DNS-level filter, or network appliance?

**Alternatives Considered:**

| Alternative | Pros | Cons |
|---|---|---|
| Browser Extension | Direct DOM access, inline UI, user-facing, no network dependency | Browser sandbox limits, extension store review, MV3 constraints |
| Desktop Proxy (mitmproxy) | Full network visibility, all apps covered | Requires CA cert install (security risk), complex setup, breaks TLS, can't handle E2E encrypted traffic |
| DNS Filter (Pi-hole style) | Easy deployment | Cannot inspect content, only block entire domains — too coarse |
| Network Appliance | Enterprise-grade, hardware-level | Expensive, requires infrastructure, cannot inspect HTTPS without breaking TLS |
| Browser modification (Brave fork) | Full control | Unsustainable maintenance burden, niche distribution |

**Decision:** Browser extension (Manifest V3, Chromium-based).

**Consequences:**
- We operate within Chrome's sandbox and permission model
- We are limited to the APIs Chrome exposes
- We must pass Chrome Web Store review
- We benefit from Chrome's massive user base and extension ecosystem
- Enterprise deployment via CBCM/GPO/MDM is well-supported

**Rejected Options:** Desktop proxy (breaks TLS, poor UX), DNS filter (too coarse), network appliance (wrong market segment), browser fork (unsustainable).

---

### ADR-002: Local-First Detection with Zero Cloud Dependency

**Context:** The product detects sensitive data. If we use cloud APIs for detection, we create the exact privacy problem we're solving.

**Problem:** How do we achieve high-accuracy PII and secrets detection without cloud AI services?

**Alternatives Considered:**

| Alternative | Pros | Cons |
|---|---|---|
| Cloud NLP APIs (Google DLP, AWS Comprehend) | High accuracy, maintained by experts | Sends user data to cloud — defeats purpose |
| Local regex + checksums only | Fast, deterministic, no ML overhead | Misses unstructured PII (names, addresses, medical terms) |
| Local ML (ONNX/WASM) + regex + checksums | Best of both worlds — deterministic for structured, ML for unstructured | Larger extension size, model loading latency, accuracy depends on model quality |
| Hybrid (local detection + cloud verification) | Potentially higher accuracy | Still sends data to cloud — unacceptable for core pipeline |

**Decision:** Local ML (ONNX/WASM) + regex + checksums, with tiered execution for performance.

**Consequences:**
- Extension bundle size increases (~20MB with models)
- Model accuracy is our responsibility (fine-tuning, evaluation, updates)
- No recurring API costs for users
- Truly offline operation
- We must invest in model optimization (quantization, distillation)

**Rejected Options:** Cloud NLP (privacy violation), regex-only (insufficient for unstructured PII), hybrid (still sends data to cloud).

---

## 6. Implementation Order

This section defines the order in which vision-level components are built. Detailed implementation order is in each subsystem blueprint.

| Order | Component | Rationale |
|---|---|---|
| 1 | Monorepo + build system + CI | Everything else depends on this |
| 2 | Shared types + message protocol | All components communicate via typed messages |
| 3 | Regex + checksum detection engine | Catches 80%+ of structured PII with zero ML |
| 4 | Content script + event interception | The core product interaction: intercept before upload |
| 5 | Service Worker coordinator | Central nervous system for all components |
| 6 | Warning overlay UI (Shadow DOM) | User must see and act on detections |
| 7 | Encrypted storage | All persistence must be encrypted from day one |
| 8 | OCR pipeline | Unlocks image and scanned PDF processing |
| 9 | NER pipeline | Unlocks unstructured PII detection |
| 10 | Risk scoring engine | Contextual risk assessment for better UX |

---

## 7. Folder Structure (Vision-Level)

The complete repository structure is detailed in PART_28_ENGINEERING_HANDBOOK.md. At the vision level:

```
sentinel-shield/
├── packages/
│   ├── extension/          # Browser extension (primary product)
│   ├── detection-engine/   # Core detection library
│   ├── shared-types/       # TypeScript types and interfaces
│   └── enterprise-backend/ # Optional enterprise API (Phase 4)
├── blueprint/              # This engineering blueprint repository
├── handbook/               # Execution guides
├── tools/                  # Build scripts, benchmarks, validators
├── tests/                  # Cross-package test suites
└── docs/                   # User-facing documentation
```

---

## 8. API Contracts (Vision-Level)

At the vision level, there is one critical API contract: the **Internal IPC Message Protocol** that all extension components use to communicate.

### Message Envelope

Every IPC message between extension components (content script, service worker, offscreen document, popup) follows this envelope:

```
{
  "type": "SCAN_REQUEST" | "SCAN_RESULT" | "REDACT_REQUEST" | ...,
  "id": "uuid-v4",
  "timestamp": 1720777600000,
  "source": "CONTENT_SCRIPT" | "SERVICE_WORKER" | "OFFSCREEN" | "POPUP",
  "tabId": 12345,
  "payload": { ... }
}
```

**Contract guarantees:**
- Every message has a `type` (enum), `id` (UUID v4), `timestamp` (epoch ms), and `source` (enum)
- Every request message receives exactly one response with the same `id`
- Response must arrive within 30 seconds or sender receives a timeout error
- Unknown message types are rejected and logged
- Messages failing JSON Schema validation are rejected and logged

---

## 9. Interfaces (Vision-Level)

### Core Detection Interface

Every detection engine (regex, NER, entropy, CV) implements this interface:

```
Detector {
  name: string
  supportedInputTypes: InputType[]
  detect(input: ProcessedInput): Promise<Detection[]>
  isReady(): boolean
  initialize(): Promise<void>
  shutdown(): Promise<void>
}
```

This interface enables:
- Hot-swapping detectors without pipeline changes
- Independent testing of each detector
- Feature flags per detector
- Graceful degradation when a detector fails

---

## 10. Data Flow (Vision-Level)

```
User Action (paste/upload/drag)
    │
    ▼
Content Script (event capture)
    │ chrome.runtime.sendMessage
    ▼
Service Worker (coordinator)
    │ Validate + route
    ├──► Tier 1: Regex + Checksum + Entropy (in SW)
    │        │ results
    │        ▼
    │    Aggregate
    │
    ├──► Tier 2: NER (via Offscreen → Worker)
    │        │ results
    │        ▼
    │    Aggregate
    │
    ├──► Tier 3: CV (via Offscreen → Worker) [images only]
    │        │ results
    │        ▼
    │    Aggregate
    │
    ▼
Risk Engine (score calculation)
    │
    ▼
Explanation Engine (template-based)
    │
    ▼
Service Worker → Content Script (results)
    │
    ▼
Shadow DOM Overlay (user decision)
    │
    ├── Allow → Release to page
    ├── Block → Discard
    └── Redact → Redaction Engine → Release sanitized
```

---

## 11. State Flow (Vision-Level)

### Extension State Machine

```
UNINITIALIZED → INITIALIZING → READY → SCANNING → AWAITING_USER → RELEASING/BLOCKING/REDACTING → READY
                      │                    │
                      ▼                    ▼
                ERROR (recoverable)   ERROR (recoverable)
                      │                    │
                      ▼                    ▼
                 READY (retry)       READY (partial results)
```

State is managed in the Service Worker and persisted to `chrome.storage.session` for survival across Service Worker restarts.

---

## 12. Edge Cases

| Edge Case | Handling |
|---|---|
| User pastes while previous scan is in progress | Queue the new scan. Process sequentially per tab. |
| Service Worker restarts mid-scan | State is checkpointed to `chrome.storage.session`. On restart, either resume or re-request from content script. |
| User navigates away during scan | Cancel the scan. Content script sends `SCAN_CANCELLED` message. Workers are not interrupted (they complete and results are discarded). |
| Extension update during active session | Chrome handles this gracefully — new version activates on next Service Worker activation. In-progress scans complete with old version. |
| User disables extension while scan is pending | Content script is removed by Chrome. Pending upload is released (fail-open for individual users, fail-closed for enterprise with `enforcementMode: "block"`). |

---

## 13. Failure Modes

| Failure | Impact | Recovery |
|---|---|---|
| Offscreen Document crashes | OCR, NER, CV unavailable | Service Worker detects via health check timeout. Recreates Offscreen Document. Falls back to Tier 1 detection. |
| Web Worker OOM | Single processing engine down | Worker terminates. Offscreen Document respawns it. Scan returns partial results. |
| WASM instantiation fails | Specific engine (Tesseract, ONNX) unavailable | Logged. Health status updated. Other engines continue. User warned of degraded mode. |
| IndexedDB full | Cannot store scan history | Auto-purge triggered. Oldest entries deleted. Current scan not blocked. |
| Model file corrupted in cache | NER produces garbage results | Checksum validation on load fails. Model re-downloaded from bundled copy in extension package. |
| Content script fails to inject | No interception on current page | Service Worker retries injection on next page load. Badge shows warning state. |

---

## 14. Performance Budget (Vision-Level)

| Metric | Budget | Justification |
|---|---|---|
| Text scan (1KB) | < 50ms | User should not perceive any delay on paste |
| Text scan (10KB) | < 200ms | Acceptable for larger pastes |
| Image scan (1080p) | < 3s | OCR is inherently slow; 3s is acceptable with progress indicator |
| PDF scan (10 text pages) | < 1s | Text extraction is fast |
| Extension cold start | < 500ms | Service Worker activation must be fast |
| Extension memory (idle) | < 50MB | Extension should not impact browser performance |
| Extension memory (peak) | < **256MB** | Canonical `EXT_PEAK_MEM_MB`; serialize heavy WASM; NER off by default in v1 |
| Extension package size | < 25MB | Chrome Web Store limit is 50MB; we target half for headroom |

---

## 15. Memory Budget (Vision-Level)

| Component | Budget | Notes |
|---|---|---|
| Service Worker (idle) | < 10MB | Minimal state in memory |
| Content Script (per tab) | < 5MB | Lightweight event listener |
| Offscreen Document (idle) | < 20MB | Worker pool skeleton |
| OCR Worker (active) | < 100MB | Tesseract WASM + language data |
| NER Worker (active) | < 80MB | ONNX model in memory |
| CV Worker (active) | < 50MB | BlazeFace + ZXing + OpenCV subset |
| Popup UI | < 10MB | React/Lit is lightweight |
| Dashboard | < 15MB | Chart rendering, scan history |

---

## 16. Security Risks (Vision-Level)

| Risk | Severity | Probability | Mitigation |
|---|---|---|---|
| Supply chain attack on npm dependency | Critical | Medium | Minimal deps, npm audit, WASM integrity verification |
| Compromised Chrome Web Store account | Critical | Low | FIDO2 hardware key, two-person publishing |
| Extension impersonation (typosquat) | High | Medium | Trademark registration, Web Store monitoring |
| Memory dump revealing PII | High | Low | Minimize PII lifetime in memory, Worker termination |
| Malicious content script injection by page | Medium | Low | Shadow DOM isolation, no `externally_connectable` |

---

## 17. Privacy Risks (Vision-Level)

| Risk | Severity | Mitigation |
|---|---|---|
| Extension logs contain PII | High | PII sanitizer middleware on all log calls |
| Scan history reveals user behavior | Medium | History stores only entity types, not values. Encrypted. Auto-purged. |
| Optional telemetry reveals usage patterns | Low | Disabled by default. Differential privacy if enabled. |
| Cloud LLM calls leak entity context | Medium | Never send raw values. Only entity types. Template-based fallback. |

---

## 18. Attack Surface (Vision-Level)

| Surface | Exposure | Controls |
|---|---|---|
| Content script (DOM interaction) | High (runs on AI platform pages) | Shadow DOM isolation, capture-phase listeners, input validation |
| IPC messages | Medium (chrome.runtime messaging) | JSON Schema validation, source verification, rate limiting |
| IndexedDB | Medium (accessible to extension context) | AES-256-GCM encryption |
| WASM modules | Medium (execute arbitrary computation) | SHA-256 integrity verification, sandboxed in Workers |
| Optional network calls | Low (only cloud LLM, user-initiated) | TLS 1.3, certificate pinning, no raw PII in transit |

---

## 19. Mitigations Summary

| Control | Scope | Implementation |
|---|---|---|
| Encryption at rest | All stored data | AES-256-GCM via Web Crypto API |
| Schema validation | All IPC messages | JSON Schema v7 validation |
| Integrity verification | All WASM binaries | SHA-256 checksum comparison |
| PII sanitization | All log output | Regex-based sanitizer middleware |
| Permission minimization | Manifest | Dynamic permissions, `optional_host_permissions` |
| Dependency auditing | Build pipeline | npm audit, Snyk, license checker |
| Build reproducibility | CI/CD | Pinned tool versions, deterministic builds |
| Content isolation | UI | Shadow DOM with closed mode |

---

## 20. Testing Strategy (Vision-Level)

| Layer | Coverage Target | Tool |
|---|---|---|
| Unit | ≥ 90% line, ≥ 85% branch | Vitest + c8 |
| Integration | ≥ 80% module boundary coverage | Vitest |
| E2E Browser | All critical user journeys | Playwright |
| Security | OWASP checklist + custom checks | Manual + automated |
| Performance | All budget targets | Custom benchmarks |
| Accessibility | WCAG 2.1 AA | axe-core + manual audit |

---

## 21. Acceptance Criteria (Vision-Level)

For Sentinel Shield AI v1.0.0 to be considered production-ready:

- [ ] Extension installs cleanly on Chrome ≥ 120, Edge ≥ 120, Brave ≥ 1.60
- [ ] Text paste interception works on ChatGPT, Claude, Gemini, Copilot, DeepSeek, Perplexity
- [ ] File upload interception works on all above platforms
- [ ] Drag-and-drop interception works on all above platforms
- [ ] Clipboard paste interception works on all above platforms
- [ ] PDF text extraction works for text-based PDFs
- [ ] OCR works for scanned PDFs and images
- [ ] Regex detection: ≥97% precision, ≥95% recall for structured PII
- [ ] NER detection: ≥85% precision, ≥80% recall for unstructured PII
- [ ] Face detection works in uploaded images
- [ ] QR/barcode detection works in uploaded images
- [ ] Risk scoring produces correct risk levels for all entity types
- [ ] Explanation generation produces correct explanations for all entity types
- [ ] Redaction works for text, images, and PDFs
- [ ] Encrypted storage works with and without user passphrase
- [ ] Extension functions with 0% network availability
- [ ] All performance budgets met on reference hardware
- [ ] All security tests pass
- [ ] All accessibility standards met
- [ ] Chrome Web Store review passed
- [ ] No known critical or high-severity vulnerabilities

---

## 22. Production Checklist

- [ ] All acceptance criteria met
- [ ] External security audit completed and findings remediated
- [ ] Performance benchmarks published and within budget
- [ ] Privacy policy published and reviewed by legal counsel
- [ ] Chrome Web Store listing complete (description, screenshots, privacy policy)
- [ ] FIDO2 hardware key configured for Web Store publisher account
- [ ] Two-person publishing rule established
- [ ] Canary release plan documented
- [ ] Rollback procedure documented and tested
- [ ] Monitoring dashboard configured
- [ ] On-call rotation established
- [ ] Incident response plan documented
- [ ] CHANGELOG.md up to date
- [ ] SECURITY.md published with vulnerability disclosure process
- [ ] README.md includes build, test, and contribution instructions

---

## 23. Future Improvements

| Improvement | Phase | Rationale |
|---|---|---|
| Firefox WebExtension port | Phase 3 | Expand market reach |
| Desktop app (Electron) | Phase 5 | Cover non-browser AI tools |
| VS Code extension | Phase 5 | Cover developer workflow |
| Slack / Teams integration | Phase 5 | Cover enterprise communication |
| Custom enterprise detection rules | Phase 4 | Enterprise differentiation |
| Multi-language NER models | Phase 5 | Global market expansion |
| Federated model updates | Future | Improve detection accuracy without centralizing data |
| Homomorphic encryption for cloud explanation | Future | Enable cloud explanations without any data exposure |
