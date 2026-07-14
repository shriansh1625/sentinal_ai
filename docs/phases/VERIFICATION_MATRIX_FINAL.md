# VERIFICATION_MATRIX_FINAL.md

**ISVV Date:** 2026-07-12 | **Package:** 0.2.1

Legend: ✓ present & green | ◐ partial | ✗ missing/fail | — N/A / platform limit

| Feature            | Unit | Integ | E2E       | Neg | Bound | Stress | Regress | Sec | Perf   | Browser | Recovery      | Failure |
| ------------------ | ---- | ----- | --------- | --- | ----- | ------ | ------- | --- | ------ | ------- | ------------- | ------- |
| F-010 Tier-1 scan  | ✓    | ✓     | ◐         | ✓   | ✓     | ✓      | ✓       | ✓   | ✓      | ✓       | ◐             | ✓       |
| F-011 Detectors    | ✓    | ✓     | —         | ✓   | ✓     | ✓      | ✓       | ✓   | ✓      | —       | —             | ✓       |
| F-014 Preprocess   | ✓    | ✓     | —         | ✓   | ✓     | ✓      | ✓       | ✓   | —      | —       | —             | ✓       |
| F-017 Redaction    | ✓    | ✓     | —         | ✓   | ✓     | —      | ✓       | ✓   | —      | —       | —             | ✓       |
| F-018 Docs/OCR     | ✓    | ◐     | ✗         | ✓   | ◐     | —      | ✓       | ✓   | —      | —       | ✓ fail-closed | ✓       |
| F-041 Crypto       | ✓    | ✓     | —         | ✓   | —     | —      | ✓       | ✓   | —      | —       | ◐             | ✓       |
| F-050 SW           | ✓    | ✓     | ✓         | ✓   | —     | —      | ✓       | ✓   | ✓      | ✓       | ◐             | ✓       |
| F-057 Sender auth  | ✓    | ✓     | —         | ✓   | —     | —      | ✓       | ✓   | —      | —       | —             | ✓       |
| F-071 Paste        | ✓    | ✓     | ◐ fixture | ✓   | ✓     | —      | ✓       | ✓   | —      | ◐       | ✓ HOLD        | ✓       |
| F-072/073 File/DnD | ✓    | ✓     | ✗ live    | ✓   | ✓     | —      | ✓       | —   | —      | ◐       | ✓ HOLD        | ✓       |
| F-080 Overlay      | ✓    | ✓     | ◐         | ✓   | —     | —      | ✓       | ✓   | —      | ✓       | ✓             | ✓       |
| F-100 Manifest     | ✓    | ✓     | ✓         | ✓   | —     | —      | ✓       | ✓   | ✓ size | ✓       | —             | ✓       |
| G3 live hosts      | —    | —     | ✗         | —   | —     | —      | —       | —   | —      | ✗       | —             | —       |

**Evidence:** `pnpm run ci` = 0; `pnpm test:e2e` = 4/4; `isvv.stress.test.ts` = 9/9.
