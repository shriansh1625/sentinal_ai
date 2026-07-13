/**
 * Detection research library — detector specification model.
 * Metadata is for engineering review; runtime uses pattern + entropyPolicy only.
 */

import type { EntityType } from '@sentinel-shield/shared-types';

export type DetectorCategory =
  | 'pii'
  | 'payment'
  | 'cloud_aws'
  | 'cloud_azure'
  | 'cloud_gcp'
  | 'vcs'
  | 'ai_provider'
  | 'messaging'
  | 'payments_api'
  | 'database'
  | 'crypto_material'
  | 'auth_token'
  | 'ci_cd'
  | 'saas'
  | 'container'
  | 'iac'
  | 'email_sms'
  | 'other_secret';

export type DetectorSeverity = 'low' | 'medium' | 'high' | 'critical';

/** Entropy gate applied to the matched substring after regex hit. */
export type EntropyPolicy = 'none' | 'min_3_5' | 'min_4_0' | 'min_4_2' | 'min_4_5';

export interface DetectorSpec {
  /** Stable research id — never reuse for a different semantics. */
  readonly id: string;
  readonly name: string;
  readonly category: DetectorCategory;
  /** Maps into existing Tier-1 EntityType (freeze-compatible). */
  readonly entityType: EntityType;
  readonly severity: DetectorSeverity;
  /** ECMAScript regex source (no delimiters). */
  readonly pattern: string;
  readonly flags: string;
  /** Base confidence before checksum enrichment (0–1). */
  readonly confidence: number;
  /** Public docs, vendor prefix pages, or well-known scanner rule families. */
  readonly sourceRef: string;
  readonly regexJustification: string;
  readonly entropyPolicy: EntropyPolicy;
  readonly expectedFalsePositives: string;
  readonly expectedFalseNegatives: string;
  /** At least one synthetic positive that MUST match. */
  readonly positiveExamples: readonly string[];
  /** Optional strings that MUST NOT produce a hit for this detector alone. */
  readonly negativeExamples?: readonly string[];
}

export function entropyThreshold(policy: EntropyPolicy): number | null {
  switch (policy) {
    case 'none':
      return null;
    case 'min_3_5':
      return 3.5;
    case 'min_4_0':
      return 4.0;
    case 'min_4_2':
      return 4.2;
    case 'min_4_5':
      return 4.5;
    default: {
      const _never: never = policy;
      return _never;
    }
  }
}
