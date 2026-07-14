# SPRINT_0A_REPORT — Repository & Build

**Finding owners:** F-001, F-002  
**Decision:** **GO**

## Changes

- Initialized project-local `.git` (`git rev-parse` → `…/Sentinal shield`)
- Vite MV3 bundler (`packages/extension/vite.config.ts`) inlines workspace deps
- Manifest load root = `dist/` with `background.js`, `content.js`, `popup.html`, `options.html`
- `verify:bundle` gate asserts no bare `@sentinel-shield/` imports
- Content script + offscreen paths corrected

## Gates

typecheck/lint/test/build/purity/depcruise/verify:bundle — PASS
