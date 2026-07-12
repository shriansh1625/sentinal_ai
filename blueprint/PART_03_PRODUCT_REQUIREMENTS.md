# PART 03 — PRODUCT REQUIREMENTS

**Document ID:** SS-BP-003
**Classification:** Internal Engineering — Principal Review
**Version:** 1.0.0
**Last Updated:** 2026-07-12
**Owner:** Product Architect, Staff Product Engineer
**Reviewers:** Principal Security Architect, Principal UX Designer

---

## Executive Summary

This document specifies every functional and non-functional requirement for Sentinel Shield AI with engineering-grade precision. Each requirement has an ID, priority, acceptance criteria, and test strategy. Requirements are organized by domain: detection, input processing, user experience, enterprise, privacy, and platform compatibility. This document is the single source of truth for "what we build" — all implementation blueprints reference requirements from this document.

---

## 1. Objectives

| ID | Objective |
|---|---|
| OBJ-001 | Provide a complete, unambiguous specification of every product feature |
| OBJ-002 | Define acceptance criteria that serve as automated test conditions |
| OBJ-003 | Establish priority tiers (P0-P3) that map directly to implementation phases |
| OBJ-004 | Define non-functional requirements with measurable, testable targets |

---

## 2. Dependencies

| Dependency | Type |
|---|---|
| PART_01_EXECUTIVE_VISION.md | Defines scope, principles, and non-objectives |
| PART_02_REAL_WORLD_PROBLEM_ANALYSIS.md | Defines entity taxonomy and platform analysis |

---

## 3. Requirement Priority Definitions

| Priority | Definition | Phase |
|---|---|---|
| **P0** | Must have for v1.0 launch. Product is non-viable without it. | Phase 1-2 |
| **P1** | Must have for v1.0 launch. Product is significantly degraded without it. | Phase 2-3 |
| **P2** | Important for market differentiation. Can launch without but should follow quickly. | Phase 3-4 |
| **P3** | Nice to have. Enhances product but not critical. | Phase 4-5 |

---

## 4. Functional Requirements: Detection (FR-DET)

### FR-DET-001: Government Identity Document Detection

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Description** | Detect government-issued identity document numbers (Aadhaar, PAN, Passport, Driving License, Voter ID, SSN) in text, OCR-extracted text from images, and OCR-extracted text from PDFs |
| **Entities** | Aadhaar (12-digit, Verhoeff), PAN (ABCDE1234F), Passport (A1234567), SSN (XXX-XX-XXXX) |
| **Input Types** | Plain text, pasted text, file content (TXT, MD, CSV, JSON, XML, DOCX), OCR text from images, OCR text from PDFs |
| **Detection Strategy** | Regex with checksum validation (Tier 1) + NER reinforcement (Tier 2) |
| **Accuracy Target** | Precision ≥ 97%, Recall ≥ 95% |
| **False Positive Mitigation** | Checksum validation eliminates random digit sequences. ISBN disambiguation via context. |
| **Acceptance Criteria** | (1) Detects valid Aadhaar `2234 5678 9012` with Verhoeff-valid checksum. (2) Rejects `1234 5678 9012` with invalid checksum. (3) Detects PAN `ABCDE1234F`. (4) Rejects `12345ABCDE` (wrong format). (5) Detects across all whitespace/dash formatting variants. (6) Works in pasted text, uploaded TXT, uploaded PDF (text-based), uploaded image (via OCR). |
| **Test Strategy** | Unit: 20+ valid patterns per entity, 10+ invalid patterns. Integration: end-to-end paste → detect → display. |

### FR-DET-002: Financial Information Detection

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Description** | Detect financial instrument numbers (credit cards, debit cards, UPI IDs, bank accounts, IFSC, SWIFT, IBAN) |
| **Detection Strategy** | Regex + Luhn checksum (cards), MOD-97 (IBAN), format validation (others) |
| **Accuracy Target** | Precision ≥ 99% (cards, with Luhn), ≥ 95% (others) |
| **Acceptance Criteria** | (1) Detects Visa `4111111111111111` (Luhn valid). (2) Detects Mastercard `5500000000000004`. (3) Detects Amex `371449635398431`. (4) Detects RuPay `6521000000000000`. (5) Rejects random 16-digit sequences that fail Luhn. (6) Detects UPI `username@okicici`. (7) Detects IFSC `SBIN0001234`. (8) Detects IBAN with valid MOD-97. |
| **Test Strategy** | Unit: all major card networks (Visa, MC, Amex, Discover, RuPay), all formats (spaced, dashed, continuous). |

