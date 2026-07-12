# DESIGN REVIEW BOARD REPORT
# Sentinel Shield AI — Phase 1 Principal Engineering Design Review (PEDR)

**Document ID:** SS-PEDR-001  
**Classification:** Internal Engineering — Binding Gate  
**Version:** 1.0.0  
**Date:** 2026-07-12  
**Board:** Principal Security · Browser/Chrome Extension · Privacy · AI Systems · Distributed Systems · Performance · Reliability · DevOps · Threat Intel · Software Architecture · QA · Product Security  
**Scope:** Entire blueprint repository (`blueprint/`, `handbook/`, `implementation_plan.md`)  
**Question before the Board:** May the engineering team write the first line of product code?

---

## Executive Summary

The repository is **documentation-complete** and **directionally sound**: local-first, MV3 extension, Coordinator-Processor, deterministic Tier-1 before ML, no remote rule download, and an explicit human-in-the-loop posture. Those choices would survive a first-pass review at Chrome Security / Apple / Palo Alto **as a product thesis**.

They do **not** yet survive a **ship-the-first-commit** review.

The Board found **blocking architectural inconsistencies**: authoritative ADRs contradict their owner implementation specs; unrepaired early blueprints still encode **rejected** crypto; the permission surface requests Gmail/Drive hosts that the product thesis does not justify; rate-limit and KDF parameters disagree across documents; and the product language (“privacy firewall,” “prevent”) overclaims relative to fail-open individuals, Clipboard API gaps, and programmatic input gaps.

**Verdict: APPROVED WITH CONDITIONS.**

Implementation of non-security scaffolding (monorepo, shared-types stubs, CI skeleton) may start **only after** Conditions **C1–C8** are closed in documentation (ADR amendments + stale-doc reconciliation). Implementation of **crypto, interception, WASM, or detection** is **blocked** until Conditions **C1–C5** are closed and re-reviewed by Security + Extension leads.

This is **not** APPROVED. This is **not** REJECTED. Full redesign of the Coordinator-Processor / local-first thesis is **not** required. Partial redesign **is** required for permissions, Tier-1 key handling clarity, and product claim accuracy.

---

## Overall Scores (0–10)

| Score | Value | Board Rationale (brutal) |
|---|---|---|
| **Overall Architecture** | **6.5** | Sound skeleton; poisoned by contradictions and stale specs that would ship the wrong system if an engineer picks the wrong doc. |
| **Security** | **5.5** | Good threat catalog; broken consistency on keys/KDF; permission overreach; Tier-1 session key material is still attacker-readable in-process. |
| **Privacy** | **7.0** | Strong minimization story; undermined by optional host list (mail/drive), masked previews retaining digit structure, metadata-rich history. |
| **Performance** | **6.0** | Budgets exist; SW↔OD full-copy of large binaries is a structural tax; 25MB/512MB targets are aggressive and unproven. |
| **Maintainability** | **5.5** | 30-part corpus + dual `implementation_plan.md` creates dual SoT; stale PART_04/14 will burn juniors. |
| **Scalability** | **7.0** | Client-side product scales per-device; enterprise SIEM/path is sketched, not battle-tested in design depth. |
| **Reliability** | **6.5** | Recovery matrices are good on paper; fail-open + SW restart mid-scan re-dispatch is a correctness landmine. |
| **Production Readiness** | **5.0** | Docs ≠ production. No running harness, no measured OCR/NER on reference HW, no CWS dry-run. |
| **Technical Debt (doc debt)** | **6.0** | High *documentation* debt from contradictions (10 = rewrite). Must pay before code. |
| **Interview Readiness** | **8.0** | Excellent narrative for hiring/architecture interviews; still fails “prove it runs” bar. |
| **Open Source Readiness** | **6.0** | License policy sketched; no NOTICE/SBOM process proven; model training provenance thin. |
| **Enterprise Readiness** | **5.5** | Managed policy + audit exist; KMS tier still vague relative to enterprise bar; force-install story OK. |

