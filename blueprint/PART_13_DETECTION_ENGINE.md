# PART 13 — DETECTION ENGINE

**Document ID:** SS-BP-013
**Classification:** Internal Engineering — Principal Review
**Version:** 1.0.0
**Last Updated:** 2026-07-12
**Owner:** Principal Detection Engineer, Distinguished AI Engineer
**Reviewers:** Principal Security Architect, Principal Performance Engineer

---

## Executive Summary

This document is the definitive engineering specification for the Sentinel Shield AI detection engine — the core intelligence that identifies sensitive data before it reaches AI platforms. It covers every detection tier, every regex pattern strategy, every ML model decision, every confidence scoring mechanism, and every aggregation rule. Engineers building detectors reference this document for all detection logic.

> **v1.0 SCOPE FREEZE (ADR-037):** Default-enabled detectors are **Tier-1 (regex/checksum/entropy)** and **OCR → re-scan text**. **NER and CV are shipped disabled** (`NER_DEFAULT_ENABLED=false`, `CV_DEFAULT_ENABLED=false`). Sections describing Tier-2/Tier-3 remain the canonical algorithms for when those flags are enabled. Risk math: **PART_18**. WASM: **PART_16**.

---

## 1. Objectives

| ID | Objective |
|---|---|
| OBJ-001 | Define the multi-tier detection pipeline with clear interfaces between tiers |
| OBJ-002 | Specify every regex pattern, checksum algorithm, and validation strategy |
| OBJ-003 | Define the NER model selection, loading, inference, and post-processing |
| OBJ-004 | Define the entropy detection algorithm and context filtering |
| OBJ-005 | Specify confidence scoring, aggregation, deduplication, and cross-validation |

---

## 2. Dependencies

| Dependency | Type |
|---|---|
| PART_04_SYSTEM_ARCHITECTURE.md | Pipeline architecture, Coordinator-Processor model |
| PART_02_REAL_WORLD_PROBLEM_ANALYSIS.md | Entity taxonomy, detection strategies |
| PART_03_PRODUCT_REQUIREMENTS.md | Accuracy targets, performance budgets |
| PART_16_WASM_RUNTIME.md | WASM execution environment |

---

## 3. Design Principles

| Principle | Implication |
|---|---|
| **Deterministic before probabilistic** | Regex + checksum (deterministic, ~100% for structured) runs before NER (probabilistic, ~85-95%) |
| **Fast before slow** | Tier 1 (<10ms) completes before Tier 2 (<200ms) starts. Clean inputs released immediately. |
| **Independent failure** | Each detector is a separate module. One detector's failure does not affect others. |
| **Zero false positives for checksummed entities** | If Luhn/Verhoeff/MOD-97 validates, confidence is ≥0.95. No checksummed entity should be a false positive. |
| **Conservative for images** | Image-based detections (OCR + CV) flag with lower confidence threshold, encouraging user review |
| **No regex catastrophic backtracking** | Every regex tested against ReDoS analysis. No unbounded quantifiers on ambiguous character classes. |

---

## 4. Threat Model

| Threat | Detection Impact | Mitigation |
|---|---|---|
| Adversarial text crafted to bypass regex | False negatives for obfuscated entities | Multi-tier: NER catches what regex misses. Entropy catches high-randomness secrets. |
| Base64-encoded secrets | Regex on raw text misses encoded content | Entropy detection flags high-entropy strings. Base64 decoder runs on candidate strings. |
| Unicode homoglyph substitution (Cyrillic 'а' for Latin 'a') | Regex fails to match | Unicode normalization (NFKD) before regex matching. Homoglyph detection layer. |
| Zero-width character insertion | `A​K​I​A` (with zero-width spaces) bypasses pattern match | Strip all zero-width characters (U+200B, U+200C, U+200D, U+FEFF, U+2060) before detection. |
| PII disguised as natural language | "my card number is four one one one..." | NER + context analysis. Phase 2 improvement. |
| ReDoS attack via malicious input | Extension hangs on detection | All regex patterns validated against ReDoS. Input size limits (1MB text max). |

---

## 5. Architecture: Detection Pipeline

### 5.1 Pipeline Stages

