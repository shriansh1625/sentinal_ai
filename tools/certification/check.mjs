#!/usr/bin/env node
/**
 * Phase 10 — certification consistency check (Freeze dual-verdict honesty).
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const statusPath = join(root, 'store', 'CERTIFICATION_STATUS.json');
const certPath = join(root, 'store', 'PRODUCTION_CERTIFICATION.md');

let failed = false;
function fail(msg) {
  console.error(`certification: ${msg}`);
  failed = true;
}

if (!existsSync(statusPath) || !existsSync(certPath)) {
  fail('missing CERTIFICATION_STATUS.json or PRODUCTION_CERTIFICATION.md');
  process.exit(1);
}

const status = JSON.parse(readFileSync(statusPath, 'utf8'));
const md = readFileSync(certPath, 'utf8');

if (status.publicProductionVerdict !== 'NO_GO') {
  fail('publicProductionVerdict must be NO_GO while blockers remain');
}
if (status.authorizesCwsPublish !== false) {
  fail('authorizesCwsPublish must be false');
}
if (status.engineeringVerdict !== 'GO_CERTIFIED_RC') {
  fail('engineeringVerdict must be GO_CERTIFIED_RC');
}
if (!status.publicBlockers?.includes('KI-018') || !status.publicBlockers?.includes('G3')) {
  fail('publicBlockers must include KI-018 and G3');
}
if (!md.includes('NO-GO') || !/CERTIFIED RC/i.test(md)) {
  fail('PRODUCTION_CERTIFICATION.md must state eng CERTIFIED RC and public NO-GO');
}
if (/authorizesCwsPublish"\s*:\s*true/.test(readFileSync(statusPath, 'utf8'))) {
  fail('status must not authorize CWS');
}

if (failed) process.exit(1);
console.log('certification: ok (eng GO_CERTIFIED_RC / public NO_GO)');