**Interpretation:** Scores below 7 on Security / Production / Maintainability are **gate failures** for unrestricted coding.

---

## Decision

### APPROVED WITH CONDITIONS

| Gate | Status |
|---|---|
| May create monorepo / tooling / empty packages? | **Yes, after C6–C8** (index/ADR hygiene) |
| May implement `detection-engine` Tier-1 regex? | **No — until C1, C3, C4** |
| May implement crypto / storage? | **No — until C1, C2** |
| May implement content-script interception? | **No — until C3, C5** |
| May implement OCR/NER/WASM? | **No — until C1 (ADR-011), C4** |
| Unconditional APPROVED? | **No** |
| REJECTED (scrap thesis)? | **No** |
| REQUIRES REDESIGN (whole product)? | **No** — **partial redesign** required (permissions, claims, Tier-1 key story) |

---

## Conditions (Must Close Before Relevant Code)

| ID | Condition | Owner Docs | Blocker For |
|---|---|---|---|
| **C1** | Resolve **ADR-011 vs PART_16** contradiction (threads/COI Accepted vs v1 single-thread). Amend ADR-011 or rewrite PART_16 to one binding decision. | PART_08 amendment ADR-032; PART_16 | WASM/OCR/NER |
| **C2** | Resolve **ADR-026 vs PART_19** contradiction (non-exportable CryptoKey in session vs raw key material). Supersede ADR-026. Align Argon2 params (64MiB/t=3 vs 19MiB/t=2). Patch PART_14/PART_04 stale crypto. | PART_08 ADR-033; PART_19; PART_14; PART_04 | Storage/crypto |
| **C3** | Remove or justify **Drive/Gmail/Outlook/OneDrive** optional host permissions. Default host set = AI platforms only. | PART_10; PART_15; PART_03 | Manifest / CS |
| **C4** | Single rate-limit & budget numbers SoT (10 vs 30 scans/min; Argon2; alarms permission). Publish `CONSTANTS` table in PART_12 or shared-types spec. | PART_05/06/12/14/25 | Runtime |
| **C5** | Product claim amendment: individual SKU is **warn/advise**, not “prevent.” Clipboard API + programmatic input documented as **coverage gaps** in marketing/CWS listing copy constraints. | PART_01; PART_03; PART_07; PART_29 | Listing / UX copy |
| **C6** | Declare PART_NN authoritative; mark `implementation_plan.md` sections that conflict as **non-binding**. | 00_MASTER_INDEX; plan header | All |
| **C7** | Unify UI stack ADR: Lit-only (PART_22) **or** Lit+React dashboards (ADR-023) — pick one. | PART_08 ADR-034; PART_22 | Frontend |
| **C8** | Add `alarms` to PART_10 manifest **or** remove alarms keep-alive from PART_11/25. | PART_10; PART_11; PART_25 | SW lifecycle |

**Exit criterion:** Security lead + Extension lead sign a one-page “Conditions Closed” addendum attached to this report.

---

## Findings Table

