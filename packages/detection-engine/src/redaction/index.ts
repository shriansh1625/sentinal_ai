/**
 * Redaction engine — PART_18 (Sprint 6 core; usable after Tier-1 spans exist).
 * Pure string redaction; no DOM.
 */

import type { DetectionSpan } from '@sentinel-shield/shared-types';
import { EntityType } from '@sentinel-shield/shared-types';

const MASK: Record<EntityType, string> = {
  [EntityType.EMAIL]: '[REDACTED_EMAIL]',
  [EntityType.PHONE]: '[REDACTED_PHONE]',
  [EntityType.SSN]: '[REDACTED_SSN]',
  [EntityType.CREDIT_CARD]: '[REDACTED_CARD]',
  [EntityType.IBAN]: '[REDACTED_IBAN]',
  [EntityType.API_KEY]: '[REDACTED_SECRET]',
  [EntityType.PASSWORD]: '[REDACTED_PASSWORD]',
  [EntityType.PERSON_NAME]: '[REDACTED_NAME]',
  [EntityType.ADDRESS]: '[REDACTED_ADDRESS]',
  [EntityType.OTHER]: '[REDACTED]',
};

export interface RedactionResult {
  readonly redactedText: string;
  readonly replacements: number;
  readonly preview: string;
}

export function redactText(text: string, spans: readonly DetectionSpan[]): RedactionResult {
  const ordered = [...spans].sort((a, b) => b.start - a.start);
  let output = text;
  let replacements = 0;
  for (const span of ordered) {
    const token = MASK[span.entityType] ?? '[REDACTED]';
    output = output.slice(0, span.start) + token + output.slice(span.end);
    replacements += 1;
  }
  const preview = output.length > 280 ? `${output.slice(0, 277)}...` : output;
  return { redactedText: output, replacements, preview };
}

export function buildSafePreview(text: string, spans: readonly DetectionSpan[]): string {
  return redactText(text, spans).preview;
}
