# PHASE_09_VERIFICATION_PLAN — Beta Release Validation

**Refs:** Freeze G3 E2E, PART_22 axe, PART_24 a11y, PART_25 test channel, KI-006/014/016/017  
**Goal:** Prove beta-ready package smoke + automated a11y (axe) + store screenshot fixtures + honest residual for live AI hosts / CWS Test channel.

## Objectives

1. Beta checklist (Load unpacked path, package invariants, residual matrix)
2. Close KI-016 with axe-core on overlay (in-shadow) + Lit popup/options
3. Produce engineering screenshot fixtures for CWS (KI-017 partial)
4. Local intercept fixture smoke (not live ChatGPT — document G3 residual)
5. Attempt Chromium `--load-extension` SW observe; skip only with documented KI-014

## Out of scope

- Public CWS publish / counsel privacy URL (KI-018)
- Vendoring OCR WASM (KI-002)
- Phase 10 production certification

## Success

Phase 9 suite + e2e gates green (or explicit documented skips); `pnpm run ci` green; freeze intact.
