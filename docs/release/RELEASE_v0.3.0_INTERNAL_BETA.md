# RELEASE v0.3.0 — Internal Beta Engineering Milestone

**Tag:** `v0.3.0-internal-beta`  
**Date:** 2026-07-13  
**Extension package version:** `0.2.1` (unchanged — milestone tag is repository-level)  
**Repository:** Sentinel Shield AI

---

## Executive Summary

This release marks the **Engineering Implementation Freeze** for Sentinel Shield AI: architecture frozen, engineering RC certified, scientific evaluation and red-team programs complete, engineering gap closure applied, and engineering mastery documentation published.

**Dual verdict (unchanged):**

| Verdict                                      | Status    |
| -------------------------------------------- | --------- |
| Engineering RC / load-unpacked internal beta | **GO**    |
| Public Chrome Web Store / production         | **NO-GO** |

This is an **engineering milestone**, not a public product launch.

---

## Major Engineering Milestones

| Milestone                       | Status   | Evidence                                     |
| ------------------------------- | -------- | -------------------------------------------- |
| Architecture Freeze v1.0        | Complete | `blueprint/ARCHITECTURE_FREEZE_v1.0.md`      |
| Engineering RC                  | Complete | `store/CERTIFICATION_STATUS.json`            |
| Internal Beta Certification     | Complete | Validation Phases 1–8                        |
| Detection Research (Phase A)    | Complete | Catalog + `ENGINEERING_EXCELLENCE_PHASE_A_*` |
| Scientific Evaluation (Phase B) | Complete | `tools/eval-harness/`                        |
| Red Team (Phase C)              | Complete | `tools/red-team/`, `BYPASS_DATABASE.md`      |
| Engineering Gap Closure         | Complete | `ENGINEERING_GAP_ANALYSIS.md`, KI-022 closed |
| Engineering Mastery Program     | Complete | Whitepaper, Interview Bible, Defense guides  |
| CI / Certification gates        | **PASS** | `pnpm certify`, full test suite              |

---

## Detection Research

- Catalog-driven Tier-1 library (100+ research detectors with metadata and example tests)
- Preprocess pipeline: spaced alnum collapse, newline join, HTML entities, bounded base64/hex rescan
- Checksum enrichment: Luhn (PAN), MOD-97 (IBAN)
- Entropy hardening (Phase C): min length, charset gates, AWS-40 `/+=` requirement
- Phone precision gate (gap closure): separator-required NANP pattern

---

## Evaluation Results

**Harness:** `tools/eval-harness/run-eval.mjs`  
**Seed:** `1581719041` (reproducibility contract)  
**Corpus:** Synthetic 20,000 samples (10k benign + 10k malicious)

### Phase B baseline (pre-remediation)

| Metric    | Value  |
| --------- | ------ |
| Precision | 0.9022 |
| Recall    | 0.8388 |
| F1        | 0.8694 |
| FPR       | 0.0909 |

### Phase C after remediations

| Metric            | Value              |
| ----------------- | ------------------ |
| Precision         | 0.9941             |
| Recall            | 0.8694             |
| F1                | 0.9276             |
| FPR               | 0.0052             |
| Spaced recall     | 0.7032 (was 0.000) |
| Hard-negative FPR | 0.0173 (was 0.303) |

### Gap-board run (phone precision + holdout reporting)

| Metric    | Headline | Holdout (−exact) |
| --------- | -------- | ---------------- |
| Precision | 1.000    | 1.000            |
| Recall    | 0.853    | 0.832            |
| F1        | 0.921    | 0.908            |
| FPR       | 0.000    | 0.000            |

**Honesty:** Synthetic corpus only. Not production traffic. Do not market as production precision.

---

## Red Team Findings

**Probes:** 39 total · **37 pass** · **2 accepted bypasses** (ROT13 AWS/SK) · **0 false positives**

| Class                     | Status                |
| ------------------------- | --------------------- |
| Whitespace / tab chunking | Fixed                 |
| Newline fragmentation     | Fixed                 |
| HTML entities             | Fixed                 |
| Hex encoding              | Fixed                 |
| Entropy false positives   | Fixed                 |
| ROT13                     | **Accepted residual** |

