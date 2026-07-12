import { copyFileSync, mkdirSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

mkdirSync(dist, { recursive: true });
copyFileSync(join(root, 'manifest.json'), join(dist, 'manifest.json'));

const localesSrc = join(root, '_locales');
const localesDest = join(dist, '_locales');
if (existsSync(localesSrc)) {
  mkdirSync(join(localesDest, 'en'), { recursive: true });
  copyFileSync(join(localesSrc, 'en', 'messages.json'), join(localesDest, 'en', 'messages.json'));
}

const iconsSrc = join(root, 'public', 'icons');
const iconsDest = join(dist, 'public', 'icons');
if (existsSync(iconsSrc)) {
  mkdirSync(iconsDest, { recursive: true });
  for (const file of readdirSync(iconsSrc)) {
    copyFileSync(join(iconsSrc, file), join(iconsDest, file));
  }
}

const offscreenHtmlDestDir = join(dist, 'offscreen');
mkdirSync(offscreenHtmlDestDir, { recursive: true });
writeFileSync(
  join(offscreenHtmlDestDir, 'index.html'),
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

console.log('extension static assets copied to dist/');
