/**
 * Content script — PART_10 / PART_17.
 * Sprint 2: paste / file / drag-drop interception (hold until scan).
 */

import { createEnvelope } from '@sentinel-shield/browser-adapters';
import { MessageType } from '@sentinel-shield/shared-types';
import { createInterceptionController } from './input-pipelines/index.js';

const BOOT_FLAG = '__sentinelShieldContentBootstrapped' as const;

type BootGlobal = typeof globalThis & {
  [BOOT_FLAG]?: true;
};

export function notifyLifecycle(phase: 'init' | 'spa-nav' | 'teardown', tabId: number): void {
  const envelope = createEnvelope(MessageType.CS_LIFECYCLE, { phase, tabId }, tabId);
  void chrome.runtime.sendMessage(envelope);
}

export function initContentScript(): ReturnType<typeof createInterceptionController> | null {
  const g = globalThis as BootGlobal;
  if (g[BOOT_FLAG]) {
    return null;
  }
  g[BOOT_FLAG] = true;
  notifyLifecycle('init', -1);
  const controller = createInterceptionController();
  controller.start();
  return controller;
}

if (typeof chrome !== 'undefined' && typeof document !== 'undefined') {
  initContentScript();
}
