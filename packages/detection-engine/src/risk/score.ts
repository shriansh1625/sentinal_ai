/**
 * Risk scoring — PART_18 (Tier-1 subset).
 */

import { EntityType, RiskLevel, type DetectionSpan } from '@sentinel-shield/shared-types';

const ENTITY_WEIGHT: Record<EntityType, number> = {
  [EntityType.EMAIL]: 1,
  [EntityType.PHONE]: 2,
  [EntityType.PERSON_NAME]: 1,
  [EntityType.ADDRESS]: 2,
  [EntityType.OTHER]: 1,
  [EntityType.SSN]: 5,
  [EntityType.CREDIT_CARD]: 5,
  [EntityType.IBAN]: 4,
  [EntityType.API_KEY]: 5,
  [EntityType.PASSWORD]: 5,
};

export function scoreRisk(spans: readonly DetectionSpan[]): RiskLevel {
  if (spans.length === 0) return RiskLevel.NONE;
  let score = 0;
  for (const span of spans) {
    score += ENTITY_WEIGHT[span.entityType] * span.confidence;
  }
  if (score >= 8) return RiskLevel.CRITICAL;
  if (score >= 5) return RiskLevel.HIGH;
  if (score >= 2.5) return RiskLevel.MEDIUM;
  if (score > 0) return RiskLevel.LOW;
  return RiskLevel.NONE;
}
