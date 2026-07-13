/**
 * Hex decode + rescan candidates — PART_20 encoding layer (RT-HEX).
 * Parallel to Base64 path; depth-bounded.
 */

import { MAX_DECODE_DEPTH, EntityType, type DetectionSpan } from '@sentinel-shield/shared-types';

const HEX_CANDIDATE_RE = /(?:^|[^0-9a-fA-F])([0-9a-fA-F]{24,})(?![0-9a-fA-F])/g;

function tryDecodeHex(candidate: string): string | undefined {
  if (candidate.length % 2 === 1) return undefined;
  try {
    const bytes = new Uint8Array(candidate.length / 2);
    for (let i = 0; i < bytes.length; i += 1) {
      bytes[i] = Number.parseInt(candidate.slice(i * 2, i * 2 + 2), 16);
    }
    let printable = 0;
    let out = '';
    for (const code of bytes) {
      if (code === 9 || code === 10 || code === 13 || (code >= 32 && code < 127)) {
        printable += 1;
        out += String.fromCharCode(code);
      } else {
        return undefined;
      }
    }
    if (out.length === 0 || printable / bytes.length < 0.9) return undefined;
    return out;
  } catch {
    return undefined;
  }
}

export function collectHexSpans(
  text: string,
  scanDecoded: (decoded: string) => readonly DetectionSpan[],
  depth = 0,
): DetectionSpan[] {
  if (depth >= MAX_DECODE_DEPTH) return [];
  const spans: DetectionSpan[] = [];
  for (const match of text.matchAll(HEX_CANDIDATE_RE)) {
    const token = match[1];
    if (!token || match.index === undefined) continue;
    const tokenStart = match.index + (match[0].length - token.length);
    const decoded = tryDecodeHex(token);
    if (!decoded) continue;
    const inner = scanDecoded(decoded);
    const nested = collectHexSpans(decoded, scanDecoded, depth + 1);
    if (inner.length > 0 || nested.length > 0) {
      spans.push({
        start: tokenStart,
        end: tokenStart + token.length,
        entityType: EntityType.API_KEY,
        confidence: 0.86,
      });
    }
  }
  return spans;
}
