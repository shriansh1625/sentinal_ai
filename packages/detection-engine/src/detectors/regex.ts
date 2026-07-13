/**
 * Regex detectors — PART_13 Tier-1.
 * Runtime is catalog-driven (detection research library).
 */

import type { DetectionSpan } from '@sentinel-shield/shared-types';
import { findCatalogSpans } from '../research/matcher.js';

export function findRegexSpans(text: string): DetectionSpan[] {
  return findCatalogSpans(text);
}
