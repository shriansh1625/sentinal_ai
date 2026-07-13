/**
 * Independent Validation Lab — Phase 5 privacy probes.
 * Disclosure ↔ code consistency. No product feature work.
 */

import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ConfigurationService,
  FeatureFlagService,
  InMemorySettingsStore,
  NullTelemetryTransport,
  TelemetryService,
} from '@sentinel-shield/core';
import { MemoryKvStorage } from '@sentinel-shield/browser-adapters';
import { DEFAULT_FEATURE_FLAGS, TELEMETRY_DEFAULT_ENABLED } from '@sentinel-shield/shared-types';
import { EncryptedHistoryStore, type HistoryEntry } from './storage/history-store.js';

const extRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(extRoot, '..', '..');
const storeRoot = join(repoRoot, 'store');

type Disclosure = {
  privacyPolicyUrl: string;
  storesPersonalData: boolean;
  persistsRawPii: boolean;
  telemetryDefault: boolean;
  historyDefault: boolean;
  remoteCode: boolean;
  detectionNetwork: boolean;
  counselSignOffRequiredBeforePublicLaunch: boolean;
  permissions: string[];
  optionalHostPermissionsPolicy: string;
  cwsPrivacyPractices: Record<string, string>;
};

function loadDisclosure(): Disclosure {
  return JSON.parse(
    readFileSync(join(storeRoot, 'CWS_PRIVACY_DISCLOSURE.json'), 'utf8'),
  ) as Disclosure;
}

describe('Lab P5 — disclosure ↔ defaults consistency', () => {
  it('JSON defaults match DEFAULT_FEATURE_FLAGS and TELEMETRY_DEFAULT_ENABLED', () => {
    const d = loadDisclosure();
    expect(d.telemetryDefault).toBe(false);
    expect(d.historyDefault).toBe(false);
    expect(d.telemetryDefault).toBe(DEFAULT_FEATURE_FLAGS.telemetryEnabled);
    expect(d.historyDefault).toBe(DEFAULT_FEATURE_FLAGS.historyEnabled);
    expect(TELEMETRY_DEFAULT_ENABLED).toBe(false);
    expect(d.persistsRawPii).toBe(false);
    expect(d.storesPersonalData).toBe(false);
    expect(d.remoteCode).toBe(false);
    expect(d.detectionNetwork).toBe(false);
  });

  it('counsel privacy URL is still PENDING (KI-018 public blocker honesty)', () => {
    const d = loadDisclosure();
    expect(d.privacyPolicyUrl).toBe('PENDING_COUNSEL_URL');
    expect(d.counselSignOffRequiredBeforePublicLaunch).toBe(true);
  });

  it('optional host policy is AI-only', () => {
    expect(loadDisclosure().optionalHostPermissionsPolicy).toBe('AI_HOST_PERMISSIONS_ONLY');
  });
});

describe('Lab P5 — telemetry minimization', () => {
  it('does not send when telemetry flag is off (even with capturing transport)', async () => {
    const store = new InMemorySettingsStore();
    const config = new ConfigurationService(store);
    await config.initialize();
    const flags = new FeatureFlagService(config);
    const sent: string[] = [];
    const telemetry = new TelemetryService(flags, {
      async send(event) {
        sent.push(event.name);
      },
    });
    await telemetry.track('lab_privacy_probe', { rawPaste: true });
    expect(flags.isEnabled('telemetryEnabled')).toBe(false);
    expect(sent).toEqual([]);
    expect(new NullTelemetryTransport()).toBeDefined();
  });
});

describe('Lab P5 — history metadata-only', () => {
  it('HistoryEntry schema has no raw text / payload fields', () => {
    const sample: HistoryEntry = {
      id: '1',
      interceptId: 'i',
      decision: 'HOLD',
      reason: 'Warn',
      timestampMs: 1,
    };
    const keys = Object.keys(sample).sort();
    expect(keys).toEqual(['decision', 'id', 'interceptId', 'reason', 'timestampMs']);
    expect(keys.some((k) => /text|payload|content|pii|email|secret/i.test(k))).toBe(false);
  });

  it('append path does not persist raw paste string', async () => {
    const backing = new MemoryKvStorage();
    const history = new EncryptedHistoryStore(backing);
    const secret = 'alice@example.com-should-not-persist';
    await history.append({
      interceptId: 'p5',
      decision: 'HOLD',
      reason: 'Warn: email',
      timestampMs: Date.now(),
    });
    const raw = JSON.stringify(await backing.get('sentinel_history_v1'));
    expect(raw.includes(secret)).toBe(false);
    expect(raw.includes('alice@')).toBe(false);
    const list = await history.list();
    expect(list).toHaveLength(1);
    expect(JSON.stringify(list).includes(secret)).toBe(false);
  });
});

describe('Lab P5 — permission minimization', () => {
  it('manifest omits history/tabs/webRequest and matches disclosure permission list', () => {
    const manifest = JSON.parse(readFileSync(join(extRoot, 'manifest.json'), 'utf8')) as {
      permissions: string[];
    };
    const d = loadDisclosure();
    expect(manifest.permissions).toEqual(d.permissions);
    for (const forbidden of ['history', 'tabs', 'webRequest', 'declarativeNetRequest', 'cookies']) {
      expect(manifest.permissions.includes(forbidden)).toBe(false);
    }
  });

  it('PRIVACY_PRACTICES.md states no remote code and ephemeral processing', () => {
    const md = readFileSync(join(storeRoot, 'PRIVACY_PRACTICES.md'), 'utf8');
    expect(existsSync(join(storeRoot, 'PRIVACY_PRACTICES.md'))).toBe(true);
    expect(md.toLowerCase()).toMatch(/no remote script|remote code/);
    expect(md.toLowerCase()).toMatch(/not.*persist|memory-only|ram only/);
    expect(md.toLowerCase()).toMatch(/off by default/);
    expect(md).toMatch(/counsel sign-off/i);
  });
});
