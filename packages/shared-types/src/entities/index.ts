/** Entity and risk enums — PART_04 / PART_13 (types only in Sprint 0). */

export const EntityType = {
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
  SSN: 'SSN',
  CREDIT_CARD: 'CREDIT_CARD',
  IBAN: 'IBAN',
  API_KEY: 'API_KEY',
  PASSWORD: 'PASSWORD',
  PERSON_NAME: 'PERSON_NAME',
  ADDRESS: 'ADDRESS',
  OTHER: 'OTHER',
} as const;

export type EntityType = (typeof EntityType)[keyof typeof EntityType];

export const RiskLevel = {
  NONE: 'NONE',
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
} as const;

export type RiskLevel = (typeof RiskLevel)[keyof typeof RiskLevel];

export const PolicyAction = {
  ALLOW: 'ALLOW',
  WARN: 'WARN',
  BLOCK: 'BLOCK',
  REDACT: 'REDACT',
} as const;

export type PolicyAction = (typeof PolicyAction)[keyof typeof PolicyAction];
