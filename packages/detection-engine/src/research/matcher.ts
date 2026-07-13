/**
 * Catalog-backed span finder — PART_13 Tier-1 runtime.
 */

import type { DetectionSpan } from '@sentinel-shield/shared-types';
import { shannonEntropy } from '../detectors/entropy.js';
import { PII_PAYMENT_DETECTORS } from './catalog/pii-payment.js';
import { CLOUD_DETECTORS } from './catalog/cloud.js';
import { VCS_CI_DETECTORS } from './catalog/vcs-ci.js';
import { AI_MESSAGING_PAY_DETECTORS } from './catalog/ai-messaging-pay.js';
import { DATA_CRYPTO_SAAS_DETECTORS } from './catalog/data-crypto-saas.js';
import { EXTRA_SECRET_DETECTORS } from './catalog/extra-secrets.js';
import { entropyThreshold, type DetectorSpec } from './types.js';

const DEFAULT_CATALOG: readonly DetectorSpec[] = [
  ...PII_PAYMENT_DETECTORS,
  ...CLOUD_DETECTORS,
  ...VCS_CI_DETECTORS,
  ...AI_MESSAGING_PAY_DETECTORS,
  ...DATA_CRYPTO_SAAS_DETECTORS,
  ...EXTRA_SECRET_DETECTORS,
];

function passesEntropy(matched: string, detector: DetectorSpec): boolean {
  const threshold = entropyThreshold(detector.entropyPolicy);
  if (threshold === null) return true;
  return shannonEntropy(matched) >= threshold;
}

/** Find all catalog regex spans (may overlap; merge happens in Tier-1). */
export function findCatalogSpans(
  text: string,
  catalog: readonly DetectorSpec[] = DEFAULT_CATALOG,
): DetectionSpan[] {
  const spans: DetectionSpan[] = [];
  for (const detector of catalog) {
    const re = new RegExp(detector.pattern, detector.flags);
    for (const match of text.matchAll(re)) {
      if (match.index === undefined) continue;
      const value = match[0];
      if (!passesEntropy(value, detector)) continue;
      spans.push({
        start: match.index,
        end: match.index + value.length,
        entityType: detector.entityType,
        confidence: detector.confidence,
      });
    }
  }
  return spans;
}
