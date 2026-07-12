# PART 02 — REAL-WORLD PROBLEM ANALYSIS

**Document ID:** SS-BP-002
**Classification:** Internal Engineering — Principal Review
**Version:** 1.0.0
**Last Updated:** 2026-07-12
**Owner:** Principal Security Researcher, Privacy Engineer
**Reviewers:** Principal Security Architect, Staff Product Engineer

---

## Executive Summary

This document provides the engineering-oriented problem analysis that justifies every detection engine, every interception point, and every UX decision in Sentinel Shield AI. It catalogs real-world data leakage scenarios, quantifies risk, maps attack surfaces, and defines the specific data categories we protect. Every detection rule in the detection engine traces back to a problem documented here.

---

## 1. Objectives

| ID | Objective |
|---|---|
| OBJ-001 | Catalog every category of sensitive data that users inadvertently share with AI platforms |
| OBJ-002 | Map the technical mechanisms through which data reaches AI platforms (paste, upload, drag, clipboard) |
| OBJ-003 | Quantify the risk level of each data category based on regulatory, financial, and identity-theft impact |
| OBJ-004 | Define the complete set of AI platforms we must intercept |
| OBJ-005 | Identify bypass vectors that sophisticated users or adversaries might exploit |

---

## 2. Dependencies

| Dependency | Type |
|---|---|
| PART_01_EXECUTIVE_VISION.md | Prerequisite — defines scope and design principles |
| Regulatory frameworks (GDPR, CCPA, HIPAA, PCI-DSS, India DPDP Act) | External reference |
| AI platform terms of service and privacy policies | External reference |

---

## 3. Design Principles

- **Evidence-Based:** Every problem statement is grounded in documented incidents, regulatory requirements, or threat intelligence
- **Exhaustive:** No category of sensitive data should be undocumented. If we discover a gap later, this document is updated first, then the detection engine
- **Risk-Ranked:** Problems are ranked by real-world impact, not theoretical severity

---

## 4. The Problem Space

### 4.1 The GenAI Data Flow Problem

Traditional data loss prevention (DLP) protects against three vectors:
1. **Exfiltration** — Malicious actor steals data
2. **Misconfiguration** — System exposes data unintentionally
3. **Insider threat** — Employee deliberately leaks data

GenAI introduces a fourth vector:
4. **Voluntary disclosure** — Users willingly share sensitive data with AI systems for convenience

This fourth vector is unprecedented because:
- The user is not malicious — they're trying to be productive
- The data leaves through a legitimate, sanctioned channel (the browser)
- Traditional DLP cannot distinguish "pasting code into ChatGPT" from "pasting code into a company wiki"
- The AI platform's data retention and training policies are opaque and change frequently

### 4.2 Quantified Risk

| Metric | Value | Source |
|---|---|---|
| % of developers who have pasted proprietary code into AI | 78% | GitHub Survey 2025 |
| % of enterprises that have detected sensitive data sent to GenAI | 65% | Gartner 2025 |
| Average cost of a data breach (2025) | $4.88M | IBM Cost of Data Breach Report |
| % of GenAI data incidents involving PII | 42% | Cyberhaven Research 2025 |
| % of ChatGPT users who have shared financial information | 31% | Ipsos Privacy Survey 2025 |
| % of enterprises with no GenAI usage policy | 38% | Deloitte 2025 |

---

## 5. Sensitive Data Taxonomy

### 5.1 Government Identity Documents

