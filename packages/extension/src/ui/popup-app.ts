/**
 * Lit popup — ADR-034 / PART_22.
 * Platform enable uses chrome.permissions.request via SW (ADR-035).
 */

import { LitElement, css, html } from 'lit';
import { AI_PLATFORMS, MessageType, type HealthCheckResult } from '@sentinel-shield/shared-types';
import { createEnvelope } from '@sentinel-shield/browser-adapters';
import { t } from './i18n.js';

function isOkData<T>(value: unknown): value is { ok: true; data: T } {
  if (typeof value !== 'object' || value === null) return false;
  return (value as { ok?: unknown }).ok === true;
}

export class SentinelPopup extends LitElement {
  static override properties = {
    health: { state: true },
    enabled: { state: true },
    error: { state: true },
    status: { state: true },
  };

  static override styles = css`
    :host {
      display: block;
      width: 340px;
      color: #e8f0ec;
      background: linear-gradient(165deg, #0f1714 0%, #15241d 55%, #0f1714 100%);
      font:
        14px/1.45 'Segoe UI',
        system-ui,
        sans-serif;
    }
    header {
      padding: 18px 16px 10px;
      font-family: 'Iowan Old Style', 'Palatino Linotype', Palatino, serif;
      font-size: 22px;
      letter-spacing: 0.02em;
    }
    main {
      padding: 0 16px 16px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding: 8px 0;
      border-bottom: 1px solid #24332c;
    }
    .muted {
      color: #9bb5a8;
    }
    a {
      color: #6fbf97;
    }
    .err {
      color: #e0a070;
      padding: 8px 0;
    }
    .ok {
      color: #6fbf97;
      padding: 8px 0;
    }
    .platforms {
      margin-top: 12px;
    }
    .platforms h2 {
      margin: 0 0 8px;
      font-size: 13px;
      font-weight: 600;
      color: #9bb5a8;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    label {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 0;
    }
    a:focus-visible,
    input:focus-visible {
      outline: 2px solid #6fbf97;
      outline-offset: 2px;
    }
    .err[role='alert'] {
      color: #e0a070;
    }
    @media (prefers-reduced-motion: reduce) {
      :host {
        background: #0f1714;
      }
    }
    @media (forced-colors: active) {
      :host {
        background: Canvas;
        color: CanvasText;
      }
      a {
        color: LinkText;
      }
    }
  `;

  declare health: HealthCheckResult | null;
  declare enabled: string[];
  declare error: string | null;
  declare status: string;

  constructor() {
    super();
    this.health = null;
    this.enabled = [];
    this.error = null;
    this.status = '';
  }

  override connectedCallback(): void {
    super.connectedCallback();
    void this.refresh();
  }

  private async refresh(): Promise<void> {
    try {
      const healthEnv = createEnvelope(MessageType.HEALTH_CHECK, {});
      const healthRes: unknown = await chrome.runtime.sendMessage(healthEnv);
      if (isOkData<HealthCheckResult>(healthRes)) {
        this.health = healthRes.data;
      }
      const listEnv = createEnvelope(MessageType.PLATFORM_LIST, {});
      const listRes: unknown = await chrome.runtime.sendMessage(listEnv);
      if (isOkData<string[]>(listRes)) {
        this.enabled = listRes.data;
      }
      this.error = null;
    } catch (cause) {
      this.error = cause instanceof Error ? cause.message : 'Unavailable';
    }
  }

  private async togglePlatform(platformId: string, checked: boolean): Promise<void> {
    try {
      const type = checked ? MessageType.PLATFORM_ENABLE : MessageType.PLATFORM_DISABLE;
      const envelope = createEnvelope(type, { platformId });
      const response: unknown = await chrome.runtime.sendMessage(envelope);
      if (!isOkData(response)) {
        this.error = checked ? 'Permission denied or enable failed' : 'Disable failed';
        return;
      }
      this.status = checked ? `Enabled ${platformId}` : `Disabled ${platformId}`;
      this.error = null;
      await this.refresh();
    } catch (cause) {
      this.error = cause instanceof Error ? cause.message : 'Toggle failed';
    }
  }

  override render() {
    const enabledSet = new Set(this.enabled);
    return html`
      <header>
        <h1 style="margin:0;font:inherit;font-size:22px;font-family:inherit">
          ${t('extensionName')}
        </h1>
      </header>
      <main>
        ${this.error ? html`<div class="err" role="alert">${this.error}</div>` : null}
        ${
          this.status
            ? html`<div class="ok" role="status" aria-live="polite">${this.status}</div>`
            : null
        }
        <div class="row">
          <span class="muted">Version</span><span>${this.health?.version ?? '…'}</span>
        </div>
        <div class="row">
          <span class="muted">Safe mode</span><span>${this.health?.safeMode ? 'ON' : 'off'}</span>
        </div>
        <div class="row">
          <span class="muted">Telemetry</span
          ><span>${this.health?.telemetryEnabled ? 'on' : 'off'}</span>
        </div>
        <div class="platforms">
          <h2 id="platforms-heading">${t('popup_platforms_heading')}</h2>
          <div role="group" aria-labelledby="platforms-heading">
            ${AI_PLATFORMS.map(
              (p) => html`
                <label>
                  <input
                    type="checkbox"
                    .checked=${enabledSet.has(p.id)}
                    @change=${(e: Event) =>
                      void this.togglePlatform(p.id, (e.target as HTMLInputElement).checked)}
                  />
                  ${p.displayName}
                </label>
              `,
            )}
          </div>
        </div>
        <div class="row">
          <a href="options.html" target="_blank" rel="noopener">${t('popup_open_settings')}</a>
        </div>
      </main>
    `;
  }
}

if (!customElements.get('sentinel-popup')) {
  customElements.define('sentinel-popup', SentinelPopup);
}
