# PART 24 — TESTING STRATEGY & TEST CASE LIBRARY

**Document ID:** SS-BP-024
**Classification:** Internal Engineering — Principal Review
**Version:** 1.0.0
**Last Updated:** 2026-07-12
**Owner:** Principal QA Architect, Staff Test Engineer (Detection)
**Reviewers:** Principal Detection Engineer, Principal Security Architect, Distinguished AI Engineer

---

## Executive Summary

This document is the definitive engineering contract for how Sentinel Shield AI is tested. It defines the test pyramid, coverage gates, the requirement traceability matrix, the labeled detection corpus, false-positive and false-negative methodologies, mutation testing for detectors, the flaky-test policy, live-platform E2E strategy, and CI wiring. It treats "the test system" itself as a first-class subsystem and documents it against the full 20-field subsystem template from `00_MASTER_INDEX.md §5`.

The governing principle: **a detection product is only as trustworthy as the corpus and the gates that prove it.** Every functional requirement (`PART_03`) must trace to a test. Every bypass in the guardrails library (`PART_20`) must map to a concrete regression test id. Zero orphan requirements and zero unmapped bypasses are ship blockers.

---

## 1. Objectives

| ID | Objective |
|---|---|
| OBJ-001 | Define the test pyramid, layer responsibilities, and coverage gates enforced in CI |
| OBJ-002 | Define the requirement traceability matrix format and the zero-orphan rule |
| OBJ-003 | Specify the labeled detection corpus (synthetic generator, positive/negative/edge corpora, per-entity minimums, labeling protocol, fixtures format) |
| OBJ-004 | Define false-positive analysis methodology with an FP budget < 2% and an allowlist mechanism |
| OBJ-005 | Define false-negative analysis methodology linked to every `PART_20` bypass |
| OBJ-006 | Specify mutation testing for detectors, the flaky-test policy, live-platform E2E, and CI wiring |

---

## 2. Dependencies

| Dependency | Type |
|---|---|
| PART_03_PRODUCT_REQUIREMENTS.md | Source of FR/NFR ids and acceptance criteria — the traceability spine |
| PART_13_DETECTION_ENGINE.md | Detector interfaces, confidence semantics, performance budgets under test |
| PART_20_GUARDRAILS.md | Bypass library — every bypass maps to a regression test id here |
| PART_23_PERFORMANCE.md | Performance budgets asserted by the perf test layer |
| PART_25_CICD_RELEASE.md | Pipeline that executes and gates on these suites |
| PART_29_ENDPOINT_INTERCEPTION_THREAT_MODELS.md | Endpoint stress/regression strategies executed by E2E |

---

## 3. Design Principles

| Principle | Implication |
|---|---|
| **Tests encode requirements, not implementations** | Each test asserts an FR/NFR acceptance criterion, so refactors do not require rewriting intent. |
| **Deterministic corpus, seeded randomness** | The synthetic generator is seeded (`SS_CORPUS_SEED`). Identical seed → identical corpus → reproducible accuracy numbers. |
| **Fast feedback first** | Unit + FP/FN corpus gates run on every push (< 4 min). Slow E2E on live platforms runs nightly and pre-release. |
| **No detector ships without a mutation score** | A detector that survives mutants is untested logic. Mutation gate ≥ 70% per detector module. |
| **Accuracy is a gate, not a dashboard** | Precision/recall thresholds fail the build, they do not merely report. |
| **Zero orphans** | Any requirement or bypass without a mapped, passing test blocks release. |

---

## 4. The Test Pyramid

```mermaid
graph TD
    subgraph Pyramid["Sentinel Shield Test Pyramid"]
        A["Unit Tests — Vitest<br/>~2,400 tests · &lt;90s<br/>gate: ≥90% line / ≥85% branch"]
        B["Integration Tests — Vitest<br/>~420 tests · &lt;120s<br/>gate: ≥80% line, full-pipeline paths"]
        C["Accuracy / Corpus Tests — Vitest<br/>17k labeled samples<br/>gate: precision/recall per entity"]
        D["E2E Tests — Playwright<br/>~180 flows · headed Chromium+extension<br/>gate: all P0 endpoints green"]
        E["Visual Regression — Playwright<br/>overlay/popup snapshots · gate: 0 unreviewed diffs"]
        F["Performance — Vitest bench + Playwright trace<br/>gate: NFR-PERF budgets P99"]
        G["Security — SAST/DAST/deps<br/>gate: 0 critical/high, CSP, ReDoS"]
        H["Accessibility — axe-core + Playwright<br/>gate: 0 WCAG 2.1 AA violations"]
    end
    A --> B --> C --> D
    D --> E
    D --> F
    D --> G
    D --> H
```

### 4.1 Layer Responsibilities and Gates

| Layer | Framework | Scope | Runs on | Wall-clock budget | Coverage / pass gate |
|---|---|---|---|---|---|
| **Unit** | Vitest | Pure functions: regex groups, Luhn/Verhoeff/MOD-97, entropy, BIO merge, aggregator, redaction | Every push | < 90s | **≥ 90% line, ≥ 85% branch** (global); 100% line on checksum module |
| **Integration** | Vitest | Full `DetectionPipeline.detect()`, worker IPC contracts, preprocessing→tier→aggregate chains | Every push | < 120s | **≥ 80% line**; every pipeline branch (clean pass, tier2-fail, image path) covered |
| **Accuracy / Corpus** | Vitest | 17k labeled corpus → precision/recall/F1 per entity | Every push | < 150s | Per-entity precision/recall thresholds (see §7.5) |
| **E2E** | Playwright | Real Chromium + loaded extension against ChatGPT/Claude/Gemini (staging accounts + recorded fixtures) | Nightly + pre-release | < 25 min | All P0 endpoints intercept before egress |
| **Visual** | Playwright `toHaveScreenshot` | Overlay, popup, dashboard across risk levels + light/dark | Nightly + pre-release | < 6 min | 0 unreviewed pixel diffs (0.1% threshold) |
| **Performance** | Vitest `bench` + Playwright tracing | Latency/memory vs `PART_03 §8.1–8.2` | Nightly + pre-release | < 10 min | P99 within NFR budget; regression < 10% vs baseline |
| **Security** | Semgrep, `npm audit`, ReDoS analyzer, CSP lint | Static + dependency + pattern safety | Every push + nightly | < 5 min | 0 critical/high; 0 ReDoS; CSP has no `unsafe-eval` |
| **Accessibility** | `@axe-core/playwright` | All rendered UI surfaces | Nightly + pre-release | < 4 min | 0 serious/critical WCAG 2.1 AA violations |

