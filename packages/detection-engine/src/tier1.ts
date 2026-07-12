/**
 * Tier-1 engine implementation — PART_13 + PART_20 adversarial preprocess.
 */

import type { DetectionSpan, ScanResult } from '@sentinel-shield/shared-types';
import { PolicyAction, RiskLevel, MAX_TEXT_SCAN_BYTES } from '@sentinel-shield/shared-types';
import { findRegexSpans } from './detectors/regex.js';
import { findEntropySpans } from './detectors/entropy.js';
import { enrichWithChecksums } from './checksum/index.js';
import { scoreRisk } from './risk/score.js';
import { decideAction } from './policy/decide.js';
import { prepareForDetection } from './preprocess/normalize.js';
import { collectBase64Spans } from './preprocess/base64.js';

export interface TextScanInput {
  readonly requestId: string;
  readonly text: string;
  readonly tabId?: number;
}

export interface DetectionEngine {
  scanText(input: TextScanInput): ScanResult;
}

function utf8ByteLength(text: string): number {
  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder().encode(text).byteLength;
  }
  return text.length;
}

function scanPreparedLayer(prepared: string): DetectionSpan[] {
  const regexSpans = findRegexSpans(prepared);
  const entropySpans = findEntropySpans(prepared);
  return mergeSpans([...regexSpans, ...entropySpans]);
}

export class Tier1DetectionEngine implements DetectionEngine {
  scanText(input: TextScanInput): ScanResult {
    const started = performance.now();
    // NFR-PERF / MAX_TEXT_SCAN_BYTES — fail closed; never scan unbounded text (ISVV-BUG-001).
    if (utf8ByteLength(input.text) > MAX_TEXT_SCAN_BYTES) {
      return {
        requestId: input.requestId,
        riskLevel: RiskLevel.HIGH,
        action: PolicyAction.BLOCK,
        spans: [],
        durationMs: performance.now() - started,
      };
    }
    const prepared = prepareForDetection(input.text);
    const direct = scanPreparedLayer(prepared);
    const fromBase64 = collectBase64Spans(prepared, (decoded) =>
      scanPreparedLayer(prepareForDetection(decoded)),
    );
    const merged = mergeSpans([...direct, ...fromBase64]);
    const validated = enrichWithChecksums(prepared, merged);
    const riskLevel = scoreRisk(validated);
    const action = decideAction(riskLevel);
    return {
      requestId: input.requestId,
      riskLevel,
      action,
      spans: validated,
      durationMs: performance.now() - started,
    };
  }
}

export function createDetectionEngine(): DetectionEngine {
  return new Tier1DetectionEngine();
}

function mergeSpans(spans: DetectionSpan[]): DetectionSpan[] {
  const sorted = [...spans].sort((a, b) => a.start - b.start || b.end - a.end);
  const out: DetectionSpan[] = [];
  for (const span of sorted) {
    const prev = out[out.length - 1];
    if (prev && span.start < prev.end && span.entityType === prev.entityType) {
      out[out.length - 1] = {
        start: prev.start,
        end: Math.max(prev.end, span.end),
        entityType: prev.entityType,
        confidence: Math.max(prev.confidence, span.confidence),
      };
      continue;
    }
    out.push(span);
  }
  return out;
}