| ID | Sev | Components | Description | Evidence | Impact | Likelihood | Recommendation | Eng Cost | Priority |
|---|---|---|---|---|---|---|---|---|---|
| F-01 | **Critical** | PART_08 ADR-011, PART_16 | ADR-011 **Accepts** COOP/COEP threaded WASM; PART_16 **rejects** COI for v1 and mandates single-thread SIMD. | ADR-011 §Decision; PART_16 Resolved DEF-03 | Implementer ships wrong WASM build; OCR budget miss or broken isolation | High | **ADR-032** supersedes ADR-011 for v1; threads = Phase-2 flag only | 1–2d docs | P0 |
| F-02 | **Critical** | PART_08 ADR-026, PART_19, PART_04, PART_14 | ADR-026 forbids persisting key material and claims CryptoKey-in-session; PART_19 correctly requires raw material; PART_04/14 still show old design + PBKDF2 100k. | ADR-026; PART_19 DEF-01; PART_04 §6.4; PART_14 §2.2 | Wrong crypto ships; reviewers fail audit; data loss / decrypt failure | High | **ADR-033**; patch PART_04/14 with “SUPERSEDED — see PART_19” banners | 2–3d docs | P0 |
| F-03 | **Critical** | PART_08 ADR-010, PART_19 | Argon2id params disagree: `m=64MiB,t=3` vs `m=19MiB,t=2`. | ADR-010; PART_19 DEF-02 | Non-interoperable unlock; unlock latency / memory OOM on 8GB laptops | Medium | Pick one param set; version in salt record; amend ADR-010 | 0.5d | P0 |
| F-04 | **High** | PART_10 manifest | `optional_host_permissions` includes Drive, Gmail, Outlook, OneDrive — not GenAI platforms. | PART_10 §4.1 | CWS privacy review risk; least-privilege violation; attack surface / user distrust | High | **Remove** from v1; enterprise add-on later with separate justification | 1d docs + product | P0 |
| F-05 | **High** | PART_01/03 claims vs PART_18/29 | Marketing/vision “prevent” vs fail-open + HITL Allow + Clipboard API gap + programmatic FN. | PART_01 OBJ-001; PART_29 D/E; ADR-021 | False sense of security; FTC/CWS misrepresentation risk | High | Rewrite claims to “intercept and warn”; enterprise block separate | 2d product/legal | P0 |
| F-06 | **High** | PART_05 vs PART_06 vs PART_14 | Rate limit **10**/min (PART_04/05) vs **30**/min (PART_06/14 code sample). | PART_04 §12; PART_05; PART_06; PART_14 | DoS vs UX inconsistency; tests disagree | High | Single constant `MAX_SCANS_PER_MIN_PER_TAB=20` (Board recommendation) | 0.5d | P0 |
| F-07 | **High** | PART_10 vs PART_11/25 | `alarms` used for keep-alive but missing from PART_10 manifest permissions. | PART_10; PART_11 ADR keep-alive; PART_25 | Runtime failure or undeclared permission | High | Add `alarms` **or** delete keep-alive path | 0.5d | P0 |
| F-08 | **High** | PART_12 | Large payloads double-copied SW↔OD (no Transferable on `chrome.runtime`). | PART_12 §4 | Peak memory ≈ 2× file + models; OOM on 50MB PDF + OCR | High | Stream/chunk; never hold full PDF in SW and OD simultaneously; document hard max lower if needed | 1w design refine | P1 |
| F-09 | **High** | PART_19 Tier-1 | Raw AES key material in `storage.session` readable to any code in extension context / some dump scenarios. | PART_19 DEF-01 resolution | History decrypt if XSS-in-extension or malicious update | Medium | Default: **no durable history** without passphrase; or encrypt history with key non-recoverable after SW death | 3–5d redesign | P1 |
| F-10 | **High** | PART_13/18/21 | NER/CV in v1 expands bundle, attack surface, FN/FP complexity before Tier-1 proven. | PART_01 impl order vs PART_13 | YAGNI violation; delays ship; model supply chain | Medium | **v1.0 = Tier-1 + OCR text path only**; NER/CV feature-flagged off until corpus gates pass | 1w plan change | P1 |
| F-11 | **Medium** | PART_07/18 | Masked previews (`4111****1111`) persist BIN + last4. | PART_07 inventory; PART_13 Detection | PCI-adjacent residual identity | Medium | Store only `entityType` + count by default; preview ephemeral in overlay | 2d | P1 |
| F-12 | **Medium** | ADR-023 vs PART_22 | Lit-only vs Lit+React dashboards. | ADR-023; PART_22 ADR-UI-001 | Extra dependency / bundle / review surface | Medium | **ADR-034**: Lit everywhere for v1 | 1d | P1 |
| F-13 | **Medium** | PART_17 upload | DataTransfer clone fragile on React-controlled inputs; fallback is block+instruct. | PART_17 Pipeline B | Core upload UX fails on major SPAs | High | Treat fallback as **primary** on detected framework editors; E2E gate per platform | 1–2w impl risk | P1 |
| F-14 | **Medium** | PART_12 fail-open | SW restart → re-dispatch original unscanned (individual). | PART_12 recovery table | Race: sensitive paste ships on crash | Medium | Fail-open must **re-scan** or hold until user confirms, not silent release | 2d redesign | P0 |
| F-15 | **Medium** | PART_02 | Unsourced market statistics. | PART_02 §4.2 | Credibility failure under external audit | Medium | Cite or delete numbers | 1d | P2 |
| F-16 | **Medium** | dual SoT | `implementation_plan.md` still reads as peer architecture. | 00_MASTER_INDEX tier-3 | Engineers implement obsolete backend-heavy paths | Medium | Banner every conflicting section | 1d | P1 |
| F-17 | **Medium** | PART_14 Tier-3 KMS | “Enterprise-provided mechanism” underspecified. | PART_14; PART_19 | Cannot implement enterprise SKU securely | Medium | Specify AES-KW wrap format + managed field schema before enterprise code | 3d | P2 |
| F-18 | **Medium** | PART_20/24 | Bypass↔test ID linkage incomplete as executable matrix. | FINAL audit §6 | Regressions slip | Medium | Mandatory table before coding detectors | 2d | P1 |
| F-19 | **Low** | PART_01 folder | Still mentions patterns superseded elsewhere. | PART_01 | Confusion | Low | Add supersession pointers | 0.5d | P2 |
| F-20 | **Low** | z-index max | `2147483647` war with page. | PART_10/22 | Overlay lose | Low | Accept + re-append strategy already noted | — | P3 |
| F-21 | **High** | Privacy vs enterprise audit | Network egress for audit can be misread as detection cloud. | PART_07 carve-out | Trust failure | Medium | Hard CI: detection-engine package has zero network; audit in separate module | 1d CI | P1 |
| F-22 | **Medium** | Ajv dependency | ADR-027 adds Ajv — supply chain + size. | ADR-027 | Dependency risk | Medium | Prefer codegen validators from Zod/Valibot **or** hand schemas with zero deps for IPC | 2–3d | P2 |
| F-23 | **Medium** | Performance | 512MB peak on 8GB shared browser is hostile to UX. | NFR-MEM-002 | Tab discard / jank | Medium | Cap concurrent OCR; serialize heavy tiers; lower peak target to 256MB | 1w | P1 |
| F-24 | **Low** | Firefox | Deferred correctly, but PART_10 claims Edge/Brave/Arc without API delta matrix. | PART_10; PART_30 | Surprise breakage | Medium | Compatibility matrix file before multi-browser CI | 2d | P2 |