### 4.2 Coverage Gate Enforcement (Vitest)

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'lcov'],
      // Global gate — build fails below these numbers.
      thresholds: {
        lines: 90,
        branches: 85,
        functions: 90,
        statements: 90,
        // Per-module override: checksum math must be exhaustively tested.
        'src/detection/checksum/**': {
          lines: 100, branches: 100, functions: 100, statements: 100,
        },
        'src/detection/aggregator/**': {
          lines: 95, branches: 90, functions: 95, statements: 95,
        },
      },
      exclude: ['**/*.d.ts', 'test/**', '**/fixtures/**', '**/*.bench.ts'],
    },
  },
});
```

A push failing any threshold exits non-zero and blocks merge (`PART_25 §CI`). Coverage deltas are posted to the PR; a drop > 1% line coverage requires a reviewer override label `coverage-approved`.

---

## 5. Requirement Traceability Matrix

### 5.1 Format

Every row links a requirement id → owning blueprint section → acceptance criterion → test id(s) → suite. The matrix is a checked-in file `traceability/requirements.matrix.yaml`, and a CI job (`trace:verify`) fails if any requirement lacks at least one **passing** test.

```yaml
# traceability/requirements.matrix.yaml
- req: FR-DET-001            # Government ID detection
  blueprint: PART_03 §4.FR-DET-001
  detail: PART_13 §6.2
  acceptance:
    - id: AC-DET-001-a
      text: "Detects valid Aadhaar 2234 5678 9012 (Verhoeff valid)"
      tests: [UT-AADHAAR-001, INT-PIPE-014]
    - id: AC-DET-001-b
      text: "Rejects 1234 5678 9012 (invalid Verhoeff)"
      tests: [UT-AADHAAR-007]
  suites: [unit, integration, accuracy]
- req: NFR-PERF-002          # 10KB text < 200ms P99
  blueprint: PART_03 §8.1
  detail: PART_13 §14
  acceptance:
    - id: AC-PERF-002-a
      text: "10KB mixed-entity text scans < 200ms P99 on reference HW"
      tests: [PERF-TEXT-10K]
  suites: [performance]
```

### 5.2 Traceability Rules

| Rule | Enforcement |
|---|---|
| **Zero orphan requirements** | `trace:verify` enumerates all FR-*/NFR-* ids parsed from `PART_03`; any id without a mapped test id fails CI. |
| **Zero orphan tests** | Every test tagged with `@req(ID)` must reference a real requirement; unknown ids fail CI. |
| **Passing, not merely present** | A mapped test that is `skipped` or failing counts as unmapped for gating purposes. |
| **Bidirectional** | Report renders req→test and test→req; a requirement with only skipped tests is flagged red. |
| **Ship gate** | Release job aborts if any P0/P1 requirement row is red. |

### 5.3 Coverage Snapshot (illustrative, from the checked-in matrix)

| Requirement | Blueprint | Acceptance criteria | Mapped tests | Status |
|---|---|---|---|---|
| FR-DET-001 Government IDs | PART_03 §4 / PART_13 §6.2 | 6 | 18 unit + 3 int + corpus | Green |
| FR-DET-002 Financial | PART_03 §4 / PART_13 §6.3 | 8 | 26 unit + 4 int + corpus | Green |
| FR-DET-003 Secrets | PART_03 §4 / PART_13 §6.4 | 8 | 31 unit + corpus | Green |
| FR-INP-001 Paste | PART_03 §5 / PART_29 §A | 6 | 6 E2E + 4 int | Green |
| FR-INP-003 Drag-drop | PART_03 §5 / PART_29 §C | 4 | 5 E2E | Green |
| NFR-PERF-002 10KB latency | PART_03 §8.1 | 1 | PERF-TEXT-10K | Green |
| NFR-SEC-003 No RCE vectors | PART_03 §8.5 | 1 | SEC-CSP-001, SEC-EVAL-001 | Green |
| NFR-A11Y-001 WCAG AA | PART_03 §8.8 | 1 | A11Y-OVERLAY-001..006 | Green |

---

## 6. Test Case Library — Labeled Corpus Design

The corpus is the empirical backbone of every accuracy number. It is version-controlled by manifest hash, seeded, and never contains real PII.

### 6.1 Corpus Composition

| Corpus | Size | Purpose | Label source | Location |
|---|---|---|---|---|
| **Positive** | 10,000 | True-positive recall measurement across all entity types | Synthetic generator (ground-truth spans known) | `corpus/positive/*.jsonl` |
| **Negative / Clean** | 5,000 | False-positive rate on realistic clean text | Curated public-domain + generated benign text | `corpus/negative/*.jsonl` |
| **Edge-case** | 2,000 | Formatting variants, partials, multi-entity, look-alikes | Generator + hand-authored | `corpus/edge/*.jsonl` |
| **Bypass regression** | 300+ | One+ sample per `PART_20` bypass (see §9.4) | Hand-authored adversarial | `corpus/bypass/*.jsonl` |
| **Total** | **17,300+** | | | |

### 6.2 Synthetic PII Generator

The generator emits **fake-but-format-valid** entities with correct checksums so recall is measured against real detector logic — never against real personal data.

```typescript
// test/corpus/generator.ts
import seedrandom from 'seedrandom';
import { verhoeffAppend, luhnAppend, mod97Ok } from '../../src/detection/checksum';

export interface Labeled {
  id: string;
  text: string;
  spans: { start: number; end: number; entity: EntityType; value: string }[];
  meta: { generator: string; seed: string; entity: EntityType };
}

const rng = seedrandom(process.env.SS_CORPUS_SEED ?? 'ss-2026');
const digit = () => Math.floor(rng() * 10);

/** Aadhaar: 11 random digits + Verhoeff check digit (checksum-valid, not a real id). */
export function genAadhaar(): string {
  const base = Array.from({ length: 11 }, digit).join('');
  return verhoeffAppend(base); // returns 12-digit string with valid Verhoeff
}

