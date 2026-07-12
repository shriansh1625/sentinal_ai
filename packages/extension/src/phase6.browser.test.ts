/**
 * Phase 6 — Browser / MV3 compatibility invariants (PART_10).
 */

import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AI_HOST_PERMISSIONS, AI_WAR_MATCHES } from '@sentinel-shield/shared-types';
import { contentScriptId } from './lifecycle/registration.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('Phase 6 — manifest MV3', () => {
  const manifest = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8')) as {
    manifest_version: number;
    minimum_chrome_version: string;
    background: { service_worker: string; type?: string };
    permissions: string[];
    optional_host_permissions: string[];
    content_security_policy: { extension_pages: string };
    web_accessible_resources: Array<{ matches: string[]; resources: string[] }>;
    action: { default_popup: string };
    options_page: string;
    content_scripts?: unknown;
  };

  it('requires Chrome 120+ MV3 module service worker', () => {
    expect(manifest.manifest_version).toBe(3);
    expect(manifest.minimum_chrome_version).toBe('120');
    expect(manifest.background.service_worker).toBe('background.js');
    expect(manifest.background.type).toBe('module');
  });

  it('has required permissions and no static content_scripts (dynamic only)', () => {
    for (const p of ['storage', 'scripting', 'offscreen', 'alarms']) {
      expect(manifest.permissions).toContain(p);
    }
    expect(manifest.content_scripts).toBeUndefined();
    expect(manifest.action.default_popup).toBe('popup.html');
    expect(manifest.options_page).toBe('options.html');
  });

  it('CSP allows wasm-unsafe-eval without unsafe-eval', () => {
    const csp = manifest.content_security_policy.extension_pages;
    expect(csp.includes('wasm-unsafe-eval')).toBe(true);
    expect(csp.includes("'unsafe-eval'")).toBe(false);
  });

  it('optional hosts match frozen AI_HOST_PERMISSIONS (ADR-035)', () => {
    expect(manifest.optional_host_permissions).toEqual([...AI_HOST_PERMISSIONS]);
  });

  it('web_accessible_resources uses origin-only /* matches (Chrome WAR rule)', () => {
    const matches = manifest.web_accessible_resources[0]?.matches ?? [];
    expect(matches).toEqual([...AI_WAR_MATCHES]);
    for (const pattern of matches) {
      expect(pattern.endsWith('/*')).toBe(true);
      expect(pattern.includes('/i/')).toBe(false);
      expect(pattern).not.toMatch(/copilot\*$/);
    }
    for (const host of AI_HOST_PERMISSIONS) {
      const origin = host.replace(/^(\*|https?):\/\/([^/]+)\/.*$/, '$1://$2/*');
      expect(matches).toContain(origin);
    }
    expect(matches.some((m) => m.includes('mail.google'))).toBe(false);
  });
});

describe('Phase 6 — scripting registration surface', () => {
  it('content script ids are stable platform-prefixed', () => {
    expect(contentScriptId('claude')).toBe('sentinel-shield-claude');
  });
});
