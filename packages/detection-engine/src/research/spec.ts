/**
 * Compact DetectorSpec builder — forces required research fields.
 */

import { EntityType } from '@sentinel-shield/shared-types';
import type { DetectorSpec, DetectorCategory, DetectorSeverity, EntropyPolicy } from './types.js';

export function spec(input: {
  id: string;
  name: string;
  category: DetectorCategory;
  entityType?: EntityType;
  severity: DetectorSeverity;
  pattern: string;
  flags?: string;
  confidence: number;
  sourceRef: string;
  regexJustification: string;
  entropyPolicy?: EntropyPolicy;
  expectedFalsePositives: string;
  expectedFalseNegatives: string;
  positiveExamples: readonly string[];
  negativeExamples?: readonly string[];
}): DetectorSpec {
  return {
    id: input.id,
    name: input.name,
    category: input.category,
    entityType: input.entityType ?? EntityType.API_KEY,
    severity: input.severity,
    pattern: input.pattern,
    flags: input.flags ?? 'g',
    confidence: input.confidence,
    sourceRef: input.sourceRef,
    regexJustification: input.regexJustification,
    entropyPolicy: input.entropyPolicy ?? 'none',
    expectedFalsePositives: input.expectedFalsePositives,
    expectedFalseNegatives: input.expectedFalseNegatives,
    positiveExamples: input.positiveExamples,
    ...(input.negativeExamples ? { negativeExamples: input.negativeExamples } : {}),
  };
}
