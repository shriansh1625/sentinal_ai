/**
 * Paste interception — PART_10 §5.2 / PART_17 paste pipeline.
 * Capture phase; stopImmediatePropagation; never silent release (ADR-036).
 */

import { MAX_TEXT_SCAN_BYTES } from '@sentinel-shield/shared-types';
import {
  InterceptDecision,
  InterceptKind,
  type InterceptEvent,
  type InterceptOutcome,
} from '@sentinel-shield/shared-types';
import { createApprovalNonce, isApproved, markApproved } from '../content/approval-nonce.js';
import { isLikelyAiInput } from './context.js';

export type InterceptDispatcher = (event: InterceptEvent) => Promise<InterceptOutcome>;

export interface PendingRelease {
  readonly allowOriginal: () => void;
  readonly allowRedacted: (text: string) => void;
}

export interface PasteInterceptorOptions {
  readonly dispatch: InterceptDispatcher;
  readonly createId?: () => string;
  readonly onDecision?: (
    event: InterceptEvent,
    outcome: InterceptOutcome,
    release: PendingRelease,
  ) => void;
}

export class PasteInterceptor {
  private readonly nonce = createApprovalNonce();
  private attached = false;

  constructor(private readonly options: PasteInterceptorOptions) {}

  attach(target: Document | Element = document): void {
    if (this.attached) return;
    target.addEventListener('paste', this.onPaste, true);
    this.attached = true;
  }

  detach(target: Document | Element = document): void {
    if (!this.attached) return;
    target.removeEventListener('paste', this.onPaste, true);
    this.attached = false;
  }

  private readonly onPaste = (event: Event): void => {
    void this.handlePaste(event as ClipboardEvent);
  };

  private async handlePaste(event: ClipboardEvent): Promise<void> {
    if (isApproved(event, this.nonce)) {
      return;
    }
    if (!isLikelyAiInput(event.target)) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();

    const text = event.clipboardData?.getData('text/plain') ?? '';
    const byteLength = new TextEncoder().encode(text).byteLength;
    const target = event.target;
    if (!(target instanceof EventTarget)) return;

    const release: PendingRelease = {
      allowOriginal: () => this.redispatchPaste(target, text),
      allowRedacted: (redacted) => this.redispatchPaste(target, redacted),
    };

    if (byteLength > MAX_TEXT_SCAN_BYTES) {
      this.options.onDecision?.(
        {
          interceptId: this.options.createId?.() ?? createApprovalNonce(),
          kind: InterceptKind.PASTE,
          payload: { kind: 'text', text: '', byteLength },
          targetHint: 'ai-input',
          timestampMs: Date.now(),
        },
        {
          interceptId: 'oversize',
          decision: InterceptDecision.HOLD,
          reason: 'Paste exceeds MAX_TEXT_SCAN_BYTES (PART_17)',
        },
        release,
      );
      return;
    }

    const interceptId = this.options.createId?.() ?? createApprovalNonce();
    const interceptEvent: InterceptEvent = {
      interceptId,
      kind: InterceptKind.PASTE,
      payload: { kind: 'text', text, byteLength },
      targetHint: 'ai-input',
      timestampMs: Date.now(),
    };

    const outcome = await this.options.dispatch(interceptEvent);
    if (outcome.decision === InterceptDecision.ALLOW) {
      this.redispatchPaste(target, text);
      return;
    }
    if (outcome.decision === InterceptDecision.REDACT && outcome.redactedText !== undefined) {
      this.redispatchPaste(target, outcome.redactedText);
      return;
    }
    this.options.onDecision?.(interceptEvent, outcome, release);
  }

  private redispatchPaste(target: EventTarget, text: string): void {
    const dt = new DataTransfer();
    dt.setData('text/plain', text);
    const synthetic = new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      clipboardData: dt,
    });
    markApproved(synthetic, this.nonce);
    target.dispatchEvent(synthetic);
  }
}
