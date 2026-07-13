/**
 * Paste interception — PART_10 §5.2 / PART_17 paste pipeline.
 * Capture phase; stopImmediatePropagation; never silent release (ADR-036).
 * Supports text paste and clipboard file paste (e.g. PDF from Explorer).
 */

import { MAX_FILE_BYTES, MAX_TEXT_SCAN_BYTES } from '@sentinel-shield/shared-types';
import {
  InterceptDecision,
  InterceptKind,
  type InterceptEvent,
  type InterceptOutcome,
  type InterceptedFileMeta,
} from '@sentinel-shield/shared-types';
import {
  createApprovalNonce,
  isApproved,
  isSentinelRelease,
  markApproved,
} from '../content/approval-nonce.js';
import { isLikelyAiInput, resolveEventElement } from './context.js';

export type InterceptDispatcher = (event: InterceptEvent) => Promise<InterceptOutcome>;

export interface PendingRelease {
  readonly allowOriginal: () => void;
  readonly allowRedacted: (text: string) => void;
  /** Clear held files/selection when the user chooses Block. */
  readonly discard?: () => void;
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
    if (isApproved(event, this.nonce) || isSentinelRelease(event)) {
      return;
    }
    if (!isLikelyAiInput(event.target, event)) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();

    const text = event.clipboardData?.getData('text/plain') ?? '';
    const snapshot = event.clipboardData?.files ? Array.from(event.clipboardData.files) : [];
    const targetEl = resolveEventElement(event.target) ?? (event.target as EventTarget);
    if (!(targetEl instanceof EventTarget)) return;

    if (snapshot.length > 0) {
      await this.handleFilePaste(targetEl, text, snapshot);
      return;
    }

    const byteLength = new TextEncoder().encode(text).byteLength;
    const release: PendingRelease = {
      allowOriginal: () => this.redispatchPaste(targetEl, text, []),
      allowRedacted: (redacted) => this.redispatchPaste(targetEl, redacted, []),
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
      this.redispatchPaste(targetEl, text, []);
      return;
    }
    if (outcome.decision === InterceptDecision.REDACT && outcome.redactedText !== undefined) {
      this.redispatchPaste(targetEl, outcome.redactedText, []);
      return;
    }
    this.options.onDecision?.(interceptEvent, outcome, release);
  }

  private async handleFilePaste(
    targetEl: EventTarget,
    text: string,
    snapshot: readonly File[],
  ): Promise<void> {
    const files: InterceptedFileMeta[] = [];
    let totalBytes = 0;
    for (const file of snapshot) {
      totalBytes += file.size;
      files.push({
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        sizeBytes: file.size,
      });
    }

    const release: PendingRelease = {
      allowOriginal: () => this.redispatchPaste(targetEl, text, snapshot),
      allowRedacted: (redacted) => this.redispatchPaste(targetEl, redacted, snapshot),
      discard: () => undefined,
    };

    const interceptId = this.options.createId?.() ?? createApprovalNonce();
    const interceptEvent: InterceptEvent = {
      interceptId,
      kind: InterceptKind.PASTE,
      payload: { kind: 'files', files, totalBytes },
      targetHint: 'ai-input',
      timestampMs: Date.now(),
    };

    if (totalBytes > MAX_FILE_BYTES) {
      this.options.onDecision?.(
        interceptEvent,
        {
          interceptId,
          decision: InterceptDecision.HOLD,
          reason: 'Paste exceeds MAX_FILE_BYTES',
        },
        release,
      );
      return;
    }

    const outcome = await this.options.dispatch(interceptEvent);
    if (outcome.decision === InterceptDecision.ALLOW) {
      this.redispatchPaste(targetEl, text, snapshot);
      return;
    }
    this.options.onDecision?.(interceptEvent, outcome, release);
  }

  private redispatchPaste(target: EventTarget, text: string, files: readonly File[]): void {
    // Chrome often strips files from synthetic ClipboardEvents. Prefer handing
    // files to a real file input (ChatGPT upload path) so Allow once works.
    if (files.length > 0) {
      const input = findLikelyFileInput();
      if (input) {
        const dt = new DataTransfer();
        for (const file of files) {
          dt.items.add(file);
        }
        try {
          (input as HTMLInputElement & { files: FileList }).files = dt.files;
        } catch {
          Object.defineProperty(input, 'files', {
            value: dt.files,
            configurable: true,
          });
        }
        const change = new Event('change', { bubbles: true, cancelable: true });
        markApproved(change, this.nonce);
        input.dispatchEvent(change);
        const inputEvent = new Event('input', { bubbles: true, cancelable: true });
        markApproved(inputEvent, this.nonce);
        input.dispatchEvent(inputEvent);
        return;
      }
    }

    const dt = new DataTransfer();
    if (text) dt.setData('text/plain', text);
    for (const file of files) {
      dt.items.add(file);
    }
    const synthetic = new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      clipboardData: dt,
    });
    markApproved(synthetic, this.nonce);
    target.dispatchEvent(synthetic);
  }
}

function findLikelyFileInput(): HTMLInputElement | null {
  const scoped =
    document
      .querySelector('#prompt-textarea')
      ?.closest('form')
      ?.querySelector('input[type="file"]') ??
    document.querySelector('form input[type="file"]') ??
    document.querySelector('input[type="file"]');
  return scoped instanceof HTMLInputElement ? scoped : null;
}
