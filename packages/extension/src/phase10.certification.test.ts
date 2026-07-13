/**
 * Phase 10 — Production certification honesty gates (Freeze G0–G5).
 */

import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_FEATURE_FLAGS } from '@sentinel-shield/shared-types';

const extRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(extRoot, '..', '..');
const storeRoot = join(repoRoot, 'store');
const blueprint = join(repoRoot, 'blueprint');

type CertStatus = {
  engineeringVerdict: string;
  publicProductionVerdict: string;
  authorizesCwsPublish: boolean;
  authorizesLoadUnpackedBeta: boolean;
  publicBlockers: string[];
  gates: Record<string, string>;
  packageVersion: string;
};

describe('Phase 10 — production certification artifacts', () => {
  it('ships certification matrix + machine-readable status', () => {
    expect(existsSync(join(storeRoot, 'PRODUCTION_CERTIFICATION.md'))).toBe(true);
    expect(existsSync(join(storeRoot, 'CERTIFICATION_STATUS.json'))).toBe(true);
    expect(existsSync(join(repoRoot, 'PHASE_10_VERIFICATION_PLAN.md'))).toBe(true);
  });

  it('status JSON encodes dual verdict and refuses CWS authorize', () => {
    const status = JSON.parse(
      readFileSync(join(storeRoot, 'CERTIFICATION_STATUS.json'), 'utf8'),
    ) as CertStatus;
    expect(status.packageVersion).toBe('0.2.1');
    expect(status.engineeringVerdict).toBe('GO_CERTIFIED_RC');
    expect(status.publicProductionVerdict).toBe('NO_GO');
    expect(status.authorizesCwsPublish).toBe(false);
    expect(status.authorizesLoadUnpackedBeta).toBe(true);
    expect(status.publicBlockers).toEqual(expect.arrayContaining(['G3', 'KI-018', 'KI-006']));
    expect(status.publicBlockers).not.toContain('KI-001');
    expect(status.gates['G4_claims']).toBe('PASS');
    expect(status.gates['G5_freeze']).toBe('PASS');
    expect(status.gates['G3_e2e']).toMatch(/FAIL_PUBLIC/);
  });

  it('certification markdown states public NO-GO and eng GO', () => {
    const md = readFileSync(join(storeRoot, 'PRODUCTION_CERTIFICATION.md'), 'utf8');
    expect(md).toMatch(/NO-GO/);
    expect(md).toMatch(/GO — CERTIFIED RC|GO_CERTIFIED_RC|CERTIFIED RC/);
    expect(md).not.toMatch(/authorizes public CWS publish|public production:\s*\*\*GO\*\*/i);
    expect(md.toLowerCase()).toMatch(/does not.*authorize public|not authorize public/);
  });
});

describe('Phase 10 — Freeze G0–G5 evidence anchors', () => {
  it('G2: history and telemetry default off', () => {
    expect(DEFAULT_FEATURE_FLAGS.historyEnabled).toBe(false);
    expect(DEFAULT_FEATURE_FLAGS.telemetryEnabled).toBe(false);
  });

  it('G4: listing + disclosure still present', () => {
    expect(existsSync(join(storeRoot, 'CWS_LISTING.md'))).toBe(true);
    const disclosure = JSON.parse(
      readFileSync(join(storeRoot, 'CWS_PRIVACY_DISCLOSURE.json'), 'utf8'),
    ) as { counselSignOffRequiredBeforePublicLaunch: boolean; remoteCode: boolean };
    expect(disclosure.counselSignOffRequiredBeforePublicLaunch).toBe(true);
    expect(disclosure.remoteCode).toBe(false);
  });

  it('G5: architecture freeze + ownership matrix present', () => {
    expect(existsSync(join(blueprint, 'ARCHITECTURE_FREEZE_v1.0.md'))).toBe(true);
    expect(existsSync(join(blueprint, 'DESIGN_OWNERSHIP_MATRIX.md'))).toBe(true);
    const freeze = readFileSync(join(blueprint, 'ARCHITECTURE_FREEZE_v1.0.md'), 'utf8');
    expect(freeze).toMatch(/\*\*G3 E2E\*\*/);
    expect(freeze).toMatch(/\*\*G4 Claims\*\*/);
    expect(freeze.toLowerCase()).toMatch(/chrome web store/);
  });

  it('prior phase reports 01–09 exist (rollup evidence)', () => {
    for (let n = 1; n <= 9; n += 1) {
      const id = String(n).padStart(2, '0');
      expect(existsSync(join(repoRoot, `PHASE_${id}_REPORT.md`)), `PHASE_${id}_REPORT.md`).toBe(
        true,
      );
    }
  });

  it('KI-018 public blocker and KI-001 closure are acknowledged in KNOWN_ISSUES', () => {
    const known = readFileSync(join(repoRoot, 'KNOWN_ISSUES.md'), 'utf8');
    expect(known).toMatch(/KI-001/);
    expect(known).toMatch(/Closed/i);
    expect(known).toMatch(/KI-018/);
    expect(known).toMatch(/Privacy policy|counsel/i);
    expect(known).toMatch(/PENDING_COUNSEL_URL|counsel-approved privacy/i);
  });
});