---

## Repository-Wide Risk Register (PEDR)

| Risk ID | Risk | L | I | Treatment | Owner |
|---|---|---|---|---|---|
| PEDR-R01 | Doc contradiction → wrong crypto ships | H | C | C1–C2 | Security |
| PEDR-R02 | CWS rejection for overbroad hosts | H | H | C3 | Extension |
| PEDR-R03 | User trusts “firewall,” bypasses via Clipboard API | H | H | C5 + UX | Product |
| PEDR-R04 | OOM on large PDF due to double copy | M | H | F-08 | Runtime |
| PEDR-R05 | Silent fail-open on SW restart | M | H | F-14 | Reliability |
| PEDR-R06 | Model/WASM supply chain | M | C | PART_16/25 hashes | Security |
| PEDR-R07 | Platform DOM drift | H | M | Weekly E2E | QA |
| PEDR-R08 | FP fatigue → user disables extension | H | H | Tier-1 only launch; calibrate | Detection |
| PEDR-R09 | Enterprise KMS ambiguity | M | H | F-17 | Security |
| PEDR-R10 | Dual SoT implementation_plan | M | M | C6 | TPM |
| PEDR-R11 | Peak memory kills laptop UX | M | M | F-23 | Perf |
| PEDR-R12 | Lit/React dependency churn | L | M | C7 | Frontend |

---

## Subsystem Challenge Summary (Step 3)

