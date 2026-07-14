# PHASE_07_VERIFICATION_PLAN — Accessibility & UX

**Refs:** PART_22 §15 WCAG 2.1 AA, ADR-034 Lit, FR-UX-001  
**Goal:** Bring overlay + Lit popup/options to v1 a11y contract (focus trap, ARIA, Escape, focus restore, reduced-motion, forced-colors).

## Objectives

1. Overlay: `aria-labelledby`/`aria-describedby`, live region, focus trap, Escape→block, focus restore
2. Initial focus: Block for BLOCK; otherwise Block (safe) before Allow
3. Popup/options: visible focus, labeled controls, reduced-motion
4. Tests for trap/escape/restore without inventing post-v1 UI

## Success

A11y unit suite PASS; no freeze/scope expansion; gates green.
