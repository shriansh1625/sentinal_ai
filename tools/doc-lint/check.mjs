#!/usr/bin/env node
/** Doc-lint scaffold — PART_28 / PART_25. Sprint 0: presence check only. */
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const required = [
  'blueprint/ARCHITECTURE_FREEZE_v1.0.md',
  'blueprint/DESIGN_OWNERSHIP_MATRIX.md',
  'docs/MODULE_BOUNDARIES.md',
];

let failed = false;
for (const rel of required) {
  if (!existsSync(join(process.cwd(), rel))) {
    console.error(`doc-lint missing: ${rel}`);
    failed = true;
  }
}
if (failed) process.exit(1);
console.log('doc-lint: ok');