### FR-DET-003: Secrets and Credential Detection

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Description** | Detect API keys, tokens, private keys, certificates, connection strings, passwords in context, .env file contents, cookies |
| **Detection Strategy** | Prefix-based regex (AWS `AKIA`, GitHub `ghp_`, etc.) + entropy analysis + PEM header detection + connection string protocol prefix |
| **Accuracy Target** | Precision ≥ 95%, Recall ≥ 90%. False positive rate < 2% for high-entropy detection. |
| **Acceptance Criteria** | (1) Detects `AKIAIOSFODNN7EXAMPLE`. (2) Detects `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (36 chars). (3) Detects `sk-proj-xxxxxxx...` (OpenAI). (4) Detects `-----BEGIN RSA PRIVATE KEY-----`. (5) Detects `mongodb://user:pass@host:27017/db`. (6) Detects high-entropy strings in password context. (7) Does NOT flag `sk_test_...` (Stripe test key) as high-severity. (8) Detects JWT format. |
| **Test Strategy** | Unit: every key prefix pattern, entropy thresholds, PEM headers, connection strings. Context tests: same string with/without "password" context. |

### FR-DET-004: Contact Information Detection

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Description** | Detect phone numbers (country-aware) and email addresses |
| **Detection Strategy** | libphonenumber-js for phone parsing and validation. RFC 5322 regex for email. |
| **Accuracy Target** | Phone: Precision ≥ 90%, Recall ≥ 85%. Email: Precision ≥ 95%, Recall ≥ 95%. |
| **Acceptance Criteria** | (1) Detects `+91 98765 43210`. (2) Detects `9876543210` (India, 10-digit). (3) Detects `+1 (555) 123-4567`. (4) Does NOT flag `1234567890` without phone context (too short, no country indicator). (5) Detects `user@example.com`. (6) Does NOT flag `user@localhost` (not a valid public email). |
| **Test Strategy** | Unit: India, US, UK, EU phone formats. Edge cases: numbers with extensions, short codes, toll-free. |

### FR-DET-005: Medical Information Detection

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Description** | Detect medical reports, insurance IDs, ICD diagnosis codes, prescription details |
| **Detection Strategy** | NER (medical entity recognition) + ICD code format regex + document classification + keyword context |
| **Accuracy Target** | Precision ≥ 80%, Recall ≥ 75% (lower due to unstructured nature) |
| **Acceptance Criteria** | (1) Detects ICD-10 codes like `J06.9`. (2) Flags documents containing medical keywords (diagnosis, prescription, lab result) with context. (3) NER detects drug names and dosages. |

### FR-DET-006: Financial Document Detection

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Description** | Detect salary slips, invoices, tax documents based on document classification and keyword analysis |
| **Detection Strategy** | Document classifier (MobileNetV2 for images) + keyword + structural analysis |
| **Accuracy Target** | Precision ≥ 80%, Recall ≥ 75% |
| **Acceptance Criteria** | (1) Classifies uploaded salary slip PDF as "financial document." (2) Classifies tax form image as "financial document." |

### FR-DET-007: Legal Document Detection

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Description** | Detect contracts, NDAs, legal notices based on keyword analysis and document structure |
| **Detection Strategy** | Keyword analysis ("agreement", "hereby", "party", "clause", "whereas") + NER for party names |
| **Accuracy Target** | Precision ≥ 75%, Recall ≥ 70% |

### FR-DET-008: Visual PII Detection

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Description** | Detect faces, signatures in uploaded images and image-based PDFs |
| **Detection Strategy** | BlazeFace for face detection. Contour analysis for signature detection. Both run in CV Worker. |
| **Accuracy Target** | Face: Precision ≥ 90%. Signature: Precision ≥ 70% (higher FP rate accepted due to difficulty). |
| **Acceptance Criteria** | (1) Detects at least one face in a photo containing a person. (2) Does not flag geometric shapes as faces. (3) Detects handwritten signatures with cursive strokes. (4) Accepts higher FP rate for signatures (user review expected). |