| Entity | Format/Pattern | Regulatory Sensitivity | Detection Difficulty |
|---|---|---|---|
| **Aadhaar Number** | 12 digits, Verhoeff checksum, format: XXXX XXXX XXXX | Critical — India DPDP Act classifies as sensitive personal data | Easy — deterministic checksum validation |
| **PAN (Permanent Account Number)** | `[A-Z]{5}[0-9]{4}[A-Z]`, 4th char indicates holder type | High — income tax identifier, financial linkage | Easy — format regex with validation |
| **Passport Number** | Country-specific, India: `[A-Z][0-9]{7}` | Critical — international identity document | Medium — country-specific formats, no universal checksum |
| **Driving License** | State-specific format, India: varies by state | High — identity + address proof | Hard — no standardized format across states |
| **Voter ID (EPIC)** | `[A-Z]{3}[0-9]{7}` | Medium — identity document | Medium — format regex |
| **SSN (US)** | `XXX-XX-XXXX`, area/group/serial | Critical — primary US identity identifier | Easy — format regex, area number validation |
| **Tax ID / TIN** | Country-specific | High — financial identity | Medium — country-specific |

### 5.2 Financial Information

| Entity | Format/Pattern | Risk if Exposed | Detection Strategy |
|---|---|---|---|
| **Credit Card Number** | 13-19 digits, Luhn checksum, IIN prefix (Visa 4, MC 5, Amex 34/37, RuPay 60/65/81/82) | Critical — direct financial fraud | Easy — Luhn checksum is deterministic |
| **Debit Card Number** | Same as credit card | Critical — direct bank account access | Easy — same as credit card |
| **CVV/CVC** | 3-4 digits, context-dependent | Critical — enables card-not-present fraud | Hard — short number, requires context analysis |
| **UPI ID** | `username@provider` (e.g., `user@okicici`) | High — linked to bank account | Medium — format regex + known provider list |
| **Bank Account Number** | 9-18 digits, country-specific | High — enables fraudulent transfers | Medium — length + context |
| **IFSC Code** | `[A-Z]{4}0[A-Z0-9]{6}` | Medium — bank identifier (not directly exploitable alone) | Easy — format regex + bank prefix validation |
| **SWIFT/BIC** | `[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?` | Medium — international bank identifier | Easy — format regex |
| **IBAN** | Country prefix + check digits + BBAN, MOD-97 validated | High — international account identifier | Easy — MOD-97 checksum |
| **Routing Number (US)** | 9 digits, checksum validated | Medium — bank identifier | Easy — checksum validation |

### 5.3 Secrets and Credentials

| Entity | Pattern | Impact if Exposed | Detection Strategy |
|---|---|---|---|
| **AWS Access Key ID** | `AKIA[0-9A-Z]{16}` | Critical — full AWS account access | Easy — prefix + length |
| **AWS Secret Access Key** | 40 chars, base64-like, near "aws_secret" context | Critical — paired with access key | Medium — entropy + context |
| **Azure Subscription Key** | 32 hex chars, near "azure" context | Critical — Azure service access | Medium — entropy + context |
| **GCP Service Account Key** | JSON with `"type": "service_account"` | Critical — GCP project access | Easy — JSON structure match |
| **Firebase API Key** | `AIza[0-9A-Za-z_-]{35}` | High — Firebase project access | Easy — prefix + length |
| **OpenAI API Key** | `sk-[A-Za-z0-9]{48}` (legacy) or `sk-proj-...` | High — API billing, model access | Easy — prefix match |
| **Anthropic/Claude API Key** | `sk-ant-...` | High — API billing | Easy — prefix match |
| **Google Gemini API Key** | `AIza...` (same prefix as Firebase) | High — API billing | Medium — disambiguate from Firebase via context |
| **GitHub Personal Access Token** | `ghp_[A-Za-z0-9]{36}` | Critical — repository access, code exfiltration | Easy — prefix + length |
| **GitHub OAuth Token** | `gho_[A-Za-z0-9]{36}` | High — OAuth scope-dependent | Easy — prefix + length |
| **Stripe Secret Key** | `sk_live_[A-Za-z0-9]{24,}` | Critical — payment processing access | Easy — prefix match |
| **Stripe Publishable Key** | `pk_live_[A-Za-z0-9]{24,}` | Low — publishable keys are designed to be public | Easy — prefix match, flag as informational |
| **JWT (JSON Web Token)** | `eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+` | High — session token, may contain claims | Easy — Base64 header prefix match |
| **SSH Private Key** | `-----BEGIN (RSA\|DSA\|EC\|OPENSSH) PRIVATE KEY-----` | Critical — server access | Easy — PEM header match |
| **PGP Private Key** | `-----BEGIN PGP PRIVATE KEY BLOCK-----` | Critical — encryption/signing key | Easy — PEM header match |
| **Private Certificate** | `-----BEGIN PRIVATE KEY-----` or `-----BEGIN CERTIFICATE-----` | High — TLS/authentication | Easy — PEM header match |
| **Database Connection String** | `(mongodb\|postgresql\|mysql\|redis\|mssql)://[^\s]+` | Critical — database access with credentials | Easy — protocol prefix regex |
| **Password in Context** | High-entropy string near "password", "pwd", "pass", "secret" | High — account access | Medium — entropy + keyword context |
| **.env File Contents** | `[A-Z_]+=.*` patterns with "KEY", "SECRET", "TOKEN", "PASSWORD" in variable name | High — multiple credentials | Medium — pattern + keyword analysis |
| **Cookie Value** | Near "cookie", "session", "Set-Cookie" context | Medium — session hijacking | Medium — context analysis |