```
Input Text/File
    │
    ▼
Stage 0: Preprocessing
    ├── Determine input type (text, file, image)
    ├── Normalize encoding (UTF-8)
    ├── Strip zero-width characters
    ├── Unicode NFKD normalization
    ├── Extract text from files (PDF, DOCX, CSV, JSON, XML)
    ├── OCR for images and scanned PDFs
    ├── EXIF strip for images
    └── Output: normalized text + image metadata
    │
    ▼
Stage 1: Tier 1 — Fast Path (Regex + Checksum + Entropy)
    ├── Regex Engine: run all pattern groups
    ├── Checksum Engine: validate matches (Luhn, Verhoeff, MOD-97)
    ├── Entropy Engine: detect high-entropy strings
    └── Output: Tier1Detection[]
    │
    ▼
Stage 2: Tier 2 — NER (ML Inference)
    ├── Tokenize text with model tokenizer
    ├── Run ONNX inference (token classification)
    ├── Merge BIO tags into entity spans
    ├── Filter by confidence threshold
    └── Output: Tier2Detection[]
    │
    ▼
Stage 3: Tier 3 — Computer Vision (for images only)
    ├── Face detection (BlazeFace)
    ├── QR/Barcode detection (ZXing)
    ├── Signature detection (contour analysis)
    ├── Document classification (MobileNetV2)
    └── Output: Tier3Detection[]
    │
    ▼
Stage 4: Aggregation
    ├── Merge all tiers' detections
    ├── Deduplicate overlapping spans
    ├── Cross-validate (regex + NER agreement → confidence boost)
    ├── Apply context analysis (code context, keyword proximity)
    └── Output: AggregatedDetection[]
    │
    ▼
Stage 5: Scoring
    ├── Calculate per-entity risk score
    ├── Calculate document-level risk score
    ├── Determine risk level (low/medium/high/critical)
    └── Output: ScoredDetections + RiskAssessment
```

### 5.2 Pipeline Interface

```typescript
// detection-engine/src/pipeline/detection-pipeline.ts

class DetectionPipeline {
  #preprocessor: Preprocessor;
  #tier1: Tier1Detector;
  #tier2: Tier2Detector;
  #tier3: Tier3Detector;
  #aggregator: ResultAggregator;
  #scorer: RiskScorer;
  
  async detect(input: RawInput): Promise<ScanResult> {
    const timer = new PipelineTimer();
    
    // Stage 0: Preprocess
    timer.start('preprocess');
    const processed = await this.#preprocessor.process(input);
    timer.end('preprocess');
    
    // Stage 1: Tier 1 (always runs)
    timer.start('tier1');
    const tier1Results = this.#tier1.detect(processed);
    timer.end('tier1');
    
    // Stage 2: Tier 2 (runs if NER is available and text exists)
    let tier2Results: Detection[] = [];
    if (processed.hasText && this.#tier2.isReady()) {
      timer.start('tier2');
      try {
        tier2Results = await this.#tier2.detect(processed);
      } catch (error) {
        // NER failure is non-fatal — continue with Tier 1 results
        logWarn('Tier 2 (NER) failed, continuing with Tier 1', { error });
      }
      timer.end('tier2');
    }
    
    // Stage 3: Tier 3 (runs only for image inputs)
    let tier3Results: Detection[] = [];
    if (processed.hasImages && this.#tier3.isReady()) {
      timer.start('tier3');
      try {
        tier3Results = await this.#tier3.detect(processed);
      } catch (error) {
        logWarn('Tier 3 (CV) failed, continuing with Tier 1+2', { error });
      }
      timer.end('tier3');
    }
    
    // Stage 4: Aggregate
    timer.start('aggregate');
    const aggregated = this.#aggregator.aggregate([
      ...tier1Results,
      ...tier2Results,
      ...tier3Results
    ]);
    timer.end('aggregate');
    
    // Stage 5: Score
    timer.start('score');
    const scored = this.#scorer.score(aggregated, processed.context);
    timer.end('score');
    
    return {
      scanId: generateUUID(),
      timestamp: Date.now(),
      detections: scored.detections,
      riskScore: scored.riskScore,
      riskLevel: scored.riskLevel,
      processingTimeMs: timer.total(),
      tiersCompleted: timer.completedTiers(),
      trace: timer.getTrace()
    };
  }
}
```