| Subsystem | Purpose | Simplify / Remove? | Board Judgment |
|---|---|---|---|
| Content Script intercept | Capture paste/upload/drop | **Keep** | Core. Over-engineered if trying page-world clipboard hooks — correctly rejected. |
| Service Worker coordinator | Admit, budget, Tier-1, route | **Keep** | Sound. Must not silent-release on restart (F-14). |
| Offscreen + Workers | WASM host | **Keep** | Necessary under MV3. |
| OCR | Image/PDF text | **Keep for v1** | High value. |
| NER | Unstructured PII | **Defer / flag off** | YAGNI until Tier-1+OCR ship (F-10). |
| CV face/QR | Visual PII | **Defer** | High FP / adversarial cost for v1. |
| Risk engine | Score | **Keep** | Math is deterministic — good. Calibrate later. |
| Policy/Decision | Enterprise | **Keep** | Do not couple to individual path complexity. |
| Redaction | Sanitize | **Keep** | Verify-loop is mandatory; raster PDF is honest. |
| Storage/crypto | Persist meta | **Keep with redesign of Tier-1** | F-09. |
| Cloud LLM explain | Optional NLP | **Keep off-by-default** | Acceptable if types-only; still metadata leak — disclose. |
| Telemetry | Opt-in DP | **Keep off** | Prefer zero for v1 launch. |
| Enterprise backend package | Fleet | **Out of Phase-1 monorepo critical path** | YAGNI in week-1 code. |
| Drive/Gmail hosts | Non-AI | **Remove** | Least privilege fail (F-04). |
| Alarms keep-alive | Warm SW | **Optional, declare permission** | Battery/CWS scrutiny (F-07). |

---

## Architectural Consistency (Step 4) — Headline Defects

1. **ADR log is not actually authoritative** while PART_16/19 disagree — violates the repo’s own conflict rule.  
2. **Stale PART_04/14** are landmines.  
3. **Permission/manifest drift** (alarms; mail/drive).  
4. **Numeric drift** (rate limits; Argon2; UI framework).  
5. **Layering:** `implementation_plan.md` backend weight vs extension-first thesis.  
6. **Race:** fail-open re-dispatch vs “scan before send.”  
7. **Memory model:** structured-clone tax on large files.  
8. **MV3:** SW ephemerality under-estimated in UX of passphrase and in-flight scans.

---

## Security Review (Step 5) — Board Position

**Strengths:** Local detection; no remote rules; closed Shadow DOM; schema IPC; ZIP/PDF bomb limits; integrity hashes; allowlist logging direction; STRIDE catalog.

**Failures to bar:**

- Inconsistent crypto docs (ship-blocker).  
- Tier-1 raw key in session (acceptable only if history is optional/off by default).  
- Host permission overreach.  
- Known bypass channels (Clipboard API, programmatic set) with product still implying prevention.  
- Fail-open silent release (F-14) is a **security defect**, not a UX feature.  
- Supply chain depends on many WASM/ML stacks — minimize for v1 (F-10).

---

## Performance Review (Step 6) — Bottlenecks

| Bottleneck | Estimate | Notes |
|---|---|---|
| SW cold start | 100–500ms | First paste after idle feels broken |
| SW↔OD copy 50MB | +100–500ms + 2×RAM | Structural |
| OCR 1080p SIMD | ≤3s budget | Unproven on reference HW |
| NER+OCR concurrent | →512MB peak | Too high; serialize |
| Argon2 unlock 64MiB | May OOM / jank on 8GB | Prefer PART_19 19MiB set |
| 20 AI tabs × CS | Memory tax | Need idle disconnect already specified — enforce |

**Battery:** alarms keep-alive while AI tab focused is acceptable if scoped; global 30s alarms would fail mobile/Edge review.

---

## Reliability Review (Step 7)

Recovery matrices are among the best docs. **Fatal gap:** individual fail-open that re-dispatches **unscanned** content after SW death. Board mandates: **hold or rescan**, never silent pass.

IndexedDB corruption paths are documented. Browser update mid-scan accepted. Worker crash → partial Tier-1: OK if user is told.

---

## Privacy Review (Step 8)

