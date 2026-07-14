# Engineering Excellence — Phase A

## Detection Research Expansion

| Field        | Value                                                          |
| ------------ | -------------------------------------------------------------- |
| Program      | Engineering Excellence (post–RC / post–validation lab)         |
| Phase        | **A — Detection research library**                             |
| Package      | `@sentinel-shield/detection-engine`                            |
| Architecture | **Unchanged** (Tier-1 text path; EntityType freeze-compatible) |
| Date         | 2026-07-13                                                     |

---

## 1. Objective vs non-goals

**Done:** Replace ad-hoc regex list with a **catalog-driven research library** (≥100 detectors), each with source ref, justification, FP/FN notes, entropy policy, confidence, severity, category, and unit-tested positive examples.

**Not done (explicitly out of Phase A):** Precision/recall on 10k corpora (Phase B), red-team bypass campaign (Phase C), new product features, architecture redesign, fabricated accuracy metrics.

---

## 2. What shipped

| Artifact                       | Role                                                                                    |
| ------------------------------ | --------------------------------------------------------------------------------------- |
| `src/research/types.ts`        | DetectorSpec model                                                                      |
| `src/research/spec.ts`         | Builder enforcing required research fields                                              |
| `src/research/catalog/*.ts`    | Category packs (PII/payment, cloud, VCS/CI, AI/messaging/pay, data/crypto/SaaS, extras) |
| `src/research/matcher.ts`      | Runtime span finder + entropy gates                                                     |
| `src/research/index.ts`        | Aggregate catalog + integrity assert                                                    |
| `src/research/catalog.test.ts` | Integrity + positive/negative example tests                                             |
| `src/detectors/regex.ts`       | Thin adapter → catalog (freeze pipeline preserved)                                      |

**Catalog size (measured):** **115** detectors.

**Categories (counts):** see machine export from `DETECTOR_CATALOG` (PII, payment, cloud_aws/azure/gcp, vcs, ci_cd, ai_provider, messaging, payments_api, database, crypto_material, auth_token, container, iac, saas, email_sms, other_secret).

---

## 3. Gates re-run

| Gate                     | Result                                  |
| ------------------------ | --------------------------------------- |
| `detection-engine` tests | **41/41 PASS** (incl. catalog suite)    |
| `extension` tests        | **139/139 PASS**                        |
| `pnpm purity`            | **ok** (29 files scanned)               |
| `pnpm bench:budgets`     | **PASS** (100KB median ~12.5ms ≪ limit) |

No precision/recall numbers claimed — **none measured yet**.

---

## 4. Self-review

**Strengths**

- Detectors are **metadata-complete** (not anonymous regex dumps).
- High-FP patterns (bare AWS 40-char, legacy Vault `s.`, generic `password=`) use **lower confidence and/or entropy gates**.
- Runtime still maps to existing `EntityType` — risk/policy/redaction pipeline unchanged.
- Positive-example tests fail the build if a pattern drifts from its claimed example.

**Weaknesses (honest)**

- Many patterns follow **public scanner prefix conventions**; they are not vendor-certified contracts and will rot as vendors rotate formats.
- Overlapping detectors (e.g. `sk-` vs `sk-proj-`, multiple GitHub prefixes) can produce **duplicate spans** (merge softens; scoring may inflate).
- `generic.password_assignment` and bare AWS secret remain **FP hazards** — acceptable only as low-confidence signals until Phase B measures FPR.
- Coverage is still **not** “all enterprise secrets”; labeled env detectors miss unlabeled pastes of the same secrets.

---

## 5. Adversarial review (reject own work)

| Attack on Phase A claim                | Verdict                                                                                                                                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| “100+ production-grade detectors”      | **Partially rejected** — count is real (115); “production-grade” is **aspirational** until Phase B FPR/FNR exists. Prefer: “115 research-catalog detectors with justified prefixes.” |
| “Enterprise secret detection complete” | **Rejected** — incomplete vendor matrix; no measured quality.                                                                                                                        |
| “No architecture change”               | **Holds** — catalog feeds same Tier-1 span → checksum → score → policy path.                                                                                                         |
| “Bench still valid”                    | **Holds** on this host; catalog growth did not blow CI latency gate.                                                                                                                 |

---

## 6. Evidence-backed fixes during Phase A

- Corrected positive examples whose lengths did not match fixed-width prefixes (`ghp_`/`npm_` 36, `AIza` 35, Sentry DSN hex key).
- Avoided circular import by keeping matcher on a local catalog constant.

---

## 7. Phase A verdict

Detection research **foundation** is in place: a reviewable library, wired into Tier-1, regression-tested, purity/bench green.

Engineering credibility improved on **coverage structure**. Credibility on **detection quality** remains **unproven** until Phase B evaluation harness produces reproducible metrics.

---

## 8. STOP — Phase A complete

**Paused for human approval.**

Reply **approve** to proceed to **Phase B (scientific evaluation harness — independent datasets + measured Precision/Recall/F1/latency; no fabricated metrics)**.
