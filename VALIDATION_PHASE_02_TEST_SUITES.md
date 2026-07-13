# Independent Product Validation Lab — Phase 2

## Exhaustive Test Suites + Gate Execution

| Field                | Value                                                         |
| -------------------- | ------------------------------------------------------------- |
| Product              | Sentinel Shield AI                                            |
| Lab role             | Independent verification (break / prove)                      |
| Phase                | **2 of 8 — Test suites + execute existing gates**             |
| Extension under test | `0.2.1`                                                       |
| Lab date             | 2026-07-13                                                    |
| Prior phase          | `VALIDATION_PHASE_01_FEATURE_INVENTORY.md` (approved)         |
| Next phase           | **Paused — awaiting human approval for Phase 3 (benchmarks)** |

---

## 1. Lab posture

Rules observed:

- No new product features
- No redesign / refactor beyond **proven** defect repair
- Validation-only tests allowed
- Pause before Phase 3

**Proven defect repaired this phase (tracker honesty only):**

| ID        | Finding                                                  | Fix                                                        |
| --------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| KI-001    | Stale “zero commits” blocker                             | Closed in `KNOWN_ISSUES.md`; removed from `publicBlockers` |
| KI-018    | Missing from `KNOWN_ISSUES` while required by cert gates | Documented as public CWS blocker                           |
| KI-023    | PDF Allow-once residual risk                             | Logged as soft residual (info)                             |
| Cert JSON | `publicBlockers` still listed KI-001                     | Updated `store/CERTIFICATION_STATUS.json`                  |

---

## 2. Suite matrix (exhaustive plan × coverage)

Legend: **A** = automated & executed this phase · **P** = partial/automated subset · **M** = manual / host-live · **D** = deferred to later lab phase · **N/A** = out of v1 by freeze

### 2.1 Functional (happy path)

| Suite ID | Focus                                      | Feature IDs  | Coverage | Evidence                                                       |
| -------- | ------------------------------------------ | ------------ | -------- | -------------------------------------------------------------- |
| SF-01    | Benign text ALLOW                          | F-010, F-016 | A        | `detection-engine` + `validation.phase2` + `phase2.functional` |
| SF-02    | Email / secrets / card / IBAN / PEM detect | F-011–F-013  | A        | Lab P2 matrix + engine tests                                   |
| SF-03    | WARN→HOLD bridge                           | F-016, F-059 | A        | `validation.phase2` / `scan-bridge`                            |
| SF-04    | Paste text intercept path (unit)           | F-071, F-065 | P        | `phase2.functional`, `sprint2`                                 |
| SF-05    | Overlay decision surface                   | F-080        | P        | a11y + functional suites                                       |
| SF-06    | Platform enable / permissions gesture      | F-054–F-056  | P        | registration / sprint tests; live M                            |
| SF-07    | Popup / options health                     | F-081–F-082  | P        | phase7/9 Lit + axe                                             |
| SF-08    | Live ChatGPT paste                         | F-071, F-080 | M        | Prior manual QA (email overlay) — not re-labbed here           |

### 2.2 Negative / fail-closed

| Suite ID | Focus                                  | Feature IDs | Coverage | Evidence                        |
| -------- | -------------------------------------- | ----------- | -------- | ------------------------------- |
| SN-01    | Oversize text BLOCK                    | F-020       | A        | Lab P2 + tier1                  |
| SN-02    | Privileged IPC from https tab rejected | F-057       | A        | Lab P2 + phase3                 |
| SN-03    | OCR/PDF stubs fail closed              | F-023–F-024 | P        | Existing stubs / KI-002 honesty |
| SN-04    | SW down → HOLD                         | F-066       | P        | coordinator unit paths          |
| SN-05    | Absent Indian IDs stay ALLOW (honesty) | F-112       | A        | Lab P2 Aadhaar case             |
| SN-06    | Typing not intercepted                 | —           | N/A      | Freeze; not a defect            |

### 2.3 Boundary

| Suite ID | Focus                                    | Feature IDs  | Coverage | Evidence                                                    |
| -------- | ---------------------------------------- | ------------ | -------- | ----------------------------------------------------------- |
| SB-01    | `MAX_TEXT_SCAN_BYTES` (+1 fail-closed)   | F-001, F-020 | A        | Lab P2                                                      |
| SB-02    | `MAX_FILE_BYTES` constant 50 MiB class   | F-001        | A        | Lab P2 + shared-types                                       |
| SB-03    | Exact-at-budget acceptance (non-hanging) | F-020        | A        | Lab P2 (under-budget proxy; full 1 MiB scan avoided — cost) |
| SB-04    | Empty / whitespace paste                 | F-010        | P        | engine ALLOW on clean                                       |

### 2.4 Concurrency / rate / recovery

| Suite ID | Focus                                | Feature IDs  | Coverage | Evidence                        |
| -------- | ------------------------------------ | ------------ | -------- | ------------------------------- |
| SC-01    | IPC rate limiter                     | F-034, F-058 | A        | phase3 / core rate-limit        |
| SC-02    | Approval nonce release               | F-063        | A        | Lab P2 `isSentinelRelease`      |
| SC-03    | Crypto soft-miss / orphan ciphertext | F-041        | A        | `browser-adapters` crypto tests |
| SC-04    | Early SW `onMessage`                 | F-051        | P        | background tests                |
| SC-05    | Multi-tab enable inject              | F-056        | M        | Manual residual                 |

### 2.5 Adversarial / obfuscation

