/**
 * Closed Shadow DOM decision overlay — PART_10 §5.4 / PART_22 WCAG AA.
 * Focus trap, Escape, ARIA labelled dialog, live region, focus restore.
 */

import { InterceptDecision, type InterceptOutcome } from '@sentinel-shield/shared-types';
import { t } from './i18n.js';

export type OverlayUserAction = 'allow' | 'block' | 'redact';

export interface OverlayShowOptions {
  readonly outcome: InterceptOutcome;
  readonly onAction: (action: OverlayUserAction) => void;
}

const OVERLAY_STYLES = `
:host, * { box-sizing: border-box; }
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 24px;
  background: rgba(8, 14, 12, 0.55);
  font: 14px/1.45 "Segoe UI", system-ui, sans-serif;
  color: #e8f0ec;
}
.panel {
  width: min(420px, 100%);
  padding: 18px 16px 14px;
  border: 1px solid #2a4036;
  background: linear-gradient(165deg, #121a16 0%, #0f1714 100%);
  box-shadow: 0 12px 40px rgba(0,0,0,0.45);
}
.title {
  margin: 0 0 6px;
  font-family: "Iowan Old Style", "Palatino Linotype", Palatino, serif;
  font-size: 20px;
  font-weight: 600;
}
.reason { margin: 0 0 10px; color: #9bb5a8; }
.preview {
  margin: 0 0 14px;
  padding: 10px;
  max-height: 120px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
  background: #0c1210;
  border: 1px solid #24332c;
  color: #c5d8ce;
  font-size: 12px;
}
.actions { display: flex; flex-wrap: wrap; gap: 8px; }
button {
  appearance: none;
  border: 1px solid #355445;
  background: #1a2a22;
  color: #e8f0ec;
  padding: 8px 12px;
  cursor: pointer;
  font: inherit;
}
button.primary { background: #2a5a42; border-color: #3d7a5c; }
button.danger { background: #3a2820; border-color: #6a4030; }
button:focus-visible { outline: 2px solid #6fbf97; outline-offset: 2px; }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
@media (prefers-reduced-motion: reduce) {
  .backdrop, .panel { transition: none !important; animation: none !important; }
}
@media (forced-colors: active) {
  .backdrop { background: Canvas; }
  .panel {
    background: Canvas;
    color: CanvasText;
    border: 2px solid ButtonText;
    box-shadow: none;
  }
  .reason, .preview { color: CanvasText; background: Canvas; border-color: ButtonText; }
  button {
    background: ButtonFace;
    color: ButtonText;
    border: 2px solid ButtonText;
    forced-color-adjust: auto;
  }
}
`;

export class DecisionOverlay {
  private host: HTMLElement | null = null;
  private shadow: ShadowRoot | null = null;
  private observer: MutationObserver | null = null;
  private lastOnAction: ((action: OverlayUserAction) => void) | null = null;
  private previousFocus: HTMLElement | null = null;
  private keyHandler: EventListener | null = null;
  private focusables: HTMLButtonElement[] = [];
  private activeOptions: OverlayShowOptions | null = null;

  show(options: OverlayShowOptions): void {
    this.hide();
    this.activeOptions = options;
    this.lastOnAction = options.onAction;
    this.previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const host = document.createElement('sentinel-shield-overlay');
    host.setAttribute('style', 'all: initial; position: fixed; inset: 0; z-index: 2147483647;');
    const shadow = host.attachShadow({ mode: 'closed' });
    this.host = host;
    this.shadow = shadow;

    const style = document.createElement('style');
    style.textContent = OVERLAY_STYLES;
    shadow.appendChild(style);

    const decision = options.outcome.decision;
    const title =
      decision === InterceptDecision.BLOCK
        ? t('overlay_title_block')
        : decision === InterceptDecision.REDACT
          ? t('overlay_title_redact')
          : t('overlay_title_hold');

    const root = document.createElement('div');
    root.className = 'backdrop';

    const live = document.createElement('div');
    live.className = 'sr-only';
    live.setAttribute('aria-live', 'assertive');
    live.textContent = `${t('a11y_overlay_live_prefix')} ${title}. ${options.outcome.reason}`;

    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'ss-overlay-title');
    panel.setAttribute('aria-describedby', 'ss-overlay-reason');

    const heading = document.createElement('h2');
    heading.className = 'title';
    heading.id = 'ss-overlay-title';
    heading.textContent = title;

    const reason = document.createElement('p');
    reason.className = 'reason';
    reason.id = 'ss-overlay-reason';
    reason.textContent = options.outcome.reason;

    panel.append(heading, reason);

    if (options.outcome.preview) {
      const preview = document.createElement('pre');
      preview.className = 'preview';
      preview.id = 'ss-overlay-preview';
      preview.textContent = options.outcome.preview;
      panel.setAttribute('aria-describedby', 'ss-overlay-reason ss-overlay-preview');
      panel.appendChild(preview);
    }

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.setAttribute('role', 'group');
    actions.setAttribute('aria-label', t('a11y_decision_actions'));

