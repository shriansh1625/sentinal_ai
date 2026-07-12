/**
 * Drag-and-drop interception — PART_10 §5.2 / PART_17.
 */

import { MAX_FILE_BYTES, MAX_TEXT_SCAN_BYTES } from '@sentinel-shield/shared-types';
import {
  InterceptDecision,
  InterceptKind,
  type InterceptEvent,
  type InterceptOutcome,
  type InterceptedFileMeta,
} from '@sentinel-shield/shared-types';
import { createApprovalNonce, isApproved, markApproved } from '../content/approval-nonce.js';
import type { InterceptDispatcher, PendingRelease } from './paste.js';

export interface DragDropInterceptorOptions {
  readonly dispatch: InterceptDispatcher;
  readonly createId?: () => string;
  readonly onDecision?: (
    event: InterceptEvent,
    outcome: InterceptOutcome,
    release?: PendingRelease,
  ) => void;
}

export class DragDropInterceptor {
  private readonly nonce = createApprovalNonce();
  private attached = false;

  constructor(private readonly options: DragDropInterceptorOptions) {}

  attach(target: Document | Element = document): void {
    if (this.attached) return;
    target.addEventListener('dragover', this.onDragOver, true);
    target.addEventListener('drop', this.onDrop, true);
    this.attached = true;
  }

  detach(target: Document | Element = document): void {
    if (!this.attached) return;
    target.removeEventListener('dragover', this.onDragOver, true);
    target.removeEventListener('drop', this.onDrop, true);
    this.attached = false;
  }

  private readonly onDragOver = (event: Event): void => {
    event.preventDefault();
  };

  private readonly onDrop = (event: Event): void => {
    void this.handleDrop(event as DragEvent);
  };

  private async handleDrop(event: DragEvent): Promise<void> {
    if (isApproved(event, this.nonce)) return;

    const dt = event.dataTransfer;
    if (!dt) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const text = dt.getData('text/plain');
    const fileList = dt.files;
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

    const interceptId = this.options.createId?.() ?? createApprovalNonce();
    const target = event.target;
    if (!(target instanceof EventTarget)) return;

    let interceptEvent: InterceptEvent;
    if (files.length > 0) {
      if (totalBytes > MAX_FILE_BYTES) {
        interceptEvent = {
          interceptId,
          kind: InterceptKind.DRAG_DROP,
          payload: { kind: 'files', files, totalBytes },
          targetHint: 'drop-target',
          timestampMs: Date.now(),
        };
        this.options.onDecision?.(interceptEvent, {
          interceptId,
          decision: InterceptDecision.HOLD,
          reason: 'Drop exceeds MAX_FILE_BYTES',
        });
        return;
      }
      interceptEvent = {
        interceptId,
        kind: InterceptKind.DRAG_DROP,
        payload: { kind: 'files', files, totalBytes },
        targetHint: 'drop-target',
        timestampMs: Date.now(),
      };
    } else {
      const byteLength = new TextEncoder().encode(text).byteLength;
      if (byteLength > MAX_TEXT_SCAN_BYTES) {
        this.options.onDecision?.(
          {
            interceptId,
            kind: InterceptKind.DRAG_DROP,
            payload: { kind: 'text', text: '', byteLength },
            targetHint: 'drop-target',
            timestampMs: Date.now(),
          },
          {
            interceptId,
            decision: InterceptDecision.HOLD,
            reason: 'Drop text exceeds MAX_TEXT_SCAN_BYTES',
          },
        );
        return;
      }
      interceptEvent = {
        interceptId,
        kind: InterceptKind.DRAG_DROP,
        payload: { kind: 'text', text, byteLength },
        targetHint: 'drop-target',
        timestampMs: Date.now(),
      };
    }

    const outcome = await this.options.dispatch(interceptEvent);
    if (outcome.decision === InterceptDecision.ALLOW) {
      this.redispatchDrop(target, text, fileList);
      return;
    }
    if (
      outcome.decision === InterceptDecision.REDACT &&
      outcome.redactedText !== undefined &&
      interceptEvent.payload.kind === 'text'
    ) {
      this.redispatchDrop(target, outcome.redactedText, fileList);
      return;
    }
    this.options.onDecision?.(interceptEvent, outcome);
  }

  private redispatchDrop(target: EventTarget, text: string, files: FileList): void {
    const dt = new DataTransfer();
    if (text) dt.setData('text/plain', text);
    for (const file of Array.from(files)) {
      dt.items.add(file);
    }
    const synthetic = new DragEvent('drop', {
      bubbles: true,
      cancelable: true,
      dataTransfer: dt,
    });
    markApproved(synthetic, this.nonce);
    target.dispatchEvent(synthetic);
  }
}
