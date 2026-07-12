# CODE_HEALTH_REPORT.md

**Document ID:** SS-AUDIT-CODE-001  
**Date:** 2026-07-12  
**Mode:** Read-only

---

## 1. TypeScript Health

| Check                             | Result                                                    |
| --------------------------------- | --------------------------------------------------------- |
| `strict`                          | Enabled (`tsconfig.base.json`)                            |
| `noUncheckedIndexedAccess`        | Enabled                                                   |
| `exactOptionalPropertyTypes`      | Enabled                                                   |
| `verbatimModuleSyntax`            | Enabled                                                   |
| `any` usage                       | Not found as type annotations in packages (good)          |
| `as unknown as`                   | Present: `approval-nonce.ts`, sprint1 test mocks          |
| `@ts-ignore` / `@ts-expect-error` | None found                                                |
| Barrel exports                    | Consistent per package `index.ts`                         |
| Project references                | Present; build uses `tsconfig.build.json` excluding tests |

### TS-001 — Unsafe casts for event nonce

- **ID:** TS-001
- **Severity:** Low
- **Category:** Type safety
- **Affected Files:** `packages/extension/src/content/approval-nonce.ts`
- **Evidence:** `(event as unknown as Record<string, unknown>)`
- **Root Cause:** DOM Event not typed for custom brand
- **Impact:** Localized escape hatch; acceptable if contained
- **Likelihood:** N/A
- **Recommendation:** Branded type helper / WeakMap side table
- **Effort:** S
- **Priority:** P3

---

## 2. SOLID / KISS / DRY / YAGNI

| Principle | Assessment                                                                       |
| --------- | -------------------------------------------------------------------------------- |
| SRP       | Generally good module split (lifecycle / messaging / pipelines)                  |
| DIP       | DI container exists; SW still constructs many concretes inline                   |
| KISS      | Mostly; document ports clean                                                     |
| DRY       | Constants centralized; some stale duplicate HOLD semantics                       |
| YAGNI     | Violations: unused streaming in scan path; stub pool; fake Lit claim; empty dirs |

### CODE-001 — Service Worker construction not DI-driven

- **ID:** CODE-001
- **Severity:** Low–Medium
- **Category:** Maintainability
- **Affected Files:** `background.ts`
- **Evidence:** Manual `new` graph vs Container API unused in bootstrap
- **Root Cause:** DI built in Sprint 0, not adopted in SW
- **Impact:** Harder testing of bootstrap; unused abstraction
- **Likelihood:** Medium
- **Recommendation:** Wire Container or delete unused DI until needed
- **Effort:** S–M
- **Priority:** P2

### CODE-002 — Misleading “Lit-based” comment

- **ID:** CODE-002 / F-004
- **Severity:** High
- **Category:** Honesty / ADR
- **Affected Files:** `ui/popup-view.ts`
- **Evidence:** Header says Lit; implementation is HTML string; no Lit import
- **Root Cause:** Documentation theater
- **Impact:** Reviewer false confidence; Freeze violation
- **Likelihood:** Certain
- **Recommendation:** Correct naming; implement Lit or remove claim
- **Effort:** S (label) / L (implement)
- **Priority:** P0

### CODE-003 — Stale Sprint-2 HOLD API

- **ID:** CODE-003 / F-013
- **Severity:** Medium
- **Category:** Dead / misleading code
- **Affected Files:** `input-pipelines/index.ts` `sprint2DefaultDecision`
- **Evidence:** Reason string still claims Tier-1 not ready
- **Root Cause:** Post-Sprint-3 incomplete cleanup
- **Impact:** Confusing tests/docs
- **Likelihood:** High confusion
- **Recommendation:** Remove or retarget helper
- **Effort:** S
- **Priority:** P2

### CODE-004 — Unused `held` array in interception controller

- **ID:** CODE-004
- **Severity:** Low
- **Category:** Dead code
- **Affected Files:** `input-pipelines/index.ts`
- **Evidence:** `held` pushed, never read
- **Root Cause:** Incomplete hold UX
- **Impact:** Noise
- **Likelihood:** Certain
- **Recommendation:** Use for overlay queue or remove
- **Effort:** S
- **Priority:** P3

---

## 3. Naming / Organization

| Item                    | Notes                                              |
| ----------------------- | -------------------------------------------------- |
| Folder names            | Clear under extension                              |
| Empty `service-worker/` | Orphan vs actual `background.ts` entry             |
| Sprint-numbered tests   | Useful archaeology; couple to product suites later |
| Package naming          | `@sentinel-shield/*` consistent                    |

### CODE-005 — Empty service-worker directory

- **ID:** CODE-005
- **Severity:** Low
- **Category:** Structure
- **Affected Files:** `packages/extension/src/service-worker/`
- **Evidence:** Empty dir; PART_28 expected SW under that path
- **Impact:** Layout mismatch with handbook
- **Likelihood:** N/A
- **Recommendation:** Move `background.ts` or remove empty dir
- **Effort:** S
- **Priority:** P2

---

## 4. Detection Engine Code Quality

| Area             | Notes                                    |
| ---------------- | ---------------------------------------- |
| Purity           | Enforced; good                           |
| Regex lookbehind | Requires modern JS — OK with Chrome 120+ |
| Luhn/IBAN        | Real validators — good                   |
| Policy mapping   | Clear; WARN→HOLD in extension bridge     |
| Threat-sim       | Imports `tier1.js` (cycle fixed) — good  |

### CODE-006 — Regex false-positive risk

- **ID:** CODE-006
- **Severity:** Medium
- **Category:** Detection quality
- **Affected Files:** `detectors/regex.ts`, `entropy.ts`
- **Evidence:** Broad phone/IBAN/API patterns; entropy threshold heuristic
- **Impact:** Over-block / user friction
- **Likelihood:** Medium
- **Recommendation:** Corpus golden tests (PART_24); tune before CWS
- **Effort:** M
- **Priority:** P1

---

## 5. Test Code Health

| Metric            | Value                                                                                |
| ----------------- | ------------------------------------------------------------------------------------ |
| `*.test.ts` files | 11                                                                                   |
| `*.spec.ts` files | 1 (Playwright)                                                                       |
| Assertion quality | Mostly behavioral; e2e trivial                                                       |
| Flaky risk        | Low (no timers/network in unit) except offscreen idle timers in unit with short idle |

### CODE-007 — Playwright non-test

- **ID:** CODE-007 / F-010
- **Severity:** Medium
- **Category:** QA honesty
- **Affected Files:** `tests/e2e/harness.spec.ts`
- **Evidence:** `expect(true).toBe(true)`
- **Impact:** False sense of browser coverage
- **Likelihood:** Certain
- **Recommendation:** Load unpacked extension or delete suite until real
- **Effort:** M
- **Priority:** P1

---

## Code Health Verdict

**Readable foundation with integrity problems** (misleading Lit claim, stale HOLD helpers, unused DI/streaming) and **blocking packaging defects outside pure code style**.
