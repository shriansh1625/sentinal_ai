# SINGLE SOURCE OF TRUTH REPORT

**Document ID:** SS-SOT-001  
**Classification:** Internal Engineering — Binding  
**Version:** 1.0.0  
**Last Updated:** 2026-07-12  
**Companion:** `DESIGN_OWNERSHIP_MATRIX.md`

---

## 1. Verdict

| Check | Status |
|---|---|
| Duplicate algorithms removed or superseded | **PASS** |
| Canonical constants published | **PASS** (`DESIGN_OWNERSHIP_MATRIX` §3) |
| Crypto conflicts closed | **PASS** |
| WASM threading conflict closed | **PASS** |
| Permissions conflict closed | **PASS** |
| Fail-open silent-release closed | **PASS** |
| Rate-limit conflict closed | **PASS** |
| Peak memory conflict closed | **PASS** |
| UI framework conflict closed | **PASS** |
| Dual SoT (`implementation_plan.md`) demoted | **PASS** |
| Claim honesty table published | **PASS** |
| Remaining open architecture contradictions | **NONE** |

---

## 2. Conflict Resolution Log (Closed)

### CR-001 — WASM Threads / COI

| Field | Content |
|---|---|
| **Problem** | ADR-011 Accepted threaded WASM+COI; PART_16 v1 forbids COI |
| **Affected** | PART_08 ADR-011, PART_16, PART_13 |
| **Conflicting statements** | “Serve offscreen with COOP/COEP” vs “Prefer single-thread SIMD for v1.0” |
| **Analysis** | MV3 offscreen COI is brittle; OCR budget achievable on SIMD single-thread |
| **Chosen** | **ADR-032**: v1 = single-thread SIMD; threads = Phase-2 flag |
| **Rejected** | Shipping threaded WASM as v1 default |
| **Reason** | Deterministic ship path; PART_16 owner (D-WASM) |
| **Migration** | None (pre-code) |
| **Acceptance** | PART_16 DEF-03 + ADR-032; `WASM_THREADS_DEFAULT=false` |
| **Status** | **Closed** |

### CR-002 — Session CryptoKey vs Key Material

| Field | Content |
|---|---|
| **Problem** | ADR-026 / PART_04/14 vs PART_19 DEF-01 |
| **Affected** | PART_08 ADR-026, PART_04 §6.4, PART_14 §2.2, PART_19 |
| **Chosen** | **ADR-033** + PART_19 owner: Tier-1 stores raw material in session; re-import CryptoKey; history default **off** |
| **Rejected** | Persisting live non-exportable CryptoKey across SW process restart |
| **Migration** | PART_04/14 marked superseded; implementers use PART_19 only |
| **Status** | **Closed** |

### CR-003 — Argon2 Parameters

| Field | Content |
|---|---|
| **Problem** | ADR-010 (64MiB/t=3) vs PART_19 (19MiB/t=2) |
| **Chosen** | **m=19 MiB, t=2, p=1** (PART_19 + matrix §3); ADR-010 text amended |
| **Rejected** | 64 MiB default on 8GB reference HW |
| **Status** | **Closed** |

### CR-004 — Host Permissions Overreach

| Field | Content |
|---|---|
| **Problem** | PART_10 listed Drive/Gmail/Outlook/OneDrive |
| **Chosen** | **ADR-035**: AI platforms only; PART_10 manifest updated |
| **Rejected** | Mail/Drive hosts in v1 |
| **Status** | **Closed** |

### CR-005 — Rate Limits 10 vs 30

| Field | Content |
|---|---|
| **Problem** | PART_04/05 used 10 scans/min; PART_06/14 used 30 |
| **Chosen** | Scans **20**/min/tab; IPC messages **30**/min/tab (`DESIGN_OWNERSHIP_MATRIX` §3) |
| **Status** | **Closed** |

### CR-006 — Fail-Open Silent Release

| Field | Content |
|---|---|
| **Problem** | PART_12 allowed silent re-dispatch of unscanned paste after SW death |
| **Chosen** | **ADR-036**: hold + `SCAN_INTERRUPTED` overlay or re-scan; never silent release |
| **Status** | **Closed** |

### CR-007 — Manifest alarms + SW path

| Field | Content |
|---|---|
| **Problem** | alarms used without permission; SW pointed at `.ts` |
| **Chosen** | Add `alarms`; `dist/background.js` (PART_25 owns build) |
| **Status** | **Closed** |

### CR-008 — UI Lit vs React

| Field | Content |
|---|---|
| **Problem** | ADR-023 allowed React dashboards; PART_22 Lit-only |
| **Chosen** | **ADR-034**: Lit-only v1 |
| **Status** | **Closed** |

### CR-009 — Peak Memory 512 vs Reality

| Field | Content |
|---|---|
| **Problem** | 512MB peak hostile on 8GB; NER+OCR concurrent |
| **Chosen** | **`EXT_PEAK_MEM_MB=256`**; NER/CV default off (ADR-037); serialize heavy workers |
| **Status** | **Closed** |

### CR-010 — Dual Source of Truth

| Field | Content |
|---|---|
| **Problem** | `implementation_plan.md` competed with PART series |
| **Chosen** | Plan marked **NON-BINDING**; PART_NN + Ownership Matrix + Freeze win |
| **Status** | **Closed** |

### CR-011 — Product Claims vs Coverage

| Field | Content |
|---|---|
| **Problem** | “Firewall / prevent / 100% intercept” vs Clipboard API + fail-open + HITL |
| **Chosen** | Claim classes in Ownership Matrix §4; PART_01 language corrected |
| **Status** | **Closed** |

### CR-012 — Logging Deny-List vs Allowlist

| Field | Content |
|---|---|
| **Problem** | PART_14 still contained deny-list sanitizer sample |
| **Chosen** | PART_14 points to PART_26 allowlist only; sample removed |
| **Status** | **Closed** |

### CR-013 — v1 Detector Scope

| Field | Content |
|---|---|
| **Problem** | Docs implied full NER+CV at launch |
| **Chosen** | ADR-037; PART_13/21 defaults NER/CV **false** |
| **Status** | **Closed** |

---

## 3. SoT Audit Checklist (Post-Closure)

| Area | Owner | Duplicate elsewhere? |
|---|---|---|
| AES-GCM / KDF / keys | PART_19 | No (supersession banners) |
| WASM tiers | PART_16 | No |
| Constants | Ownership Matrix §3 | References only |
| Manifest hosts/perms | PART_10 (= PART_15) | Aligned |
| Risk formula | PART_18 | PART_13 defers |
| Interception pipelines | PART_17 | PART_29 threats only |
| Fail-open behavior | ADR-036 + PART_12 | Aligned |
| Telemetry/logging | PART_26 | PART_14 index only |

---

## 4. Known Platform Limitations (Not Contradictions)

Documented in PART_29 / Ownership Matrix §4 — **accepted**, not open conflicts:

1. Page `navigator.clipboard.readText()` not interceptable in isolated world (v1).  
2. Some React/ProseMirror editors may require redacted manual paste (best effort).  
3. Programmatic `value=` without events not fully covered (v1 best effort / Phase-2).  
4. WASM browser sandbox escape = residual browser trust.  
5. User can click Allow Anyway (HITL by design).  
6. Firefox not in v1.0.

---

## 5. Status

**SINGLE SOURCE OF TRUTH: ESTABLISHED**  
**OPEN ARCHITECTURE CONTRADICTIONS: 0**
