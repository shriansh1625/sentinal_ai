/**
 * Phase 7 — Accessibility & UX (PART_22 §15 WCAG 2.1 AA subset for v1 surfaces).
 */

import { afterEach, describe, expect, it } from 'vitest';
import { InterceptDecision } from '@sentinel-shield/shared-types';
import { DecisionOverlay } from './ui/overlay.js';
import { SentinelPopup } from './ui/popup-app.js';
import { SentinelOptions } from './ui/options-app.js';

afterEach(() => {
  document.querySelectorAll('sentinel-shield-overlay').forEach((n) => n.remove());
  document.querySelectorAll('sentinel-popup, sentinel-options').forEach((n) => n.remove());
});

function holdOutcome(extra?: { redactedText?: string; preview?: string }) {
  const base = {
    interceptId: 'a11y-1',
    decision: InterceptDecision.HOLD,
    reason: 'Sensitive content detected',
    preview: extra?.preview ?? 'j***@example.com',
  };
  if (extra?.redactedText !== undefined) {
    return { ...base, redactedText: extra.redactedText };
  }
  return base;
}

describe('Phase 7 — overlay a11y (PART_22 §15)', () => {
  it('exposes dialog ARIA, assertive live region, and Block as initial focus', () => {
    const overlay = new DecisionOverlay();
    overlay.show({
      outcome: holdOutcome({ redactedText: '[REDACTED_EMAIL]' }),
      onAction: () => undefined,
    });

    const snap = overlay.getA11ySnapshotForTests();
    expect(snap.role).toBe('dialog');
    expect(snap.ariaModal).toBe('true');
    expect(snap.labelledBy).toBe('ss-overlay-title');
    expect(snap.describedBy).toContain('ss-overlay-reason');
    expect(snap.describedBy).toContain('ss-overlay-preview');
    expect(snap.liveText).toMatch(/Sentinel Shield warning/i);
    expect(snap.liveText).toMatch(/Sensitive content detected/);
    expect(snap.initialAction).toBe('block');
    expect(snap.hasReducedMotionCss).toBe(true);
    expect(snap.hasForcedColorsCss).toBe(true);
    expect(overlay.getFocusableCountForTests()).toBe(3);
    overlay.hide();
  });

  it('Escape resolves as block (safe dismiss)', () => {
    const overlay = new DecisionOverlay();
    let action: string | null = null;
    overlay.show({
      outcome: holdOutcome({ redactedText: '[REDACTED_EMAIL]' }),
      onAction: (a) => {
        action = a;
      },
    });
    overlay.dispatchEscapeForTests();
    expect(action).toBe('block');
    expect(document.querySelector('sentinel-shield-overlay')).toBeNull();
  });

  it('restores focus to the previously focused element on hide', () => {
    const prior = document.createElement('button');
    prior.id = 'prior-focus';
    prior.type = 'button';
    prior.textContent = 'prior';
    document.body.appendChild(prior);
    prior.focus();
    expect(document.activeElement).toBe(prior);

    const overlay = new DecisionOverlay();
    overlay.show({
      outcome: holdOutcome(),
      onAction: () => undefined,
    });
    overlay.hide();
    expect(document.activeElement).toBe(prior);
    prior.remove();
  });

  it('BLOCK decision offers only Block (no Allow)', () => {
    const overlay = new DecisionOverlay();
    overlay.show({
      outcome: {
        interceptId: 'a11y-block',
        decision: InterceptDecision.BLOCK,
        reason: 'Hard block',
      },
      onAction: () => undefined,
    });
    expect(overlay.getFocusableCountForTests()).toBe(1);
    expect(overlay.getA11ySnapshotForTests().initialAction).toBe('block');
    overlay.hide();
  });

  it('keeps closed shadow inaccessible from page JS', () => {
    const overlay = new DecisionOverlay();
    overlay.show({
      outcome: holdOutcome(),
      onAction: () => undefined,
    });
    const host = document.querySelector('sentinel-shield-overlay');
    expect(host).not.toBeNull();
    expect(host?.shadowRoot).toBeNull();
    overlay.hide();
  });
});

describe('Phase 7 — Lit popup/options a11y surface markers', () => {
  it('popup styles include focus-visible, reduced-motion, and forced-colors', () => {
    const styles = SentinelPopup.styles;
    const cssText = Array.isArray(styles)
      ? styles.map((s) => String(s)).join('\n')
      : String(styles);
    expect(cssText).toMatch(/focus-visible/);
    expect(cssText).toMatch(/prefers-reduced-motion/);
    expect(cssText).toMatch(/forced-colors/);
  });

  it('options styles include focus-visible and forced-colors', () => {
    const styles = SentinelOptions.styles;
    const cssText = Array.isArray(styles)
      ? styles.map((s) => String(s)).join('\n')
      : String(styles);
    expect(cssText).toMatch(/focus-visible/);
    expect(cssText).toMatch(/forced-colors/);
  });

  it('popup render includes status live region and alert roles', async () => {
    const el = document.createElement('sentinel-popup') as SentinelPopup;
    document.body.appendChild(el);
    await el.updateComplete;
    // After connectedCallback refresh (no chrome in unit env), set a11y markers.
    el.error = 'boom';
    el.status = 'ok';
    await el.updateComplete;
    const root = el.shadowRoot;
    expect(root).not.toBeNull();
    expect(root!.querySelector('[role="alert"]')?.textContent).toContain('boom');
    expect(root!.querySelector('[role="status"][aria-live="polite"]')?.textContent).toContain('ok');
    expect(
      root!.querySelector('[role="group"][aria-labelledby="platforms-heading"]'),
    ).not.toBeNull();
  });

  it('options render includes alert and polite status', async () => {
    const el = document.createElement('sentinel-options') as SentinelOptions;
    document.body.appendChild(el);
    await el.updateComplete;
    el.error = 'fail';
    el.message = 'saved';
    await el.updateComplete;
    const root = el.shadowRoot;
    expect(root!.querySelector('[role="alert"]')?.textContent).toContain('fail');
    expect(root!.querySelector('[role="status"][aria-live="polite"]')?.textContent).toContain(
      'saved',
    );
  });
});
