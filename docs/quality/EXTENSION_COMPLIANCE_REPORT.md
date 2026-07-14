# EXTENSION_COMPLIANCE_REPORT.md

**Document ID:** SS-AUDIT-EXT-001  
**Date:** 2026-07-12  
**References:** PART_10, PART_11, PART_15, PART_16, ADR-032–037, ARCHITECTURE_FREEZE_v1.0

---

## 1. Manifest V3 Compliance Matrix

| Requirement                                      | Status         | Evidence                                         |
| ------------------------------------------------ | -------------- | ------------------------------------------------ |
| `manifest_version: 3`                            | Pass           | `manifest.json`                                  |
| `minimum_chrome_version: 120`                    | Pass           | Present                                          |
| Service worker module                            | Partial        | Declared; **unloadable imports**                 |
| Static permissions minimal                       | Pass           | storage, activeTab, scripting, offscreen, alarms |
| Optional AI hosts only                           | Pass           | Matches ADR-035 list                             |
| No `tabs` / `history` / `externally_connectable` | Pass           | Absent                                           |
| CSP wasm-unsafe-eval                             | Pass (forward) | Present; no wasm yet                             |
| `default_locale`                                 | Pass           | `en` + `_locales/en/messages.json`               |
| `alarms` permission                              | Pass           | Present (PART_11)                                |
| Built SW path not `.ts`                          | Pass intent    | `dist/background.js`                             |
| `default_popup`                                  | **Fail**       | Missing                                          |
| `options_page`                                   | **Fail**       | Missing but `openOptionsPage` called             |
| Icons production quality                         | **Fail**       | 70-byte placeholders                             |
| Web accessible models/wasm                       | Empty          | Paths declared; assets absent                    |

---

## 2. Findings

### EXT-001 — Non-loadable service worker / content script modules

- **ID:** EXT-001 / F-001
- **Severity:** Critical
- **Category:** MV3 runtime
- **Affected Files:** `dist/background.js`, `dist/content.js`, package imports
- **Evidence:** Bare `@sentinel-shield/*` imports
- **Root Cause:** No bundler
- **Impact:** Extension does not start
- **Likelihood:** Certain
- **Recommendation:** Bundle for Chrome
- **Effort:** L
- **Priority:** P0

### EXT-002 — No popup / options surface

- **ID:** EXT-002 / F-003 / F-018
- **Severity:** High
- **Category:** UX / PART_22
- **Affected Files:** `manifest.json`, `background.ts` onboarding
- **Evidence:** No `default_popup`; install calls `openOptionsPage` without options page
- **Impact:** Broken onboarding; no settings UI
- **Likelihood:** Certain
- **Recommendation:** Add popup/options or remove call
- **Effort:** M
- **Priority:** P0

### EXT-003 — Dynamic content scripts without host grant flow UX

- **ID:** EXT-003
- **Severity:** Medium
- **Category:** Permissions
- **Affected Files:** `lifecycle/registration.ts`
- **Evidence:** Registers matches for AI platforms; optional_host_permissions require user grant — no requestPermissions UI found
- **Impact:** Registration may fail silently without hosts granted
- **Likelihood:** High
- **Recommendation:** Explicit `permissions.request` flow per platform enable
- **Effort:** M
- **Priority:** P1

### EXT-004 — Offscreen document path

- **ID:** EXT-004
- **Severity:** Medium
- **Category:** Offscreen lifecycle
- **Affected Files:** `offscreen/manager.ts` `OFFSCREEN_DOCUMENT_PATH = dist/offscreen/index.html`
- **Evidence:** Depends on package-root load layout
- **Impact:** createDocument fails if roots misaligned
- **Likelihood:** High with current packaging
- **Recommendation:** Fix with packaging contract
- **Effort:** S
- **Priority:** P0

### EXT-005 — Worker pool is not a Worker pool

