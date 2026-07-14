# PHASE_04_VERIFICATION_PLAN — Adversarial Testing

**Refs:** PART_20 §1 (ZW/homoglyph/Base64/concat), PART_06, PART_13, KI-009, R-V06  
**Goal:** Disprove Tier-1 resilience against known bypass catalog.

## Objectives

1. Prove zero-width insertion bypass exists → fix preprocess strip
2. Prove Cyrillic/Greek homoglyph bypass → NFKD + confusable map
3. Prove Base64-encoded secret bypass → decode+rescan (depth ≤ MAX_DECODE_DEPTH)
4. Prove simple string-concat key bypass → literal merge
5. Exhaustion: oversize text already HOLD; ReDoS timeout sanity
6. Expand adversarial test suite in CI

## Affected modules

`detection-engine` preprocess + `tier1.ts` only (pure). No architecture change.

## Success

Known PART_20 text bypasses for Tier-1 entities no longer silent-ALLOW; gates green.
