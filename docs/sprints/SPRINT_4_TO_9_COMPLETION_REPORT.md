# Sprint 4–9 Completion Summaries

## Sprint 4 — OCR / Document Pipeline — GO

- Magic-byte sniff, `DocumentPipeline`, OCR/PDF ports, offscreen `WorkerPool`
- Refs: PART_16, PART_17
- Limitation: WASM binaries not vendored yet (HOLD when OCR unavailable)

## Sprint 5 — Risk / Policy / Decision — GO

- `scoreRisk`, `decideAction`, `scanResultToInterceptOutcome`
- Refs: PART_18

## Sprint 6 — Redaction — GO

- `redactText` / `buildSafePreview` with entity masks
- Refs: PART_18

## Sprint 7 — Dashboard / Settings — GO (shell)

- Brand-first popup HTML renderer (no React; ADR-034)
- Refs: PART_22

## Sprint 8 — Performance — GO

- `chunkText`, `assertWithinScanBudget`, UTF-8 estimate
- Refs: PART_23, SS-OWN-001

## Sprint 9 — Security Hardening — GO

- Deterministic `runThreatSimulation` cases (SSN/key/clean)
- Refs: PART_06 / PART_14