- **ID:** EXT-005 / F-006
- **Severity:** High
- **Category:** PART_16
- **Affected Files:** `offscreen/worker-pool.ts`
- **Evidence:** In-process stub; no `new Worker`
- **Impact:** OCR default ON is dishonest; files HOLD forever
- **Likelihood:** Certain
- **Recommendation:** Real workers + WASM or disable OCR default
- **Effort:** L
- **Priority:** P1

### EXT-006 — Interception design largely Freeze-aligned

- **ID:** EXT-006
- **Severity:** Info / Positive
- **Category:** PART_10/17
- **Evidence:** Capture phase; stopImmediatePropagation; approval nonce; HOLD on failure
- **Recommendation:** Add overlay; e2e on real hosts

### EXT-007 — Cross-browser

- **ID:** EXT-007
- **Severity:** Info
- **Category:** Scope
- **Evidence:** Chrome-only types/APIs; Firefox out of v1 Freeze — OK
- **Recommendation:** Keep scope

### EXT-008 — Storage quota / session strategy incomplete

- **ID:** EXT-008
- **Severity:** Medium
- **Category:** PART_11 state
- **Affected Files:** lifecycle rehydrate
- **Evidence:** `rehydrateSessionState` logs only; no `chrome.storage.session` active-scan map
- **Impact:** SW restart loses ephemeral scan bookkeeping
- **Likelihood:** Medium
- **Recommendation:** Implement session rehydration per PART_11
- **Effort:** M
- **Priority:** P1

### EXT-009 — SafeMode present

- **ID:** EXT-009
- **Severity:** Info / Positive
- **Category:** PART_11
- **Evidence:** Migration failure → SafeMode; router blocks non-allowlisted types
- **Recommendation:** Surface SafeMode in UI when popup exists

### EXT-010 — Version skew in shipped identity

- **ID:** EXT-010 / F-009
- **Severity:** Medium
- **Category:** Release
- **Evidence:** manifest 0.2.0 vs package.json 0.1.0
- **Impact:** Support confusion
- **Likelihood:** Certain
- **Recommendation:** Single version
- **Effort:** S
- **Priority:** P2

---

## 3. Runtime Architecture Compliance

| Frozen element                | Compliance                            |
| ----------------------------- | ------------------------------------- |
| Coordinator-Processor SW      | Intentional structure present         |
| detection-engine purity       | Pass                                  |
| Fail-closed unscanned release | Text: scan; files: HOLD — Pass intent |
| AI hosts only                 | Pass                                  |
| Lit-only UI                   | **Fail**                              |
| PART_19 crypto                | **Fail**                              |
| WASM threads off              | Pass (constant)                       |

---

## Extension Compliance Verdict

**NOT MV3-shippable.** Permissions/hosts look Freeze-aligned, but packaging, UI, crypto, and OCR gaps block compliance certification.

---

## FINAL BOARD VERDICT (ALL REPORTS)

# **REQUIRES ENGINEERING CLEANUP**

Choose exactly one per charter — selected:

| Option                           | Selected |
| -------------------------------- | -------- |
| READY FOR IMPLEMENTATION         |          |
| READY WITH MINOR ISSUES          |          |
| **REQUIRES ENGINEERING CLEANUP** | **YES**  |
| NOT READY                        |          |

**Rationale:** Strong blueprint + partial implementation, but **critical load-blocker**, **git provenance failure**, **ADR/UI/crypto gaps**, and **overclaimed RC** require cleanup before further product sprints or any store path.

---

## Report Index

1. `FORENSIC_REPOSITORY_AUDIT.md`
2. `REPOSITORY_HEALTH_SCORE.md`
3. `TECHNICAL_DEBT_REGISTER.md`
4. `SECURITY_FINDINGS.md`
5. `PERFORMANCE_FINDINGS.md`
6. `DEPENDENCY_REVIEW.md`
7. `CODE_HEALTH_REPORT.md`
8. `BUILD_REPRODUCIBILITY_REPORT.md`
9. `EXTENSION_COMPLIANCE_REPORT.md`

**No code was modified in this audit phase beyond writing these reports.**