### 5.4 Personal Contact Information

| Entity | Format | Risk | Detection Strategy |
|---|---|---|---|
| **Phone Number** | Country-specific, India: `+91-XXXXX-XXXXX` or `XXXXXXXXXX` | Medium — spam, social engineering | Medium — libphonenumber-js patterns |
| **Email Address** | RFC 5322 local@domain | Medium — spam, phishing, account enumeration | Easy — RFC regex |
| **Physical Address** | Unstructured text with street, city, state, PIN | Medium — physical security | Hard — NER required |

### 5.5 Medical Information

| Entity | Examples | Regulatory Sensitivity | Detection Strategy |
|---|---|---|---|
| **Medical Report** | Lab results, diagnosis, prescriptions | Critical — HIPAA (US), DPDP (India) | Hard — document classification + NER |
| **Insurance ID** | Policy number, member ID | High | Medium — format + context |
| **Diagnosis Codes (ICD)** | `[A-Z][0-9]{2}(\.[0-9]{1,4})?` | High — reveals medical conditions | Medium — ICD-10 code format |
| **Prescription Details** | Drug names, dosages | High | Hard — NER with medical vocabulary |

### 5.6 Financial Documents

| Entity | Examples | Risk | Detection Strategy |
|---|---|---|---|
| **Salary Slip** | Monthly earnings, deductions, employer details | High — income, employment status | Hard — document classification |
| **Tax Return** | Income, investments, deductions | Critical — complete financial profile | Hard — document classification |
| **Invoice** | Transaction details, amounts, vendor info | Medium — business information | Medium — document classification + keyword |
| **Bank Statement** | Transactions, balances, account numbers | Critical — financial behavior profile | Hard — document classification |

### 5.7 Legal Documents

| Entity | Examples | Risk | Detection Strategy |
|---|---|---|---|
| **Contract** | Terms, parties, obligations | High — business sensitive | Hard — document classification |
| **NDA** | Confidentiality terms, parties | High — reveals business relationships | Hard — document classification + keyword |
| **Power of Attorney** | Legal authority delegation | High — legal liability | Hard — document classification |

### 5.8 Visual PII

| Entity | Detection Method | Risk | Notes |
|---|---|---|---|
| **Face** | BlazeFace neural network | High — biometric identifier | Cannot determine identity, only presence |
| **Signature** | Contour analysis, aspect ratio heuristics | High — legal validity, forgery risk | High false positive risk on certain shapes |
| **QR Code** | ZXing decoder | Medium — may encode URLs, contact info, credentials | Decode and scan content |
| **Barcode** | ZXing decoder | Low-Medium — may encode product IDs, tracking numbers | Decode and scan content |

