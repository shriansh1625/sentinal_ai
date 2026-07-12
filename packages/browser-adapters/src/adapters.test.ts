import { describe, expect, it } from 'vitest';
import { MessageType } from '@sentinel-shield/shared-types';
import {
  InProcessMessageBus,
  MemoryKvStorage,
  assertIpcEnvelope,
  createChromeMock,
  createEnvelope,
} from './index.js';

describe('storage + chrome mock', () => {
  it('round-trips values through memory storage', async () => {
    const storage = new MemoryKvStorage();
    await storage.set('k', { n: 1 });
    expect(await storage.get<{ n: number }>('k')).toEqual({ n: 1 });
    const chrome = createChromeMock({ storage });
    await chrome.storage.local.set({ a: 2 });
    expect(await chrome.storage.local.get('a')).toEqual({ a: 2 });
  });
});

describe('messaging', () => {
  it('accepts valid envelopes and rejects malformed', async () => {
    const envelope = createEnvelope(MessageType.PING, { nonce: 'n1' });
    expect(assertIpcEnvelope(envelope).type).toBe(MessageType.PING);
    expect(() => assertIpcEnvelope({ type: 'NOPE' })).toThrow(/Malformed/);

    const bus = new InProcessMessageBus();
    const seen: string[] = [];
    bus.subscribe((msg) => {
      seen.push(msg.type);
    });
    await bus.send(envelope);
    expect(seen).toEqual([MessageType.PING]);
  });
});
