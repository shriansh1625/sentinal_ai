/**
 * Detection research catalog — aggregate + integrity helpers.
 */

import { PII_PAYMENT_DETECTORS } from './catalog/pii-payment.js';
import { CLOUD_DETECTORS } from './catalog/cloud.js';
import { VCS_CI_DETECTORS } from './catalog/vcs-ci.js';
import { AI_MESSAGING_PAY_DETECTORS } from './catalog/ai-messaging-pay.js';
import { DATA_CRYPTO_SAAS_DETECTORS } from './catalog/data-crypto-saas.js';
import { EXTRA_SECRET_DETECTORS } from './catalog/extra-secrets.js';
import type { DetectorSpec } from './types.js';

export const DETECTOR_CATALOG: readonly DetectorSpec[] = [
  ...PII_PAYMENT_DETECTORS,
  ...CLOUD_DETECTORS,
  ...VCS_CI_DETECTORS,
  ...AI_MESSAGING_PAY_DETECTORS,
  ...DATA_CRYPTO_SAAS_DETECTORS,
  ...EXTRA_SECRET_DETECTORS,
];

export function getDetectorById(id: string): DetectorSpec | undefined {
  return DETECTOR_CATALOG.find((d) => d.id === id);
}

export function assertCatalogIntegrity(catalog: readonly DetectorSpec[] = DETECTOR_CATALOG): void {
  const ids = new Set<string>();
  for (const detector of catalog) {
    if (ids.has(detector.id)) {
      throw new Error(`Duplicate detector id: ${detector.id}`);
    }
    ids.add(detector.id);
    if (detector.positiveExamples.length < 1) {
      throw new Error(`Detector ${detector.id} missing positiveExamples`);
    }
    if (detector.confidence < 0 || detector.confidence > 1) {
      throw new Error(`Detector ${detector.id} confidence out of range`);
    }
    // Compile check
    void new RegExp(detector.pattern, detector.flags);
  }
}

export {
  type DetectorSpec,
  type DetectorCategory,
  type DetectorSeverity,
  type EntropyPolicy,
  entropyThreshold,
} from './types.js';