| Check | Result |
|---|---|
| No sync storage | Pass (ADR-020) |
| No cloud detection | Pass (with CI requirement) |
| Telemetry default off | Pass |
| Raw PII at rest | Pass by schema intent |
| Masked preview residual | **Fail soft** (F-11) |
| Host permissions least privilege | **Fail** (F-04) |
| Fingerprinting via telemetry | OK if DP + off |
| Sensitive logging | Directionally fixed (DEF-04); enforce in code later |

---

## Engineering Quality (Step 9)

| Principle | Grade |
|---|---|
| KISS | C — too many engines for v1 |
| YAGNI | D — NER/CV/enterprise backend gravity |
| DRY | C — duplicated budgets/ADRs |
| SOLID / boundaries | B — pure detection-engine is excellent |
| Testability | B — corpus design good if executed |
| Observability | B — allowlist model correct |

---

## Browser / MV3 Review (Step 10)

| Topic | Result |
|---|---|
| MV3 SW ephemerality | Accounted; UX still weak |
| Offscreen Workers | Correct approach |
| Transferables limitation | Acknowledged; mitigation incomplete |
| Optional permissions model | Good; host list bad |
| Firefox | Appropriately deferred |
| Edge/Brave | Assumed Chromium — need matrix |
| CSP wasm-unsafe-eval | Necessary; justified |
| WAR empty matches | OK if only extension URLs used — state explicitly in PART_10 |

---

## Production Readiness (Step 11)

Docs ≠ production. Missing for true greenlight: measured benches, CWS draft listing matching C5 claims, SBOM generation dry-run, one external threat-model workshop, legal privacy policy text.

DevEx/handbook is strong. Rollback via CWS prior version is realistic.

---

## ADR Amendments (Append-Only)

The following ADRs are **appended** to `PART_08` (see file update). They do **not** overwrite prior ADR text; they supersede where stated.

| New ADR | Action |
|---|---|
| ADR-032 | Supersede ADR-011 for v1.0: single-thread SIMD default; COI threads Phase-2 |
| ADR-033 | Supersede ADR-026: Tier-1 stores raw session key material; Tier-2 re-derive; history off without passphrase (default) |
| ADR-034 | Supersede ADR-023 React clause: Lit-only UI for v1 |
| ADR-035 | Host permissions: AI platforms only for v1 |
| ADR-036 | Fail-open must not silent-release unscanned payloads |
| ADR-037 | v1 detection scope: Tier-1 + OCR; NER/CV flagged off |

---

## What Would Make This APPROVED (Unconditional)

1. All C1–C8 closed with lead signatures.  
2. PART_04 and PART_14 crypto sections marked superseded or rewritten.  
3. Manifest host list reduced.  
4. Fail-open path redesigned (F-14).  
5. v1 scope cut (NER/CV off).  
6. One measured perf run recorded in PART_23 against reference hardware (even on a spike prototype).  

Until then, treating this repository as “implementation-ready without clarification” is **false**. It is **implementation-ready after condition closure**.

---

## Board Sign-Off Block

| Role | Vote | Notes |
|---|---|---|
| Principal Security | **Conditional** | C1 C2 C3 C5 F-14 |
| Principal Chrome Extension | **Conditional** | C3 C7 C8 F-13 |
| Principal Privacy | **Conditional** | C3 C5 F-11 |
| Principal AI Systems | **Conditional** | F-10 defer NER |
| Principal Performance | **Conditional** | F-08 F-23 |
| Principal Reliability | **Conditional** | F-14 |
| Staff QA | **Conditional** | F-18 matrix |
| TPM | **Conditional** | C6 |

**Final Board Outcome: APPROVED WITH CONDITIONS**

---

## Appendix A — Documents Reviewed

All files under `blueprint/` (PART_00–30, audits), `handbook/PROJECT_EXECUTION_BIBLE.md`, `implementation_plan.md`. No file was exempted from scope; deep adversarial reading focused on contradiction surfaces (crypto, WASM, permissions, fail-open, dual SoT).
