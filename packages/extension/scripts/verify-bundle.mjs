import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const required = [
  'manifest.json',
  'background.js',
  'content.js',
  'offscreen.js',
  'offscreen.html',
  'popup.js',
  'popup.html',
  'options.js',
  'options.html',
];

function collectJsFiles(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectJsFiles(full));
    else if (entry.name.endsWith('.js')) out.push(full);
  }
  return out;
}

let failed = false;
for (const name of required) {
  const path = join(dist, name);
  if (!existsSync(path)) {
    console.error(`missing ${name}`);
    failed = true;
  }
}

const entryBundles = new Set([
  'background.js',
  'content.js',
  'offscreen.js',
  'popup.js',
  'options.js',
]);

for (const file of collectJsFiles(dist)) {
  const rel = relative(dist, file).replaceAll('\\', '/');
  const source = readFileSync(file, 'utf8');
  if (entryBundles.has(rel) && source.includes('@sentinel-shield/')) {
    console.error(`bare workspace import in ${rel}`);
    failed = true;
  }
  if (
    source.includes('axe-core') ||
    /\/\*!\s*axe/i.test(source) ||
    /(^|\/)axe-[^/]+\.js$/i.test(rel)
  ) {
    console.error(`axe-core must not ship in extension bundle: ${rel}`);
    failed = true;
  }
}

const manifest = JSON.parse(readFileSync(join(dist, 'manifest.json'), 'utf8'));
if (manifest.background?.service_worker !== 'background.js') {
  console.error('manifest service_worker must be background.js');
  failed = true;
}
if (manifest.action?.default_popup !== 'popup.html') {
  console.error('manifest default_popup missing');
  failed = true;
}
if (manifest.options_page !== 'options.html') {
  console.error('manifest options_page missing');
  failed = true;
}
if (manifest.name !== '__MSG_extensionName__') {
  console.error('manifest name must use __MSG_extensionName__');
  failed = true;
}
if (manifest.description !== '__MSG_extensionDescription__') {
  console.error('manifest description must use __MSG_extensionDescription__');
  failed = true;
}
if (manifest.default_locale !== 'en') {
  console.error('manifest default_locale must be en');
  failed = true;
}
if (!existsSync(join(dist, '_locales', 'en', 'messages.json'))) {
  console.error('dist missing _locales/en/messages.json');
  failed = true;
}

const storeRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'store');
for (const name of [
  'CWS_LISTING.md',
  'PERMISSIONS_JUSTIFICATION.md',
  'PRIVACY_PRACTICES.md',
  'CWS_PACKAGE_ATTESTATION.md',
  'CWS_PRIVACY_DISCLOSURE.json',
  'BETA_CHECKLIST.md',
  'PRODUCTION_CERTIFICATION.md',
  'CERTIFICATION_STATUS.json',
]) {
  if (!existsSync(join(storeRoot, name))) {
    console.error(`store missing ${name}`);
    failed = true;
  }
}

console.log(`verify-bundle: scanned ${readdirSync(dist).length} top-level dist entries`);
if (failed) process.exit(1);
console.log('verify-bundle: ok (F-001 loadable package shape + CWS i18n/store)');
