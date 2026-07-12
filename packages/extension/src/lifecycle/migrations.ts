/**
 * Schema migration runner — PART_11.
 * Stamp written last (transaction envelope). Fail → SafeMode.
 */

import { ErrorCode, SentinelError, type Logger } from '@sentinel-shield/core';
import type { KvStorage } from '@sentinel-shield/browser-adapters';
import { DEFAULT_APP_SETTINGS, type AppSettings } from '@sentinel-shield/shared-types';

export const CURRENT_SCHEMA_VERSION = 1 as const;
export const SCHEMA_VERSION_KEY = 'schemaVersion';
export const SAFE_MODE_KEY = 'safeMode';
export const SETTINGS_KEY = 'appSettings';
export const ENABLED_PLATFORMS_KEY = 'enabledPlatforms';

export interface MigrationContext {
  readonly from: number;
  readonly to: typeof CURRENT_SCHEMA_VERSION;
  readonly storage: KvStorage;
  readonly logger: Logger;
}

export type MigrationStep = (ctx: MigrationContext) => Promise<void>;

/** v0 → v1: seed defaults if absent. */
const migrateToV1: MigrationStep = async ({ storage, logger }) => {
  const existing = await storage.get<AppSettings>(SETTINGS_KEY);
  if (!existing) {
    await storage.set(SETTINGS_KEY, DEFAULT_APP_SETTINGS);
    logger.info('migration seeded default settings', { to: 1 });
  }
  const platforms = await storage.get<string[]>(ENABLED_PLATFORMS_KEY);
  if (!platforms) {
    await storage.set(ENABLED_PLATFORMS_KEY, [] as string[]);
  }
};

const MIGRATIONS: readonly { to: number; step: MigrationStep }[] = [{ to: 1, step: migrateToV1 }];

export async function readSchemaVersion(storage: KvStorage): Promise<number> {
  const value = await storage.get<number>(SCHEMA_VERSION_KEY);
  return typeof value === 'number' ? value : 0;
}

export async function isSafeMode(storage: KvStorage): Promise<boolean> {
  return (await storage.get<boolean>(SAFE_MODE_KEY)) === true;
}

export async function setSafeMode(storage: KvStorage, enabled: boolean): Promise<void> {
  await storage.set(SAFE_MODE_KEY, enabled);
}

export async function runMigrations(
  storage: KvStorage,
  logger: Logger,
  target: typeof CURRENT_SCHEMA_VERSION = CURRENT_SCHEMA_VERSION,
): Promise<{ from: number; to: number }> {
  const from = await readSchemaVersion(storage);
  if (from > target) {
    throw new SentinelError({
      code: ErrorCode.CONFIG,
      message: 'Schema newer than supported — refuse downgrade',
      details: { from, target },
      retriable: false,
    });
  }
  if (from === target) {
    return { from, to: target };
  }

  try {
    for (const migration of MIGRATIONS) {
      if (migration.to <= from || migration.to > target) {
        continue;
      }
      await migration.step({ from, to: target, storage, logger });
    }
    // Stamp last — PART_11 FM-02 recovery
    await storage.set(SCHEMA_VERSION_KEY, target);
    await setSafeMode(storage, false);
    logger.info('migrations complete', { from, to: target });
    return { from, to: target };
  } catch (cause) {
    await setSafeMode(storage, true);
    logger.error('migration failed — entering SafeMode', {
      from,
      to: target,
      message: cause instanceof Error ? cause.message : 'unknown',
    });
    throw cause;
  }
}
