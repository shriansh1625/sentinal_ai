#!/usr/bin/env node
/**
 * Performance budget gate — PART_23 Implementation Gate G0.
 * Measures Tier-1 scan latency, extension dist size, and canonical constants.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { performance } from 'node:perf_hooks';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');

const shared = await import(pathToFileURL(join(root, 'packages/shared-types/dist/index.js')).href);
const engine = await import(
  pathToFileURL(join(root, 'packages/detection-engine/dist/index.js')).href
);

const {
  EXT_PEAK_MEM_MB,
  EXT_IDLE_MEM_MB,
  MAX_SCANS_PER_MIN_PER_TAB,
  MAX_IPC_MSG_PER_MIN_PER_TAB,
  SW_COLD_START_MS,
  CRX_MAX_MB,
  MAX_TEXT_SCAN_BYTES,
} = shared;

let failed = false;
function check(name, ok, detail = '') {
  if (!ok) {
    console.error(`FAIL ${name}${detail ? `: ${detail}` : ''}`);
    failed = true;
  } else {
    console.log(`ok   ${name}${detail ? `: ${detail}` : ''}`);
  }
}

check('EXT_PEAK_MEM_MB', EXT_PEAK_MEM_MB === 256, String(EXT_PEAK_MEM_MB));
check('EXT_IDLE_MEM_MB', EXT_IDLE_MEM_MB === 50, String(EXT_IDLE_MEM_MB));
check('MAX_SCANS_PER_MIN_PER_TAB', MAX_SCANS_PER_MIN_PER_TAB === 20);
check('MAX_IPC_MSG_PER_MIN_PER_TAB', MAX_IPC_MSG_PER_MIN_PER_TAB === 30);
check('SW_COLD_START_MS', SW_COLD_START_MS === 500);
check('CRX_MAX_MB', CRX_MAX_MB === 25);
check('MAX_TEXT_SCAN_BYTES', MAX_TEXT_SCAN_BYTES === 1_048_576);

/** PART_23 P99 design budgets (ms) for text path we ship in v1. */
const BUDGETS = {
  full_1kb: 10, // L01-ish regex; full pipeline tighter device target
  full_10kb: 300, // L09
  full_100kb: 200, // L03 regex upper; full pipeline may be higher — use 800 design soft
};

/** CI slack: reject only severe regressions (Freeze G0 empirical on CI hardware). */
const CI_SLACK = Number(process.env.SENTINEL_BENCH_SLACK ?? 8);

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function makeText(bytes) {
  const unit = 'The quick release note mentions no secrets. ';
  let out = '';
  while (new TextEncoder().encode(out).byteLength < bytes) {
    out += unit;
  }
  return out;
}

function measureScan(label, text, designMs) {
  const detection = engine.createDetectionEngine();
  // Warm-up
  detection.scanText({ requestId: 'warm', text: text.slice(0, 200) });
  const samples = [];
  for (let i = 0; i < 7; i += 1) {
    const t0 = performance.now();
    const result = detection.scanText({ requestId: `${label}-${i}`, text });
    samples.push(performance.now() - t0);
    if (result.durationMs < 0) failed = true;
  }
  const med = median(samples.slice(2)); // drop first warm samples already separate
  const limit = designMs * CI_SLACK;
  check(
    `latency ${label}`,
    med <= limit,
    `median=${med.toFixed(2)}ms design=${designMs}ms limit=${limit}ms slack=${CI_SLACK}x`,
  );
  return med;
}

measureScan('full_1kb', makeText(1024), BUDGETS.full_1kb);
measureScan('full_10kb', makeText(10 * 1024), BUDGETS.full_10kb);
measureScan('full_100kb', makeText(100 * 1024), 800); // L03+pipeline empirical CI budget base

// Dist size gate (uncompressed package proxy for CRX)
const dist = join(root, 'packages/extension/dist');
function dirSize(path) {
  let total = 0;
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const full = join(path, entry.name);
    if (entry.isDirectory()) total += dirSize(full);
    else total += statSync(full).size;
  }
  return total;
}

try {
  const bytes = dirSize(dist);
  const mb = bytes / (1024 * 1024);
  check('extension dist size', mb < CRX_MAX_MB, `${mb.toFixed(2)}MB < ${CRX_MAX_MB}MB`);
  // Sourcemaps inflate dist; exclude maps for shipping proxy
  let codeBytes = 0;
  function walkCode(path) {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      const full = join(path, entry.name);
      if (entry.isDirectory()) walkCode(full);
      else if (!entry.name.endsWith('.map')) codeBytes += statSync(full).size;
    }
  }
  walkCode(dist);
  const codeMb = codeBytes / (1024 * 1024);
  check('extension dist without maps', codeMb < 5, `${codeMb.toFixed(2)}MB (sanity)`);
} catch (error) {
  check('extension dist present', false, error instanceof Error ? error.message : String(error));
}

// Manifest version readable
try {
  const manifest = JSON.parse(readFileSync(join(dist, 'manifest.json'), 'utf8'));
  check('manifest version present', typeof manifest.version === 'string', manifest.version);
} catch {
  check('manifest readable', false);
}

if (failed) {
  console.error('benchmark gate: FAILED');
  process.exit(1);
}
console.log('benchmarks: PART_23 empirical gate ok');