/** Visa: IIN 4 + random body + Luhn check digit. */
export function genVisa(): string {
  const body = '4' + Array.from({ length: 14 }, digit).join('');
  return luhnAppend(body); // 16 digits, Luhn-valid
}

/** Wrap an entity in realistic surrounding prose to model paste context. */
export function wrapInProse(value: string, entity: EntityType): Labeled {
  const prefix = pick(PROSE_PREFIXES); // e.g. "Please onboard the user, id "
  const suffix = pick(PROSE_SUFFIXES); // e.g. " and confirm by EOD."
  const text = `${prefix}${value}${suffix}`;
  const start = prefix.length;
  return {
    id: `gen-${entity}-${hash(text)}`,
    text,
    spans: [{ start, end: start + value.length, entity, value }],
    meta: { generator: 'synthetic-v1', seed: String(process.env.SS_CORPUS_SEED), entity },
  };
}
```

Generator guarantees:

| Guarantee | Mechanism |
|---|---|
| No real PII | All values are randomly generated; checksum functions only enforce format validity. |
| Reproducible | Seeded RNG; the manifest records the seed and a SHA-256 of the emitted corpus. |
| Format coverage | Each entity emitted in continuous, spaced, dashed, and case variants. |
| Ground-truth spans | Exact `[start,end)` recorded, enabling span-level precision/recall (not just document-level). |

### 6.3 Per-Entity Minimum Test Counts

Enforced by `corpus:validate` (fails CI if any entity is under-represented).

| Entity | Positive min | Negative look-alikes | Edge min | Rationale |
|---|---|---|---|---|
| Aadhaar | 800 | 200 (invalid Verhoeff) | 150 | Checksum boundary coverage |
| PAN | 500 | 150 (bad 4th char) | 100 | Structural validation |
| Credit/Debit card | 900 | 250 (Luhn-fail, ISBN-13) | 200 | Highest-severity, Luhn edges |
| IBAN | 400 | 120 (bad MOD-97) | 80 | Length variance (15–34) |
| Phone | 700 | 300 (short/ID numbers) | 150 | Country-format ambiguity |
| Email | 600 | 200 (localhost/malformed) | 100 | RFC edge cases |
| AWS key (AKIA/ASIA) | 400 | 150 (random 20-char) | 80 | Prefix specificity |
| GitHub token (ghp_ etc.) | 300 | 100 | 60 | Multi-prefix |
| JWT | 300 | 120 (non-JSON base64) | 60 | Header-decode validation |
| Generic high-entropy secret | 500 | 400 (UUID/git-hash/base64 img) | 200 | FP-prone; large negative set |
| Private key (PEM) | 200 | 60 | 40 | Header anchoring |
| Face / signature (image) | 600 img | 300 (shapes/logos) | 200 | CV FP control |
| QR / barcode | 300 img | 100 | 80 | Decode-then-scan |
| **Aggregate minimum** | **≥ 10,000** | **≥ 5,000** | **≥ 2,000** | Pyramid balance |

### 6.4 Labeling Protocol

| Step | Rule |
|---|---|
| **1. Ground truth by construction** | Synthetic samples carry generator-emitted spans as authoritative labels. |
| **2. Dual annotation for hand-authored** | Edge/bypass samples labeled independently by 2 annotators. |
| **3. Adjudication** | Disagreements resolved by a third senior annotator; decision recorded in `label_notes`. |
| **4. Inter-annotator agreement** | Cohen's κ computed per batch; κ < 0.85 triggers protocol review before the batch is admitted. |
| **5. Provenance** | Each sample records `label_source` = `generated` \| `annotated` \| `adjudicated`. |
| **6. Immutability + versioning** | Corpus is append-mostly; changes bump `corpus_version` and re-baseline accuracy metrics via ADR. |

### 6.5 Fixtures Format

Corpus fixtures are newline-delimited JSON (JSONL) with a strict, validated schema:

```jsonc
// corpus/positive/financial.jsonl (one object per line)
{
  "id": "gen-CREDIT_CARD-9f2a1c",
  "text": "Please charge my card 4111111111111111 for the invoice.",
  "spans": [{ "start": 22, "end": 38, "entity": "CREDIT_CARD", "value": "4111111111111111" }],
  "expected": { "detect": true, "minConfidence": 0.95, "checksum": "luhn-valid" },
  "meta": { "label_source": "generated", "corpus_version": "1.0.0", "seed": "ss-2026" }
}
```

Schema is enforced by a Zod validator run in `corpus:validate`:

```typescript
// test/corpus/schema.ts
import { z } from 'zod';

export const SpanSchema = z.object({
  start: z.number().int().nonnegative(),
  end: z.number().int().positive(),
  entity: EntityTypeEnum,
  value: z.string().min(1),
}).refine(s => s.end > s.start, 'end must exceed start');

