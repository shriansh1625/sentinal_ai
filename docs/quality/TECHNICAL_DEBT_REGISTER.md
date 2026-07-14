# TECHNICAL_DEBT_REGISTER.md

**Document ID:** SS-AUDIT-DEBT-001  
**Date:** 2026-07-12  
**Rule:** Document only — no fixes applied

---

## Active Debt Items

### TD-001 — Extension unbundled ESM workspace imports

- **Severity:** Critical
- **Category:** Build / Extension
- **Affected:** `packages/extension/dist/**/*.js`, build scripts
- **Evidence:** `dist/background.js` imports `@sentinel-shield/core` etc.
- **Root cause:** `tsc`-only build; PART_25 Vite extension build not implemented
- **Impact:** Extension will not load in Chrome
- **Likelihood:** Certain
- **Recommendation:** Add MV3 bundler (Vite/esbuild) producing self-contained SW/CS/offscreen
- **Effort:** L (3–5d)
- **Priority:** P0

### TD-002 — Missing project-local git repository

- **Severity:** Critical
- **Category:** DevOps / Supply chain
- **Affected:** Repo root, `.husky`, CI assumptions
- **Evidence:** No `.git` in project; `git rev-parse --show-toplevel` → `C:/Users/shria`
- **Root cause:** Workspace nested under user-home git
- **Impact:** Hooks attach wrong tree; accidental commit of unrelated files; unreproducible releases
- **Likelihood:** High
- **Recommendation:** Initialize dedicated git root for this project; relocate away from home repo
- **Effort:** S–M
- **Priority:** P0

### TD-003 — PART_19 crypto not implemented

- **Severity:** High
- **Category:** Security / Privacy
- **Affected:** `browser-adapters/src/storage`, settings keys in SW
- **Evidence:** Grep shows no Argon2/AES-GCM usage; comment “Sprint 0 boundary only”
- **Root cause:** Deferred past claimed RC
- **Impact:** Settings/platforms stored plaintext; Freeze crypto owner unmet
- **Likelihood:** Certain if shipped
- **Recommendation:** Implement PART_19 or freeze-amend “storage plaintext until crypto sprint”
- **Effort:** L
- **Priority:** P0

### TD-004 — Lit UI not implemented (ADR-034)

- **Severity:** High
- **Category:** Architecture compliance
- **Affected:** `packages/extension/src/ui/popup-view.ts`
- **Evidence:** File header claims Lit; body is template string; no `lit` dependency; no popup in manifest
- **Root cause:** Sprint 7 shell shortcut
- **Impact:** Freeze/ADR violation; no user UI surface
- **Likelihood:** Certain
- **Recommendation:** Add Lit + `default_popup` or amend ADR-034
- **Effort:** M–L
- **Priority:** P0

### TD-005 — OCR/WASM stub pool

- **Severity:** High
- **Category:** Feature completeness
- **Affected:** `offscreen/worker-pool.ts`, `detection-engine/src/input/document.ts`
- **Evidence:** Pool returns empty text; DocumentPipeline `unavailable` without ports
- **Root cause:** Assets not vendored
- **Impact:** Images/PDFs always HOLD despite OCR default ON
- **Likelihood:** Certain
- **Recommendation:** Vendor pinned WASM or set OCR default false until ready
- **Effort:** L
- **Priority:** P1

### TD-006 — False / stale readiness narrative

- **Severity:** High
- **Category:** Documentation integrity
- **Affected:** `RELEASE_CANDIDATE_REPORT.md`, sprint reports, `MASTER_PROGRESS.md`
- **Evidence:** Engineering RC GO while F-001 blocks load
- **Root cause:** Process velocity over verification
- **Impact:** Misleads stakeholders
- **Likelihood:** High
- **Recommendation:** Relabel RC as “foundation milestone”; require load smoke gate
- **Effort:** S
- **Priority:** P1

### TD-007 — Test / coverage debt

- **Severity:** Medium
- **Category:** QA
- **Affected:** `tests/e2e`, CI, `@vitest/coverage-v8` unused
- **Evidence:** Playwright harness asserts `true`; no coverage scripts
- **Root cause:** Scaffold left unfinished
- **Likelihood:** High
- **Recommendation:** Real extension e2e + coverage thresholds
- **Effort:** M
- **Priority:** P1

### TD-008 — Version identity chaos

- **Severity:** Medium
- **Category:** Release engineering
- **Affected:** root `package.json` 0.0.0; extension pkg 0.1.0; manifest 0.2.0
- **Recommendation:** Single version source of truth
- **Effort:** S
- **Priority:** P2

### TD-009 — Empty directories / duplicate reports

- **Severity:** Low–Medium
- **Category:** Structure hygiene
- **Affected:** `service-worker/`, `enterprise-backend/src/`, `SPRING_0_*` duplicate
- **Effort:** S
- **Priority:** P2

### TD-010 — Stale interception HOLD helpers

- **Severity:** Medium
- **Category:** Maintainability
- **Affected:** `input-pipelines/index.ts` (`sprint2DefaultDecision`), comments
- **Evidence:** Still says Tier-1 not ready after Sprint 3 wiring
- **Effort:** S
- **Priority:** P2

### TD-011 — PART_28 package set drift

- **Severity:** Medium
- **Category:** Architecture ownership
- **Affected:** `core`, `browser-adapters`, PART_28, MODULE_BOUNDARIES
- **Recommendation:** Amend PART_28 ownership map or fold packages
- **Effort:** S
- **Priority:** P2

### TD-012 — Supply-chain advisories (Vitest/Vite)

- **Severity:** High (dev)
- **Category:** Dependencies
- **See:** DEPENDENCY_REVIEW.md / SECURITY_FINDINGS.md
- **Priority:** P1

---

## Debt Totals (approx)

| Priority | Count |
| -------- | ----: |
| P0       |     4 |
| P1       |     4 |
| P2       |     4 |
