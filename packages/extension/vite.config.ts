import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const root = dirname(fileURLToPath(import.meta.url));

/**
 * MV3 loadable package root = packages/extension/dist
 * All workspace deps must be bundled (F-001).
 */
export default defineConfig({
  root,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
    target: 'chrome120',
    modulePreload: false,
    rollupOptions: {
      input: {
        background: resolve(root, 'src/background.ts'),
        content: resolve(root, 'src/content.ts'),
        offscreen: resolve(root, 'src/offscreen/offscreen.ts'),
        popup: resolve(root, 'src/ui/popup-main.ts'),
        options: resolve(root, 'src/ui/options-main.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name][extname]',
        format: 'es',
      },
    },
  },
  plugins: [
    {
      name: 'sentinel-extension-package',
      closeBundle() {
        const dist = resolve(root, 'dist');
        mkdirSync(dist, { recursive: true });

        const manifest = JSON.parse(readFileSync(resolve(root, 'manifest.json'), 'utf8')) as Record<
          string,
          unknown
        >;
        writeFileSync(resolve(dist, 'manifest.json'), JSON.stringify(manifest, null, 2));

        const localesSrc = resolve(root, '_locales');
        if (existsSync(localesSrc)) {
          cpSync(localesSrc, resolve(dist, '_locales'), { recursive: true });
        }

        const iconsSrc = resolve(root, 'public');
        if (existsSync(iconsSrc)) {
          cpSync(iconsSrc, resolve(dist, 'public'), { recursive: true });
        }

        writeFileSync(
          resolve(dist, 'offscreen.html'),
          `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Sentinel Shield Offscreen</title>
    <script type="module" src="./offscreen.js"></script>
  </head>
  <body></body>
</html>
`,
        );

        writeFileSync(
          resolve(dist, 'popup.html'),
          `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Sentinel Shield</title>
    <script type="module" src="./popup.js"></script>
  </head>
  <body>
    <sentinel-popup></sentinel-popup>
  </body>
</html>
`,
        );

        writeFileSync(
          resolve(dist, 'options.html'),
          `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Sentinel Shield Options</title>
    <script type="module" src="./options.js"></script>
  </head>
  <body>
    <sentinel-options></sentinel-options>
  </body>
</html>
`,
        );

        // Ensure no bare workspace imports remain in entry bundles
        for (const name of [
          'background.js',
          'content.js',
          'offscreen.js',
          'popup.js',
          'options.js',
        ]) {
          const file = resolve(dist, name);
          if (!existsSync(file)) continue;
          const source = readFileSync(file, 'utf8');
          if (source.includes('@sentinel-shield/')) {
            throw new Error(`F-001 regression: ${name} still contains @sentinel-shield/ imports`);
          }
        }

        copyFileSync(resolve(root, 'manifest.json'), resolve(dist, 'manifest.json'));
      },
    },
  ],
});