---

## 6. Tier 1: Regex Engine

### 6.1 Pattern Organization

Patterns are organized by entity category. Each pattern group is a separate module:

```
regex/patterns/
├── government-ids.ts    → Aadhaar, PAN, Passport, DL, Voter ID, SSN
├── financial.ts         → Credit cards, UPI, bank accounts, IFSC, SWIFT, IBAN
├── secrets.ts           → API keys (all providers), JWTs, private keys, connection strings
├── contact.ts           → Phone numbers, email addresses
├── certificates.ts      → PEM-encoded private keys and certificates
├── database.ts          → Connection strings for MongoDB, PostgreSQL, MySQL, Redis
└── env-files.ts         → .env variable patterns with sensitive keywords
```

### 6.2 Pattern Specification: Government IDs

#### Aadhaar Number

```
Pattern: /\b(\d{4}[\s-]?\d{4}[\s-]?\d{4})\b/g
Normalization: Strip spaces and dashes → 12 digits
Validation: Verhoeff checksum on last digit
Confidence: 0.98 (with valid Verhoeff)
False Positive Risk: Very low (Verhoeff eliminates random sequences)
Test Cases:
  True Positive: "2234 5678 9012" (valid Verhoeff)
  True Positive: "223456789012" (no spaces)
  True Positive: "2234-5678-9012" (dashes)
  True Negative: "1234 5678 9012" (invalid Verhoeff)
  True Negative: "123456789" (9 digits, too short)
  True Negative: "1234567890123" (13 digits, too long)
  Edge Case: "ISBN 978-3-16-148410-0" (ISBN context → exclude)
```

#### PAN (India)

```
Pattern: /\b([A-Z]{5}\d{4}[A-Z])\b/g
Validation:
  - 4th character indicates holder type: C(Company), P(Person), H(HUF), F(Firm), A(AOP), T(Trust), B(BOI), L(Local Authority), J(AJP), G(Govt)
  - Valid 4th chars: [ABCFGHLJPT]
Confidence: 0.90 (format match with valid 4th char)
False Positive Risk: Low (10-char alphanumeric with specific structure)
Test Cases:
  True Positive: "ABCDE1234F"
  True Positive: "AAPPM1234K" (P = Person)
  True Negative: "ABCDE1234" (9 chars, missing last)
  True Negative: "12345ABCDE" (wrong format)
  True Negative: "ABCXE1234F" (X is not valid 4th char)
```

### 6.3 Pattern Specification: Financial

#### Credit/Debit Card

```
Patterns (by network):
  Visa:        /\b(4\d{3}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4})\b/g
  Mastercard:  /\b(5[1-5]\d{2}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4})\b/g
  Amex:        /\b(3[47]\d{2}[\s-]?\d{6}[\s-]?\d{5})\b/g
  Discover:    /\b(6(?:011|5\d{2})[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4})\b/g
  RuPay:       /\b((?:60|65|81|82|508)\d{2}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4})\b/g

Normalization: Strip spaces and dashes
Validation: Luhn algorithm
Confidence: 0.99 (Luhn-validated, specific network prefix)
False Positive Risk: Extremely low (Luhn eliminates ~90% of random sequences, IIN prefix eliminates most remainder)

Luhn Algorithm Implementation:
  1. Starting from rightmost digit, double every second digit
  2. If doubled digit > 9, subtract 9
  3. Sum all digits
  4. If sum mod 10 == 0, valid

Test Cases:
  True Positive: "4111111111111111" (Visa test)
  True Positive: "4111 1111 1111 1111" (spaced)
  True Positive: "4111-1111-1111-1111" (dashed)
  True Positive: "5500000000000004" (Mastercard test)
  True Positive: "371449635398431" (Amex test)
  True Negative: "4111111111111112" (invalid Luhn)
  True Negative: "1234567890123456" (no valid IIN prefix)
  Edge Case: "4111111111111111111" (19 digits — valid for some networks)
```

### 6.4 Pattern Specification: Secrets

#### AWS Access Key ID

