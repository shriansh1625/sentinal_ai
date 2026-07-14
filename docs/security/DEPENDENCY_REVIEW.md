# DEPENDENCY_REVIEW.md

**Document ID:** SS-AUDIT-DEPS-001  
**Date:** 2026-07-12  
**Mode:** Read-only

---

## 1. Inventory

### Root production dependencies

**None.** Root is tooling-only (`private: true`).

### Root / workspace tooling (devDependencies)

| Package                        | Declared   | Resolved (lock) | Notes                                          |
| ------------------------------ | ---------- | --------------- | ---------------------------------------------- |
| typescript                     | ^5.7.2     | 5.9.3           | OK                                             |
| eslint / typescript-eslint     | ^9 / ^8    | 9.39.5 / 8.63.0 | OK                                             |
| vitest                         | ^2.1.8     | **2.1.9**       | **Critical advisory**                          |
| @vitest/coverage-v8            | ^2.1.8     | 2.1.9           | Pulls vulnerable vitest; **unused in scripts** |
| @playwright/test               | ^1.49.1    | 1.61.1          | OK; e2e harness empty                          |
| turbo                          | ^2.3.3     | 2.10.4          | OK                                             |
| dependency-cruiser             | ^16.8.0    | 16.10.4         | OK                                             |
| husky / lint-staged / prettier | present    | present         | Husky ineffective (no local git)               |
| @types/chrome                  | 0.0.287    | 0.0.287         | OK                                             |
| vite (transitive)              | via vitest | **5.4.21**      | **High advisory**                              |

### Workspace runtime dependencies

| Package            | Depends on                                             |
| ------------------ | ------------------------------------------------------ |
| shared-types       | (none)                                                 |
| core               | shared-types                                           |
| browser-adapters   | core, shared-types                                     |
| detection-engine   | shared-types                                           |
| extension          | browser-adapters, core, detection-engine, shared-types |
| enterprise-backend | (none)                                                 |

**No heavy runtime frameworks shipped** (no React/Lit/ONNX in lock for product). Positive for CRX size — but Lit required by ADR-034 is also **missing**.

---

## 2. Findings

### DEP-001 — Vitest critical vulnerability

- **ID:** DEP-001
- **Severity:** Critical (advisory) / High (practical)
- **Category:** Supply chain
- **Affected Files:** `package.json`, `pnpm-lock.yaml`, all package vitest pins
- **Evidence:** `pnpm audit` → GHSA-5xrq-8626-4rwp; Vitest <3.2.6
- **Root Cause:** Staying on Vitest 2.1.x
- **Impact:** Arbitrary file read/exec when Vitest UI server listening
- **Likelihood:** Medium in local/CI misuse
- **Recommendation:** Upgrade to Vitest ≥3.2.6; pin and re-lock
- **Effort:** M
- **Priority:** P1

### DEP-002 — Vite high vulnerability (transitive)

- **ID:** DEP-002
- **Severity:** High
- **Category:** Supply chain
- **Affected Files:** lockfile via vitest → vite@5.4.21
- **Evidence:** `server.fs.deny` bypass on Windows alternate paths
- **Root Cause:** Transitive from Vitest 2
- **Impact:** Dev-server FS bypass on Windows
- **Likelihood:** Medium on Windows contributors
- **Recommendation:** Upgrade Vitest/Vite together
- **Effort:** M
- **Priority:** P1

### DEP-003 — Unused coverage dependency

- **ID:** DEP-003
- **Severity:** Low
- **Category:** Unused package
- **Affected Files:** root `package.json` `@vitest/coverage-v8`
- **Evidence:** No `coverage` script; CI never runs coverage
- **Root Cause:** Scaffold without gate
- **Impact:** Noise + advisory surface without benefit
- **Likelihood:** Certain waste
- **Recommendation:** Wire coverage gates or remove
- **Effort:** S
- **Priority:** P2

### DEP-004 — Missing required UI dependency (Lit)

- **ID:** DEP-004
- **Severity:** High
- **Category:** Architecture / missing package
- **Affected Files:** `packages/extension/package.json`, `ui/popup-view.ts`
- **Evidence:** No `lit` in dependencies; ADR-034 Lit-only
- **Root Cause:** UI shell without framework
- **Impact:** Freeze non-compliance
- **Likelihood:** Certain
- **Recommendation:** Add Lit or amend freeze
- **Effort:** M
- **Priority:** P0

### DEP-005 — Missing bundler dependency

- **ID:** DEP-005
- **Severity:** Critical
- **Category:** Missing build tooling
- **Affected Files:** `packages/extension`
- **Evidence:** PART_25/28 reference Vite; no vite/esbuild in extension package
- **Root Cause:** tsc-only emit
- **Impact:** Non-loadable extension
- **Likelihood:** Certain
- **Recommendation:** Add Vite (or esbuild) extension pipeline
- **Effort:** L
- **Priority:** P0

### DEP-006 — No duplicate package names

- **ID:** DEP-006
- **Severity:** Info / Positive
- **Category:** Hygiene
- **Evidence:** Six uniquely named workspace packages
- **Recommendation:** Keep

### DEP-007 — License surface

- **ID:** DEP-007
- **Severity:** Low
- **Category:** License
- **Evidence:** No SBOM tool run in CI (`tools/sbom` absent despite PART_28)
- **Impact:** CWS/enterprise license review incomplete
- **Likelihood:** Medium at publish
- **Recommendation:** Add SBOM generation before CWS
- **Effort:** M
- **Priority:** P2

### DEP-008 — CI audit step may fail on high+

- **ID:** DEP-008
- **Severity:** Medium
- **Category:** CI integrity
- **Affected Files:** `.github/workflows/ci.yml` (`pnpm audit --audit-level=high`)
- **Evidence:** Current lock triggers high/critical findings
- **Impact:** CI red on clean clone once advisories hit threshold
- **Likelihood:** High
- **Recommendation:** Patch deps before relying on green CI
- **Effort:** M
- **Priority:** P1

---

## 3. Heavy / Unsafe Package Assessment

| Concern                         | Status                                               |
| ------------------------------- | ---------------------------------------------------- |
| Heavy runtime deps in extension | None (good) — but unresolved workspace imports worse |
| Native addons                   | None                                                 |
| Remote model download libs      | None (good; ADR remote download rejected)            |
| Eval-enabling libs              | None observed                                        |

---

## Dependency Verdict

Toolchain is **lean but stale/vulnerable**, and **missing the two packages that matter for Freeze compliance** (Lit) and **loadability** (bundler).
