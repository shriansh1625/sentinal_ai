# PHASE_08_VERIFICATION_PLAN — Chrome Web Store Readiness

**Refs:** Freeze G4 Claims, Ownership Matrix §4, PART_07, PART_10 §17, PART_25, handbook Commandment 7  
**Goal:** Prove package + listing materials are CWS-submittable in honesty and permissions posture — **not** perform live CWS publish (freeze: public CWS not auto-approved).

## Objectives

1. Honest store listing copy (guaranteed / limitations / forbidden claims)
2. Written justification for every manifest permission + optional host
3. Privacy practices disclosure aligned with PART_07 inventory
4. Package attestation checklist (bundle shape, CSP, no remote code, size)
5. Wire `chrome.i18n` for manifest + overlay strings (close KI-015)
6. Automated Phase 8 gates (Vitest + verify script)

## Out of scope

- Uploading to CWS / Test channel
- Vendoring OCR/PDF WASM binaries (document residual KI-002)
- Screenshot / promotional asset production (document residual)
- Playwright axe (KI-016 → Phase 9)

## Success

Phase 8 suite PASS; `pnpm run ci` green; R-V03 claims risk mitigated; freeze intact.