```
Pattern: /\b(AKIA[0-9A-Z]{16})\b/g
Validation: Exactly 20 chars, starts with AKIA, remaining 16 are uppercase alphanumeric
Confidence: 0.95
False Positive Risk: Very low (AKIA prefix is unique to AWS)
Test Cases:
  True Positive: "AKIAIOSFODNN7EXAMPLE"
  True Negative: "AKIA123" (too short)
  True Negative: "ASIA..." (AWS temporary credentials — different prefix, should also be detected)
Additional: Also detect ASIA (temporary), AIDA (IAM), AROA (role), AIPA (instance profile)
```

#### AWS Secret Access Key

```
Pattern: /\b([A-Za-z0-9/+=]{40})\b/g (near context: "aws_secret", "secret_access_key", "AWS_SECRET")
Validation: 40 characters, base64-like character set, must be within 5 lines of an AWS context keyword
Confidence: 0.80 (context-dependent, no unique prefix)
False Positive Risk: Medium (40-char base64 strings are common)
Mitigation: Require context keyword proximity. Without context, flag only if entropy > 4.5 bits/char.
```

#### GitHub Personal Access Token

```
Pattern: /\b(ghp_[A-Za-z0-9]{36})\b/g
Validation: 40 chars total, starts with ghp_
Confidence: 0.98
Additional prefixes:
  ghp_ = personal access token (classic)
  gho_ = OAuth access token
  ghu_ = user-to-server token
  ghs_ = server-to-server token
  ghr_ = refresh token
  github_pat_ = fine-grained personal access token
```

#### JWT (JSON Web Token)

```
Pattern: /\b(eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,})\b/g
Validation:
  1. Split on '.'
  2. Base64url-decode first segment
  3. Parse as JSON
  4. Verify it has "alg" field
Confidence: 0.90 (Base64-decoded header is valid JSON with "alg")
False Positive Risk: Low (triple-segment base64 with JSON header is distinctive)
```

---

## 7. Tier 1: Checksum Engine

### 7.1 Luhn Algorithm

```
Input: string of digits (spaces/dashes stripped)
Algorithm:
  1. Reverse the digit string
  2. For each digit at index i:
     - If i is odd (0-indexed): double the digit
     - If doubled digit > 9: subtract 9
  3. Sum all digits
  4. Return sum % 10 === 0

Performance: O(n) where n = number of digits. ~0.001ms per validation.

Edge cases:
  - Single digit: always valid (trivially, but we require minimum 13 digits for cards)
  - Leading zeros: valid (some card numbers have leading zeros)
  - Non-digit characters: must be stripped before validation
```

### 7.2 Verhoeff Algorithm

```
Input: 12-digit Aadhaar number
Algorithm:
  Uses three tables: multiplication (d), permutation (p), inverse (inv)
  
  d[10][10] = Dihedral group D5 multiplication table
  p[8][10] = Permutation table
  inv[10] = Inverse table
  
  1. Start with c = 0
  2. For each digit from right to left (position i, 0-indexed):
     c = d[c][p[(i+1) % 8][digit]]
  3. Return c === 0

Performance: O(n) where n = 12. ~0.001ms per validation.

Implementation note: Tables are hardcoded constants (not computed). This is the standard Verhoeff implementation used by UIDAI.
```

### 7.3 MOD-97 (IBAN)

```
Input: IBAN string (e.g., "GB29NWBK60161331926819")
Algorithm:
  1. Move first 4 characters to end
  2. Replace each letter with two digits (A=10, B=11, ..., Z=35)
  3. Compute remainder of the resulting integer divided by 97
  4. Return remainder === 1

Performance: O(n) where n = IBAN length. ~0.01ms per validation.

Edge case: IBAN can be up to 34 characters. The integer can be very large.
Solution: Use modular arithmetic — process 9 digits at a time to avoid BigInt.
```

---

## 8. Tier 1: Entropy Engine

### 8.1 Shannon Entropy Calculation

```
Input: string s
Algorithm:
  1. Count frequency of each character in s
  2. For each unique character c with frequency f:
     probability p = f / length(s)
     contribution = -p * log2(p)
  3. Sum all contributions = Shannon entropy in bits per character

Performance: O(n) where n = string length. ~0.1ms for 1KB.
```

### 8.2 Entropy Thresholds

