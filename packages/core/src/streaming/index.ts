/**
 * Streaming / chunk helpers — PART_23 / Sprint 8.
 */

import { SCAN_MAX_BYTES } from '@sentinel-shield/shared-types';

export function* chunkText(text: string, chunkSize = 64_000): Generator<string> {
  for (let i = 0; i < text.length; i += chunkSize) {
    yield text.slice(i, i + chunkSize);
  }
}

export function assertWithinScanBudget(byteLength: number): void {
  if (byteLength > SCAN_MAX_BYTES) {
    throw new Error(`Scan payload exceeds SCAN_MAX_BYTES (${SCAN_MAX_BYTES})`);
  }
}

export function estimateUtf8Bytes(text: string): number {
  return new TextEncoder().encode(text).byteLength;
}
