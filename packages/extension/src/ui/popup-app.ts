/**
 * Lit popup — ADR-034 / PART_22.
 * Host permissions MUST be requested in this page on the user gesture (PART_15).
 * The service worker only persists enablement + registers content scripts.
 */

import { LitElement, css, html } from 'lit';
import {
  AI_PLATFORMS,
  MessageType,
  getPlatform,
  type HealthCheckResult,
} from '@sentinel-shield/shared-types';
import { createEnvelope } from '@sentinel-shield/browser-adapters';
import { t } from './i18n.js';

function isOkData<T>(value: unknown): value is { ok: true; data: T } {
  if (typeof value !== 'object' || value === null) return false;
  return (value as { ok?: unknown }).ok === true;
}

function responseError(value: unknown): string | null {
  if (typeof value !== 'object' || value === null) return null;
  const error = (value as { error?: unknown }).error;
  return typeof error === 'string' ? error : null;
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

  private async sendToServiceWorker(envelope: unknown): Promise<unknown> {
    const delaysMs = [0, 50, 100, 200, 400];
    let lastError: unknown;
    for (const delay of delaysMs) {
      if (delay > 0) {
        await new Promise<void>((resolve) => {
          setTimeout(resolve, delay);
        });
      }
      try {
        return await chrome.runtime.sendMessage(envelope);
      } catch (cause) {
        lastError = cause;
        const message = cause instanceof Error ? cause.message : String(cause);
        const swWaking =
          message.includes('Receiving end does not exist') ||
          message.includes('Could not establish connection');
        if (!swWaking) {
          throw cause;
        }
      }
    }
    throw lastError instanceof Error
      ? lastError
      : new Error('Could not reach extension service worker');
  }

  private async refresh(): Promise<void> {
    try {
      const healthEnv = createEnvelope(MessageType.HEALTH_CHECK, {});
      const healthRes: unknown = await this.sendToServiceWorker(healthEnv);
      if (isOkData<HealthCheckResult>(healthRes)) {
        this.health = healthRes.data;
      }
      const listEnv = createEnvelope(MessageType.PLATFORM_LIST, {});
      const listRes: unknown = await this.sendToServiceWorker(listEnv);
      if (isOkData<string[]>(listRes)) {
        this.enabled = listRes.data;
      }
      this.error = null;
    } catch (cause) {
      this.error = cause instanceof Error ? cause.message : 'Unavailable';
    }
  }

  private async togglePlatform(
    platformId: string,
    checked: boolean,
    input: HTMLInputElement,
  ): Promise<void> {
    const platform = getPlatform(platformId);
    try {
      // PART_15: chrome.permissions.request must run here on the gesture —
      // calling it from the service worker after sendMessage always fails.
      if (checked) {
        if (!platform) {
          input.checked = false;
          this.error = `Unknown platform: ${platformId}`;
          return;
        }
        const granted = await chrome.permissions.request({
          origins: [...platform.urlPatterns],
        });
        if (!granted) {
          input.checked = false;
          this.error =
            'Host permission denied. When Chrome asks, click Allow so Sentinel can protect this site.';
          this.status = '';
          await this.refresh();
          return;
        }
      }

      const type = checked ? MessageType.PLATFORM_ENABLE : MessageType.PLATFORM_DISABLE;
      const envelope = createEnvelope(type, { platformId });
      const response: unknown = await this.sendToServiceWorker(envelope);
      if (!isOkData(response)) {
        input.checked = !checked;
        const detail = responseError(response);
        this.error = checked
          ? (detail ?? 'Enable failed after permission grant')
          : (detail ?? 'Disable failed');
        await this.refresh();
        return;
      }
      const label = platform?.displayName ?? platformId;
      this.status = checked ? `Enabled ${label}` : `Disabled ${label}`;
      this.error = null;
      await this.refresh();
    } catch (cause) {
      input.checked = !checked;
      this.error = cause instanceof Error ? cause.message : 'Toggle failed';
      await this.refresh();
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
                    @change=${(e: Event) => {
                      const input = e.target as HTMLInputElement;
                      void this.togglePlatform(p.id, input.checked, input);
                    }}
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
