/**
 * MV3 service worker entry — PART_10 / PART_11 / PART_19.
 */

import {
  AllowlistLogger,
  BrowserMemoryProvider,
  ConfigurationService,
  ConsoleLogSink,
  FeatureFlagService,
  LogLevel,
  MemoryMonitor,
  PerformanceMonitor,
  TelemetryService,
  type SettingsStore,
} from '@sentinel-shield/core';
import {
  ChromeLocalStorage,
  ChromeSessionKeyStore,
  EncryptedKvStorage,
  createEnvelope,
  type KvStorage,
} from '@sentinel-shield/browser-adapters';
import { DEFAULT_APP_SETTINGS, MessageType, type AppSettings } from '@sentinel-shield/shared-types';
import { ensureKeepAliveAlarm, LifecycleCoordinator } from './lifecycle/index.js';
import { SETTINGS_KEY } from './lifecycle/migrations.js';
import { OffscreenManager } from './offscreen/manager.js';
import { attachChromeMessageListener, MessageRouter } from './messaging/router.js';
import { createHandlers } from './messaging/handlers.js';
import { EncryptedHistoryStore } from './storage/history-store.js';

class EncryptedSettingsStore implements SettingsStore {
  constructor(private readonly kv: KvStorage) {}

  async load(): Promise<AppSettings | null> {
    const value = await this.kv.get<AppSettings>(SETTINGS_KEY);
    return value ?? null;
  }

  async save(settings: AppSettings): Promise<void> {
    await this.kv.set(SETTINGS_KEY, settings);
  }
}

const logger = new AllowlistLogger(new ConsoleLogSink(), LogLevel.INFO, {
  component: 'service-worker',
});

export function createPingEnvelope() {
  return createEnvelope(MessageType.PING, { nonce: 'sw' });
}

export function defaultSettingsSnapshot(): AppSettings {
  return DEFAULT_APP_SETTINGS;
}

export async function bootstrapServiceWorker(): Promise<{
  config: ConfigurationService;
  flags: FeatureFlagService;
  lifecycle: LifecycleCoordinator;
  router: MessageRouter;
  offscreen: OffscreenManager;
}> {
  const perf = new PerformanceMonitor();
  perf.start('sw_bootstrap');

  const encrypted = new EncryptedKvStorage(new ChromeLocalStorage(), new ChromeSessionKeyStore());
  await encrypted.initialize();

  const settingsStore = new EncryptedSettingsStore(encrypted);
  const config = new ConfigurationService(settingsStore);
  await config.initialize();
  const flags = new FeatureFlagService(config);

  const lifecycle = new LifecycleCoordinator({
    storage: encrypted,
    scripting: chrome.scripting,
    logger,
    openOnboarding: async () => {
      await chrome.runtime.openOptionsPage().catch(() => undefined);
    },
  });

  const offscreen = new OffscreenManager(chrome.offscreen, chrome.runtime, logger);

  const historyStore = new EncryptedHistoryStore(encrypted);

  const router = new MessageRouter({
    handlers: createHandlers({
      storage: encrypted,
      scripting: chrome.scripting,
      config,
      flags,
      offscreen,
      logger,
      getVersion: () => chrome.runtime.getManifest().version,
      isSafeMode: () => lifecycle.checkSafeMode(),
      permissions: chrome.permissions,
      historyStore,
    }),
    logger,
    isSafeMode: () => lifecycle.checkSafeMode(),
  });

  attachChromeMessageListener(router);

  chrome.runtime.onInstalled.addListener((details) => {
    void lifecycle.handleInstalled({
      reason: details.reason,
      ...(details.previousVersion !== undefined
        ? { previousVersion: details.previousVersion }
        : {}),
    });
  });

  chrome.runtime.onStartup.addListener(() => {
    void lifecycle.handleStartup();
  });

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'sentinel-sw-keepalive') {
      logger.debug('keepalive alarm');
    }
  });

  await lifecycle.ensureReady();

  const telemetry = new TelemetryService(flags);
  await telemetry.track('sw_bootstrap');
  new MemoryMonitor(new BrowserMemoryProvider()).assertWithinBudget();

  const sample = perf.end('sw_bootstrap');
  logger.info('service worker ready', {
    durationMs: Math.round(sample.durationMs),
    settingsVersion: config.get().version,
    telemetryEnabled: flags.isEnabled('telemetryEnabled'),
  });

  await ensureKeepAliveAlarm(chrome.alarms, false);

  return { config, flags, lifecycle, router, offscreen };
}

function isChromeExtensionRuntime(): boolean {
  return typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined';
}

if (isChromeExtensionRuntime()) {
  void bootstrapServiceWorker().catch((error: unknown) => {
    logger.error('service worker bootstrap failed', {
      message: error instanceof Error ? error.message : 'unknown',
    });
  });
}