### FR-DET-009: Embedded Data Carrier Detection

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Description** | Detect QR codes and barcodes in images, decode their content, and scan the decoded content through the detection pipeline |
| **Detection Strategy** | ZXing-WASM for decoding. Decoded text is then scanned by the regex/NER pipeline. |
| **Acceptance Criteria** | (1) Detects and decodes a standard QR code in a photo. (2) Scans decoded URL for suspicious domains. (3) Scans decoded text for PII. (4) Detects 1D barcodes (Code 128, EAN-13). |

### FR-DET-010: Source Code Credential Detection

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Description** | Detect credentials embedded in source code (hardcoded passwords, API keys in code context) |
| **Detection Strategy** | Combined regex (key patterns) + entropy (high-entropy values in assignment context) + keyword (variable names containing "password", "secret", "key", "token") |
| **Acceptance Criteria** | (1) Detects `const API_KEY = "sk-proj-..."`. (2) Detects `password = "hunter2"`. (3) Detects `export AWS_SECRET_ACCESS_KEY=...` in shell script. (4) Does NOT flag `password = process.env.PASSWORD` (environment reference, not hardcoded). |

---

## 5. Functional Requirements: Input Processing (FR-INP)

### FR-INP-001: Text Paste Interception

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Description** | Intercept text pasted into AI platform input fields via `Ctrl+V`, `Cmd+V`, right-click paste, or programmatic paste |
| **Technical Strategy** | Content script registers `paste` event listener on `document` in capture phase with `event.preventDefault()` and `event.stopImmediatePropagation()`. Extracts `event.clipboardData.getData('text/plain')`. |
| **Acceptance Criteria** | (1) Paste event intercepted on ChatGPT text input. (2) Paste event intercepted on Claude text input. (3) Paste event intercepted on Gemini text input. (4) Original paste is blocked until scan completes. (5) If scan is clean, paste is re-dispatched. (6) Works on dynamically created inputs (MutationObserver). |

### FR-INP-002: File Upload Interception

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Description** | Intercept files selected via `<input type="file">` dialogs on AI platform pages |
| **Technical Strategy** | Content script attaches `change` event listener to file inputs. MutationObserver watches for dynamically created file inputs. On `change`, read the `FileList`, pass each file to the detection pipeline. |
| **Acceptance Criteria** | (1) File upload intercepted on ChatGPT. (2) File upload intercepted on Claude. (3) Dynamically created file inputs detected by MutationObserver. (4) Multiple file selection handled (each file scanned independently). |

### FR-INP-003: Drag-and-Drop Interception

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Description** | Intercept files and text dragged and dropped onto AI platform interfaces |
| **Technical Strategy** | Content script registers `drop` event listener on `document` in capture phase. Extracts `event.dataTransfer.files` and `event.dataTransfer.getData('text/plain')`. |
| **Acceptance Criteria** | (1) Dropped file intercepted. (2) Dropped text intercepted. (3) Drop from OS file manager intercepted. (4) Drop from another browser tab intercepted. |

### FR-INP-004: PDF Text Extraction

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Description** | Extract text from uploaded PDF files (both text-based and scanned/image-based) |
| **Technical Strategy** | pdf.js for text extraction. For pages with no text layer (scanned), render to canvas and pass to OCR pipeline. |
| **Acceptance Criteria** | (1) Extracts text from text-based PDF. (2) Identifies scanned pages (no text layer). (3) OCR extracts text from scanned pages. (4) Handles PDFs up to 50MB / 500 pages. (5) Timeout after 30 seconds per document. |

### FR-INP-005: Image OCR

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Description** | Extract text from uploaded images (PNG, JPEG, WebP, TIFF, BMP) using local OCR |
| **Technical Strategy** | Tesseract.js WASM with SIMD acceleration. Preprocessing: grayscale, contrast enhancement, binarization. |
| **Acceptance Criteria** | (1) Extracts printed English text from clear image. (2) Handles rotated text (up to ±15°). (3) Handles low-contrast images (with preprocessing). (4) Processing completes within 3 seconds for 1080p image. (5) Confidence scores per word available. |