Catalog: `BYPASS_DATABASE.md`, `RED_TEAM_REPORT.md`

---

## Engineering Gap Closure

| Gap                             | Resolution                                           |
| ------------------------------- | ---------------------------------------------------- |
| KI-022 scan rate limiter unused | **Closed** — wired on INTERCEPT_EVENT / SCAN_REQUEST |
| Phone contiguous-digit FP       | Tightened regex + negatives                          |
| Eval optimism                   | Holdout metrics (−exact catalog positives)           |
| Typecheck / lint                | Restored green                                       |

---

## Known Limitations

| Limitation            | Status                                                   |
| --------------------- | -------------------------------------------------------- |
| OCR / PDF WASM        | Fail-closed HOLD (KI-002); flag armed, capability absent |
| ROT13 bypass          | Accepted residual                                        |
| Live host G3 sign-off | Public blocker (KI-006)                                  |
| Privacy policy URL    | Public blocker (KI-018)                                  |
| Typing interception   | Out of scope (freeze)                                    |
| Synthetic eval        | Not production-validated                                 |

Full list: `UPDATED_LIMITATIONS.md`

---

## Architecture Freeze

Frozen v1.0 — MV3, local-first Tier-1, AI-host permissions, Lit UI, fail-closed unscanned release prohibition (ADR-036). No architecture redesign in this release.

---

## Metrics (CI gates — release day)

| Gate                  | Result                           |
| --------------------- | -------------------------------- |
| `pnpm typecheck`      | PASS                             |
| `pnpm lint`           | PASS                             |
| `pnpm test`           | PASS (214 tests across packages) |
| `pnpm build`          | PASS                             |
| `pnpm purity`         | PASS                             |
| `pnpm depcruise`      | PASS                             |
| `pnpm bench:budgets`  | PASS                             |
| `pnpm certify`        | PASS                             |
| `pnpm eval:detection` | PASS                             |
| Extension dist        | ~0.69 MB (< 25 MB budget)        |

---

## Residual Risks

- User override (Allow Anyway)
- Clipboard API bypass (RR-01)
- Iframe coverage (`allFrames: false`)
- ROT13 / novel encodings
- Blueprint vs implementation drift on OCR/NER (documented)
- Device-lab P99 (KI-012)

---

## Current Certification Status

```json
{
  "engineeringVerdict": "GO_CERTIFIED_RC",
  "publicProductionVerdict": "NO_GO",
  "publicBlockers": ["G3", "KI-006", "KI-018"],
  "authorizesCwsPublish": false,
  "authorizesLoadUnpackedBeta": true
}
```

Source: `store/CERTIFICATION_STATUS.json`

---

## Future Roadmap (human tasks — not code)

1. External beta testing (load-unpacked cohort)
2. Live host validation — ChatGPT / Claude / Gemini (KI-006)
3. Counsel-approved privacy policy (KI-018)
4. Chrome Web Store preparation (assets, listing — when blockers clear)
5. Interview preparation using mastery artifacts
6. Whitepaper external review
7. OCR WASM integrity program (when ADR-amended)

**No further implementation phase is authorized** unless objective evidence shows a Category A security defect.

---

## Documentation Index

| Artifact             | Path                               |
| -------------------- | ---------------------------------- |
| Knowledge graph      | `PROJECT_KNOWLEDGE_GRAPH.md`       |
| Architecture defense | `ARCHITECTURE_DEFENSE_GUIDE.md`    |
| Whitepaper           | `WHITEPAPER_SENTINEL_SHIELD_AI.md` |
| Interview bible      | `TECHNICAL_INTERVIEW_BIBLE.md`     |
| Defense playbook     | `INTERVIEW_DEFENSE_PLAYBOOK.md`    |
| Demo script          | `LIVE_DEMO_SCRIPT.md`              |
| Portfolio guide      | `PORTFOLIO_GUIDE.md`               |
| Mastery index        | `ENGINEERING_MASTERY_INDEX.md`     |
