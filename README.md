# Sentinel Shield AI

Local-first Chromium MV3 privacy assistant for supported AI platforms.

## Status

- **Architecture:** Frozen (`blueprint/ARCHITECTURE_FREEZE_v1.0.md`)
- **Engineering:** Release Candidate (`RELEASE_CANDIDATE_REPORT.md`)
- **Verification:** In progress (`MASTER_PROGRESS.md`)

## Setup

```bash
corepack enable
pnpm install
pnpm ci
```

Load the extension:

```bash
pnpm --filter @sentinel-shield/extension build
```

Chrome → Extensions → Load unpacked → `packages/extension/dist`

## Packages

| Package                               | Role                                                          |
| ------------------------------------- | ------------------------------------------------------------- |
| `@sentinel-shield/shared-types`       | Pure types + canonical constants                              |
| `@sentinel-shield/core`               | DI, errors, logging, config, flags, perf, telemetry interface |
| `@sentinel-shield/browser-adapters`   | Chrome API / storage / messaging / PART_19 crypto             |
| `@sentinel-shield/detection-engine`   | Pure Tier-1 detection (no chrome/network)                     |
| `@sentinel-shield/extension`          | MV3 extension (SW, content, Lit popup/options, offscreen)     |
| `@sentinel-shield/enterprise-backend` | Phase 4 placeholder (empty)                                   |

## Authority

Blueprint `PART_NN` documents + `DESIGN_OWNERSHIP_MATRIX.md` are authoritative.  
`implementation_plan.md` is non-binding.
