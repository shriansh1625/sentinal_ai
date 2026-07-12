# PHASE_06_VERIFICATION_PLAN — Browser Compatibility

**Refs:** PART_10, ADR-035, NFR-COMPAT-*, KI-004, KI-006  
**Goal:** Prove MV3 package is Chromium≥120 compatible and loadable.

## Objectives

1. Manifest MV3 invariants (SW module, popup, options, CSP, min version 120)
2. Align `web_accessible_resources.matches` with AI host set (KI-004)
3. Icons / locales present in dist
4. No MV2 leftovers; no bare workspace imports
5. Playwright: load unpacked extension and observe service worker (or document skip if headed-only)
6. Content script registration API surface compatible with chrome.scripting

## Success

Compat suite + e2e load PASS; KI-004 closed; gates green.
