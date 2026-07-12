/**
 * Regex detectors — PART_13 Tier-1.
 */

import { EntityType, type DetectionSpan } from '@sentinel-shield/shared-types';

interface PatternDef {
  readonly entityType: EntityType;
  readonly source: string;
  readonly flags: string;
  readonly confidence: number;
}

const PATTERNS: readonly PatternDef[] = [
  {
    entityType: EntityType.EMAIL,
    source: String.raw`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`,
    flags: 'g',
    confidence: 0.9,
  },
  {
    entityType: EntityType.PHONE,
    source: String.raw`(?<!\d)(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}(?!\d)`,
    flags: 'g',
    confidence: 0.75,
  },
  {
    // Continuous PAN (Visa/MC/Amex/Discover) — FR-DET-002
    entityType: EntityType.CREDIT_CARD,
    source: String.raw`(?<!\d)(?:4\d{12}(?:\d{3})?|5[1-5]\d{14}|3[47]\d{13}|6(?:011|5\d{2})\d{12})(?!\d)`,
    flags: 'g',
    confidence: 0.7,
  },
  {
    // Grouped PAN (spaces/dashes) — common paste form (ISVV-BUG-002)
    entityType: EntityType.CREDIT_CARD,
    source: String.raw`(?<!\d)(?:4\d{3}|5[1-5]\d{2}|3[47]\d{2}|6(?:011|5\d{2}))(?:[-\s]?\d{4}){3}(?!\d)`,
    flags: 'g',
    confidence: 0.72,
  },
  {
    entityType: EntityType.SSN,
    source: String.raw`(?<!\d)\d{3}-\d{2}-\d{4}(?!\d)`,
    flags: 'g',
    confidence: 0.85,
  },
  {
    entityType: EntityType.IBAN,
    source: String.raw`\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b`,
    flags: 'g',
    confidence: 0.7,
  },
  {
    // Spaced IBAN (ISVV-BUG-003)
    entityType: EntityType.IBAN,
    source: String.raw`\b[A-Z]{2}\d{2}(?:\s[A-Z0-9]{4}){2,7}(?:\s[A-Z0-9]{1,4})?\b`,
    flags: 'g',
    confidence: 0.72,
  },
  {
    entityType: EntityType.API_KEY,
    source: String.raw`\b(?:sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{36}|xox[baprs]-[A-Za-z0-9-]{10,})\b`,
    flags: 'g',
    confidence: 0.92,
  },
  {
    // PEM / OpenSSH private keys — FR-DET-003 (ISVV-BUG-004)
    entityType: EntityType.API_KEY,
    source: String.raw`-----BEGIN (?:OPENSSH |RSA |EC |DSA |ENCRYPTED )?PRIVATE KEY-----`,
    flags: 'g',
    confidence: 0.95,
  },
];

export function findRegexSpans(text: string): DetectionSpan[] {
  const spans: DetectionSpan[] = [];
  for (const pattern of PATTERNS) {
    const re = new RegExp(pattern.source, pattern.flags);
    for (const match of text.matchAll(re)) {
      if (match.index === undefined) continue;
      spans.push({
        start: match.index,
        end: match.index + match[0].length,
        entityType: pattern.entityType,
        confidence: pattern.confidence,
      });
    }
  }
  return spans;
}
