/**
 * Typed configuration system — PART_21 schema + SS-OWN-001 defaults.
 * Storage is injected; this module does not touch chrome.* directly.
 */

import {
  DEFAULT_APP_SETTINGS,
  type AppSettings,
  type FeatureFlags,
} from '@sentinel-shield/shared-types';
import { ErrorCode, SentinelError } from '../errors/index.js';

export interface SettingsStore {
  load(): Promise<AppSettings | null>;
  save(settings: AppSettings): Promise<void>;
}

export class ConfigurationService {
  private settings: AppSettings = DEFAULT_APP_SETTINGS;

  constructor(private readonly store: SettingsStore) {}

  get(): AppSettings {
    return this.settings;
  }

  getFeatureFlags(): FeatureFlags {
    return this.settings.featureFlags;
  }

  async initialize(): Promise<AppSettings> {
    const loaded = await this.store.load();
    if (loaded === null) {
      this.settings = DEFAULT_APP_SETTINGS;
      await this.store.save(this.settings);
      return this.settings;
    }
    this.settings = validateSettings(loaded);
    return this.settings;
  }

  async update(
    patch: Partial<Omit<AppSettings, 'version' | 'featureFlags'>> & {
      featureFlags?: Partial<FeatureFlags>;
    },
  ): Promise<AppSettings> {
    const next: AppSettings = {
      version: 1,
      historyRetentionDays: patch.historyRetentionDays ?? this.settings.historyRetentionDays,
      featureFlags: {
        ...this.settings.featureFlags,
        ...(patch.featureFlags ?? {}),
      },
    };
    this.settings = validateSettings(next);
    await this.store.save(this.settings);
    return this.settings;
  }
}

export function validateSettings(value: AppSettings): AppSettings {
  if (value.version !== 1) {
    throw new SentinelError({
      code: ErrorCode.CONFIG,
      message: 'Unsupported settings version',
      details: { version: value.version },
      retriable: false,
    });
  }
  if (
    !Number.isInteger(value.historyRetentionDays) ||
    value.historyRetentionDays < 1 ||
    value.historyRetentionDays > 365
  ) {
    throw new SentinelError({
      code: ErrorCode.CONFIG,
      message: 'historyRetentionDays out of range',
      details: { historyRetentionDays: value.historyRetentionDays },
      retriable: false,
    });
  }
  return {
    version: 1,
    historyRetentionDays: value.historyRetentionDays,
    featureFlags: { ...value.featureFlags },
  };
}

export class InMemorySettingsStore implements SettingsStore {
  private value: AppSettings | null = null;

  load(): Promise<AppSettings | null> {
    return Promise.resolve(this.value);
  }

  save(settings: AppSettings): Promise<void> {
    this.value = settings;
    return Promise.resolve();
  }
}