---

## 6. AI Platform Analysis

### 6.1 Data Handling Policies (as of 2026-07)

| Platform | Training on User Data | Data Retention | File Upload | Clipboard Access | Enterprise Controls |
|---|---|---|---|---|---|
| **ChatGPT** | Opt-out available (not default for free tier) | Retained for abuse monitoring | Yes (GPT-4o) | Via paste event | ChatGPT Enterprise: no training |
| **Claude** | No training on API data; consumer varies | 90-day retention, then deleted | Yes | Via paste event | Claude for Enterprise: no training |
| **Gemini** | Opt-out available | Retained for improvement | Yes | Via paste event | Gemini for Workspace: admin controls |
| **DeepSeek** | Training on user data (China-based, different regulation) | Unclear | Yes | Via paste event | Limited |
| **Copilot (Microsoft)** | Depends on tier | Varies by product | Yes | Via paste event | M365 Copilot: enterprise controls |
| **Perplexity** | Opt-out available | Retained | Yes | Via paste event | Limited |
| **Grok** | Opt-out available | Retained | Limited | Via paste event | Limited |
| **Cursor AI** | Code sent to LLM (configurable) | Session-based | Via editor | N/A | Privacy mode available |
| **GitHub Copilot Chat** | No training on individual code | Retained for response | Via editor | N/A | Enterprise: controlled |

### 6.2 Interception Points per Platform

| Platform | URL Patterns | Input Method | DOM Structure (as of 2026-07) |
|---|---|---|---|
| **ChatGPT** | `chat.openai.com/*`, `chatgpt.com/*` | `contenteditable` div, file input, drag-drop zone | Dynamic SPA, Prompt textarea is a ProseMirror editor. File upload via hidden `<input type="file">`. |
| **Claude** | `claude.ai/*` | `contenteditable` div, file input, drag-drop zone | Dynamic SPA. Text input is a ProseMirror editor. File upload via button-triggered file input. |
| **Gemini** | `gemini.google.com/*` | `textarea` or `contenteditable`, file input | Dynamic SPA. Text area is a custom rich-text component. File upload via button and drag-drop. |
| **DeepSeek** | `chat.deepseek.com/*` | `textarea`, file input | Standard textarea. File upload via button. |
| **Copilot** | `copilot.microsoft.com/*`, `copilot.cloud.microsoft/*` | `contenteditable` div, file input | Dynamic SPA. Custom input component. |
| **Perplexity** | `perplexity.ai/*` | `textarea`, file input | Standard textarea. File upload via button. |
| **Grok** | `grok.com/*`, `x.com/i/grok*` | `textarea` | Standard textarea. Limited file support. |

**Engineering implication:** Content script event interception must NOT rely on specific DOM selectors (they change frequently). Instead, we intercept at the event level:
- `paste` event on `document` (capture phase) — catches all paste events regardless of input type
- `change` event on `<input type="file">` elements — catches file selections
- `drop` event on `document` (capture phase) — catches drag-and-drop
- `MutationObserver` to detect dynamically created file inputs

---

## 7. Threat Model

### 7.1 Threat Actors

| Actor | Motivation | Capability | Target |
|---|---|---|---|
| **Inadvertent User** | Convenience, productivity | None (not attacking, just careless) | Their own data |
| **Malicious AI Platform** | Data harvesting, training | High (controls server-side processing) | User-submitted data |
| **Malicious Extension** | Data theft, credential harvesting | Medium (limited by browser sandbox) | Extension storage, clipboard |
| **Attacker with Physical Access** | Corporate espionage, identity theft | High (can access disk, memory) | Browser profile, extension storage |
| **Adversarial Content Creator** | Bypass detection, test boundaries | Medium (crafted inputs) | Detection engine |

### 7.2 Threat Scenarios

