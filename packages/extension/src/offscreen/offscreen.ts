/**
 * Offscreen document host — PART_10 §7 / PART_16.
 * Sprint 1: ready handshake only. Worker pool lands with OCR (Sprint 4).
 */

import { MessageType } from '@sentinel-shield/shared-types';

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (
    typeof message === 'object' &&
    message !== null &&
    'type' in message &&
    (message as { type: string }).type === MessageType.OFFSCREEN_PING
  ) {
    sendResponse({ ok: true, data: { host: 'offscreen', ready: true } });
    return true;
  }
  return false;
});

console.info('[sentinel-offscreen] ready');

import { WorkerPool } from './worker-pool.js';

const pool = new WorkerPool();

export function getWorkerPool(): WorkerPool {
  return pool;
}
