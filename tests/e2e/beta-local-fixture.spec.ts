/**
 * Phase 9 — local AI-compose fixture (G3 substitute for live ChatGPT in CI).
 * Validates paste path plumbing on a local page without contacting AI hosts.
 */
import { test, expect } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import http from 'node:http';
import type { AddressInfo } from 'node:net';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const fixturePath = path.join(root, 'tests/e2e/fixtures/ai-compose.html');

async function serveFile(filePath: string): Promise<{ url: string; close: () => Promise<void> }> {
  const html = fs.readFileSync(filePath);
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(html);
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()));
  const { port } = server.address() as AddressInfo;
  return {
    url: `http://127.0.0.1:${port}/`,
    close: () =>
      new Promise((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      }),
  };
}

test.describe('Beta local compose fixture', () => {
  test('fixture exposes paste/upload/drop targets for manual+auto smoke', async ({ page }) => {
    test.skip(!fs.existsSync(fixturePath), 'fixture missing');
    const server = await serveFile(fixturePath);
    try {
      await page.goto(server.url);
      await expect(page.locator('#composer')).toBeVisible();
      await expect(page.locator('#file-input')).toBeAttached();
      await expect(page.locator('#drop-zone')).toBeVisible();

      await page.locator('#composer').fill('contact me at beta@example.com');
      await page.locator('#composer').dispatchEvent('paste');
      await expect(page.locator('#event-log')).toContainText('paste');
    } finally {
      await server.close();
    }
  });
});