export const FixtureSchema = z.object({
  id: z.string().regex(/^[a-z]+-[A-Z_]+-[0-9a-f]{6}$/),
  text: z.string().min(1).max(1_000_000),
  spans: z.array(SpanSchema),        // empty array = clean sample
  expected: z.object({
    detect: z.boolean(),
    minConfidence: z.number().min(0).max(1).optional(),
    checksum: z.string().optional(),
  }),
  meta: z.object({
    label_source: z.enum(['generated', 'annotated', 'adjudicated']),
    corpus_version: z.string(),
    seed: z.string().optional(),
  }),
});
```

### 6.6 Corpus-Driven Accuracy Harness

```typescript
// test/accuracy/corpus.spec.ts
import { describe, it, expect } from 'vitest';
import { loadCorpus } from '../corpus/load';
import { DetectionPipeline } from '../../src/pipeline/detection-pipeline';
import { scoreSpans } from '../metrics';

const pipeline = new DetectionPipeline({ tier2: 'mock-onnx' });

describe('accuracy: positive corpus recall', () => {
  const samples = loadCorpus('corpus/positive');

  it('meets per-entity recall thresholds', async () => {
    const byEntity = new Map<string, { tp: number; fn: number }>();
    for (const s of samples) {
      const result = await pipeline.detect({ kind: 'text', text: s.text });
      const { tp, fn } = scoreSpans(s.spans, result.detections); // span-overlap match
      for (const [ent, m] of Object.entries(byEntity.mergeFrom(tp, fn))) {
        byEntity.set(ent, m);
      }
    }
    for (const [entity, { tp, fn }] of byEntity) {
      const recall = tp / (tp + fn);
      expect(recall, `recall(${entity})`).toBeGreaterThanOrEqual(THRESHOLDS[entity].recall);
    }
  });
});
```

---

## 7. False Positive Analysis

### 7.1 Methodology

Precision is measured on the **negative/clean corpus** (no entities present) plus the negative look-alike slices of the positive corpus. Any detection on a clean sample is a false positive.

```
precision   = TP / (TP + FP)
FP rate     = FP_samples / total_clean_samples
```

Gate: **document-level FP rate < 2%** across the 5,000-sample clean corpus (mirrors `PART_03` FR-DET-003 and `PART_13 §17.3`). Per-entity precision gates in §7.5.

### 7.2 Common False-Positive Classes

| FP class | Why it triggers | Mitigation | Test id |
|---|---|---|---|
| **ISBN-13** | 13 digits, `978`/`979` prefix; can pass Luhn-like checks | Exclude when preceded by `ISBN`/`978`/`979` context; ISBN-13 uses MOD-10 not Luhn — validate distinctly | UT-FP-ISBN-001 |
| **UUID v4** | 32 hex chars → high entropy | Structural exclude via UUID regex (`PART_13 §8.3`) before entropy flag | UT-FP-UUID-001 |
| **Git commit hash** | 40-char hex → looks like a secret | Exclude when near `commit`/`merge`/`sha`/`cherry-pick` | UT-FP-GITHASH-001 |
| **Unix/ISO timestamps** | 10–13 digit runs resemble IDs | Range-bound numeric filter + ISO regex exclude | UT-FP-TS-001 |
| **Base64 image data** | `data:image/...` high entropy | Prefix exclude in entropy engine | UT-FP-DATAURI-001 |
| **Hex color codes** | `#RRGGBB` short high-entropy | Structural exclude | UT-FP-HEXCOLOR-001 |
| **Stripe test keys** | `sk_test_`/`pk_test_` real-looking | Downgrade to informational, not high-severity | UT-FP-STRIPETEST-001 |
| **Phone-like IDs** | Order numbers, SKUs | Require country indicator / libphonenumber validity | UT-FP-PHONEID-001 |

### 7.3 Allowlist Mechanism

Users and enterprises can suppress known-safe values. The allowlist is applied **after** detection, **before** the overlay, so metrics can still count what was suppressed.

```typescript
// src/detection/allowlist.ts
export interface AllowlistEntry {
  kind: 'exact' | 'regex' | 'domain' | 'entityType';
  value: string;               // stored as salted SHA-256 for exact/domain — never raw PII
  scope: 'user' | 'org';       // org entries come from chrome.storage.managed
  reason?: string;
}

export function applyAllowlist(
  detections: Detection[],
  list: AllowlistEntry[],
): { kept: Detection[]; suppressed: Detection[] } {
  const suppressed: Detection[] = [];
  const kept = detections.filter(d => {
    const hit = list.find(e => matches(e, d));
    if (hit) { suppressed.push({ ...d, suppressedBy: hit.kind }); return false; }
    return true;
  });
  return { kept, suppressed };
}
```

Allowlist rules:

| Rule | Rationale |
|---|---|
| Exact/domain entries stored as salted hashes | Never persist raw PII (`NFR-PRIV-004`). |
| Org allowlist overrides user allowlist | Managed policy authority (`FR-ENT-001`). |
| Suppressions are counted in FP telemetry (locally) | An overactive allowlist masking real detections is itself a defect signal. |
| Allowlist changes are audited | `FR-ENT-002` audit event `allowlist.modified` (types only, no values). |

### 7.4 FP Budget Tracking

```typescript
// test/accuracy/false-positive.spec.ts
it('clean corpus false-positive rate stays under budget', async () => {
  const clean = loadCorpus('corpus/negative');          // 5,000 samples, spans = []
  let fpSamples = 0;
  for (const s of clean) {
    const { detections } = await pipeline.detect({ kind: 'text', text: s.text });
    const realFP = detections.filter(d => d.confidence >= 0.5);  // ignore informational
    if (realFP.length > 0) fpSamples++;
  }
  const fpRate = fpSamples / clean.length;
  expect(fpRate, 'document-level FP rate').toBeLessThan(0.02);   // < 2% budget
});
```

