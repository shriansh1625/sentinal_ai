# BUILD_REPRODUCIBILITY_REPORT_v2.md

## Resolved

- Extension artifact is Chrome-oriented (`dist/` load root)
- `verify:bundle` in CI script path
- Project git enables reproducible tagging later
- Lockfile + Vitest/Vite versions patched

## Load procedure

1. `pnpm --filter @sentinel-shield/extension build`
2. Chrome → Load unpacked → select `packages/extension/dist`
