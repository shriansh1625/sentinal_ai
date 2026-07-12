/**
 * Phase 5 — SW cold-start timing (mocked bootstrap path).
 */

import { describe, expect, it } from 'vitest';
import { SW_COLD_START_MS } from '@sentinel-shield/shared-types';
import {
  AllowlistLogger,
  ConfigurationService,
  FeatureFlagService,
  InMemorySettingsStore,
  LogLevel,
  MemoryLogSink,
  PerformanceMonitor,
} from '@sentinel-shield/core';
import { MemoryKvStorage } from '@sentinel-shield/browser-adapters';
import { MessageRouter } from './messaging/router.js';
import { createHandlers } from './messaging/handlers.js';
import { OffscreenManager } from './offscreen/manager.js';
import { runMigrations } from './lifecycle/migrations.js';

describe('Phase 5 — mocked SW ready timing', () => {
  it(`completes handler wiring under SW_COLD_START_MS (${SW_COLD_START_MS})`, async () => {
    const perf = new PerformanceMonitor();
    perf.start('sw_bootstrap');
    const storage = new MemoryKvStorage();
    const logger = new AllowlistLogger(new MemoryLogSink(), LogLevel.INFO);
    await runMigrations(storage, logger);
    const config = new ConfigurationService(new InMemorySettingsStore());
    await config.initialize();
    const flags = new FeatureFlagService(config);
    const offscreen = new OffscreenManager(
      { createDocument: async () => undefined, closeDocument: async () => undefined },
      { getContexts: async () => [], getURL: (p) => p },
      logger,
    );
    const router = new MessageRouter({
      handlers: createHandlers({
        storage,
        scripting: {
          registerContentScripts: async () => undefined,
          unregisterContentScripts: async () => undefined,
          getRegisteredContentScripts: async () => [],
        },
        config,
        flags,
        offscreen,
        logger,
        getVersion: () => '0.2.1',
        isSafeMode: async () => false,
      }),
      logger,
    });
    expect(router).toBeTruthy();
    const sample = perf.end('sw_bootstrap');
    expect(sample.durationMs).toBeLessThan(SW_COLD_START_MS);
  });
});