### FR-INP-006: DOCX Processing

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Description** | Extract text from DOCX files by parsing the XML structure within the ZIP container |
| **Technical Strategy** | Unzip DOCX → parse `word/document.xml` → extract text from `<w:t>` elements |
| **Acceptance Criteria** | (1) Extracts body text. (2) Extracts header/footer text. (3) Handles tables. (4) Handles bullet lists. |

### FR-INP-007: Structured Data Processing

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Description** | Parse and scan CSV, JSON, and XML files |
| **Technical Strategy** | CSV: row-by-row parsing. JSON: recursive value extraction. XML: text node extraction. All extracted text is scanned by detection pipeline. |
| **Acceptance Criteria** | (1) CSV: detects PII in cell values. (2) JSON: detects PII in string values at any nesting depth. (3) XML: detects PII in text nodes and attribute values. |

### FR-INP-008: Archive Processing

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Description** | Extract and scan files within ZIP archives, with security limits |
| **Technical Strategy** | Streaming decompression. Limits: 50MB compressed, 200MB decompressed, 1000 files, 3 nesting levels, 100:1 compression ratio. |
| **Acceptance Criteria** | (1) Extracts and scans files within ZIP. (2) Rejects ZIP bombs (ratio > 100:1). (3) Rejects nested ZIPs beyond depth 3. (4) Handles individual file extraction failures gracefully. |

---

## 6. Functional Requirements: User Experience (FR-UX)

### FR-UX-001: Warning Overlay

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Description** | Display a non-intrusive inline warning overlay when sensitive data is detected, before the data is submitted to the AI platform |
| **Technical Strategy** | Content script creates a `ShadowRoot` (closed mode) and renders the overlay. Overlay appears adjacent to the input area. Does not cover the entire page. |
| **Visual Design** | Risk-colored header bar (green/yellow/orange/red). Detection summary with entity type, count, and confidence. "View Details" expandable section. Three action buttons: "Allow Anyway", "Block", "Redact & Send". Dismissible. |
| **Acceptance Criteria** | (1) Overlay appears within 100ms of scan completion. (2) Overlay does not interfere with page functionality. (3) Overlay is keyboard-accessible (Tab, Enter, Escape). (4) Overlay has ARIA labels for screen readers. (5) Overlay persists across page scrolls. (6) Overlay is removed after user takes action. (7) Overlay style is self-contained (no leakage from/to page styles). |

### FR-UX-002: Detection Detail View

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Description** | Provide a detailed breakdown of detections showing each entity type, location, confidence score, risk level, and explanation |
| **Acceptance Criteria** | (1) Each entity shows: type name, masked preview (e.g., `4111****1111`), confidence %, risk level, source (regex/NER/CV). (2) Entities grouped by type. (3) Each entity has an expand arrow for full explanation. |

### FR-UX-003: Redaction Action

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Description** | Allow users to redact detected entities and submit sanitized content |
| **Acceptance Criteria** | (1) "Redact & Send" replaces all detected entities with placeholders. (2) Redacted content is re-scanned to verify no entities remain. (3) For files, a new file with redacted content is created. (4) For images, redaction uses solid-color rectangles. |

### FR-UX-004: Extension Badge

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Description** | Display status badge on the extension icon showing current page protection status |
| **Badge States** | Green (✓): Page is protected, no active detections. Yellow (!): Page is protected, medium-risk detections present. Red (✕): Page is protected, high/critical-risk detections present. Gray (—): Page is not an AI platform (not monitored). |

### FR-UX-005: Privacy Dashboard

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Description** | Full-page dashboard showing scan history, detection statistics, and risk trends |
| **Acceptance Criteria** | (1) Shows last 30 days of scan activity (encrypted local data). (2) Displays chart of detections by entity type. (3) Displays chart of risk levels over time. (4) Shows per-platform statistics. (5) "Clear All History" button with confirmation. (6) Export to JSON/CSV. |