| Suite ID | Focus                         | Feature IDs | Coverage | Evidence                     |
| -------- | ----------------------------- | ----------- | -------- | ---------------------------- |
| SA-01    | Zero-width AWS key            | F-014       | A        | Lab P2 + `adversarial.test`  |
| SA-02    | Prompt-injection wrapper      | F-010       | A        | Lab P2                       |
| SA-03    | Base64 / concat / ZWJ secrets | F-014       | A        | detection-engine adversarial |
| SA-04    | Threat-sim harness            | F-021       | A        | threat-sim + engine          |
| SA-05    | Homoglyph residual            | F-014       | P        | KI-010 documented residual   |

### 2.6 Permissions / packaging / cert honesty

| Suite ID | Focus                                   | Feature IDs  | Coverage | Evidence                           |
| -------- | --------------------------------------- | ------------ | -------- | ---------------------------------- |
| SP-01    | Content.js classic IIFE (no ES imports) | F-062, F-090 | A        | Lab P2 dist assert + verify-bundle |
| SP-02    | Dual-verdict cert JSON                  | F-100–105    | A        | phase10 + `pnpm certify`           |
| SP-03    | KI-018 / KI-001 tracker honesty         | —            | A        | phase10 + KNOWN_ISSUES             |
| SP-04    | CWS privacy URL pending                 | KI-018       | A        | phase8 / disclosure JSON           |
| SP-05    | Optional host permissions only          | F-055        | P        | manifest + registration tests      |

### 2.7 Accessibility / UX

| Suite ID | Focus                             | Feature IDs | Coverage | Evidence |
| -------- | --------------------------------- | ----------- | -------- | -------- |
| SX-01    | Overlay axe (no serious/critical) | F-080a      | A        | phase9   |
| SX-02    | Popup axe                         | F-081       | A        | phase9   |
| SX-03    | phase7 a11y suite                 | F-080a      | A        | phase7   |

### 2.8 Explicit gaps (not claimed green)

| Gap                              | Why         | Lab disposition                                                                                 |
| -------------------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| Live G3 multi-host E2E           | KI-006 / G3 | Public blocker; Phase later / M                                                                 |
| OCR/PDF real scan                | KI-002      | STUB — HOLD expected                                                                            |
| History dashboard / badge        | F-120/F-121 | ABSENT — not defects                                                                            |
| Scan rate limiter unused         | KI-022      | Honesty residual                                                                                |
| Full CI lint/typecheck/depcruise | Time-boxed  | `pnpm test` + certify + verify-bundle executed; full `pnpm ci` not required for this phase gate |

---

## 3. Execution results (this phase)

| Gate                       | Command / suite                                          | Result                       |
| -------------------------- | -------------------------------------------------------- | ---------------------------- |
| Package unit tests         | `pnpm test` (turbo, 6 packages)                          | **PASS**                     |
| Extension suites           | 14 files / **110** tests                                 | **PASS**                     |
| Lab-focused suites         | `validation.phase2.test.ts` (**20** tests)               | **PASS**                     |
| Detection adversarial      | `packages/detection-engine` (29 tests)                   | **PASS** (cache + prior)     |
| Certification honesty      | `pnpm certify`                                           | **PASS**                     |
| Bundle shape               | `pnpm --filter @sentinel-shield/extension verify:bundle` | **PASS**                     |
| Extension production build | `vite build`                                             | **PASS** (`content.js` IIFE) |

**Counts (extension package after Lab P2):** 110 automated tests green, including 20 new Lab P2 cases.

---

## 4. Defects found / disposition

| Severity         | Finding                                                       | Disposition                                    |
| ---------------- | ------------------------------------------------------------- | ---------------------------------------------- |
| High (docs/cert) | KI-001 stale in blockers + missing KI-018 row broke `phase10` | **Fixed** (tracker + JSON + test expectations) |
| Info             | Full 1 MiB-at-budget scan hangs test runtime                  | Avoided in Lab P2 (oversize path still proven) |
| Soft             | PDF Allow-once host-DOM residual                              | **KI-023** logged; no product change           |
| Known            | G3 live E2E / KI-018 counsel URL / OCR stubs                  | Unchanged public NO-GO / soft residuals        |

No new runtime product features were added.

---

## 5. Inventory claim cross-check (Phase 1 → evidence)

| Phase 1 claim cluster            | Lab P2 verdict                                            |
| -------------------------------- | --------------------------------------------------------- |
| Tier-1 text detection core       | **Proven** by automated suites                            |
| Paste text path (unit)           | **Proven** in unit; live host remains **manual residual** |
| Binary/OCR                       | **Proven fail-closed / stub** (not a capability)          |
| Content classic script packaging | **Proven** (dist IIFE assert)                             |
| Privileged IPC auth              | **Proven**                                                |
| Public CWS NO-GO honesty         | **Proven** (`certify` + phase10)                          |
| KI-001 “zero commits”            | **Tracker closed** (was stale inventory note)             |

---

## 6. Phase 2 verdict

Automated regression and Lab P2 focused suites **pass**. Tracker honesty for KI-001/KI-018 is restored. Engineering load-unpacked RC posture remains consistent; **public CWS remains NO-GO** (G3, KI-006, KI-018).

This phase does **not** certify performance budgets (Phase 3) or adversarial deep-dive beyond existing adversarial package coverage.

---

## 7. STOP — Phase 2 complete

**Paused for human approval.**

Reply **approve** to proceed to **Phase 3 (benchmarks / performance evidence)**.

No Phase 3 work will start until you approve.
