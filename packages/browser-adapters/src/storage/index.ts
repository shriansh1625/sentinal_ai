/**
 * Storage abstraction — PART_19.
 */

import { ErrorCode, SentinelError } from '@sentinel-shield/core';
import type { KvStorage } from './types.js';

export type { KvStorage } from './types.js';

export class MemoryKvStorage implements KvStorage {
  private readonly map = new Map<string, unknown>();

  get<T>(key: string): Promise<T | undefined> {
    return Promise.resolve(this.map.get(key) as T | undefined);
  }

  set<T>(key: string, value: T): Promise<void> {
    this.map.set(key, value);
    return Promise.resolve();
  }

  remove(key: string): Promise<void> {
    this.map.delete(key);
    return Promise.resolve();
  }

  clear(): Promise<void> {
    this.map.clear();
    return Promise.resolve();
  }
}
export class ChromeLocalStorage implements KvStorage {
  constructor(private readonly area: chrome.storage.StorageArea = chrome.storage.local) {}

  async get<T>(key: string): Promise<T | undefined> {
    try {
      const result = await this.area.get(key);
      return result[key] as T | undefined;
    } catch (cause) {
      throw new SentinelError({
        code: ErrorCode.STORAGE,
        message: 'chrome.storage.local.get failed',
        cause,
        retriable: true,
      });
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await this.area.set({ [key]: value });
    } catch (cause) {
      throw new SentinelError({
        code: ErrorCode.STORAGE,
        message: 'chrome.storage.local.set failed',
        cause,
        retriable: true,
      });
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await this.area.remove(key);
    } catch (cause) {
      throw new SentinelError({
        code: ErrorCode.STORAGE,
        message: 'chrome.storage.local.remove failed',
        cause,
        retriable: true,
      });
    }
  }

  async clear(): Promise<void> {
    try {
      await this.area.clear();
    } catch (cause) {
      throw new SentinelError({
        code: ErrorCode.STORAGE,
        message: 'chrome.storage.local.clear failed',
        cause,
        retriable: true,
      });
    }
  }
}

export {
  ARGON2ID_PARAMS,
  CRYPTO_META_KEY,
  ChromeSessionKeyStore,
  EncryptedKvStorage,
  MemorySessionKeyStore,
  SESSION_KEY_MATERIAL,
  decryptJson,
  deriveArgon2idKey,
  derivePassphraseKey,
  derivePbkdf2Key,
  encryptJson,
  generateDataKey,
  importAesKey,
  type CryptoMeta,
  type SessionKeyStore,
} from './crypto.js';