| Entropy (bits/char) | Classification | Example |
|---|---|---|
| < 2.5 | Natural language | "hello world, this is a test" (1.8 bits/char) |
| 2.5 – 3.5 | Possibly encoded or structured | URLs, file paths, base64 images |
| 3.5 – 4.5 | Likely secret | Simple passwords, short API keys |
| 4.5 – 5.5 | Almost certainly a secret | Strong passwords, AWS secret keys |
| > 5.5 | Random/cryptographic | Encryption keys, random tokens |

### 8.3 Context Filtering

High-entropy strings that should NOT be flagged:

| Context | Detection Method | Action |
|---|---|---|
| **URLs** | Starts with `http://` or `https://` | Exclude from entropy detection |
| **File paths** | Contains `/` or `\` with directory structure | Exclude |
| **Base64 images** | Starts with `data:image/` | Exclude |
| **Git commit hashes** | 40-char hex string near "commit", "merge", "cherry-pick" | Exclude |
| **UUIDs** | `[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}` | Exclude (structured, not secret) |
| **Hex color codes** | `#[0-9A-Fa-f]{6}` | Exclude |
| **CSS/HTML content** | Within `<style>`, `<script>` blocks without assignment context | Reduce weight |

### 8.4 Secret Candidate Detection

```
Algorithm:
  1. Split input into tokens (whitespace, newline, common delimiters)
  2. For each token with length > 16:
     a. Calculate Shannon entropy
     b. If entropy < 3.5: skip (natural language)
     c. Apply context filters (URLs, paths, etc.)
     d. If near context keyword ("password", "secret", "key", "token", "api_key"):
        confidence = 0.85
     e. Else if entropy > 4.5 AND length > 20:
        confidence = 0.70 (high entropy alone is suspicious)
     f. Else:
        confidence = 0.50 (marginal, include with low confidence)
  3. Return candidates with confidence ≥ 0.50
```

---

## 9. Tier 2: NER Engine

### 9.1 Model Selection

**Primary model:** Fine-tuned DistilBERT (INT8 quantized, ONNX format)

| Attribute | Value |
|---|---|
| Base model | `distilbert-base-uncased` |
| Fine-tuning task | Token classification (NER) |
| Entity types | PER, ORG, LOC, AADHAAR, PAN, PHONE, EMAIL, MEDICAL, FINANCIAL, LEGAL, CODE_SECRET |
| Training data | Synthetic PII datasets + annotated samples |
| Quantization | INT8 (post-training quantization via ONNX quantizer) |
| Model size | ~12MB (quantized) |
| Inference latency | ~150ms for 512 tokens on WASM, ~50ms on WebGPU |

**Fallback model:** If ONNX fails to load, use a rule-based NER that applies keyword + pattern matching. This provides degraded but functional NER without ML.

### 9.2 Runtime

```
Library: @huggingface/transformers (Transformers.js)
Backend: ONNX Runtime Web (WASM primary, WebGPU if available)
Loading: Lazy (loaded on first NER request)
Caching: IndexedDB (cached after first load)
Worker: Dedicated NER Worker in Offscreen Document
```

### 9.3 Inference Pipeline

```
Input: normalized text string

1. Tokenization
   - Use model-specific tokenizer (shipped with ONNX model)
   - Max sequence length: 512 tokens
   - If input > 512 tokens: chunk with 128-token overlap
   
2. Inference
   - Run token classification task
   - Output: logits per token per entity class
   - Apply softmax to get probabilities
   
3. Post-processing
   - Decode BIO tags:
     B-AADHAAR → beginning of Aadhaar entity
     I-AADHAAR → inside Aadhaar entity
     O → outside any entity
   - Merge consecutive B-I tokens into entity spans
   - Calculate span confidence: average of token confidences in span
   
4. Filtering
   - Discard entities with span confidence < 0.70
   - For overlapping entities from different chunks: keep higher confidence

5. Output: NERDetection[] with entity type, text span, position, confidence
```

### 9.4 Chunking Strategy for Long Inputs

```
Input: "This is a very long text... [2000 tokens]"

Chunks:
  Chunk 1: tokens[0:512]
  Chunk 2: tokens[384:896]    (128-token overlap with chunk 1)
  Chunk 3: tokens[768:1280]   (128-token overlap with chunk 2)
  Chunk 4: tokens[1152:1664]  (128-token overlap with chunk 3)
  ...

Overlap handling:
  If entity appears in overlapping region of two chunks:
    Keep the instance with higher confidence
    If confidence is equal, keep from the chunk where entity is more centered
```

