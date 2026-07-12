# PHASE_02_VERIFICATION_PLAN — Functional Validation

**Refs:** RTM FR-INP-*, FR-DET-001..004/010, FR-UX-001/003/006, ADR-036, ADR-034, PART_17/13/18  
**Goal:** Disprove functional correctness of Engineering RC v1 surface.

## Test families

1. Tier-1 detection (email, secrets, Luhn, clean allow)
2. Policy → intercept mapping (ALLOW/HOLD/REDACT/BLOCK)
3. Paste fail-closed (oversize, SW down)
4. Overlay closed shadow + actions
5. Text-file upload sniff → scan
6. Binary file → HOLD (OCR absent)
7. Feature flag defaults (NER/CV/telemetry/history off; OCR on)
8. Redaction residual = 0 for known spans
9. Platform registry AI-only
10. Encrypted history metadata-only when enabled

## Fixes

Only defects proven by failing tests in this phase.