### FR-UX-006: Settings UI

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Description** | Settings page for configuring detection sensitivity, enabled/disabled detectors, protected platforms, and advanced options |
| **Sections** | (1) Protected Platforms: toggle per platform. (2) Detection Sensitivity: low/medium/high/maximum slider. (3) Enabled Detectors: checkboxes per detector category. (4) Allowlist: user-defined safe entities. (5) Privacy: data retention period, clear data. (6) Advanced: cloud LLM configuration, passphrase, debug mode. |

### FR-UX-007: Onboarding Flow

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Description** | First-run experience guiding new users through extension setup |
| **Flow** | Screen 1: Welcome + value proposition (3 seconds). Screen 2: How it works (local, private, no cloud). Screen 3: Select platforms to protect (checkboxes, all enabled by default). Done. |
| **Acceptance Criteria** | (1) Appears only on first install. (2) Completes in < 30 seconds. (3) No account creation. (4) Skip button available on every screen. |

---

## 7. Functional Requirements: Enterprise (FR-ENT)

### FR-ENT-001: Managed Policy Support

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Description** | Accept and enforce organization policies delivered via `chrome.storage.managed` |
| **Policy Schema** | JSON document with: `enforcementMode` (monitor/warn/block), `requiredDetectors`, `sensitivityLevel`, `allowedPlatforms`, `blockedPlatforms`, `customPatterns`, `auditLogEndpoint`, `disableUserOverrides` |
| **Acceptance Criteria** | (1) Extension reads policy from `chrome.storage.managed`. (2) Policy overrides user settings when `disableUserOverrides: true`. (3) Blocked platforms show "blocked by organization" message. (4) Policy changes take effect within 60 seconds. |

### FR-ENT-002: Audit Logging

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Description** | Generate audit events for every scan, detection, and user decision, suitable for SIEM ingestion |
| **Event Schema** | `{timestamp, orgId, userIdHash, eventType, entityTypes[], riskLevel, platform, userAction, extensionVersion}` |
| **Acceptance Criteria** | (1) Audit events are generated locally. (2) If `auditLogEndpoint` is configured, events are batched and transmitted (encrypted, TLS 1.3). (3) Audit events never contain raw PII values. (4) Events are exportable as JSON or CSV. |

### FR-ENT-003: Force-Install Support

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Description** | Extension can be force-installed via Chrome CBCM, Windows Group Policy, or MDM (Intune, Jamf) |
| **Acceptance Criteria** | (1) Force-install via CBCM `ExtensionInstallForcelist` policy works. (2) Force-install via GPO ADMX template works. (3) Force-install via Intune OMA-URI works. (4) Extension activates without user interaction after force-install. (5) Managed storage policies are applied on force-install. |

---

## 8. Non-Functional Requirements (NFR)

### 8.1 Performance

| ID | Requirement | Target | Measurement |
|---|---|---|---|
| NFR-PERF-001 | Text analysis latency (1KB input) | < 50ms P99 | `performance.now()` delta, measured on Intel i5 + 8GB RAM |
| NFR-PERF-002 | Text analysis latency (10KB input) | < 200ms P99 | Same as above |
| NFR-PERF-003 | Text analysis latency (100KB input) | < 1000ms P99 | Same as above |
| NFR-PERF-004 | OCR processing (1080p image) | < 3000ms P99 | Same as above |
| NFR-PERF-005 | PDF processing (10 text pages) | < 1000ms P99 | Same as above |
| NFR-PERF-006 | PDF processing (10 scanned pages) | < 15000ms P99 | With OCR per page |
| NFR-PERF-007 | Service Worker cold start | < 500ms | Time from activation event to ready state |
| NFR-PERF-008 | Overlay render time | < 100ms | Time from scan result received to overlay visible |
| NFR-PERF-009 | Popup open time | < 200ms | Time from click to DOMContentLoaded |

### 8.2 Memory

| ID | Requirement | Target |
|---|---|---|
| NFR-MEM-001 | Idle memory footprint (extension total) | < 50MB |
| NFR-MEM-002 | Peak memory during OCR (+ NER if enabled) | < **256MB** (canonical `EXT_PEAK_MEM_MB`; freeze lowered from 512) |
| NFR-MEM-003 | Content script per-tab memory | < 5MB |
| NFR-MEM-004 | Memory leak over 500 scans | < 10MB growth |