---

## 10. Result Aggregation

### 10.1 Deduplication

```
Algorithm:
  1. Sort detections by position (start index)
  2. For each pair of detections with overlapping spans:
     a. If same entity type:
        Keep higher confidence
     b. If different entity types:
        If one is a superset of the other: keep superset (more specific)
        If partial overlap: keep both (different entities at overlapping positions)
  3. Remove duplicates where same entity detected by multiple tiers:
     Keep the detection with highest confidence
     Add a "confirmedBy" field listing all tiers that detected it
```

### 10.2 Cross-Validation Bonus

```
If regex AND NER both detect the same entity at the same position:
  new_confidence = min(1.0, max(regex_confidence, ner_confidence) + 0.05)
  source = 'cross-validated'
  
Rationale: Independent detection by two different methods increases certainty.
```

### 10.3 Context Analysis

```
Context factors that modify confidence:

1. Code context (inside code block, near 'const', 'let', 'export', '=')
   → +0.05 for secrets (secrets in code are almost always real)

2. Near sensitive keyword ("password:", "secret:", "api_key:")
   → +0.10 for entropy-detected strings

3. Near safe keyword ("example:", "test:", "sample:", "dummy:")
   → -0.20 (likely example data, not real)

4. Near "sk_test_" or "pk_test_" prefix
   → Downgrade to informational (Stripe test keys are not sensitive)
```

---

## 11. Confidence Scoring Summary

| Detection Source | Base Confidence Range |
|---|---|
| Regex + checksum validation (Luhn, Verhoeff, MOD-97) | 0.95 – 1.00 |
| Regex without checksum (format match only) | 0.70 – 0.90 |
| NER (high confidence span) | 0.80 – 0.95 |
| NER (medium confidence span) | 0.50 – 0.80 |
| Entropy detection with keyword context | 0.75 – 0.90 |
| Entropy detection without context | 0.50 – 0.70 |
| Cross-validated (regex + NER agree) | +0.05 bonus |
| Code context | +0.05 bonus |
| Keyword context | +0.10 bonus |
| Test/example context | -0.20 penalty |

---

## 12. Edge Cases

| Edge Case | Handling |
|---|---|
| **Empty input** | Return immediately with zero detections |
| **Input > 1MB** | Chunk into 100KB segments, scan each, merge results |
| **Input is all whitespace** | Return immediately with zero detections |
| **Binary content pasted as text** | Detect non-printable characters, flag as potential binary data |
| **Markdown formatting around PII** | Strip Markdown before regex, preserve original positions for overlay |
| **PII spans across two NER chunks** | Overlap window (128 tokens) handles this. If entity is split, neither chunk will have full match — regex in Tier 1 catches it. |
| **Multiple entities on the same line** | All detectors handle multiple matches. Aggregator preserves all non-overlapping entities. |
| **Entity inside a URL** | URL is excluded from entropy detection but NOT from regex (API keys can appear in URLs) |

---

## 13. Failure Modes

| Failure | Impact | Recovery |
|---|---|---|
| Regex engine throws on malformed input | Tier 1 partial failure | Catch exception. Skip failed pattern group. Continue with remaining patterns. |
| NER model fails to load | Tier 2 unavailable | Log error. Return Tier 1 results only. Health status shows NER as degraded. |
| NER inference times out (>15s) | Tier 2 unavailable for this scan | Return Tier 1 results. Flag scan as "partial" in results. |
| Entropy calculation on zero-length string | Division by zero | Guard: return 0 for empty strings. |
| Checksum algorithm receives non-numeric input | Validation fails | Return false (not valid). Not an error — expected for non-matching inputs. |

---

## 14. Performance Budget