| ID | Scenario | Actor | Likelihood | Impact |
|---|---|---|---|---|
| TS-001 | Developer pastes AWS credentials into ChatGPT for debugging help | Inadvertent User | Very High | Critical (account compromise) |
| TS-002 | Lawyer uploads client contract to Claude for summarization | Inadvertent User | High | High (confidentiality breach) |
| TS-003 | Doctor uploads patient lab report to Gemini for analysis | Inadvertent User | Medium | Critical (HIPAA violation) |
| TS-004 | Employee pastes salary slip into Copilot for tax advice | Inadvertent User | High | High (income disclosure) |
| TS-005 | User uploads photo of Aadhaar card to ChatGPT for translation | Inadvertent User | Medium | Critical (identity theft) |
| TS-006 | Developer uploads .env file to AI for configuration help | Inadvertent User | High | Critical (multi-credential exposure) |
| TS-007 | User pastes credit card number to AI for rewards calculation | Inadvertent User | Medium | Critical (financial fraud) |
| TS-008 | Attacker crafts image that bypasses OCR to smuggle PII | Adversarial Content Creator | Low | High |
| TS-009 | Malicious extension reads our IndexedDB for scan history | Malicious Extension | Low | High |

---

## 8. Architecture Decisions

### ADR-003: Exhaustive Entity Coverage vs. Focused Entity Coverage

**Context:** We need to decide how many entity types to detect. More types = more protection but more engineering effort and more false positives.

**Problem:** Should we detect 20 entity types well, or 100 entity types with varying quality?

**Alternatives:**
1. Focus on top 20 highest-impact entities (cards, IDs, keys, tokens)
2. Broad coverage of 50+ entities with tiered accuracy expectations
3. Start narrow (top 20), expand based on user feedback

**Decision:** Option 3 — Start with top 20 highest-impact entities, expand based on data.

**Rationale:** Better to detect 20 entities with 97% precision than 100 entities with 80% precision. False positives erode user trust faster than missed detections.

**Consequences:**
- Phase 1 focuses on structured PII (regex-detectable) and secrets
- Phase 2 adds NER for unstructured PII
- Phase 3 adds CV for visual PII
- Entity list is reviewed quarterly based on detection telemetry (opt-in)

---

## 9. Implementation Order

| Order | Component | Rationale |
|---|---|---|
| 1 | Structured PII detection (regex + checksum) | Highest precision, lowest engineering cost |
| 2 | Secrets detection (pattern + entropy) | Highest impact for developers |
| 3 | Contact information (phone, email) | High frequency, well-defined patterns |
| 4 | OCR pipeline (unlocks image/scanned PDF detection) | Extends structured detection to visual inputs |
| 5 | NER pipeline (unlocks unstructured PII) | Catches names, addresses, medical terms |
| 6 | Document classification | Identifies sensitive document types |
| 7 | Face/signature/QR detection | Visual PII in images |

---

## 10. Edge Cases

| Edge Case | Problem | Handling |
|---|---|---|
| **Formatted numbers** | Aadhaar: `1234 5678 9012` vs `123456789012` vs `1234-5678-9012` | Regex normalizes all formats. Whitespace and dashes stripped before checksum validation. |
| **Partial numbers** | First 8 digits of a credit card visible, rest is cut off | Detect as "possible credit card" with lower confidence. Flag for user review. |
| **Multiple entities in single paste** | User pastes entire .env file with 15 secrets | Detect all entities. Display grouped by type. Batch redaction supported. |
| **Code context** | API key appears inside a code block with backticks | Code context increases confidence (secrets are commonly in code). |
| **Test data** | User pastes Stripe test key `sk_test_...` | Detect with informational level (not warning). Test keys are not sensitive. |
| **False positive: ISBN** | 13-digit ISBN can match Luhn algorithm | Context analysis: near "ISBN", "book", "title" → demote to non-detection. |
| **Localized phone formats** | India: `+91`, `0`, or 10-digit direct. US: `+1`, `(XXX)`, etc. | Use libphonenumber-js for country-aware parsing and validation. |
| **Markdown-formatted PII** | Credit card inside `**bold**` or `` `code` `` formatting | Strip Markdown formatting before detection. Preserve original positions for overlay. |

