/**
 * Feature flag framework — reads typed flags; defaults fail closed for risky features.
 * Owner: PART_21 / ADR-032 / ADR-037.
 */

import type { FeatureFlags } from '@sentinel-shield/shared-types';
import type { ConfigurationService } from '../config/index.js';

export type FeatureFlagKey = keyof FeatureFlags;

export class FeatureFlagService {
  constructor(private readonly config: ConfigurationService) {}

  isEnabled(flag: FeatureFlagKey): boolean {
    return this.config.getFeatureFlags()[flag];
  }

  snapshot(): FeatureFlags {
    return this.config.getFeatureFlags();
  }
}
