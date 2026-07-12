/**
 * Entity knowledge base — PART_13 (static, local, no network).
 */

import { EntityType } from '@sentinel-shield/shared-types';

export interface EntityKnowledge {
  readonly entityType: EntityType;
  readonly label: string;
  readonly explanation: string;
  readonly defaultSeverity: 'low' | 'medium' | 'high' | 'critical';
}

export const ENTITY_KNOWLEDGE: readonly EntityKnowledge[] = [
  {
    entityType: EntityType.EMAIL,
    label: 'Email address',
    explanation: 'May identify a person or account.',
    defaultSeverity: 'low',
  },
  {
    entityType: EntityType.PHONE,
    label: 'Phone number',
    explanation: 'Contact number that can identify a person.',
    defaultSeverity: 'medium',
  },
  {
    entityType: EntityType.SSN,
    label: 'Social Security Number',
    explanation: 'Highly sensitive government identifier.',
    defaultSeverity: 'critical',
  },
  {
    entityType: EntityType.CREDIT_CARD,
    label: 'Payment card number',
    explanation: 'Financial credential; validated with Luhn when possible.',
    defaultSeverity: 'critical',
  },
  {
    entityType: EntityType.IBAN,
    label: 'IBAN',
    explanation: 'Bank account identifier; MOD-97 validated when possible.',
    defaultSeverity: 'high',
  },
  {
    entityType: EntityType.API_KEY,
    label: 'API key / secret token',
    explanation: 'Credential that can grant system access.',
    defaultSeverity: 'critical',
  },
  {
    entityType: EntityType.PASSWORD,
    label: 'Password',
    explanation: 'Authentication secret.',
    defaultSeverity: 'critical',
  },
  {
    entityType: EntityType.PERSON_NAME,
    label: 'Person name',
    explanation: 'Personal identity attribute.',
    defaultSeverity: 'low',
  },
  {
    entityType: EntityType.ADDRESS,
    label: 'Address',
    explanation: 'Physical location that may identify a person.',
    defaultSeverity: 'medium',
  },
  {
    entityType: EntityType.OTHER,
    label: 'Other sensitive data',
    explanation: 'Uncategorized sensitive pattern.',
    defaultSeverity: 'medium',
  },
];

export function getEntityKnowledge(type: EntityType): EntityKnowledge | undefined {
  return ENTITY_KNOWLEDGE.find((e) => e.entityType === type);
}
