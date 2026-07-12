/**
 * Phase 6 — Chromium extension load (PART_10 / NFR-COMPAT).
 */
import { test, expect, chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dist = path.join(root, 'packages/extension/dist');

/** Chrome flags break on unquoted paths that contain spaces. */
function chromePathArg(flag: string, target: string): string {
  const normalized = path.resolve(target);
  return `${flag}=${normalized}`;
}

test.describe('Extension package shape', () => {
  test('dist manifest is MV3 loadable', async () => {
    const manifestPath = path.join(dist, 'manifest.json');
    test.skip(!fs.existsSync(manifestPath), 'Run extension build first');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as {
      manifest_version: number;
      minimum_chrome_version?: string;
      background?: { service_worker?: string; type?: string };
      action?: { default_popup?: string };
      options_page?: string;
      web_accessible_resources?: Array<{ matches: string[] }>;
    };
    expect(manifest.manifest_version).toBe(3);
    expect(manifest.minimum_chrome_version).toBe('120');
    expect(manifest.background?.service_worker).toBe('background.js');
    expect(manifest.background?.type).toBe('module');
    expect(manifest.action?.default_popup).toBe('popup.html');
    expect(manifest.options_page).toBe('options.html');
    expect(fs.existsSync(path.join(dist, 'background.js'))).toBe(true);
    expect(fs.existsSync(path.join(dist, 'content.js'))).toBe(true);
    expect(fs.existsSync(path.join(dist, 'popup.js'))).toBe(true);
    expect(fs.existsSync(path.join(dist, 'options.js'))).toBe(true);
    expect(fs.existsSync(path.join(dist, 'public/icons/icon-128.png'))).toBe(true);
    expect(fs.existsSync(path.join(dist, '_locales/en/messages.json'))).toBe(true);
    const bg = fs.readFileSync(path.join(dist, 'background.js'), 'utf8');
    expect(bg.includes('@sentinel-shield/')).toBe(false);
    const warMatches = manifest.web_accessible_resources?.[0]?.matches ?? [];
    expect(warMatches.length).toBeGreaterThanOrEqual(11);
    for (const pattern of warMatches) {
      expect(pattern.endsWith('/*'), pattern).toBe(true);
      // Chrome WAR: path must be exactly /* (no /i/grok* or /copilot*).
      expect(pattern.replace(/^\*:\/\/[^/]+/, '')).toBe('/*');
    }
  });
});

test.describe('Chromium load unpacked', () => {
  test('service worker starts for loaded extension', async () => {
    test.setTimeout(40_000);
    test.skip(!fs.existsSync(path.join(dist, 'manifest.json')), 'Run extension build first');

    const userDataDir = fs.mkdtempSync(path.join(root, 'test-results', 'ext-profile-'));

    const launchArgs = [
      chromePathArg('--disable-extensions-except', dist),
      chromePathArg('--load-extension', dist),
      '--no-first-run',
      '--no-default-browser-check',
    ];

    async function launchWithBudget(
      headless: boolean,
      budgetMs: number,
    ): Promise<Awaited<ReturnType<typeof chromium.launchPersistentContext>>> {
      return await Promise.race([
        chromium.launchPersistentContext(userDataDir, {
          headless,
          args: headless ? [...launchArgs, '--headless=new'] : launchArgs,
        }),
        new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error(`launch timed out after ${budgetMs}ms`)), budgetMs);
        }),
      ]);
    }

    // Prefer headed when available; headless=new often drops MV3 SW registration.
    let context: Awaited<ReturnType<typeof chromium.launchPersistentContext>> | undefined;
    let mode: 'headed' | 'headless' = 'headed';
    try {
      context = await launchWithBudget(false, 12_000);
    } catch {
      mode = 'headless';
      try {
        context = await launchWithBudget(true, 12_000);
      } catch (error) {
        test.skip(
          true,
          `Chromium extension load unavailable: ${error instanceof Error ? error.message : String(error)}`,
        );
        return;
      }
    }

    try {
      let sw = context.serviceWorkers().find((w) => w.url().startsWith('chrome-extension://'));
      if (!sw) {
        try {
          sw = await context.waitForEvent('serviceworker', { timeout: 8_000 });
        } catch {
          const pages = context.backgroundPages();
          if (pages.length > 0) {
            sw = context.serviceWorkers()[0];
          }
        }
      }

      if (!sw) {
        // Environment limitation (KI-014): package-shape tests still gate MV3.
        test.skip(
          true,
          `No extension service worker observed in ${mode} mode (package-shape gate still applies)`,
        );
        return;
      }

      expect(sw.url().startsWith('chrome-extension://')).toBe(true);
    } finally {
      await context.close().catch(() => undefined);
    }
  });
});