---

## 11. Failure Modes

| Failure | Impact | Recovery |
|---|---|---|
| False negative (missed PII) | User unknowingly shares sensitive data | Mitigated by multi-tier detection. Regex misses are caught by NER. NER misses are flagged by entropy. |
| False positive (non-PII flagged) | User annoyed, trust eroded | Mitigated by checksum validation (no false positives for Luhn-validated cards). User can add to allowlist. |
| Regex engine crashes on malformed input | Detection skipped for that input | Exception caught, logged. Other detection tiers still run. User warned of partial scan. |
| NER model produces garbage output | Wrong entities detected | Model output validated: entity spans must align with token boundaries. Unreasonable output (entity covers entire input) is discarded. |

---

## 12. Performance Budget

| Operation | Budget | Justification |
|---|---|---|
| Regex scan (1KB text) | < 5ms | Compiled regex on modern V8 |
| Regex scan (100KB text) | < 50ms | Linear scaling |
| Entropy calculation (1KB) | < 2ms | Simple arithmetic |
| Phone number parsing (10 numbers) | < 10ms | libphonenumber-js is optimized |

---

## 13. Memory Budget

| Component | Budget |
|---|---|
| Compiled regex patterns (all entities) | < 500KB |
| Phone number metadata | < 200KB |
| Entity knowledge graph | < 200KB |

---

## 14. Security Risks

| Risk | Mitigation |
|---|---|
| Detection patterns reveal what we protect against (attacker crafts evasion) | Accepted risk — detection patterns are deterministic and well-known (Luhn, Verhoeff). Obscurity is not a defense. |
| Regex ReDoS (catastrophic backtracking) | All regex patterns tested with rxxr2 or similar ReDoS analyzer. No unbounded quantifiers on ambiguous character classes. |

---

## 15. Testing Strategy

| Test Category | Coverage |
|---|---|
| True positive tests | Every entity type: 10+ valid test cases per type |
| True negative tests | Common false positives: ISBN, phone-like numbers, timestamps |
| Edge case tests | Formatted, partial, multi-entity, code-embedded, Markdown-wrapped |
| Locale tests | India-specific, US-specific, EU-specific formats |
| Performance tests | 1KB, 10KB, 100KB, 1MB text inputs |

---

## 16. Acceptance Criteria

- [ ] All entity types in the taxonomy have corresponding detection rules
- [ ] Each detection rule has ≥10 true positive and ≥5 true negative test cases
- [ ] No regex pattern has ReDoS vulnerability
- [ ] All checksum algorithms are independently verified against known-good implementations
- [ ] Entity knowledge graph has complete entries for all entity types
- [ ] Risk levels are assigned for all entity types
- [ ] Platform analysis is current (verified within last 30 days)

---

## 17. Production Checklist

- [ ] Entity taxonomy reviewed by privacy counsel
- [ ] Regulatory mappings verified (GDPR, CCPA, HIPAA, PCI-DSS, DPDP)
- [ ] Detection accuracy targets documented and baselined
- [ ] False positive allowlist mechanism implemented and tested
- [ ] Platform DOM structure verified on current versions of all supported AI platforms
- [ ] Entity taxonomy version-stamped and included in extension metadata

---

## 18. Future Improvements

| Improvement | Phase | Impact |
|---|---|---|
| Add video frame scanning (extract frames, OCR each) | Phase 5 | Extend detection to video uploads |
| Add audio transcription scanning | Future | Extend detection to voice inputs |
| User-reported entity types (crowdsourced patterns) | Future | Community-driven coverage expansion |
| Country-specific entity packs (download on demand) | Phase 5 | Reduce extension size, expand coverage |
| Behavioral detection (anomalous paste frequency) | Future | Detect automated data exfiltration attempts |
