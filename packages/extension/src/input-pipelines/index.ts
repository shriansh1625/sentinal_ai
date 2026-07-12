/**
 * Interception coordinator — PART_10 / PART_17.
 * Overlay for HOLD/BLOCK; never silent unscanned release (ADR-036).
 */

import { createEnvelope } from '@sentinel-shield/browser-adapters';
import {
  InterceptDecision,
  MessageType,
  type InterceptEvent,
  type InterceptOutcome,
  type IpcErrorResponse,
  type IpcSuccessResponse,
} from '@sentinel-shield/shared-types';
import { DecisionOverlay } from '../ui/overlay.js';
import { PasteInterceptor } from './paste.js';
import { FileUploadInterceptor } from './file-upload.js';
import { DragDropInterceptor } from './drag-drop.js';

export interface InterceptionController {
  start(): void;
  stop(): void;
}

function isOutcomeResponse(
  value: unknown,
): value is IpcSuccessResponse<InterceptOutcome> | IpcErrorResponse {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as { ok?: unknown; data?: unknown };
  return typeof record.ok === 'boolean';
}

async function dispatchToServiceWorker(event: InterceptEvent): Promise<InterceptOutcome> {
  try {
    const envelope = createEnvelope(MessageType.INTERCEPT_EVENT, event);
    const encoded = new TextEncoder().encode(JSON.stringify(envelope));
    // PART_17 text IPC budget enforced upstream; fail closed on oversized envelopes.
    if (encoded.byteLength > 1_200_000) {
      return {
        interceptId: event.interceptId,
        decision: InterceptDecision.HOLD,
        reason: 'IPC envelope exceeds text scan budget — hold (ADR-036)',
      };
    }
    const response: unknown = await chrome.runtime.sendMessage(envelope);
    if (isOutcomeResponse(response) && response.ok) {
      return response.data;
    }
  } catch {
    // SW unavailable — fail closed
  }
  return {
    interceptId: event.interceptId,
    decision: InterceptDecision.HOLD,
    reason: 'Scan path unavailable — holding content (ADR-036)',
  };
}

export function createInterceptionController(
  dispatch: (event: InterceptEvent) => Promise<InterceptOutcome> = dispatchToServiceWorker,
): InterceptionController {
  const overlay = new DecisionOverlay();

  const paste = new PasteInterceptor({
    dispatch,
    onDecision: (_event, outcome, release) => {
      overlay.show({
        outcome,
        onAction: (action) => {
          if (action === 'allow') {
            release.allowOriginal();
            return;
          }
          if (action === 'redact' && outcome.redactedText) {
            release.allowRedacted(outcome.redactedText);
          }
        },
      });
    },
  });

  const files = new FileUploadInterceptor({
    dispatch,
    onDecision: (_event, outcome) => {
      overlay.show({
        outcome,
        onAction: () => {
          /* file release only on ALLOW path inside interceptor */
        },
      });
    },
  });

  const drag = new DragDropInterceptor({
    dispatch,
    onDecision: (_event, outcome) => {
      overlay.show({
        outcome,
        onAction: () => undefined,
      });
    },
  });

  return {
    start() {
      paste.attach();
      files.attach();
      drag.attach();
    },
    stop() {
      overlay.hide();
      paste.detach();
      files.detach();
      drag.detach();
    },
  };
}

/** Pure helper for unit tests — Sprint 2 default decision. */
export function sprint2DefaultDecision(event: InterceptEvent): InterceptOutcome {
  return {
    interceptId: event.interceptId,
    decision: InterceptDecision.HOLD,
    reason: 'Tier-1 detection not ready — hold (Sprint 2 / ADR-036)',
  };
}
