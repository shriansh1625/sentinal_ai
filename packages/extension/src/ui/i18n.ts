/**
 * chrome.i18n helper — PART_22 §16 / Phase 8 CWS readiness.
 * Falls back to en catalog when chrome.i18n is unavailable (unit tests).
 */

const EN_FALLBACK: Readonly<Record<string, string>> = {
  extensionName: 'Sentinel Shield AI',
  extensionDescription:
    'Local privacy assistant for supported AI sites. Intercepts paste/upload/drag-drop; warn, allow, block, or redact.',
  overlay_title_block: 'Blocked sensitive content',
  overlay_title_redact: 'Redaction available',
  overlay_title_hold: 'Review before sending',
  a11y_overlay_live_prefix: 'Sentinel Shield warning.',
  action_allow: 'Allow once',
  action_block: 'Block',
  action_redact: 'Redact & allow',
  a11y_decision_actions: 'Decision actions',
  popup_open_settings: 'Open settings',
  popup_platforms_heading: 'AI platforms',
  options_intro: 'Local settings. Telemetry and history stay off unless you enable them.',
};

export function t(key: string, substitutions?: string | string[]): string {
  try {
    if (typeof chrome !== 'undefined' && chrome.i18n?.getMessage) {
      const msg = chrome.i18n.getMessage(key, substitutions);
      if (msg) return msg;
    }
  } catch {
    // Unit / non-extension environments.
  }
  return EN_FALLBACK[key] ?? key;
}
