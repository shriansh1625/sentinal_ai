# REQUIREMENTS TRACEABILITY MATRIX

**Document ID:** SS-RTM-001  
**Classification:** Internal Engineering — Binding  
**Version:** 1.0.0  
**Last Updated:** 2026-07-12  
**Rule:** No feature may be implemented unless it appears in this matrix. Owner documents are authoritative for “how.”

---

## Legend

| Column | Meaning |
|---|---|
| Req ID | From PART_03 (or NFR) |
| Vision | PART_01 principle / OBJ |
| Arch | Primary architecture PART |
| ADR | Binding ADR(s) |
| Threat | PART_06 / PART_29 |
| Guardrail | PART_20 (if applicable) |
| AC | Acceptance (PART_03 / owner) |
| Tests | PART_24 family |
| Phase | Handbook phase |
| Owner | Canonical PART |

---

## 1. Detection

| Req ID | Vision | Arch | ADR | Threat | Guardrail | AC | Tests | Phase | Owner |
|---|---|---|---|---|---|---|---|---|---|
| FR-DET-001 Gov IDs | OBJ-002, P3 | 13, 18 | 008, 037 | 06 TS-*, 29A | 20 §1 | PART_03 | TC-GOV-* | Ph1 | 13 |
| FR-DET-002 Financial | OBJ-002 | 13, 18 | 008 | 06, 29A | 20 ISBN | PART_03 | TC-FIN-* | Ph1 | 13 |
| FR-DET-003 Secrets | OBJ-002 | 13 | 008 | 06 TS-001 | 20 Base64 | PART_03 | TC-SEC-* | Ph1 | 13 |
| FR-DET-004 Contact | OBJ-002 | 13 | 008 | 06 | 20 | PART_03 | TC-CON-* | Ph1 | 13 |
| FR-DET-005 Medical | OBJ-002 | 13 | 037 (off) | 06 | — | P1; flag off v1 | TC-MED-* | Ph2 | 13 |
| FR-DET-006 Fin docs | — | 13 CV | 037 off | 06 | — | flag off v1 | TC-DOC-* | Ph2 | 13 |
| FR-DET-007 Legal | — | 13 | 037 off | 06 | — | flag off v1 | TC-LEG-* | Ph2 | 13 |
| FR-DET-008 Visual PII | — | 13 CV | 037 off | 29G | 20 OCR | flag off v1 | TC-CV-* | Ph2 | 13 |
| FR-DET-009 QR | — | 13 | 037 off | 20 §3.4 | 20 | flag off v1 | TC-QR-* | Ph2 | 13 |
| FR-DET-010 Code secrets | OBJ-002 | 13 | 008 | 06 | 20 concat | PART_03 | TC-CODE-* | Ph1 | 13 |

---

## 2. Input / Interception

| Req ID | Vision | Arch | ADR | Threat | Guardrail | AC | Tests | Phase | Owner |
|---|---|---|---|---|---|---|---|---|---|
| FR-INP-001 Paste | OBJ-001 | 10, 17 | 024, 036 | 29A | 20 text | Guaranteed endpoints | E2E-PASTE-* | Ph1 | 17 |
| FR-INP-002 Upload | OBJ-001 | 10, 17 | 024 | 29B | 20 ZIP/PDF | Guaranteed | E2E-UPLOAD-* | Ph1 | 17 |
| FR-INP-003 Drag-drop | OBJ-001 | 10, 17 | 024 | 29C | 20 | Guaranteed | E2E-DROP-* | Ph1 | 17 |
| FR-INP-004 PDF | — | 17 | 019 | 20 PDF | 20 §2.2 | Text+OCR path | TC-PDF-* | Ph1–2 | 17 |
| FR-INP-005 OCR | — | 16, 17 | 032 | 20 OCR | 20 §3 | P99 3s | TC-OCR-* | Ph2 | 16/17 |
| FR-INP-006 DOCX | — | 17 | — | 20 | — | P1 | TC-DOCX-* | Ph2 | 17 |
| FR-INP-007 Structured | — | 17 | — | — | — | P1 | TC-JSON-* | Ph2 | 17 |
| FR-INP-008 Archive | — | 17, 12 | 019 | 20 ZIP | 20 §2.1 | Bomb limits | TC-ZIP-* | Ph2 | 17 |
| Clipboard API | Limitation | 29D | — | 29D | 20 §4.3 | Document only | E2E-CLIPAPI-GAP | — | 29 |
| Screen capture | Out of scope | 17E | — | — | — | Not v1 | — | Ph5 | 30 |

