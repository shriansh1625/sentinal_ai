/**
 * Messaging abstraction — PART_10 IPC.
 * Validates envelope shape at the boundary; fail closed on malformed messages.
 */

import { ErrorCode, SentinelError, createRequestId } from '@sentinel-shield/core';
import { MessageType, type IpcEnvelope } from '@sentinel-shield/shared-types';

const MESSAGE_TYPES = new Set<string>(Object.values(MessageType));

export function isIpcEnvelope(value: unknown): value is IpcEnvelope {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate['type'] === 'string' &&
    MESSAGE_TYPES.has(candidate['type']) &&
    typeof candidate['requestId'] === 'string' &&
    (typeof candidate['tabId'] === 'number' || candidate['tabId'] === null) &&
    typeof candidate['timestampMs'] === 'number' &&
    'payload' in candidate
  );
}

export function assertIpcEnvelope(value: unknown): IpcEnvelope {
  if (!isIpcEnvelope(value)) {
    throw new SentinelError({
      code: ErrorCode.MESSAGING,
      message: 'Malformed IPC envelope',
      retriable: false,
    });
  }
  return value;
}

export function createEnvelope<TPayload>(
  type: IpcEnvelope['type'],
  payload: TPayload,
  tabId: number | null = null,
): IpcEnvelope<TPayload> {
  return {
    type,
    requestId: createRequestId(),
    tabId,
    timestampMs: Date.now(),
    payload,
  };
}

export interface MessageBus {
  send<TPayload, TResponse = unknown>(envelope: IpcEnvelope<TPayload>): Promise<TResponse>;
  subscribe(handler: (envelope: IpcEnvelope) => void | Promise<void>): () => void;
}

export class InProcessMessageBus implements MessageBus {
  private readonly handlers = new Set<(envelope: IpcEnvelope) => void | Promise<void>>();

  async send<TPayload, TResponse = unknown>(envelope: IpcEnvelope<TPayload>): Promise<TResponse> {
    assertIpcEnvelope(envelope);
    for (const handler of this.handlers) {
      await handler(envelope);
    }
    return undefined as TResponse;
  }

  subscribe(handler: (envelope: IpcEnvelope) => void | Promise<void>): () => void {
    this.handlers.add(handler);
    return () => {
      this.handlers.delete(handler);
    };
  }
}
