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
  executeScript?: (injection: { target: { tabId: number }; files: string[] }) => Promise<unknown>;
}

export interface TabsApi {
  query(queryInfo: { url?: string | string[] }): Promise<Array<{ id?: number | undefined }>>;
}

export async function registerEnabledPlatforms(
  storage: KvStorage,
  scripting: ScriptingApi,
  logger: Logger,
  tabsApi?: TabsApi,
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
    await injectIntoOpenTabs(platform.urlPatterns, scripting, logger, tabsApi);
  }
  logger.info('platform scripts registered', { count: enabled.length });
}

/**
 * registerContentScripts only affects future navigations. PART_15 also injects
 * into already-open matching tabs so protection starts without a manual refresh.
 */
async function injectIntoOpenTabs(
  urlPatterns: readonly string[],
  scripting: ScriptingApi,
  logger: Logger,
  tabsApi?: TabsApi,
): Promise<void> {
  if (!scripting.executeScript || !tabsApi) {
    return;
  }
  let tabs: Array<{ id?: number | undefined }> = [];
  try {
    tabs = await tabsApi.query({ url: [...urlPatterns] });
  } catch (cause) {
    logger.warn('tab query for injection failed', {
      message: cause instanceof Error ? cause.message : 'unknown',
    });
    return;
  }
  for (const tab of tabs) {
    if (typeof tab.id !== 'number') {
      continue;
    }
    try {
      await scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
      });
    } catch (cause) {
      logger.warn('content script inject into open tab failed', {
        tabId: tab.id,
        message: cause instanceof Error ? cause.message : 'unknown',
      });
    }
  }
}

export interface PermissionsApi {
  request(permissions: chrome.permissions.Permissions): Promise<boolean>;
  contains(permissions: chrome.permissions.Permissions): Promise<boolean>;
  remove(permissions: chrome.permissions.Permissions): Promise<boolean>;
}

/**
 * Persist platform enablement and register content scripts (ADR-035 / PART_15).
 * Host permission must already be granted from a user-gesture context (popup).
 * `permissionsApi.request` is only a fallback for tests / already-granted paths.
 */
export async function enablePlatform(
  storage: KvStorage,
  scripting: ScriptingApi,
  logger: Logger,
  platformId: string,
  permissionsApi?: PermissionsApi,
  tabsApi?: TabsApi,
): Promise<void> {
  const platform = getPlatform(platformId);
  if (!platform) {
    throw new Error(`Unknown platform: ${platformId}`);
  }
  if (permissionsApi) {
    const origins = [...platform.urlPatterns];
    const already = await permissionsApi.contains({ origins });
    if (!already) {
      const granted = await permissionsApi.request({ origins });
      if (!granted) {
        throw new Error(`Host permission denied for ${platformId}`);
      }
    }
  }
  const enabled = new Set(await listEnabledPlatforms(storage));
  enabled.add(platformId);
  await setEnabledPlatforms(storage, [...enabled]);
  await registerEnabledPlatforms(storage, scripting, logger, tabsApi);
}

export async function disablePlatform(
  storage: KvStorage,
  scripting: ScriptingApi,
  logger: Logger,
  platformId: string,
  tabsApi?: TabsApi,
): Promise<void> {
  const enabled = (await listEnabledPlatforms(storage)).filter((id) => id !== platformId);
  await setEnabledPlatforms(storage, enabled);
  await registerEnabledPlatforms(storage, scripting, logger, tabsApi);
}