### 7.5 Per-Entity Precision / Recall Gate Table

| Entity | Precision gate | Recall gate | Source requirement |
|---|---|---|---|
| Aadhaar | ≥ 0.99 | ≥ 0.95 | FR-DET-001 |
| PAN | ≥ 0.97 | ≥ 0.95 | FR-DET-001 |
| Credit/Debit card | ≥ 0.99 | ≥ 0.97 | FR-DET-002 |
| IBAN | ≥ 0.98 | ≥ 0.95 | FR-DET-002 |
| Email | ≥ 0.95 | ≥ 0.95 | FR-DET-004 |
| Phone | ≥ 0.90 | ≥ 0.85 | FR-DET-004 |
| AWS/GitHub/JWT secrets | ≥ 0.95 | ≥ 0.90 | FR-DET-003 |
| Generic high-entropy secret | ≥ 0.85 | ≥ 0.80 | FR-DET-003 |
| Face (image) | ≥ 0.90 | ≥ 0.85 | FR-DET-008 |
| Signature (image) | ≥ 0.70 | ≥ 0.70 | FR-DET-008 |

---

## 8. False Negative Analysis

### 8.1 Methodology

Recall is measured on the positive corpus (known spans) and, critically, on the **bypass regression corpus** where each adversarial sample from `PART_20` must still be detected. A missed known span is a false negative.

```
recall     = TP / (TP + FN)
FN rate    = FN_spans / total_positive_spans
bypass_recall = detected_bypass_samples / total_bypass_samples
```

Gate: aggregate recall ≥ per-entity thresholds (§7.5) **and** bypass_recall = 100% for all bypasses classified `mitigated` in `PART_20` (bypasses documented as accepted limitations are asserted as *expected misses* so a future improvement flips them without silent regression).

### 8.2 Obfuscation / Bypass Cases (from PART_20)

Each defensible bypass is reproduced as an adversarial sample and asserted to be caught after preprocessing:

```typescript
// test/accuracy/false-negative.spec.ts
import { insertZeroWidth, toHomoglyph, toBase64 } from '../corpus/adversarial';

describe('false-negative: PART_20 obfuscation resistance', () => {
  const AKIA = 'AKIAIOSFODNN7EXAMPLE';

  it('FN-BYP-ZW-001: zero-width injected AWS key is still detected (PART_20 §1.1)', async () => {
    const text = `key = ${insertZeroWidth(AKIA)}`;      // U+200B between each char
    const { detections } = await pipeline.detect({ kind: 'text', text });
    expect(detections.some(d => d.entity === 'AWS_ACCESS_KEY')).toBe(true);
  });

  it('FN-BYP-HG-001: Cyrillic homoglyph AWS key is normalized then detected (PART_20 §1.2)', async () => {
    const text = `key = ${toHomoglyph(AKIA)}`;          // Cyrillic А for Latin A
    const { detections } = await pipeline.detect({ kind: 'text', text });
    expect(detections.some(d => d.entity === 'AWS_ACCESS_KEY')).toBe(true);
  });

  it('FN-BYP-B64-001: base64-encoded secret is decoded and detected (PART_20 §1.3)', async () => {
    const text = `payload: ${toBase64(AKIA)}`;
    const { detections } = await pipeline.detect({ kind: 'text', text });
    expect(detections.some(d => d.source === 'base64-decoded')).toBe(true);
  });
});
```

### 8.3 Accepted-Limitation Assertions

Bypasses `PART_20` documents as v1.0 limitations (e.g. natural-language number spelling, complex AST-level key splitting) are pinned as **expected misses** so their status is explicit and cannot regress unnoticed:

```typescript
it('FN-BYP-NLNUM-001: spelled-out card number is a KNOWN miss in v1.0 (PART_20 §7.1)', async () => {
  const text = 'my card number is four one one one one one one one one one one one one one one one';
  const { detections } = await pipeline.detect({ kind: 'text', text });
  // Documented limitation — flips to .toBe(true) when number-word converter ships.
  expect(detections.some(d => d.entity === 'CREDIT_CARD')).toBe(false);
});
```

---

## 9. Regression Suite, Gates & Bypass Mapping

### 9.1 Regression Suite Composition

| Regression source | Trigger to add | Executed |
|---|---|---|
| Every fixed detection bug | PR that closes a `DEF`/`BUG` issue must add a failing-then-passing test | Every push |
| Every `PART_20` bypass | Bypass documented → regression test id assigned (§9.4) | Every push |
| Every production incident | `PART_27` post-mortem action item → regression test | Every push |
| Accuracy baseline drift | Corpus metric drop > 0.5% | Nightly compare vs baseline |

### 9.2 Regression Gates

| Gate | Threshold | Action on breach |
|---|---|---|
| Unit + integration | 100% pass | Block merge |
| Accuracy per-entity | ≥ §7.5 thresholds | Block merge |
| FP budget | < 2% | Block merge |
| Bypass recall | 100% of mitigated bypasses | Block merge |
| Performance | P99 within NFR, < 10% regression | Block release (warn on push) |

### 9.3 PART_20 → Test Mapping (Complete)

Every bypass in `PART_20` maps to a concrete regression test id. This table is the authoritative crosswalk (mirrored in `traceability/bypass.matrix.yaml`).

