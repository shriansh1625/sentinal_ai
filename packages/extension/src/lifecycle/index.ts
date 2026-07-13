/**
 * Extension lifecycle coordinator — PART_11.
 */

import { AllowlistLogger, ConsoleLogSink, LogLevel, type Logger } from '@sentinel-shield/core';
import type { KvStorage } from '@sentinel-shield/browser-adapters';
import { CURRENT_SCHEMA_VERSION, isSafeMode, runMigrations, setSafeMode } from './migrations.js';
import { registerEnabledPlatforms, type ScriptingApi, type TabsApi } from './registration.js';

export const KEEP_ALIVE_ALARM = 'sentinel-sw-keepalive';

export interface LifecycleDeps {
  readonly storage: KvStorage;
  readonly scripting: ScriptingApi;
  readonly logger?: Logger;
  readonly openOnboarding?: () => Promise<void>;
  readonly tabs?: TabsApi;
}

export class LifecycleCoordinator {
  private readonly logger: Logger;
  private bootstrapped = false;

  constructor(private readonly deps: LifecycleDeps) {
    this.logger =
      deps.logger ??
      new AllowlistLogger(new ConsoleLogSink(), LogLevel.INFO, { component: 'lifecycle' });
  }

  async handleInstalled(details: {
    reason: 'install' | 'update' | 'chrome_update' | 'shared_module_update';
    previousVersion?: string;
  }): Promise<void> {
    switch (details.reason) {
      case 'install':
        await this.bootstrapFreshInstall();
        break;
      case 'update':
        await runMigrations(this.deps.storage, this.logger, CURRENT_SCHEMA_VERSION);
        break;
      case 'chrome_update':
      case 'shared_module_update':
        break;
    }
    await registerEnabledPlatforms(
      this.deps.storage,
      this.deps.scripting,
      this.logger,
      this.deps.tabs,
    );
    this.bootstrapped = true;
  }

  async handleStartup(): Promise<void> {
    await this.rehydrateSessionState();
    this.bootstrapped = true;
  }

  async ensureReady(): Promise<void> {
    if (this.bootstrapped) {
      return;
    }
    await runMigrations(this.deps.storage, this.logger, CURRENT_SCHEMA_VERSION);
    await this.rehydrateSessionState();
    this.bootstrapped = true;
  }

  async rehydrateSessionState(): Promise<void> {
    // SW may wake without onStartup — restore platform registrations from storage.
    this.logger.info('session rehydrate', { schemaVersion: CURRENT_SCHEMA_VERSION });
    await registerEnabledPlatforms(
      this.deps.storage,
      this.deps.scripting,
      this.logger,
      this.deps.tabs,
    );
  }

  async bootstrapFreshInstall(): Promise<void> {
    await runMigrations(this.deps.storage, this.logger, CURRENT_SCHEMA_VERSION);
    await setSafeMode(this.deps.storage, false);
    if (this.deps.openOnboarding) {
      await this.deps.openOnboarding();
    }
    this.logger.info('fresh install complete');
  }

  async checkSafeMode(): Promise<boolean> {
    return isSafeMode(this.deps.storage);
  }
}

export async function ensureKeepAliveAlarm(
  alarms: {
    create: (name: string, info: chrome.alarms.AlarmCreateInfo) => Promise<void> | void;
    get: (name: string) => Promise<chrome.alarms.Alarm | undefined>;
    clear: (name: string) => Promise<boolean> | boolean;
  },
  enabled: boolean,
): Promise<void> {
  const existing = await alarms.get(KEEP_ALIVE_ALARM);
  if (!enabled) {
    if (existing) {
      await alarms.clear(KEEP_ALIVE_ALARM);
    }
    return;
  }
  if (!existing) {
    await alarms.create(KEEP_ALIVE_ALARM, { periodInMinutes: 0.5 });
  }
}
