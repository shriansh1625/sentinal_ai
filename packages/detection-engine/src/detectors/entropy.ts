/**
 * Shannon entropy secret heuristic — PART_13.
 */

import { EntityType, type DetectionSpan } from '@sentinel-shield/shared-types';

const TOKEN_RE = /[A-Za-z0-9/+=_-]{20,}/g;
const ENTROPY_THRESHOLD = 4.2;

export function shannonEntropy(value: string): number {
  if (value.length === 0) return 0;
  const freq = new Map<string, number>();
  for (const ch of value) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }
  let entropy = 0;
  for (const count of freq.values()) {
    const p = count / value.length;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}

export function findEntropySpans(text: string): DetectionSpan[] {
  const spans: DetectionSpan[] = [];
  for (const match of text.matchAll(TOKEN_RE)) {
    if (match.index === undefined) continue;
    const token = match[0];
    const entropy = shannonEntropy(token);
    if (entropy >= ENTROPY_THRESHOLD) {
      spans.push({
        start: match.index,
        end: match.index + token.length,
        entityType: EntityType.API_KEY,
        confidence: Math.min(0.95, 0.55 + (entropy - ENTROPY_THRESHOLD) * 0.1),
      });
    }
  }
  return spans;
}
