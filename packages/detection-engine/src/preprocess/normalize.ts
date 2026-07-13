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
 * Collapse space/tab-separated single alphanumerics (RT whitespace chunking).
 * Example: "A K I A I O S F…" → "AKIAIOSF…"
 */
export function collapseSpacedAlphanumerics(text: string): string {
  // Include _ and - so keys like s k - a b c … defrag (RT-SPACE / RT-TAB).
  return text.replace(/(?:[A-Za-z0-9_-][ \t]+){7,}[A-Za-z0-9_-]/g, (chunk) =>
    chunk.replace(/[ \t]+/g, ''),
  );
}

/**
 * Join alphanumeric tokens split by a single line break (RT mid-secret newline).
 * Bounded: only when both sides are ≥6 alnum chars (avoids joining prose words).
 */
export function joinBrokenAlnumLines(text: string): string {
  let previous = '';
  let current = text;
  for (let i = 0; i < 8 && current !== previous; i += 1) {
    previous = current;
    current = current.replace(/([A-Za-z0-9]{6,})[\r\n]+([A-Za-z0-9]{6,})/g, '$1$2');
  }
  return current;
}

/** Decode numeric HTML entities (&#NNN; / &#xHH;) — RT HTML entity evasion. */
export function decodeBasicHtmlEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-fA-F]{1,6});/g, (_m, hex: string) => {
      const code = Number.parseInt(hex, 16);
      return Number.isFinite(code) && code > 0 && code < 0x10ffff ? String.fromCodePoint(code) : _m;
    })
    .replace(/&#([0-9]{1,7});/g, (_m, dec: string) => {
      const code = Number.parseInt(dec, 10);
      return Number.isFinite(code) && code > 0 && code < 0x10ffff ? String.fromCodePoint(code) : _m;
    });
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
  const normalized = normalizeForDetection(text);
  const entities = decodeBasicHtmlEntities(normalized);
  const spaced = collapseSpacedAlphanumerics(entities);
  const joined = joinBrokenAlnumLines(spaced);
  return resolveSimpleStringConcat(joined);
}