| Operation | Input Size | Budget |
|---|---|---|
| Regex scan (all patterns) | 1KB | < 5ms |
| Regex scan (all patterns) | 10KB | < 20ms |
| Regex scan (all patterns) | 100KB | < 100ms |
| Checksum validation (single) | N/A | < 0.01ms |
| Entropy calculation | 1KB | < 1ms |
| Entropy calculation | 10KB | < 5ms |
| NER inference (512 tokens) | ~2KB | < 150ms (WASM), < 50ms (WebGPU) |
| NER inference (1024 tokens, 2 chunks) | ~4KB | < 300ms (WASM), < 100ms (WebGPU) |
| Aggregation + deduplication | 100 detections | < 5ms |
| Full pipeline (text, 1KB) | 1KB | < 50ms |
| Full pipeline (text, 10KB) | 10KB | < 200ms |

---

## 15. Memory Budget

| Component | Budget |
|---|---|
| Compiled regex patterns | < 500KB |
| NER model (in memory during inference) | < 50MB |
| NER tokenizer | < 5MB |
| Entropy calculation working set | < 1MB |
| Aggregation working set | < 5MB |

---

## 16. Security Risks

| Risk | Mitigation |
|---|---|
| ReDoS via crafted input | All regex patterns tested with ReDoS analyzer. No `(a+)+` or similar catastrophic patterns. |
| NER model poisoning (if model is user-replaceable) | Model is NOT user-replaceable. Ships with extension. Checksum-verified. |
| Detection patterns reveal security posture | Accepted risk. Security through obscurity is not a defense. Patterns are well-known (Luhn, standard key prefixes). |

---

## 17. Testing Strategy

### 17.1 Unit Tests

| Module | Test Cases | Coverage Target |
|---|---|---|
| Regex Engine | 20+ true positives, 10+ true negatives per entity type | 95% line |
| Checksum Engine | Valid and invalid inputs for each algorithm | 100% line |
| Entropy Engine | Low/medium/high entropy strings, context filters | 95% line |
| NER Engine | Mock model with known outputs, chunking, overlap handling | 90% line |
| Aggregator | Deduplication, cross-validation, context analysis | 95% line |

### 17.2 Integration Tests

| Test | Scope |
|---|---|
| Full pipeline with text containing multiple entity types | End-to-end Tier 1 + Tier 2 |
| Full pipeline with text containing zero entities | Verify clean pass-through |
| Full pipeline with 100KB text | Performance + correctness |
| Tier 2 failure with graceful degradation | NER mock returns error → Tier 1 results returned |

### 17.3 Accuracy Tests

| Dataset | Entities | Size | Expected Results |
|---|---|---|---|
| Synthetic PII corpus (generated) | All entity types | 10,000 samples | Precision ≥ 97% (structured), ≥ 85% (unstructured) |
| Negative corpus (clean text) | None | 5,000 samples | False positive rate < 2% |
| Edge case corpus | Formatted, partial, multi-entity | 2,000 samples | Documented per case |

---

## 18. Acceptance Criteria

- [ ] All regex patterns detect their target entities with ≥97% precision
- [ ] All checksum algorithms validated against reference implementations
- [ ] Entropy engine correctly classifies known passwords/tokens vs. normal text
- [ ] NER pipeline produces detections with chunking for inputs > 512 tokens
- [ ] Aggregator correctly deduplicates and cross-validates
- [ ] Full pipeline meets all performance budgets
- [ ] Zero ReDoS vulnerabilities in any regex pattern
- [ ] Graceful degradation when NER is unavailable

---

## 19. Production Checklist

- [ ] All regex patterns reviewed by security engineer
- [ ] All checksum implementations verified against test vectors
- [ ] NER model accuracy baselined on test dataset
- [ ] Entropy thresholds calibrated against real-world corpus
- [ ] Context filters verified (URLs, paths, UUIDs excluded)
- [ ] Performance benchmarks run on reference hardware
- [ ] Memory budget verified under sustained load
- [ ] ReDoS analysis completed for all patterns
- [ ] Edge case corpus passed

---

## 20. Future Improvements

| Improvement | Impact |
|---|---|
| Aho-Corasick for multi-pattern matching | 5-10x speedup for regex engine on large inputs |
| Active learning for NER model improvement | Improve accuracy based on user feedback (with privacy) |
| Custom entity types (enterprise) | Extend detection to organization-specific data |
| Multi-language NER models | Support non-English PII detection |
| On-device model fine-tuning | Personalize detection to user's data patterns (federated) |
