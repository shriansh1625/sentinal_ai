/**
 * Context detection — PART_10 §platform adapters (generic).
 * Best-effort AI input / drop-target hints; document-level intercept remains primary.
 */

const AI_INPUT_SELECTORS = [
  'textarea',
  '[contenteditable="true"]',
  '[contenteditable=""]',
  'div[role="textbox"]',
  'input[type="text"]',
  'input:not([type])',
] as const;

export function isLikelyAiInput(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }
  return AI_INPUT_SELECTORS.some((sel) => target.matches(sel) || target.closest(sel) !== null);
}

export function isFileInput(target: EventTarget | null): target is HTMLInputElement {
  return target instanceof HTMLInputElement && target.type === 'file';
}

export function findFileInputs(root: ParentNode = document): HTMLInputElement[] {
  return Array.from(root.querySelectorAll('input[type="file"]'));
}
