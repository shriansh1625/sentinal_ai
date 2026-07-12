/**
 * Legacy HTML string helper retained for unit tests of brand shell copy.
 * Production UI is Lit (`popup-app.ts` / `options-app.ts`) per ADR-034.
 */

export interface PopupViewModel {
  readonly title: string;
  readonly version: string;
  readonly safeMode: boolean;
  readonly telemetryEnabled: boolean;
  readonly historyEnabled: boolean;
  readonly enabledPlatformCount: number;
}

export function renderPopupHtml(model: PopupViewModel): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8" /><title>${escapeHtml(model.title)}</title></head><body><h1>Sentinel Shield</h1><p>v${escapeHtml(model.version)}</p></body></html>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
