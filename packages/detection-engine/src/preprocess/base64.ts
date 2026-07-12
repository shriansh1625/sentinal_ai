/**
 * Base64 decode + rescan candidates — PART_20 §1.3.
 * Respects MAX_DECODE_DEPTH (Ownership Matrix §3).
 */

import { MAX_DECODE_DEPTH, EntityType, type DetectionSpan } from '@sentinel-shield/shared-types';

const BASE64_CANDIDATE_RE = /(?:^|[^A-Za-z0-9+/])([A-Za-z0-9+/]{20,}={0,2})(?![A-Za-z0-9+/])/g;

function tryDecodeBase64(candidate: string): string | undefined {
  if (candidate.length % 4 === 1) return undefined;
  try {
    const normalized =
      candidate.length % 4 === 0 ? candidate : candidate + '='.repeat(4 - (candidate.length % 4));
    const binary = atob(normalized);
    // Prefer UTF-8-ish printable
    let printable = 0;
    for (let i = 0; i < binary.length; i += 1) {
      const code = binary.charCodeAt(i);
      if (code === 9 || code === 10 || code === 13 || (code >= 32 && code < 127)) {
        printable += 1;
      }
    }
    if (binary.length === 0 || printable / binary.length < 0.85) return undefined;
    return binary;
  } catch {
    return undefined;
  }
}

export interface Base64Hit {
  readonly start: number;
  readonly end: number;
  readonly decoded: string;
}

export function findBase64Candidates(text: string): readonly Base64Hit[] {
  const hits: Base64Hit[] = [];
  for (const match of text.matchAll(BASE64_CANDIDATE_RE)) {
    const token = match[1];
    if (!token || match.index === undefined) continue;
    const tokenStart = match.index + (match[0].length - token.length);
    const decoded = tryDecodeBase64(token);
    if (!decoded) continue;
    hits.push({ start: tokenStart, end: tokenStart + token.length, decoded });
  }
  return hits;
}

/**
 * Recursively collect spans from a decoder callback, attributing hits to outer Base64 ranges.
 */
export function collectBase64Spans(
  text: string,
  scanDecoded: (decoded: string) => readonly DetectionSpan[],
  depth = 0,
): DetectionSpan[] {
  if (depth >= MAX_DECODE_DEPTH) return [];
  const spans: DetectionSpan[] = [];
  for (const hit of findBase64Candidates(text)) {
    const inner = scanDecoded(hit.decoded);
    const nested = collectBase64Spans(hit.decoded, scanDecoded, depth + 1);
    if (inner.length > 0 || nested.length > 0) {
      spans.push({
        start: hit.start,
        end: hit.end,
        entityType: EntityType.API_KEY,
        confidence: 0.88,
      });
    }
  }
  return spans;
}
