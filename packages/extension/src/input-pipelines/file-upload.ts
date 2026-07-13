/**
 * File upload interception — PART_10 §5.2 / PART_17 upload pipeline.
 * Text-like files ≤ MAX_TEXT_SCAN_BYTES are scanned as text; others HOLD for OCR.
 *
 * HOLD must NOT clear the input: ChatGPT/React keep a live reference to the same
 * <input type="file">. Clearing + cloning breaks Allow once. On Allow we re-fire
 * an approved `change` on the same node so the page sees the still-attached files.
 */

import { MAX_FILE_BYTES, MAX_TEXT_SCAN_BYTES } from '@sentinel-shield/shared-types';
import {
  InterceptDecision,
  InterceptKind,
  type InterceptEvent,
  type InterceptOutcome,
  type InterceptedFileMeta,
} from '@sentinel-shield/shared-types';
import { MimeFamily, sniffMagicBytes } from '@sentinel-shield/detection-engine';
import {
  createApprovalNonce,
  isApproved,
  isSentinelRelease,
  markApproved,
} from '../content/approval-nonce.js';
import { findFileInputs } from './context.js';
import type { InterceptDispatcher, PendingRelease } from './paste.js';

export interface FileUploadInterceptorOptions {
  readonly dispatch: InterceptDispatcher;
  readonly createId?: () => string;
  readonly onDecision?: (
    event: InterceptEvent,
    outcome: InterceptOutcome,
    release?: PendingRelease,
  ) => void;
}

export class FileUploadInterceptor {
  private readonly nonce = createApprovalNonce();
  private readonly attached = new WeakSet<HTMLInputElement>();
  private observer: MutationObserver | null = null;

  constructor(private readonly options: FileUploadInterceptorOptions) {}

  attach(root: ParentNode = document): void {
    for (const input of findFileInputs(root)) {
      this.attachInput(input);
    }
    if (typeof MutationObserver !== 'undefined') {
      this.observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of Array.from(mutation.addedNodes)) {
            if (node instanceof HTMLInputElement && node.type === 'file') {
              this.attachInput(node);
            } else if (node instanceof HTMLElement) {
              for (const input of findFileInputs(node)) {
                this.attachInput(input);
              }
            }
          }
        }
      });
      this.observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  detach(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  private attachInput(input: HTMLInputElement): void {
    if (this.attached.has(input)) return;
    this.attached.add(input);
    input.addEventListener('change', this.onChange, true);
  }

  private readonly onChange = (event: Event): void => {
    void this.handleChange(event);
  };

  private async handleChange(event: Event): Promise<void> {
    if (isApproved(event, this.nonce) || isSentinelRelease(event)) return;
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.type !== 'file') return;

    const fileList = input.files;
    if (!fileList || fileList.length === 0) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const snapshot = Array.from(fileList);
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
      allowOriginal: () => this.releaseFiles(input, snapshot),
      allowRedacted: () => this.releaseFiles(input, snapshot),
      discard: () => {
        if (input.isConnected) {
          input.value = '';
        }
      },
    };

    if (totalBytes > MAX_FILE_BYTES || files.some((f) => f.sizeBytes > MAX_FILE_BYTES)) {
      const interceptEvent: InterceptEvent = {
        interceptId: this.options.createId?.() ?? createApprovalNonce(),
        kind: InterceptKind.FILE_UPLOAD,
        payload: { kind: 'files', files, totalBytes },
        targetHint: 'file-input',
        timestampMs: Date.now(),
      };
      // Keep files on input for Allow once; only Block clears.
      this.options.onDecision?.(
        interceptEvent,
        {
          interceptId: interceptEvent.interceptId,
          decision: InterceptDecision.HOLD,
          reason: 'File exceeds MAX_FILE_BYTES',
        },
        {
          allowOriginal: () => this.releaseFiles(input, snapshot),
          allowRedacted: () => this.releaseFiles(input, snapshot),
        },
      );
      return;
    }

    const interceptId = this.options.createId?.() ?? createApprovalNonce();
    let interceptEvent: InterceptEvent = {
      interceptId,
      kind: InterceptKind.FILE_UPLOAD,
      payload: { kind: 'files', files, totalBytes },
      targetHint: 'file-input',
      timestampMs: Date.now(),
    };

    if (snapshot.length === 1) {
      const file = snapshot[0];
      if (file && file.size <= MAX_TEXT_SCAN_BYTES) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const sniff = sniffMagicBytes(bytes);
        if (sniff.family === MimeFamily.TEXT) {
          const text = new TextDecoder().decode(bytes);
          interceptEvent = {
            interceptId,
            kind: InterceptKind.FILE_UPLOAD,
            payload: { kind: 'text', text, byteLength: bytes.byteLength },
            targetHint: 'file-input',
            timestampMs: Date.now(),
          };
        }
      }
    }

    const outcome = await this.options.dispatch(interceptEvent);
    if (outcome.decision === InterceptDecision.ALLOW) {
      this.releaseFiles(input, snapshot);
      return;
    }
    if (outcome.decision === InterceptDecision.BLOCK) {
      input.value = '';
      this.options.onDecision?.(interceptEvent, outcome);
      return;
    }
    // HOLD / REDACT: keep FileList on the same input so React still owns the node.
    this.options.onDecision?.(interceptEvent, outcome, release);
  }

  /**
   * Re-notify the page that files are selected, without replacing the DOM node
   * (cloning breaks React-controlled ChatGPT upload inputs).
   */
  private releaseFiles(original: HTMLInputElement, files: readonly File[]): void {
    const input = resolveLiveFileInput(original);
    if (!input) {
      return;
    }
    this.attachInput(input);

    const dt = new DataTransfer();
    for (const file of files) {
      dt.items.add(file);
    }

    const hasFiles = Boolean(input.files && input.files.length > 0);
    if (!hasFiles) {
      try {
        // Chromium supports assigning DataTransfer.files to input.files.
        (input as HTMLInputElement & { files: FileList }).files = dt.files;
      } catch {
        Object.defineProperty(input, 'files', {
          value: dt.files,
          configurable: true,
        });
      }
    }

    const change = new Event('change', { bubbles: true, cancelable: true });
    markApproved(change, this.nonce);
    input.dispatchEvent(change);

    // Some hosts also listen for input.
    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    markApproved(inputEvent, this.nonce);
    input.dispatchEvent(inputEvent);
  }
}

function resolveLiveFileInput(original: HTMLInputElement): HTMLInputElement | null {
  if (original.isConnected) {
    return original;
  }
  const candidates = findFileInputs(document);
  return candidates[0] ?? null;
}
