# Module Boundaries — Sprint 0

Owner: PART_28 · ADR-002 · DESIGN_OWNERSHIP_MATRIX

## Allowed dependency direction

```
shared-types
    ↑
    ├── core
    │     ↑
    │     └── browser-adapters
    │               ↑
    │               └── extension
    │
    └── detection-engine   (shared-types ONLY)
```

## Forbidden

- `detection-engine` → `core` | `browser-adapters` | `extension` | `enterprise-backend`
- `shared-types` → any other package
- `extension` → `enterprise-backend`
- Circular imports anywhere

## Enforcement

- `pnpm depcruise` (dependency-cruiser)
- `pnpm purity` (engine-purity scanner)
- ESLint `no-restricted-imports` for `packages/detection-engine`