| PART_20 § | Bypass | Test id | Suite | Status |
|---|---|---|---|---|
| §1.1 | Zero-width character insertion | FN-BYP-ZW-001 | accuracy | Mitigated |
| §1.2 | Homoglyph attacks | FN-BYP-HG-001 | accuracy | Mitigated |
| §1.3 | Base64-encoded secrets | FN-BYP-B64-001 | accuracy | Mitigated |
| §1.4 | Invisible Unicode / steganography | FN-BYP-STEG-001 | unit | Mitigated |
| §1.5 | Prompt injection in scanned content | SEC-PROMPTINJ-001 | security | Mitigated |
| §2.1 | ZIP bombs | FILE-ZIPBOMB-001..005 | integration | Mitigated |
| §2.2 | Malicious PDFs | FILE-PDFBOMB-001 | integration | Mitigated |
| §2.3 | Password-protected files | FILE-ENCRYPTED-001 | integration | Mitigated (notify) |
| §2.4 | Corrupted files | FILE-CORRUPT-001 | integration | Mitigated |
| §2.5 | Nested archives | FILE-NESTED-001..004 | integration | Mitigated |
| §3.1 | OCR bypass via image obfuscation | IMG-OCRBYP-001 | accuracy | Partial |
| §3.2 | Blurred documents | IMG-BLUR-001 | accuracy | Mitigated (warn) |
| §3.3 | Partial screenshots | IMG-PARTIAL-001 | accuracy | Mitigated (low-conf) |
| §3.4 | QR code manipulation | IMG-QR-001 | integration | Mitigated |
| §4.1 | Extension disabling | E2E-MGMT-001 | e2e (enterprise) | Mitigated (force-install) |
| §4.2 | Permission revocation | E2E-PERM-001 | e2e | Mitigated (warn badge) |
| §4.3 | Clipboard API direct read | E2E-CLIPAPI-001 | e2e | Known limitation |
| §4.4 | Event race conditions | E2E-RACE-001 | e2e | Mitigated |
| §4.5 | Concurrent uploads | E2E-CONCURRENT-001 | e2e | Mitigated |
| §5.1 | NER hallucination | UT-NER-HALLUC-001 | unit | Mitigated |
| §5.2 | Local model failure | INT-NERFAIL-001 | integration | Mitigated (degrade) |
| §5.3 | WASM crash | INT-WASMCRASH-001 | integration | Mitigated (respawn) |
| §6.1 | Memory exhaustion | PERF-MEM-OOM-001 | performance | Mitigated |
| §6.2 | Browser restart | INT-RESTART-001 | integration | Mitigated (persist) |
| §6.3 | Network disconnect (cloud LLM) | INT-NETDROP-001 | integration | Mitigated (fallback) |
| §7.1 | Natural-language numbers | FN-BYP-NLNUM-001 | accuracy | Known limitation |
| §7.2 | API key obfuscation (concat) | FN-BYP-CONCAT-001 | accuracy | Partial (v1 simple concat) |

`bypass:verify` fails CI if any `PART_20` sub-section has no mapped test id, or if a `Mitigated` bypass's test is skipped/failing.

### 9.4 Example: ZIP Bomb Regression (multi-limit)

```typescript
// test/integration/file/zipbomb.spec.ts
describe.each([
  ['FILE-ZIPBOMB-001', 'ratio', makeBomb({ ratio: 500 }),      /ratio/i],
  ['FILE-ZIPBOMB-002', 'compressed-size', makeBomb({ mb: 80 }), /size/i],
  ['FILE-ZIPBOMB-003', 'file-count', makeBomb({ files: 5000 }), /count/i],
  ['FILE-ZIPBOMB-004', 'depth', makeBomb({ depth: 5 }),         /depth/i],
  ['FILE-ZIPBOMB-005', 'decompressed', makeBomb({ outMb: 300 }),/decompress/i],
])('%s zip-bomb limit: %s (PART_20 §2.1)', (_id, _name, bomb, reason) => {
  it('is rejected before OOM', async () => {
    const res = await pipeline.detect({ kind: 'file', file: bomb });
    expect(res.rejected).toBe(true);
    expect(res.rejectionReason).toMatch(reason);
    expect(res.peakMemoryMb).toBeLessThan(256);   // PART_20 §6.1 budget
  });
});
```

---

## 10. Mutation Testing for Detectors

Coverage proves lines *ran*; mutation testing proves assertions *matter*. We use **Stryker Mutator** on detector modules.

### 10.1 Configuration & Gate

```jsonc
// stryker.conf.json
{
  "packageManager": "npm",
  "testRunner": "vitest",
  "reporters": ["html", "clear-text", "json"],
  "coverageAnalysis": "perTest",
  "mutate": [
    "src/detection/regex/**/*.ts",
    "src/detection/checksum/**/*.ts",
    "src/detection/entropy/**/*.ts",
    "src/detection/aggregator/**/*.ts"
  ],
  "thresholds": { "high": 85, "low": 75, "break": 70 }  // build breaks < 70%
}
```

### 10.2 Mutation Gates by Module

| Module | Mutation score gate | Rationale |
|---|---|---|
| Checksum (Luhn/Verhoeff/MOD-97) | ≥ 90% | Math correctness is safety-critical; surviving mutants = untested boundary |
| Regex group logic | ≥ 80% | Boundary/anchor mutations must be killed by TP/TN pairs |
| Entropy engine | ≥ 75% | Threshold comparisons must be pinned by fixtures |
| Aggregator/dedup | ≥ 80% | Overlap/cross-validation logic must be exercised |
| **Global break threshold** | **70%** | Below this the mutation job fails the build |

### 10.3 Example Surviving-Mutant Signal

A mutant changing `sum % 10 === 0` to `sum % 10 !== 0` in Luhn that *survives* means no negative (Luhn-invalid) test asserts rejection. The fix is a paired negative fixture (`UT-CARD-LUHNFAIL-001`), not a config change — mutation testing thereby drives corpus completeness.

---

## 11. Flaky-Test Policy

