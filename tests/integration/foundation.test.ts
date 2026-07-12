import { describe, expect, it } from 'vitest';
import {
  ConfigurationService,
  FeatureFlagService,
  InMemorySettingsStore,
} from '@sentinel-shield/core';
import { InProcessMessageBus, createEnvelope } from '@sentinel-shield/browser-adapters';
import { MessageType } from '@sentinel-shield/shared-types';

describe('foundation integration', () => {
  it('wires config → flags and messaging without chrome', async () => {
    const config = new ConfigurationService(new InMemorySettingsStore());
    await config.initialize();
    const flags = new FeatureFlagService(config);
    expect(flags.isEnabled('telemetryEnabled')).toBe(false);

    const bus = new InProcessMessageBus();
    let received = false;
    bus.subscribe((msg) => {
      if (msg.type === MessageType.PING) received = true;
    });
    await bus.send(createEnvelope(MessageType.PING, { nonce: 'i1' }));
    expect(received).toBe(true);
  });
});
