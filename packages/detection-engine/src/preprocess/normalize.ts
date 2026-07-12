/**
 * Adversarial text preprocessing — PART_20 §1.1 / §1.2 / §4.x.
 * Pure; deterministic; applied before Tier-1 detectors.
 */

/** Zero-width / bidi / soft-hyphen / word-joiner set (PART_20 §1.1). */
const ZERO_WIDTH_RE = /[\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF\u00AD]/g;

/**
 * Common Cyrillic/Greek confusables → Latin (PART_20 §1.2 subset).
 * Applied after NFKD.
 */
const HOMOGLYPH_MAP: Readonly<Record<string, string>> = {
  '\u0430': 'a', // Cyrillic а
  '\u0435': 'e',
  '\u043E': 'o',
  '\u0440': 'p',
  '\u0441': 'c',
  '\u0443': 'y',
  '\u0445': 'x',
  '\u0410': 'A',
  '\u0412': 'B',
  '\u0415': 'E',
  '\u041A': 'K',
  '\u041C': 'M',
  '\u041D': 'H',
  '\u041E': 'O',
  '\u0420': 'P',
  '\u0421': 'C',
  '\u0422': 'T',
  '\u0425': 'X',
  '\u0391': 'A', // Greek
  '\u0392': 'B',
  '\u0395': 'E',
  '\u0396': 'Z',
  '\u0397': 'H',
  '\u0399': 'I',
  '\u039A': 'K',
  '\u039C': 'M',
  '\u039D': 'N',
  '\u039F': 'O',
  '\u03A1': 'P',
  '\u03A4': 'T',
  '\u03A5': 'Y',
  '\u03A7': 'X',
  '\u03B1': 'a',
  '\u03B5': 'e',
  '\u03BF': 'o',
  '\u03C1': 'p',
  '\u03C5': 'y',
  '\u03C7': 'x',
};

export function stripZeroWidth(text: string): string {
  return text.replace(ZERO_WIDTH_RE, '');
}

export function applyHomoglyphMap(text: string): string {
  let out = '';
  for (const ch of text) {
    out += HOMOGLYPH_MAP[ch] ?? ch;
  }
  return out;
}

/**
 * Normalize for detection: strip invisible chars → NFKD → homoglyph map.
 */
export function normalizeForDetection(text: string): string {
  const stripped = stripZeroWidth(text);
  const nfkd = stripped.normalize('NFKD');
  return applyHomoglyphMap(nfkd);
}

/**
 * Resolve simple adjacent string-literal concatenation (PART_20 §4).
 * Example: "sk-" + "abc..." → "sk-abc..."
 */
export function resolveSimpleStringConcat(text: string): string {
  let previous = '';
  let current = text;
  // Iterate until stable (bounded) to avoid pathological loops
  for (let i = 0; i < 8 && current !== previous; i += 1) {
    previous = current;
    current = current.replace(
      /(["'`])([^"'`\\]*?)\1\s*\+\s*(["'`])([^"'`\\]*?)\3/g,
      (_m, _q1: string, a: string, _q2: string, b: string) => `"${a}${b}"`,
    );
  }
  return current;
}

export function prepareForDetection(text: string): string {
  return resolveSimpleStringConcat(normalizeForDetection(text));
}
