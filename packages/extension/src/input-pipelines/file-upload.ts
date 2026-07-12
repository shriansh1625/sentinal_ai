/**
 * File upload interception — PART_10 §5.2 / PART_17 upload pipeline.
 * Text-like files ≤ MAX_TEXT_SCAN_BYTES are scanned as text; others HOLD for OCR.
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
import { createApprovalNonce, isApproved, markApproved } from '../content/approval-nonce.js';
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
    if (isApproved(event, this.nonce)) return;
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.type !== 'file') return;

    const fileList = input.files;
    if (!fileList || fileList.length === 0) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const files: InterceptedFileMeta[] = [];
    let totalBytes = 0;
    for (const file of Array.from(fileList)) {
      totalBytes += file.size;
      files.push({
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        sizeBytes: file.size,
      });
    }

    if (totalBytes > MAX_FILE_BYTES || files.some((f) => f.sizeBytes > MAX_FILE_BYTES)) {
      const interceptEvent: InterceptEvent = {
        interceptId: this.options.createId?.() ?? createApprovalNonce(),
        kind: InterceptKind.FILE_UPLOAD,
        payload: { kind: 'files', files, totalBytes },
        targetHint: 'file-input',
        timestampMs: Date.now(),
      };
      this.options.onDecision?.(interceptEvent, {
        interceptId: interceptEvent.interceptId,
        decision: InterceptDecision.HOLD,
        reason: 'File exceeds MAX_FILE_BYTES',
      });
      input.value = '';
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

    if (fileList.length === 1) {
      const file = fileList.item(0);
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
      this.releaseFiles(input, fileList);
      return;
    }
    if (
      outcome.decision === InterceptDecision.REDACT &&
      outcome.redactedText !== undefined &&
      interceptEvent.payload.kind === 'text'
    ) {
      // Text file redaction: release original file only after user path — hold closed.
      this.options.onDecision?.(interceptEvent, outcome);
      input.value = '';
      return;
    }
    input.value = '';
    this.options.onDecision?.(interceptEvent, outcome);
  }

  private releaseFiles(input: HTMLInputElement, files: FileList): void {
    const dt = new DataTransfer();
    for (const file of Array.from(files)) {
      dt.items.add(file);
    }
    const clone = input.cloneNode(true) as HTMLInputElement;
    Object.defineProperty(clone, 'files', {
      value: dt.files,
      configurable: true,
    });
    input.parentNode?.replaceChild(clone, input);
    this.attachInput(clone);
    const change = new Event('change', { bubbles: true, cancelable: true });
    markApproved(change, this.nonce);
    clone.dispatchEvent(change);
  }
}