### 8.3 Size

| ID | Requirement | Target |
|---|---|---|
| NFR-SIZE-001 | Extension package (compressed .crx) | < 25MB |
| NFR-SIZE-002 | NER model (quantized ONNX) | < 15MB |
| NFR-SIZE-003 | OCR engine + English language data | < 8MB |
| NFR-SIZE-004 | CV models (BlazeFace + ZXing + OpenCV) | < 5MB |

### 8.4 Reliability

| ID | Requirement | Target |
|---|---|---|
| NFR-REL-001 | Extension crash rate | < 0.1% of sessions |
| NFR-REL-002 | Detection pipeline success rate | > 99.5% (partial results acceptable) |
| NFR-REL-003 | Worker recovery time after crash | < 3 seconds |
| NFR-REL-004 | Mean time between Service Worker restarts | > 30 minutes |

### 8.5 Security

| ID | Requirement | Target |
|---|---|---|
| NFR-SEC-001 | All stored data encrypted | AES-256-GCM |
| NFR-SEC-002 | Zero PII in log output | Verified by automated scanner |
| NFR-SEC-003 | Zero remote code execution vectors | No `eval()`, no `Function()`, no `unsafe-eval` in CSP |
| NFR-SEC-004 | IPC message validation | 100% of messages schema-validated |
| NFR-SEC-005 | WASM binary integrity | SHA-256 verified before instantiation |
| NFR-SEC-006 | Zero known vulnerabilities in dependencies | npm audit: 0 critical, 0 high |

### 8.6 Privacy

| ID | Requirement | Target |
|---|---|---|
| NFR-PRIV-001 | Zero telemetry by default | No network calls unless user opts in |
| NFR-PRIV-002 | Zero cloud dependency for detection | 0 fetch() calls in detection pipeline |
| NFR-PRIV-003 | No `chrome.storage.sync` usage | Verified by static analysis |
| NFR-PRIV-004 | Raw PII values never persisted | Verified by storage schema audit |

### 8.7 Compatibility

| ID | Requirement | Target |
|---|---|---|
| NFR-COMPAT-001 | Chrome | ≥ 120 |
| NFR-COMPAT-002 | Edge | ≥ 120 |
| NFR-COMPAT-003 | Brave | ≥ 1.60 |
| NFR-COMPAT-004 | Arc | Latest stable |
| NFR-COMPAT-005 | Manifest V3 compliance | Full |

### 8.8 Accessibility

| ID | Requirement | Target |
|---|---|---|
| NFR-A11Y-001 | WCAG 2.1 AA compliance | All UI surfaces |
| NFR-A11Y-002 | Keyboard navigation | All interactive elements reachable via Tab |
| NFR-A11Y-003 | Screen reader support | All UI elements have ARIA labels |
| NFR-A11Y-004 | Color contrast | ≥ 4.5:1 for text, ≥ 3:1 for UI components |

---

## 9. Acceptance Criteria Summary

Every functional requirement above includes inline acceptance criteria. The complete acceptance test suite is derived directly from these criteria. The QA lead is responsible for maintaining a test case that maps 1:1 to each acceptance criterion.

---

## 10. Production Checklist

- [ ] All P0 requirements implemented and passing acceptance criteria
- [ ] All P1 requirements implemented and passing acceptance criteria (or explicitly deferred with ADR)
- [ ] All NFR targets met and measured
- [ ] Requirement traceability matrix complete (requirement → implementation → test)
- [ ] No unresolved "TBD" or placeholder requirements

---

## 11. Future Improvements

| Improvement | Requirement Impact |
|---|---|
| Video frame extraction | New FR-INP: video file processing |
| Audio transcription scanning | New FR-INP: audio file processing |
| Multi-language NER | FR-DET-005 through FR-DET-007 accuracy improvement |
| Real-time typing analysis | New FR-INP: keystroke-level interception (requires careful privacy analysis) |
| Browser context menu integration | New FR-UX: right-click "Scan selection" |
