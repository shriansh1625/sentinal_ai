import { describe, expect, it } from 'vitest';
import { MessageType } from '@sentinel-shield/shared-types';
import { createPingEnvelope, defaultSettingsSnapshot } from './background.js';

describe('extension Sprint 0 shell', () => {
  it('exposes frozen default settings', () => {
    const settings = defaultSettingsSnapshot();
    expect(settings.featureFlags.telemetryEnabled).toBe(false);
    expect(settings.featureFlags.wasmThreadsEnabled).toBe(false);
  });

  it('builds ping envelopes for messaging abstraction', () => {
    expect(createPingEnvelope().type).toBe(MessageType.PING);
  });
});