| Rule | Detail |
|---|---|
| **Definition** | A test that produces different results on identical code/input across ≥ 2 of the last 20 CI runs. |
| **Detection** | Nightly `flaky-detect` job re-runs the full suite 5× (`vitest --retry=0 --sequence.shuffle`) and diffs outcomes; Playwright uses `--repeat-each=3`. |
| **Quarantine, don't ignore** | A newly flaky test is tagged `@flaky` and moved to a non-gating lane within 24h — never deleted or blanket-retried. |
| **Retry budget** | E2E allows `retries: 2` (`playwright.config.ts`); unit/integration allow **0 retries** (a retried unit test is a bug). |
| **Root-cause SLA** | Quarantined tests must be fixed or replaced within 5 business days; owner is the last author of the test file. |
| **Flake budget** | Suite flake rate > 1% blocks the release train until under budget. |
| **No sleep-based waits** | Playwright tests must use web-first assertions/auto-wait; `waitForTimeout` is banned by lint rule `no-arbitrary-wait`. |

```typescript
// playwright.config.ts (excerpt)
export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  reporter: [['html'], ['json', { outputFile: 'pw-report.json' }], ['./reporters/flaky.ts']],
  use: { trace: 'on-first-retry', video: 'retain-on-failure' },
});
```

---

## 12. E2E on Live Platforms

### 12.1 Strategy

E2E validates the full interception path in real Chromium with the packed extension loaded, against live AI platforms using dedicated **test accounts** and, for determinism, **recorded network fixtures** for platform responses.

| Concern | Approach |
|---|---|
| **Accounts** | Dedicated, isolated test accounts (`qa+chatgpt@…`, `qa+claude@…`, `qa+gemini@…`) stored in CI secrets; MFA via seeded TOTP. |
| **Determinism vs realism** | Two lanes: (a) *live* lane (nightly, real DOM, tolerant assertions) confirms selectors still match; (b) *pinned* lane (per-push) replays recorded platform HAR so egress interception is asserted deterministically. |
| **Data safety** | Only synthetic corpus values are typed/pasted; test accounts are wiped after each run. |
| **Selector drift** | Platform DOM changes are the top E2E risk; selectors are centralized in a `platform-map` and drift raises `E2E-SELECTOR-DRIFT` alerts (`PART_27`). |

### 12.2 Extension-Loaded Playwright Fixture

```typescript
// test/e2e/fixtures.ts
import { test as base, chromium, type BrowserContext } from '@playwright/test';
import path from 'node:path';

export const test = base.extend<{ context: BrowserContext }>({
  context: async ({}, use) => {
    const ext = path.resolve(__dirname, '../../dist');   // built MV3 extension
    const context = await chromium.launchPersistentContext('', {
      headless: false,                                   // MV3 needs headed or --headless=new
      args: [
        `--disable-extensions-except=${ext}`,
        `--load-extension=${ext}`,
        '--headless=new',
      ],
    });
    await use(context);
    await context.close();
  },
});
```

### 12.3 Representative Live E2E — Paste Interception

```typescript
// test/e2e/paste-chatgpt.spec.ts
import { test } from './fixtures';
import { expect } from '@playwright/test';
import { genVisa } from '../corpus/generator';

test('E2E-PASTE-CGPT-001: card paste is intercepted before egress (FR-INP-001)', async ({ context }) => {
  const page = await context.newPage();
  const egress: string[] = [];
  // Fail if any payload containing the card reaches the platform endpoint.
  await page.route('**/backend-api/conversation', route => {
    egress.push(route.request().postData() ?? '');
    return route.abort();          // pinned lane: never actually send
  });

  await page.goto('https://chatgpt.com/');
  const card = genVisa();
  await page.evaluate(v => navigator.clipboard.writeText(v), card);
  await page.locator('#prompt-textarea').focus();
  await page.keyboard.press('Control+V');

  // Sentinel Shield overlay must appear before submission is possible.
  const overlay = page.locator('sentinel-shield-overlay');   // closed shadow host
  await expect(overlay).toBeVisible({ timeout: 1000 });
  await expect(overlay).toContainText(/credit.?card/i);

  // Attempt to submit; blocked path must not leak the card.
  await page.keyboard.press('Enter');
  expect(egress.join('')).not.toContain(card);
});
```

---

## 13. CI Wiring

### 13.1 Pipeline Stages

```mermaid
graph LR
    PR[Push / PR] --> L[Lint + Typecheck]
    L --> CV[corpus:validate]
    CV --> U[Unit + Coverage Gate]
    U --> I[Integration]
    I --> A[Accuracy + FP/FN Gates]
    A --> B[bypass:verify + trace:verify]
    B --> S[Security: SAST/deps/ReDoS/CSP]
    S --> M[Mutation gate]
    M --> Merge{Merge allowed}
    Merge -->|nightly & pre-release| E2E[E2E live+pinned]
    E2E --> VIS[Visual + A11y]
    VIS --> PERF[Performance]
    PERF --> REL[Release train]
```

### 13.2 GitHub Actions (per-push gating job)

```yaml
# .github/workflows/ci.yml (excerpt)
jobs:
  quality:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint && npm run typecheck
      - run: npm run corpus:validate          # schema + per-entity minimums
      - run: npm run test:unit -- --coverage   # fails below 90/85
      - run: npm run test:integration
      - run: npm run test:accuracy             # per-entity precision/recall + FP<2%
      - run: npm run trace:verify              # zero orphan requirements
      - run: npm run bypass:verify             # every PART_20 bypass mapped
      - run: npm run security:scan             # semgrep + npm audit + redos
      - run: npm run test:mutation             # stryker, break < 70%
```

### 13.3 CI Gate Summary

