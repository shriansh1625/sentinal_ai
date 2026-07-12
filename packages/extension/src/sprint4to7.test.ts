import { describe, expect, it } from 'vitest';
import { renderPopupHtml } from './ui/popup-view.js';
import { WorkerPool } from './offscreen/worker-pool.js';

describe('Sprint 7 popup view', () => {
  it('renders brand-first popup without React', () => {
    const html = renderPopupHtml({
      title: 'Sentinel Shield AI',
      version: '0.2.0',
      safeMode: false,
      telemetryEnabled: false,
      historyEnabled: false,
      enabledPlatformCount: 0,
    });
    expect(html.includes('Sentinel Shield')).toBe(true);
    expect(html.includes('react')).toBe(false);
    expect(html.includes('sentinel-popup') || html.includes('Sentinel Shield')).toBe(true);
  });
});

describe('Sprint 4 worker pool', () => {
  it('dispatches stub jobs fail-closed without OCR WASM', async () => {
    const pool = new WorkerPool();
    const result = await pool.dispatch({
      type: 'ocr',
      requestId: 'j1',
      payload: new ArrayBuffer(8),
    });
    expect(result.ok).toBe(false);
    expect(result.error?.includes('WASM')).toBe(true);
    expect(result.text).toBe('');
    expect(pool.size()).toBe(1);
  });
});