    const buttons: HTMLButtonElement[] = [];
    const canRedact = Boolean(options.outcome.redactedText);
    // Tab order PART_22: Allow → Block → Redact; initial focus = Block (safe default).
    if (decision !== InterceptDecision.BLOCK) {
      buttons.push(
        button(t('action_allow'), 'primary', 'allow', () => this.finish(options, 'allow')),
      );
    }
    buttons.push(button(t('action_block'), 'danger', 'block', () => this.finish(options, 'block')));
    if (canRedact) {
      buttons.push(
        button(t('action_redact'), 'primary', 'redact', () => this.finish(options, 'redact')),
      );
    }
    for (const btn of buttons) actions.appendChild(btn);
    this.focusables = buttons;

    panel.appendChild(actions);
    root.append(live, panel);
    shadow.appendChild(root);
    document.documentElement.appendChild(host);
    this.watchRemoval(host);

    this.keyHandler = (event: Event) => this.onKeyDown(event);
    shadow.addEventListener('keydown', this.keyHandler);

    const initial = buttons.find((b) => b.dataset['action'] === 'block') ?? buttons[0];
    queueMicrotask(() => initial?.focus());
  }

  /**
   * Test seam: closed ShadowRoot is inaccessible from page JS (PART_10).
   */
  dispatchActionForTests(action: OverlayUserAction): void {
    if (!this.lastOnAction) {
      throw new Error('Overlay not shown');
    }
    const onAction = this.lastOnAction;
    this.hide();
    onAction(action);
  }

  /** Test seam: simulate Escape. */
  dispatchEscapeForTests(): void {
    if (!this.activeOptions) throw new Error('Overlay not shown');
    this.finish(this.activeOptions, 'block');
  }

  getFocusableCountForTests(): number {
    return this.focusables.length;
  }

  /**
   * Test seam: mirror closed-shadow DOM for external axe runs (no axe import in prod).
   */
  cloneShadowForTests(): HTMLElement {
    if (!this.shadow) throw new Error('Overlay not shown');
    const probe = document.createElement('div');
    probe.setAttribute('data-ss-axe-probe', 'true');
    for (const child of Array.from(this.shadow.children)) {
      probe.appendChild(child.cloneNode(true));
    }
    return probe;
  }

  /** Test seam: closed ShadowRoot ARIA/focus snapshot (PART_22 §15). */
  getA11ySnapshotForTests(): {
    role: string | null;
    ariaModal: string | null;
    labelledBy: string | null;
    describedBy: string | null;
    liveText: string;
    initialAction: string | null;
    hasReducedMotionCss: boolean;
    hasForcedColorsCss: boolean;
  } {
    if (!this.shadow) throw new Error('Overlay not shown');
    const panel = this.shadow.querySelector('.panel');
    const live = this.shadow.querySelector('[aria-live]');
    const style = this.shadow.querySelector('style')?.textContent ?? '';
    const initial =
      this.focusables.find((b) => b.dataset['action'] === 'block') ?? this.focusables[0];
    return {
      role: panel?.getAttribute('role') ?? null,
      ariaModal: panel?.getAttribute('aria-modal') ?? null,
      labelledBy: panel?.getAttribute('aria-labelledby') ?? null,
      describedBy: panel?.getAttribute('aria-describedby') ?? null,
      liveText: live?.textContent ?? '',
      initialAction: initial?.dataset['action'] ?? null,
      hasReducedMotionCss: style.includes('prefers-reduced-motion'),
      hasForcedColorsCss: style.includes('forced-colors'),
    };
  }

  hide(): void {
    if (this.keyHandler && this.shadow) {
      this.shadow.removeEventListener('keydown', this.keyHandler);
    }
    this.keyHandler = null;
    this.observer?.disconnect();
    this.observer = null;
    this.host?.remove();
    this.host = null;
    this.shadow = null;
    this.lastOnAction = null;
    this.activeOptions = null;
    this.focusables = [];
    const restore = this.previousFocus;
    this.previousFocus = null;
    if (restore && typeof restore.focus === 'function' && restore.isConnected) {
      restore.focus();
    }
  }

  private onKeyDown(event: Event): void {
    if (!(event instanceof KeyboardEvent) || !this.activeOptions) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.finish(this.activeOptions, 'block');
      return;
    }
    if (event.key !== 'Tab' || this.focusables.length === 0) return;
    event.preventDefault();
    const currentIndex = this.focusables.indexOf(
      event.target instanceof HTMLButtonElement ? event.target : this.focusables[0]!,
    );
    const delta = event.shiftKey ? -1 : 1;
    const next = (currentIndex + delta + this.focusables.length) % this.focusables.length;
    this.focusables[next]?.focus();
  }

  private finish(options: OverlayShowOptions, action: OverlayUserAction): void {
    this.hide();
    options.onAction(action);
  }

  private watchRemoval(host: HTMLElement): void {
    this.observer = new MutationObserver(() => {
      if (!host.isConnected && this.host === host) {
        document.documentElement.appendChild(host);
      }
    });
    this.observer.observe(document.documentElement, { childList: true, subtree: true });
  }
}

function button(
  label: string,
  className: string,
  action: OverlayUserAction,
  onClick: () => void,
): HTMLButtonElement {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = className;
  el.textContent = label;
  el.dataset['action'] = action;
  el.addEventListener('click', onClick);
  return el;
}
