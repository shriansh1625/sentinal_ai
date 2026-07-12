# Changelog

## 0.2.0-rc1 — 2026-07-12

### Added

- Sprint 1–10 engineering tracks under ARCHITECTURE_FREEZE_v1.0
- Extension runtime, interception, Tier-1 detection, document ports, redaction, popup shell, threat sim
- Quality gates: purity, depcruise, budgets

### Notes

- OCR/PDF WASM assets not vendored; file/image scans HOLD (ADR-036)
- Public CWS publish gated — see RELEASE_CANDIDATE_REPORT.md

## 0.1.0-sprint0 — 2026-07-12

### Added

- Monorepo foundation (pnpm workspaces + Turborepo)
- `@sentinel-shield/shared-types`, `core`, `browser-adapters`, `detection-engine` stub, `extension` skeleton
- Strict TypeScript, ESLint, Prettier, Husky, Vitest, GitHub Actions CI
- Dependency direction and detection-engine purity gates
