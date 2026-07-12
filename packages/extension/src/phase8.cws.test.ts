/**
 * Phase 8 — Chrome Web Store readiness (G4 claims, permissions, privacy, i18n).
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { AI_HOST_PERMISSIONS } from '@sentinel-shield/shared-types';
import { t } from './ui/i18n.js';

const extRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(extRoot, '..', '..');
const storeRoot = join(repoRoot, 'store');

const FORBIDDEN_CLAIMS = [
  'blocks all leaks',
  'prevents all AI exfiltration',
  'full clipboard firewall',
  'undetectable',
  '100% accuracy',
] as const;

const REQUIRED_PERMISSIONS = ['storage', 'activeTab', 'scripting', 'offscreen', 'alarms'] as const;

function readUtf8(path: string): string {
  return readFileSync(path, 'utf8');
}

describe('Phase 8 — CWS store materials (G4)', () => {
  it('ships listing, permissions, privacy, attestation, and disclosure JSON', () => {
    for (const name of [
      'CWS_LISTING.md',
      'PERMISSIONS_JUSTIFICATION.md',
      'PRIVACY_PRACTICES.md',
      'CWS_PACKAGE_ATTESTATION.md',
      'CWS_PRIVACY_DISCLOSURE.json',
    ]) {
      expect(existsSync(join(storeRoot, name)), name).toBe(true);
    }
  });

  it('listing uses required framing and omits forbidden claims', () => {
    const listing = readUtf8(join(storeRoot, 'CWS_LISTING.md')).toLowerCase();
    expect(listing).toMatch(/local privacy assistant/);
    expect(listing).toMatch(/paste/);
    expect(listing).toMatch(/drag/);
    expect(listing).toMatch(/allow/);
    expect(listing).toMatch(/block/);
    expect(listing).toMatch(/redact/);
    expect(listing).toMatch(/clipboard\.readtext|navigator\.clipboard/);
    for (const phrase of FORBIDDEN_CLAIMS) {
      // Forbidden list section may mention phrases; ensure they are not asserted as capabilities.
      const capabilityClaim = new RegExp(
        `(does|will|can)\\s+${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
        'i',
      );
      expect(listing).not.toMatch(capabilityClaim);
    }
    // Absolute ban on marketing use outside the Forbidden phrases section header context:
    const withoutForbiddenSection = listing.split('## forbidden phrases')[0] ?? listing;
    for (const phrase of FORBIDDEN_CLAIMS) {
      expect(withoutForbiddenSection.includes(phrase)).toBe(false);
    }
  });

  it('privacy disclosure JSON asserts no remote code and no durable raw PII', () => {
    const disclosure = JSON.parse(readUtf8(join(storeRoot, 'CWS_PRIVACY_DISCLOSURE.json'))) as {
      remoteCode: boolean;
      persistsRawPii: boolean;
      telemetryDefault: boolean;
      historyDefault: boolean;
      detectionNetwork: boolean;
      permissions: string[];
      counselSignOffRequiredBeforePublicLaunch: boolean;
    };
    expect(disclosure.remoteCode).toBe(false);
    expect(disclosure.persistsRawPii).toBe(false);
    expect(disclosure.telemetryDefault).toBe(false);
    expect(disclosure.historyDefault).toBe(false);
    expect(disclosure.detectionNetwork).toBe(false);
    expect(disclosure.counselSignOffRequiredBeforePublicLaunch).toBe(true);
    expect(disclosure.permissions).toEqual([...REQUIRED_PERMISSIONS]);
  });

  it('permissions justification covers every required permission', () => {
    const text = readUtf8(join(storeRoot, 'PERMISSIONS_JUSTIFICATION.md'));
    for (const perm of REQUIRED_PERMISSIONS) {
      expect(text).toContain(`\`${perm}\``);
    }
    expect(text).toMatch(/tabs/);
    expect(text.toLowerCase()).toMatch(/not requested|absent|rejected/);
  });
});

describe('Phase 8 — package / i18n readiness', () => {
  it('manifest uses __MSG_ placeholders and default_locale', () => {
    const manifest = JSON.parse(readUtf8(join(extRoot, 'manifest.json'))) as {
      name: string;
      description: string;
      default_locale: string;
      permissions: string[];
      optional_host_permissions: string[];
      action: { default_title: string };
      content_security_policy: { extension_pages: string };
    };
    expect(manifest.name).toBe('__MSG_extensionName__');
    expect(manifest.description).toBe('__MSG_extensionDescription__');
    expect(manifest.action.default_title).toBe('__MSG_extensionName__');
    expect(manifest.default_locale).toBe('en');
    expect(manifest.permissions).toEqual([...REQUIRED_PERMISSIONS]);
    expect(manifest.optional_host_permissions).toEqual([...AI_HOST_PERMISSIONS]);
    expect(manifest.content_security_policy.extension_pages).toContain('wasm-unsafe-eval');
    expect(manifest.content_security_policy.extension_pages).not.toContain("'unsafe-eval'");
  });

  it('messages.json keys exist for i18n surface and description ≤132 chars', () => {
    const messages = JSON.parse(
      readUtf8(join(extRoot, '_locales', 'en', 'messages.json')),
    ) as Record<string, { message: string }>;
    const requiredKeys = [
      'extensionName',
      'extensionDescription',
      'overlay_title_block',
      'overlay_title_hold',
      'overlay_title_redact',
      'a11y_overlay_live_prefix',
      'action_allow',
      'action_block',
      'action_redact',
      'a11y_decision_actions',
      'popup_open_settings',
      'popup_platforms_heading',
      'options_intro',
    ];
    for (const key of requiredKeys) {
      expect(messages[key]?.message.length).toBeGreaterThan(0);
    }
    expect(messages['extensionDescription']!.message.length).toBeLessThanOrEqual(132);
  });

  it('t() resolves overlay strings via en fallback without chrome.i18n', () => {
    expect(t('action_block')).toBe('Block');
    expect(t('extensionName')).toMatch(/Sentinel Shield/);
  });

  it('discloses OCR fail-closed when WASM binaries are not vendored', () => {
    const wasmDir = join(extRoot, 'public', 'wasm');
    const hasWasmBinaries =
      existsSync(wasmDir) && readdirSync(wasmDir).some((name) => /\.(wasm|bin)$/i.test(name));
    const listing = readUtf8(join(storeRoot, 'CWS_LISTING.md'));
    const disclosure = JSON.parse(readUtf8(join(storeRoot, 'CWS_PRIVACY_DISCLOSURE.json'))) as {
      limitationsDisclosed: string[];
    };
    if (!hasWasmBinaries) {
      expect(listing.toLowerCase()).toMatch(/fail closed|fails closed/);
      expect(disclosure.limitationsDisclosed.some((s) => /OCR|WASM/i.test(s))).toBe(true);
    }
  });
});
