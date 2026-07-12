/**
 * Canonical numeric constants — DESIGN_OWNERSHIP_MATRIX §3 (D-CONST).
 * Owner document: SS-OWN-001 §3
 * Change requires ADR + Architecture Freeze amendment.
 */
export const MAX_CONCURRENT_SCANS = 3 as const;
export const MAX_QUEUE_DEPTH_PER_WORKER = 8 as const;
export const MAX_PENDING_SCANS_PER_TAB = 10 as const;
export const MAX_SCANS_PER_MIN_PER_TAB = 20 as const;
export const MAX_IPC_MSG_PER_MIN_PER_TAB = 30 as const;
export const SCAN_WALL_CLOCK_MS = 45_000 as const;
export const SCAN_MAX_BYTES = 262_144_000 as const;
export const MAX_DECODE_DEPTH = 3 as const;
export const MAX_FILE_BYTES = 52_428_800 as const;
/** Text scan / paste IPC cap — PART_13 / PART_17 (1 MiB). */
export const MAX_TEXT_SCAN_BYTES = 1_048_576 as const;
export const MAX_PDF_PAGES = 500 as const;
export const MAX_IMAGE_EDGE_PX = 4_000 as const;
export const OCR_P99_MS_1080P = 3_000 as const;
export const NER_P99_MS_512TOK = 150 as const;
export const SW_COLD_START_MS = 500 as const;
export const EXT_IDLE_MEM_MB = 50 as const;
export const EXT_PEAK_MEM_MB = 256 as const;
export const CRX_MAX_MB = 25 as const;
export const HISTORY_RETENTION_DAYS_DEFAULT = 30 as const;
export const HISTORY_DEFAULT_ENABLED = false as const;
export const ARGON2ID_M_KIB = 19_456 as const;
export const ARGON2ID_T = 2 as const;
export const ARGON2ID_P = 1 as const;
export const PBKDF2_ITERATIONS = 600_000 as const;
export const AES_GCM_IV_BYTES = 12 as const;
export const OFFSCREEN_IDLE_MS = 60_000 as const;
export const WORKER_IDLE_MS = 60_000 as const;
export const NER_DEFAULT_ENABLED = false as const;
export const CV_DEFAULT_ENABLED = false as const;
export const OCR_DEFAULT_ENABLED = true as const;
export const TELEMETRY_DEFAULT_ENABLED = false as const;
export const CLOUD_EXPLAIN_DEFAULT_ENABLED = false as const;
export const WASM_THREADS_DEFAULT = false as const;

/** Frozen AI-only host patterns (ADR-035 / PART_10). */
export const AI_HOST_PERMISSIONS = [
  '*://chat.openai.com/*',
  '*://chatgpt.com/*',
  '*://gemini.google.com/*',
  '*://claude.ai/*',
  '*://chat.deepseek.com/*',
  '*://perplexity.ai/*',
  '*://grok.com/*',
  '*://x.com/i/grok*',
  '*://copilot.microsoft.com/*',
  '*://github.com/copilot*',
  '*://cursor.sh/*',
] as const;

export type AiHostPermission = (typeof AI_HOST_PERMISSIONS)[number];

/**
 * MV3 `web_accessible_resources.matches` may only use origin + `/*`
 * (Chrome rejects any other path — e.g. `/i/grok*` or `/copilot*`).
 */
export function toWebAccessibleOriginPattern(matchPattern: string): string {
  const matched = /^(\*|https?):\/\/([^/]+)\//.exec(matchPattern);
  if (!matched) {
    throw new Error(`Invalid host match pattern: ${matchPattern}`);
  }
  return `${matched[1]}://${matched[2]}/*`;
}

export const AI_WAR_MATCHES = [
  ...new Set(AI_HOST_PERMISSIONS.map((p) => toWebAccessibleOriginPattern(p))),
] as const;
