import { fileURLToPath } from 'node:url';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = fileURLToPath(new URL('../../packages/detection-engine', import.meta.url));
const FORBIDDEN = [
  /\bchrome\./,
  /\bfetch\s*\(/,
  /\bXMLHttpRequest\b/,
  /\bWebSocket\b/,
  /\bindexedDB\b/,
  /\blocalStorage\b/,
  /from\s+['"]@sentinel-shield\/(browser-adapters|extension|core)['"]/,
];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === 'dist' || entry === 'node_modules') continue;
      walk(full, out);
    } else if (entry.endsWith('.ts') || entry.endsWith('.js') || entry.endsWith('.mjs')) {
      out.push(full);
    }
  }
  return out;
}

const files = walk(ROOT);
let violations = 0;

for (const file of files) {
  if (file.endsWith('.test.ts')) continue;
  const source = readFileSync(file, 'utf8');
  for (const pattern of FORBIDDEN) {
    if (pattern.test(source)) {
      console.error(`PURITY VIOLATION ${relative(process.cwd(), file)} :: ${pattern}`);
      violations += 1;
    }
  }
}

if (violations > 0) {
  console.error(`engine-purity: ${violations} violation(s)`);
  process.exit(1);
}

console.log(`engine-purity: ok (${files.length} files scanned)`);
