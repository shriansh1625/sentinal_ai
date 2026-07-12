/**
 * Lit options page — ADR-034 / PART_22.
 */

import { LitElement, css, html } from 'lit';
import { MessageType, type AppSettings, type FeatureFlags } from '@sentinel-shield/shared-types';
import { createEnvelope } from '@sentinel-shield/browser-adapters';
import { t } from './i18n.js';

function isSettingsResponse(value: unknown): value is { ok: true; data: AppSettings } {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as { ok?: unknown; data?: unknown };
  if (record.ok !== true || typeof record.data !== 'object' || record.data === null) {
    return false;
  }
  const data = record.data as { version?: unknown };
  return data.version === 1;
}

export class SentinelOptions extends LitElement {
  static override properties = {
    settings: { state: true },
    message: { state: true },
    error: { state: true },
  };

  static override styles = css`
    :host {
      display: block;
      min-height: 100vh;
      color: #e8f0ec;
      background:
        radial-gradient(ellipse at top left, #1a3a2c 0%, transparent 55%),
        linear-gradient(180deg, #0c1210 0%, #121a16 100%);
      font:
        15px/1.5 'Segoe UI',
        system-ui,
        sans-serif;
      padding: 32px 24px 48px;
    }
    h1 {
      margin: 0 0 8px;
      font-family: 'Iowan Old Style', 'Palatino Linotype', Palatino, serif;
      font-size: 34px;
      font-weight: 600;
    }
    p {
      margin: 0 0 24px;
      color: #9bb5a8;
      max-width: 40rem;
    }
    label {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid #24332c;
      max-width: 28rem;
    }
    .status {
      margin-top: 16px;
      color: #6fbf97;
    }
    .err {
      color: #e0a070;
    }
    input:focus-visible {
      outline: 2px solid #6fbf97;
      outline-offset: 2px;
    }
    @media (prefers-reduced-motion: reduce) {
      :host {
        background: #0c1210;
      }
    }
    @media (forced-colors: active) {
      :host {
        background: Canvas;
        color: CanvasText;
      }
    }
  `;

  declare settings: AppSettings | null;
  declare message: string;
  declare error: string;

  constructor() {
    super();
    this.settings = null;
    this.message = '';
    this.error = '';
  }

  override connectedCallback(): void {
    super.connectedCallback();
    void this.load();
  }

  private async load(): Promise<void> {
    try {
      const envelope = createEnvelope(MessageType.CONFIG_GET, {});
      const response: unknown = await chrome.runtime.sendMessage(envelope);
      if (isSettingsResponse(response)) {
        this.settings = response.data;
      } else {
        this.error = 'Could not load settings';
      }
    } catch (cause) {
      this.error = cause instanceof Error ? cause.message : 'Unavailable';
    }
  }

  private async toggle(flag: keyof FeatureFlags, checked: boolean): Promise<void> {
    if (!this.settings) return;
    try {
      const envelope = createEnvelope(MessageType.CONFIG_SET, {
        featureFlags: { [flag]: checked },
      });
      const response: unknown = await chrome.runtime.sendMessage(envelope);
      if (isSettingsResponse(response)) {
        this.settings = response.data;
        this.message = 'Saved';
        this.error = '';
      } else {
        this.error = 'Save failed';
      }
    } catch (cause) {
      this.error = cause instanceof Error ? cause.message : 'Save failed';
    }
  }

  override render() {
    const flags = this.settings?.featureFlags;
    return html`
      <h1>${t('extensionName')}</h1>
      <p>${t('options_intro')}</p>
      ${
        flags
          ? html`
              <div role="group" aria-label="Feature flags">
                <label>
                  <input
                    type="checkbox"
                    .checked=${flags.ocrEnabled}
                    @change=${(e: Event) =>
                      void this.toggle('ocrEnabled', (e.target as HTMLInputElement).checked)}
                  />
                  OCR (images) — requires WASM assets
                </label>
                <label>
                  <input
                    type="checkbox"
                    .checked=${flags.nerEnabled}
                    @change=${(e: Event) =>
                      void this.toggle('nerEnabled', (e.target as HTMLInputElement).checked)}
                  />
                  NER (default off)
                </label>
                <label>
                  <input
                    type="checkbox"
                    .checked=${flags.telemetryEnabled}
                    @change=${(e: Event) =>
                      void this.toggle('telemetryEnabled', (e.target as HTMLInputElement).checked)}
                  />
                  Telemetry (default off)
                </label>
                <label>
                  <input
                    type="checkbox"
                    .checked=${flags.historyEnabled}
                    @change=${(e: Event) =>
                      void this.toggle('historyEnabled', (e.target as HTMLInputElement).checked)}
                  />
                  History (default off)
                </label>
              </div>
            `
          : html`<p role="status">Loading…</p>`
      }
      ${
        this.message
          ? html`<div class="status" role="status" aria-live="polite">${this.message}</div>`
          : null
      }
      ${this.error ? html`<div class="err" role="alert">${this.error}</div>` : null}
    `;
  }
}

if (!customElements.get('sentinel-options')) {
  customElements.define('sentinel-options', SentinelOptions);
}
