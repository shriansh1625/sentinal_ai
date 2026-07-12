/**
 * Phase 9 — Beta release validation (axe a11y + beta checklist invariants).
 */

import { afterEach, describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import axe from 'axe-core';
import { InterceptDecision } from '@sentinel-shield/shared-types';
import { DecisionOverlay } from './ui/overlay.js';
import type { SentinelPopup } from './ui/popup-app.js';
import type { SentinelOptions } from './ui/options-app.js';
import './ui/popup-app.js';
import './ui/options-app.js';

const extRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(extRoot, '..', '..');
const storeRoot = join(repoRoot, 'store');
const assetsRoot = join(storeRoot, 'assets');

afterEach(() => {
  document.querySelectorAll('sentinel-shield-overlay').forEach((n) => n.remove());
  document.querySelectorAll('sentinel-popup, sentinel-options').forEach((n) => n.remove());
});

function seriousOrCritical(
  violations: { id: string; impact?: string | null; help: string }[],
): typeof violations {
  return violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
}

describe('Phase 9 — axe WCAG AA (KI-016)', () => {
  it('overlay closed-shadow has no serious/critical axe violations', async () => {
    const overlay = new DecisionOverlay();
    overlay.show({
      outcome: {
        interceptId: 'beta-axe',
        decision: InterceptDecision.HOLD,
        reason: 'Sensitive content detected',
        preview: 'j***@example.com',
        redactedText: '[REDACTED_EMAIL]',
      },
      onAction: () => undefined,
    });
    const probe = overlay.cloneShadowForTests();
    document.body.appendChild(probe);
    try {
      const results = await axe.run(probe, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      });
      expect(
        seriousOrCritical(results.violations),
        JSON.stringify(results.violations, null, 2),
      ).toEqual([]);
    } finally {
      probe.remove();
      overlay.hide();
    }
  });

  it('popup Lit surface has no serious/critical axe violations', async () => {
    const el = document.createElement('sentinel-popup') as SentinelPopup;
    document.body.appendChild(el);
    await el.updateComplete;
    el.error = null;
    el.status = '';
    await el.updateComplete;
    const results = await axe.run(el, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    });
    expect(
      seriousOrCritical(results.violations),
      JSON.stringify(results.violations, null, 2),
    ).toEqual([]);
  });

  it('options Lit surface has no serious/critical axe violations', async () => {
    const el = document.createElement('sentinel-options') as SentinelOptions;
    document.body.appendChild(el);
    await el.updateComplete;
    el.error = '';
    el.message = '';
    await el.updateComplete;
    const results = await axe.run(el, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    });
    expect(
      seriousOrCritical(results.violations),
      JSON.stringify(results.violations, null, 2),
    ).toEqual([]);
  });
});

describe('Phase 9 — beta package + store checklist', () => {
  it('beta checklist and asset stubs exist', () => {
    expect(existsSync(join(storeRoot, 'BETA_CHECKLIST.md'))).toBe(true);
    expect(existsSync(join(assetsRoot, 'README.md'))).toBe(true);
  });

  it('dist remains load-unpacked ready after build artifacts present', () => {
    const dist = join(extRoot, 'dist');
    // Soft: if dist missing, skip — CI build precedes verify; unit may run alone.
    if (!existsSync(join(dist, 'manifest.json'))) {
      return;
    }
    const manifest = JSON.parse(readFileSync(join(dist, 'manifest.json'), 'utf8')) as {
      name: string;
      version: string;
    };
    expect(manifest.name).toBe('__MSG_extensionName__');
    expect(manifest.version).toBe('0.2.1');
    for (const f of ['background.js', 'content.js', 'popup.html', 'options.html']) {
      expect(existsSync(join(dist, f))).toBe(true);
    }
  });

  it('engineering screenshot fixtures are present when assets dir populated', () => {
    expect(existsSync(assetsRoot)).toBe(true);
    const readme = readFileSync(join(assetsRoot, 'README.md'), 'utf8');
    expect(readme.toLowerCase()).toMatch(/screenshot/);
    const pngs = readdirSync(assetsRoot).filter((n) => n.endsWith('.png'));
    expect(pngs.some((n) => n.includes('popup'))).toBe(true);
    expect(pngs.some((n) => n.includes('options'))).toBe(true);
  });
});
