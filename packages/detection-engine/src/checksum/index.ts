/**
 * Checksum validators — PART_13 / PART_19 (validation only, no crypto I/O).
 */

import { EntityType, type DetectionSpan } from '@sentinel-shield/shared-types';

export function luhnValid(digits: string): boolean {
  const cleaned = digits.replace(/\D/g, '');
  if (cleaned.length < 13 || cleaned.length > 19) return false;
  let sum = 0;
  let alt = false;
  for (let i = cleaned.length - 1; i >= 0; i -= 1) {
    let n = Number(cleaned[i]);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

/** IBAN MOD-97 */
export function ibanValid(iban: string): boolean {
  const normalized = iban.replace(/\s+/g, '').toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(normalized) || normalized.length < 15) {
    return false;
  }
  const rearranged = normalized.slice(4) + normalized.slice(0, 4);
  let expanded = '';
  for (const ch of rearranged) {
    const code = ch.charCodeAt(0);
    expanded += code >= 65 ? String(code - 55) : ch;
  }
  let remainder = 0;
  for (const ch of expanded) {
    remainder = (remainder * 10 + Number(ch)) % 97;
  }
  return remainder === 1;
}

export function enrichWithChecksums(text: string, spans: DetectionSpan[]): DetectionSpan[] {
  return spans
    .map((span) => {
      const value = text.slice(span.start, span.end);
      if (span.entityType === EntityType.CREDIT_CARD) {
        if (!luhnValid(value)) return null;
        return { ...span, confidence: Math.max(span.confidence, 0.92) };
      }
      if (span.entityType === EntityType.IBAN) {
        if (!ibanValid(value)) return null;
        return { ...span, confidence: Math.max(span.confidence, 0.9) };
      }
      return span;
    })
    .filter((s): s is DetectionSpan => s !== null);
}
