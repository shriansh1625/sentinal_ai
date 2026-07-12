import { describe, expect, it } from 'vitest';
import {
  EncryptedKvStorage,
  MemoryKvStorage,
  MemorySessionKeyStore,
  encryptJson,
  decryptJson,
  generateDataKey,
  importAesKey,
} from './index.js';

describe('PART_19 encrypted storage', () => {
  it('round-trips AES-GCM envelopes', async () => {
    const raw = await generateDataKey();
    const key = await importAesKey(raw);
    const envelope = await encryptJson(key, { hello: 'world' }, 'aad-1');
    const value = await decryptJson<{ hello: string }>(key, envelope, 'aad-1');
    expect(value).toEqual({ hello: 'world' });
  });

  it('encrypts values in EncryptedKvStorage', async () => {
    const backing = new MemoryKvStorage();
    const session = new MemorySessionKeyStore();
    const secure = new EncryptedKvStorage(backing, session);
    await secure.initialize();
    await secure.set('appSettings', { version: 1 });
    const raw = await backing.get<string>('appSettings');
    expect(typeof raw).toBe('string');
    expect(raw?.includes('version')).toBe(false);
    expect(await secure.get<{ version: number }>('appSettings')).toEqual({ version: 1 });
  });
});