---

## 3. UX / Decision

| Req ID | Vision | Arch | ADR | Threat | Guardrail | AC | Tests | Phase | Owner |
|---|---|---|---|---|---|---|---|---|---|
| FR-UX-001 Overlay | HITL P7 | 10, 22 | 014, 034 | 06 CS | — | Shadow closed | E2E-UI-* | Ph1 | 22 |
| FR-UX-002 Detail | P6 explain | 18, 22 | — | — | — | Masked preview ephemeral preferred | TC-UI-DET | Ph1 | 22 |
| FR-UX-003 Redact | — | 18D | — | — | — | Residual=0 | TC-RED-* | Ph2 | 18 |
| FR-UX-004 Badge | — | 10 | — | — | — | States | TC-BADGE | Ph1 | 10 |
| FR-UX-005 Dashboard | — | 22 | 033 hist off | 07 | — | Optional history | TC-DASH | Ph2 | 22 |
| FR-UX-006 Settings | — | 21, 22 | 037 | 15 | — | Defaults max-sec / NER off | TC-SET | Ph1 | 21 |
| FR-UX-007 Onboarding | NOBJ-006 | 11, 22 | — | 07 | — | No account | TC-ONB | Ph1 | 22 |

---

## 4. Enterprise

| Req ID | Vision | Arch | ADR | Threat | Guardrail | AC | Tests | Phase | Owner |
|---|---|---|---|---|---|---|---|---|---|
| FR-ENT-001 Policy | OBJ-006 | 18B | 021 | 06 | — | managed storage | TC-POL-* | Ph4 | 18 |
| FR-ENT-002 Audit | — | 07, 26 | 030 | 07 carve-out | — | types only | TC-AUD-* | Ph4 | 26 |
| FR-ENT-003 Force-install | OBJ-006 | 15, 11 | — | 20 disable | — | CBCM/GPO | TC-MDM | Ph4 | 15 |

---

## 5. Non-Functional

| Req ID | Vision | Arch | ADR | Threat | Tests | Phase | Owner |
|---|---|---|---|---|---|---|---|
| NFR-PERF-* | OBJ-005 | 23, 12 | 019 | DoS | BENCH-* | Ph1+ | 23 |
| NFR-MEM-* | — | 12, 23 | — | OOM | SOAK-* | Ph1+ | 23 |
| NFR-SIZE-001 | — | 25, 16 | 029 | — | size gate | Ph1 | 25 |
| NFR-SEC-* | P5 | 14, 19, 16 | 009–012, 031–033 | 06 | SEC-* | Ph1 | 14/19 |
| NFR-PRIV-* | P1 | 07, 26 | 020, 012 | 07 | PRIV-* | Ph1 | 07 |
| NFR-COMPAT-* | — | 10, 30 | — | — | BROWSER-* | Ph1 | 10 |
| NFR-A11Y-* | — | 22 | 034 | — | A11Y-* | Ph2 | 22 |
| NFR-REL-* | — | 12, 11 | 036 | — | REL-* | Ph1 | 12 |

---

## 6. Security / Privacy / Ops Requirements (Derived)

| ID | Description | Owner | ADR | Tests |
|---|---|---|---|---|
| DER-CRYPTO | All at-rest crypto per PART_19 | 19 | 033 | CRYPTO-* |
| DER-WASM | Integrity + simd default | 16 | 032 | WASM-* |
| DER-LOG | Allowlist logs only | 26 | 012 | LOG-* |
| DER-HOSTS | AI hosts only | 10/15 | 035 | MANIFEST-* |
| DER-CLAIMS | Honest listing copy | 07 + Own §4 | — | LEGAL review |
| DER-IR | IR runbooks | 27 | — | Tabletop |

---

## 7. Orphan Check

| Item | Status |
|---|---|
| Requirements without owner | **None** in this matrix |
| Owners without Req (infra) | Permitted for D-CONST, D-ADR, D-PROCESS |
| Future-only rows | Marked Phase 2/4/5 / Out of scope |

**Traceability status: COMPLETE for v1.0 scope.**
