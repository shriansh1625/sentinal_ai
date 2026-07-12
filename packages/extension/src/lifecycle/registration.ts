/**
 * Platform content-script registration — PART_10 / PART_11.
 * Dynamic injection only for user-enabled AI platforms (ADR-035).
 */

import type { Logger } from '@sentinel-shield/core';
import type { KvStorage } from '@sentinel-shield/browser-adapters';
import { getPlatform } from '@sentinel-shield/shared-types';
import { ENABLED_PLATFORMS_KEY } from './migrations.js';

const SCRIPT_PREFIX = 'sentinel-shield-';

export function contentScriptId(platformId: string): string {
  return `${SCRIPT_PREFIX}${platformId}`;
}

export async function listEnabledPlatforms(storage: KvStorage): Promise<string[]> {
  return (await storage.get<string[]>(ENABLED_PLATFORMS_KEY)) ?? [];
}

export async function setEnabledPlatforms(
  storage: KvStorage,
  platformIds: readonly string[],
): Promise<void> {
  await storage.set(ENABLED_PLATFORMS_KEY, [...platformIds]);
}

export interface ScriptingApi {
  registerContentScripts(scripts: chrome.scripting.RegisteredContentScript[]): Promise<void>;
  unregisterContentScripts(filter?: { ids?: string[] }): Promise<void>;
  getRegisteredContentScripts(filter?: {
    ids?: string[];
  }): Promise<chrome.scripting.RegisteredContentScript[]>;
}

export async function registerEnabledPlatforms(
  storage: KvStorage,
  scripting: ScriptingApi,
  logger: Logger,
): Promise<void> {
  const enabled = await listEnabledPlatforms(storage);
  const existing = await scripting.getRegisteredContentScripts();
  const staleIds = existing
    .map((s) => s.id)
    .filter((id): id is string => typeof id === 'string' && id.startsWith(SCRIPT_PREFIX));

  if (staleIds.length > 0) {
    await scripting.unregisterContentScripts({ ids: staleIds });
  }

  for (const platformId of enabled) {
    const platform = getPlatform(platformId);
    if (!platform) {
      logger.warn('skipping unknown platform id', { platformId });
      continue;
    }
    await scripting.registerContentScripts([
      {
        id: contentScriptId(platformId),
        matches: [...platform.urlPatterns],
        js: ['content.js'],
        runAt: 'document_start',
        allFrames: false,
        world: 'ISOLATED',
      },
    ]);
  }
  logger.info('platform scripts registered', { count: enabled.length });
}

export interface PermissionsApi {
  request(permissions: chrome.permissions.Permissions): Promise<boolean>;
  contains(permissions: chrome.permissions.Permissions): Promise<boolean>;
  remove(permissions: chrome.permissions.Permissions): Promise<boolean>;
}

/**
 * Request optional host permissions then register content scripts (ADR-035).
 * Must be called from a user gesture (popup/options).
 */
export async function enablePlatform(
  storage: KvStorage,
  scripting: ScriptingApi,
  logger: Logger,
  platformId: string,
  permissionsApi?: PermissionsApi,
): Promise<void> {
  const platform = getPlatform(platformId);
  if (!platform) {
    throw new Error(`Unknown platform: ${platformId}`);
  }
  if (permissionsApi) {
    const origins = [...platform.urlPatterns];
    const granted = await permissionsApi.request({ origins });
    if (!granted) {
      throw new Error(`Host permission denied for ${platformId}`);
    }
  }
  const enabled = new Set(await listEnabledPlatforms(storage));
  enabled.add(platformId);
  await setEnabledPlatforms(storage, [...enabled]);
  await registerEnabledPlatforms(storage, scripting, logger);
}

export async function disablePlatform(
  storage: KvStorage,
  scripting: ScriptingApi,
  logger: Logger,
  platformId: string,
): Promise<void> {
  const enabled = (await listEnabledPlatforms(storage)).filter((id) => id !== platformId);
  await setEnabledPlatforms(storage, enabled);
  await registerEnabledPlatforms(storage, scripting, logger);
}
