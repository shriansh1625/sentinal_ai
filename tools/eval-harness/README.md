# Detection evaluation harness (independent)

Evaluates `@sentinel-shield/detection-engine` only. Does not change product architecture.

## Reproducibility

- Fixed default seed `0x5e471e01`
- Deterministic PRNG (Mulberry32)
- Dataset sizes configurable via CLI

## Run

```bash
pnpm --filter @sentinel-shield/detection-engine build
pnpm eval:detection
```

Optional:

```bash
node tools/eval-harness/run-eval.mjs --benign=10000 --malicious=10000 --seed=1581551105
```

## Outputs

Written under `tools/eval-harness/artifacts/`:

- `last-report.json` — measured metrics
- `last-roc-points.json` — ROC curve points
- `last-error-samples.json` — FP/FN text samples (truncated)

## Honest limits

See `limitations` in `last-report.json`. Synthetic in-distribution positives inflate recall; base64/zwsp slices expose gaps. This is a research measurement tool, not a CWS claim generator.
