/**
 * Phase 9 — capture engineering screenshots for CWS/beta (KI-017).
 */
import { test, expect } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import http from 'node:http';
import type { AddressInfo } from 'node:net';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dist = path.join(root, 'packages/extension/dist');
const assets = path.join(root, 'store/assets');

function contentType(filePath: string): string {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.js')) return 'text/javascript; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.png')) return 'image/png';
  if (filePath.endsWith('.json')) return 'application/json';
  return 'application/octet-stream';
}

async function serveDist(): Promise<{ url: string; close: () => Promise<void> }> {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0] ?? '/');
    const rel = urlPath === '/' ? '/popup.html' : urlPath;
    const filePath = path.normalize(path.join(dist, rel));
    if (
      !filePath.startsWith(dist) ||
      !fs.existsSync(filePath) ||
      fs.statSync(filePath).isDirectory()
    ) {
      res.writeHead(404);
      res.end('not found');
      return;
    }
    res.writeHead(200, { 'content-type': contentType(filePath) });
    res.end(fs.readFileSync(filePath));
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()));
  const { port } = server.address() as AddressInfo;
  return {
    url: `http://127.0.0.1:${port}`,
    close: () =>
      new Promise((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      }),
  };
}

test.describe('Beta engineering screenshots', () => {
  test('capture popup and options PNGs', async ({ page }) => {
    test.skip(!fs.existsSync(path.join(dist, 'popup.html')), 'Run extension build first');
    fs.mkdirSync(assets, { recursive: true });
    const server = await serveDist();
    try {
      await page.setViewportSize({ width: 1280, height: 800 });

      await page.goto(`${server.url}/popup.html`);
      await page.waitForTimeout(400);
      const popupPath = path.join(assets, 'popup-en.png');
      await page.screenshot({ path: popupPath, fullPage: true });
      expect(fs.existsSync(popupPath)).toBe(true);
      expect(fs.statSync(popupPath).size).toBeGreaterThan(500);

      await page.goto(`${server.url}/options.html`);
      await page.waitForTimeout(400);
      const optionsPath = path.join(assets, 'options-en.png');
      await page.screenshot({ path: optionsPath, fullPage: true });
      expect(fs.existsSync(optionsPath)).toBe(true);
      expect(fs.statSync(optionsPath).size).toBeGreaterThan(500);
    } finally {
      await server.close();
    }
  });
});
