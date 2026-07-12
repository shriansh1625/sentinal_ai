# BUILD_REPRODUCIBILITY_REPORT.md

**Document ID:** SS-AUDIT-BUILD-001  
**Date:** 2026-07-12  
**Mode:** Read-only

---

## 1. Build Graph

```
pnpm install (lockfile)
  → turbo typecheck / lint / test / build
    → shared-types (tsc)
    → core, detection-engine (tsc)
    → browser-adapters (tsc)
    → extension (tsc + copy-static.mjs)
```

**Lockfile:** `pnpm-lock.yaml` present.  
**Package manager:** `packageManager: pnpm@9.15.4` (Corepack-friendly).  
**Node engines:** `>=20`.

---

## 2. Findings

### BUILD-001 — Extension artifact not Chrome-reproducible / not loadable

- **ID:** BUILD-001 / F-001
- **Severity:** Critical
- **Category:** Reproducibility / Correctness
- **Affected Files:** `packages/extension` build, `dist/background.js`
- **Evidence:** Bare `@sentinel-shield/*` imports remain post-`tsc`
- **Root Cause:** Library compile ≠ MV3 package
- **Impact:** “Green build” ≠ runnable extension
- **Likelihood:** Certain
- **Recommendation:** Bundler emit + smoke load in CI
- **Effort:** L
- **Priority:** P0

### BUILD-002 — Manifest path ambiguity

- **ID:** BUILD-002
- **Severity:** High
- **Category:** Packaging
- **Affected Files:** `manifest.json` `background.service_worker: dist/background.js`
- **Evidence:** Manifest lives at package root and is copied into `dist/`; loading `dist/` as unpacked root makes `dist/background.js` wrong; loading package root needs node_modules resolution which Chrome lacks
- **Root Cause:** Dual-root packaging without documented load procedure
- **Impact:** Engineer confusion; failed loads
- **Likelihood:** High
- **Recommendation:** Single package root contract + relative SW path post-bundle
- **Effort:** M
- **Priority:** P0

### BUILD-003 — Content script registration path

- **ID:** BUILD-003 / F-012
- **Severity:** High
- **Category:** Packaging
- **Affected Files:** `lifecycle/registration.ts` → `js: ['dist/content.js']`
- **Evidence:** Path assumes extension root = package root
- **Impact:** Even if SW fixed, CS may 404 depending on load root
- **Likelihood:** High
- **Recommendation:** Align paths with final package layout
- **Effort:** S–M
- **Priority:** P0

### BUILD-004 — No local git → unreproducible release identity

- **ID:** BUILD-004 / F-002
- **Severity:** Critical
- **Category:** Provenance
- **Evidence:** No project `.git`
- **Impact:** Cannot tag/release from this folder authoritatively
- **Likelihood:** Certain
- **Recommendation:** Dedicated repository
- **Effort:** S
- **Priority:** P0

### BUILD-005 — Turbo cache / CI reproducibility

- **ID:** BUILD-005
- **Severity:** Low–Medium
- **Category:** CI
- **Affected Files:** `turbo.json`, `.github/workflows/ci.yml`
- **Evidence:** `pnpm install --frozen-lockfile`; no turbo remote cache config
- **Impact:** Local/CI should match given same Node/pnpm
- **Likelihood:** Low drift if versions pinned
- **Recommendation:** Document Node 22 + Corepack; pin in engines optionally
- **Effort:** S
- **Priority:** P3

### BUILD-006 — Static copy script side effects

- **ID:** BUILD-006
- **Severity:** Low
- **Category:** Build hygiene
- **Affected Files:** `scripts/copy-static.mjs`
- **Evidence:** Rewrites offscreen HTML; copies 1×1 icons; copies manifest into dist
- **Impact:** Dual manifest copies can diverge if edit wrong file
- **Likelihood:** Medium
- **Recommendation:** Single source manifest strategy
- **Effort:** S
- **Priority:** P2

### BUILD-007 — Declaration/map spam in dist

- **ID:** BUILD-007
- **Severity:** Low
- **Category:** Artifact hygiene
- **Evidence:** `.d.ts` / `.map` emitted into extension dist
- **Impact:** Inflates package; not needed for Chrome
- **Likelihood:** Certain
- **Recommendation:** Extension build emit JS-only or strip on pack
- **Effort:** S
- **Priority:** P2

### BUILD-008 — Positive: purity + depcruise gates

- **ID:** BUILD-008
- **Severity:** Info
- **Category:** Architecture gates
- **Evidence:** `pnpm purity`, `pnpm depcruise` in `ci` script
- **Recommendation:** Keep; add load smoke

### BUILD-009 — `pnpm ci` script vs GH workflow drift

- **ID:** BUILD-009
- **Severity:** Low
- **Category:** Consistency
- **Evidence:** Root `ci` script omits integration vitest + audit; workflow includes them
- **Impact:** Local `pnpm ci` ≠ GH CI
- **Likelihood:** Medium
- **Recommendation:** Unify scripts
- **Effort:** S
- **Priority:** P2

### BUILD-010 — Format check not in CI

- **ID:** BUILD-010 / F-015
- **Severity:** Low
- **Category:** CI completeness
- **Evidence:** `format:check` exists; unused in workflow
- **Recommendation:** Add step
- **Effort:** S
- **Priority:** P3

---

## 3. Clone-and-Build Checklist (observed)

| Step                              | Expected       | Observed risk               |
| --------------------------------- | -------------- | --------------------------- |
| Clone                             | Dedicated repo | May clone home-git noise    |
| `corepack enable && pnpm install` | Works          | Works (lock present)        |
| `pnpm build`                      | Green          | Green for tsc               |
| Load extension                    | Works          | **Fails** (BUILD-001)       |
| `pnpm test`                       | Green          | Unit green; e2e meaningless |
| `pnpm audit`                      | Clean          | **Fails/high** today        |

---

## Build Reproducibility Verdict

**Library builds are reproducible. Extension releases are not.**
