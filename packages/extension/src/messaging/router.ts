/**
 * Message router — PART_10 §6.2 / PART_14.
 * Validate → authorize sender → IPC rate limit → scan rate limit → dispatch → respond.
 * Fail closed.
 *
 * Requirement: SS-OWN-001 §3 / PART_12 (MAX_IPC + MAX_SCANS per tab).
 * Threat: DoS via INTERCEPT_EVENT / SCAN_REQUEST flood (KI-022).
 * ADR: Architecture Freeze constants unchanged; wiring only.
 */

import {
  createIpcRateLimiter,
  createScanRateLimiter,
  type Logger,
  type SlidingWindowRateLimiter,
} from '@sentinel-shield/core';
import { assertIpcEnvelope } from '@sentinel-shield/browser-adapters';
import { MessageType, type IpcEnvelope, type IpcResponse } from '@sentinel-shield/shared-types';
import { authorizeMessageSender } from './sender-auth.js';

export type MessageHandler = (
  envelope: IpcEnvelope,
  sender: chrome.runtime.MessageSender,
) => Promise<unknown>;

export interface MessageRouterOptions {
  readonly handlers: Partial<Record<MessageType, MessageHandler>>;
  readonly logger: Logger;
  readonly rateLimiter?: SlidingWindowRateLimiter;
  /** Per-tab scan budget (INTERCEPT_EVENT / SCAN_REQUEST). Defaults to createScanRateLimiter(). */
  readonly scanRateLimiter?: SlidingWindowRateLimiter;
  readonly handlerTimeoutMs?: number;
  readonly isSafeMode?: () => Promise<boolean>;
  readonly safeModeAllowed?: ReadonlySet<MessageType>;
}

const DEFAULT_SAFE_MODE_ALLOWED = new Set<MessageType>([
  MessageType.PING,
  MessageType.HEALTH_CHECK,
  MessageType.CONFIG_GET,
  MessageType.FEATURE_FLAGS_GET,
]);

const SCAN_MESSAGE_TYPES = new Set<MessageType>([
  MessageType.INTERCEPT_EVENT,
  MessageType.SCAN_REQUEST,
]);

export class MessageRouter {
  private readonly rateLimiter: SlidingWindowRateLimiter;
  private readonly scanRateLimiter: SlidingWindowRateLimiter;
  private readonly handlerTimeoutMs: number;
  private readonly safeModeAllowed: ReadonlySet<MessageType>;

  constructor(private readonly options: MessageRouterOptions) {
    this.rateLimiter = options.rateLimiter ?? createIpcRateLimiter();
    this.scanRateLimiter = options.scanRateLimiter ?? createScanRateLimiter();
    this.handlerTimeoutMs = options.handlerTimeoutMs ?? 30_000;
    this.safeModeAllowed = options.safeModeAllowed ?? DEFAULT_SAFE_MODE_ALLOWED;
  }

  async handle(raw: unknown, sender: chrome.runtime.MessageSender): Promise<IpcResponse> {
    let envelope: IpcEnvelope;
    try {
      envelope = assertIpcEnvelope(raw);
    } catch {
      this.options.logger.warn('invalid message rejected', {
        tabId: sender.tab?.id ?? -1,
      });
      return {
        ok: false,
        requestId: 'unknown',
        error: 'INVALID_MESSAGE',
      };
    }

    const auth = authorizeMessageSender(envelope.type, sender);
    if (!auth.ok) {
      this.options.logger.warn('forbidden message rejected', {
        type: envelope.type,
        reason: auth.reason,
        tabId: sender.tab?.id ?? -1,
      });
      return {
        ok: false,
        requestId: envelope.requestId,
        error: 'FORBIDDEN',
      };
    }

    const tabKey = String(sender.tab?.id ?? envelope.tabId ?? 'extension');
    const limit = this.rateLimiter.allow(tabKey);
    if (!limit.allowed) {
      return {
        ok: false,
        requestId: envelope.requestId,
        error: 'RATE_LIMITED',
      };
    }

    if (SCAN_MESSAGE_TYPES.has(envelope.type)) {
      const scanLimit = this.scanRateLimiter.allow(`scan:${tabKey}`);
      if (!scanLimit.allowed) {
        return {
          ok: false,
          requestId: envelope.requestId,
          error: 'RATE_LIMITED',
        };
      }
    }

    if (this.options.isSafeMode && (await this.options.isSafeMode())) {
      if (!this.safeModeAllowed.has(envelope.type)) {
        return {
          ok: false,
          requestId: envelope.requestId,
          error: 'SAFE_MODE',
        };
      }
    }

    const handler = this.options.handlers[envelope.type];
    if (!handler) {
      return {
        ok: false,
        requestId: envelope.requestId,
        error: 'UNKNOWN_MESSAGE_TYPE',
      };
    }

    try {
      const data = await withTimeout(handler(envelope, sender), this.handlerTimeoutMs);
      return { ok: true, requestId: envelope.requestId, data };
    } catch (error) {
      if (error instanceof Error && error.message === 'TIMEOUT') {
        return { ok: false, requestId: envelope.requestId, error: 'TIMEOUT' };
      }
      this.options.logger.error('handler error', {
        type: envelope.type,
        message: error instanceof Error ? error.message : 'unknown',
      });
      return {
        ok: false,
        requestId: envelope.requestId,
        error: 'INTERNAL_ERROR',
      };
    }
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('TIMEOUT')), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error instanceof Error ? error : new Error(String(error)));
      },
    );
  });
}

export function attachChromeMessageListener(router: MessageRouter): void {
  chrome.runtime.onMessage.addListener((raw, sender, sendResponse) => {
    void router.handle(raw, sender).then(sendResponse);
    return true;
  });
}
