import { describe, expect, it } from 'vitest';
import {
  AI_HOST_PERMISSIONS,
  AI_WAR_MATCHES,
  ARGON2ID_M_KIB,
  DEFAULT_FEATURE_FLAGS,
  EXT_PEAK_MEM_MB,
  MAX_IPC_MSG_PER_MIN_PER_TAB,
  MAX_SCANS_PER_MIN_PER_TAB,
  MAX_TEXT_SCAN_BYTES,
  WASM_THREADS_DEFAULT,
  toWebAccessibleOriginPattern,
} from './index.js';

describe('canonical constants (SS-OWN-001 §3)', () => {
  it('mirrors frozen rate limits and memory ceiling', () => {
    expect(MAX_SCANS_PER_MIN_PER_TAB).toBe(20);
    expect(MAX_IPC_MSG_PER_MIN_PER_TAB).toBe(30);
    expect(EXT_PEAK_MEM_MB).toBe(256);
    expect(ARGON2ID_M_KIB).toBe(19_456);
    expect(WASM_THREADS_DEFAULT).toBe(false);
    expect(MAX_TEXT_SCAN_BYTES).toBe(1_048_576);
  });

  it('keeps dangerous defaults off', () => {
    expect(DEFAULT_FEATURE_FLAGS.nerEnabled).toBe(false);
    expect(DEFAULT_FEATURE_FLAGS.cvEnabled).toBe(false);
    expect(DEFAULT_FEATURE_FLAGS.telemetryEnabled).toBe(false);
    expect(DEFAULT_FEATURE_FLAGS.historyEnabled).toBe(false);
    expect(DEFAULT_FEATURE_FLAGS.ocrEnabled).toBe(true);
  });

  it('lists AI hosts only (no Drive/Gmail)', () => {
    expect(AI_HOST_PERMISSIONS.length).toBeGreaterThan(0);
    for (const host of AI_HOST_PERMISSIONS) {
      expect(host.includes('drive.google')).toBe(false);
      expect(host.includes('mail.google')).toBe(false);
      expect(host.includes('outlook')).toBe(false);
    }
  });

  it('derives WAR origin matches with path exactly /*', () => {
    expect(AI_WAR_MATCHES).toContain('*://x.com/*');
    expect(AI_WAR_MATCHES).toContain('*://github.com/*');
    expect(AI_WAR_MATCHES).not.toContain('*://x.com/i/grok*');
    expect(AI_WAR_MATCHES).not.toContain('*://github.com/copilot*');
    for (const pattern of AI_WAR_MATCHES) {
      expect(pattern.endsWith('/*')).toBe(true);
      expect(toWebAccessibleOriginPattern(pattern)).toBe(pattern);
    }
  });
});

describe('AI platforms registry', () => {
  it('matches frozen host set without Drive/Gmail', async () => {
    const { AI_PLATFORMS, getPlatform } = await import('./platforms/index.js');
    expect(getPlatform('claude')?.displayName).toBe('Claude');
    expect(AI_PLATFORMS.some((p) => p.id === 'gmail')).toBe(false);
  });
});
