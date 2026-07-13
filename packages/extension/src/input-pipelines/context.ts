/**
 * Context detection — PART_10 §platform adapters (generic).
 * Best-effort AI input / drop-target hints; document-level intercept remains primary.
 */

const AI_INPUT_SELECTORS = [
  'textarea',
  '[contenteditable]:not([contenteditable="false"])',
  'div[role="textbox"]',
  '[role="textbox"]',
  'input[type="text"]',
  'input:not([type])',
  // ChatGPT / ProseMirror composers (common host DOM)
  '#prompt-textarea',
  '[data-testid="prompt-textarea"]',
  '[data-testid="message-input"]',
  '.ProseMirror',
] as const;

/** Paste/input events often target a Text node inside contenteditable. */
export function resolveEventElement(target: EventTarget | null): Element | null {
  if (target instanceof Element) {
    return target;
  }
  if (target instanceof Text) {
    return target.parentElement;
  }
  if (target instanceof Node) {
    return target.parentElement;
  }
  return null;
}

function elementLooksLikeAiInput(el: Element): boolean {
  return AI_INPUT_SELECTORS.some((sel) => {
    try {
      return el.matches(sel) || el.closest(sel) !== null;
    } catch {
      return false;
    }
  });
}

export function isLikelyAiInput(target: EventTarget | null, event?: Event): boolean {
  const seen = new Set<Element>();
  const candidates: Array<EventTarget | null> = [target];
  if (typeof document !== 'undefined') {
    candidates.push(document.activeElement);
  }
  for (const candidate of candidates) {
    const primary = resolveEventElement(candidate);
    if (primary) {
      seen.add(primary);
      if (elementLooksLikeAiInput(primary)) {
        return true;
      }
    }
  }
  if (event && typeof event.composedPath === 'function') {
    for (const node of event.composedPath()) {
      if (!(node instanceof Element) || seen.has(node)) {
        continue;
      }
      seen.add(node);
      if (elementLooksLikeAiInput(node)) {
        return true;
      }
    }
  }
  return false;
}

export function isFileInput(target: EventTarget | null): target is HTMLInputElement {
  return target instanceof HTMLInputElement && target.type === 'file';
}

export function findFileInputs(root: ParentNode = document): HTMLInputElement[] {
  return Array.from(root.querySelectorAll('input[type="file"]'));
}