| Job | Blocks merge | Blocks release | Frequency |
|---|---|---|---|
| lint + typecheck | Yes | Yes | Every push |
| corpus:validate | Yes | Yes | Every push |
| unit + coverage | Yes | Yes | Every push |
| integration | Yes | Yes | Every push |
| accuracy + FP/FN | Yes | Yes | Every push |
| trace:verify / bypass:verify | Yes | Yes | Every push |
| security:scan | Yes | Yes | Every push + nightly |
| mutation | Yes | Yes | Every push |
| e2e (live + pinned) | No | Yes | Nightly + pre-release |
| visual + a11y | No | Yes | Nightly + pre-release |
| performance | No (warn) | Yes | Nightly + pre-release |

---

## 14. The Test System as a Subsystem (20-Field Template)

Per `00_MASTER_INDEX.md §5`, the test system is documented against all 20 fields.

| # | Field | Specification |
|---|---|---|
| 1 | **Purpose** | Prove every requirement and resist every documented bypass with reproducible, gated evidence before release. |
| 2 | **Responsibilities** | Author/run unit, integration, accuracy, E2E, visual, perf, security, a11y suites; maintain corpus, traceability, bypass mapping, mutation, flake control. |
| 3 | **Public Interfaces** | `npm run test:*` scripts, `traceability/*.matrix.yaml`, CI status checks, coverage/mutation/accuracy reports posted to PRs. |
| 4 | **Internal Interfaces** | Corpus loader, metrics (`scoreSpans`), adversarial transforms, `DetectionPipeline` mock/real harness, Playwright extension fixture. |
| 5 | **Data Flow** | Corpus JSONL → loader → pipeline → detections → metrics → thresholds → CI verdict. |
| 6 | **Control Flow** | Lint→corpus→unit→integration→accuracy→trace/bypass→security→mutation→(nightly) e2e/visual/perf. |
| 7 | **Lifecycle** | Author test → CI runs on push → gate → nightly deep suites → pre-release full run → post-release regression additions from `PART_27`. |
| 8 | **Dependencies** | Vitest, Playwright, Stryker, axe-core, Semgrep, Zod, seedrandom; `PART_03`, `PART_13`, `PART_20`, `PART_29`. |
| 9 | **Memory Usage** | Unit workers < 512MB each; corpus loaded streaming (JSONL line-by-line) to stay < 256MB; Playwright browser < 1GB. |
| 10 | **CPU Budget** | Per-push gating suite < 6 min wall-clock on 4-core CI runner (parallel Vitest pool). |
| 11 | **Latency Budget** | Unit < 90s, integration < 120s, accuracy < 150s, security < 5min, mutation < 12min, e2e < 25min. |
| 12 | **Failure Modes** | Flaky E2E (selector drift), corpus schema drift, coverage/mutation regression, live-platform outage, secret expiry for test accounts. |
| 13 | **Recovery Strategy** | Quarantine lane for flakes; pinned E2E lane when live platform is down; corpus schema validator blocks bad fixtures; rotating TOTP secrets. |
| 14 | **Security Concerns** | Test accounts/secrets in encrypted CI store; corpus contains zero real PII; adversarial samples never exfiltrated. |
| 15 | **Privacy Concerns** | No real personal data anywhere in the repo; allowlist values hashed even in tests; egress asserted blocked in pinned E2E. |
| 16 | **Performance Concerns** | Corpus growth increases accuracy-suite time; mitigated by sharded parallel runs and nightly-only full corpus, sampled subset per push. |
| 17 | **Testing Strategy** | The test system self-tests: metrics unit-tested against hand-computed confusion matrices; generator validated to emit checksum-valid values; harness dry-run in CI. |
| 18 | **Production Checklist** | See §15. |
| 19 | **Future Improvements** | See §16. |
| 20 | **Open Risks** | RISK-QA-01: live-platform DOM churn causing E2E drift (owner: Staff Test Eng; mitigation: pinned lane + selector map + drift alerts). RISK-QA-02: corpus staleness vs new key formats (owner: Detection QA; mitigation: quarterly corpus refresh ADR). |

---

## 15. Production Checklist

- [ ] Unit coverage ≥ 90% line / ≥ 85% branch; checksum module at 100%
- [ ] Integration coverage ≥ 80% with all pipeline branches exercised
- [ ] All 17,300+ corpus samples validated against the fixtures schema
- [ ] Per-entity precision/recall gates (§7.5) all green
- [ ] Clean-corpus false-positive rate < 2%
- [ ] 100% of `PART_20` mitigated bypasses mapped to passing regression tests
- [ ] `trace:verify` reports zero orphan requirements (P0/P1)
- [ ] Mutation score ≥ 70% global, ≥ 90% checksum module
- [ ] Flake rate < 1%; zero non-quarantined flaky tests
- [ ] E2E green for all P0 endpoints on ChatGPT, Claude, Gemini (live + pinned lanes)
- [ ] Visual snapshots reviewed; a11y 0 serious/critical violations
- [ ] Performance P99 within all NFR-PERF budgets, < 10% regression vs baseline
- [ ] CI gates wired and blocking per §13.3

---

## 16. Future Improvements

| Improvement | Impact |
|---|---|
| Property-based testing (fast-check) for regex/checksum invariants | Discovers edge cases beyond enumerated fixtures |
| Metamorphic testing (transform input, assert detection invariance) | Automates obfuscation-resistance coverage beyond hand-authored bypasses |
| Cross-browser E2E matrix (Edge, Brave, Arc) | Validates `NFR-COMPAT` across all supported engines |
| Real-user-corpus-in-the-loop (privacy-preserving, opt-in) | Closes the gap between synthetic and field distributions |
| Continuous fuzzing of file parsers (PDF/DOCX/ZIP) | Hardens `PART_20 §2` file-level bypasses proactively |
| Auto-generated bypass tests from `PART_20` diffs | Guarantees a new bypass cannot be documented without a test id |
