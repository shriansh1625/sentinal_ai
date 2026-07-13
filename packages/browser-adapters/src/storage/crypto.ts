/**
 * PART_19 secure storage foundation — AES-256-GCM at rest.
 * Tier-1 (no passphrase): raw key material in chrome.storage.session,
 * re-imported as non-extractable CryptoKey on each wake (DEF-01 fix).
 * KDF: PBKDF2-HMAC-SHA256 @ 600_000 when wrapping with passphrase;
 * Argon2id params reserved via shared-types constants for hash-wasm path.
 */

import {
  AES_GCM_IV_BYTES,
  ARGON2ID_M_KIB,
  ARGON2ID_P,
  ARGON2ID_T,
  PBKDF2_ITERATIONS,
} from '@sentinel-shield/shared-types';
import { ErrorCode, SentinelError } from '@sentinel-shield/core';
import type { KvStorage } from './types.js';

export const CRYPTO_META_KEY = '__sentinel_crypto_meta_v1';
export const SESSION_KEY_MATERIAL = '__sentinel_session_key_v1';

export interface CryptoMeta {
  readonly version: 1;
  readonly kdf: 'raw-session' | 'pbkdf2-sha256' | 'argon2id';
  readonly saltB64: string;
  readonly pbkdf2Iterations: number;
  readonly argon2: { readonly m: number; readonly t: number; readonly p: number };
}

export interface SessionKeyStore {
  get(): Promise<Uint8Array | undefined>;
  set(bytes: Uint8Array): Promise<void>;
  clear(): Promise<void>;
}

function toB64(bytes: Uint8Array): string {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}

function fromB64(value: string): Uint8Array {
  const bin = atob(value);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

function asBufferSource(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

export async function generateDataKey(): Promise<Uint8Array> {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bytes;
}

export async function importAesKey(raw: Uint8Array): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', asBufferSource(raw), { name: 'AES-GCM' }, false, [
    'encrypt',
    'decrypt',
  ]);
}

export async function derivePbkdf2Key(
  passphrase: string,
  salt: Uint8Array,
  iterations: number = PBKDF2_ITERATIONS,
): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey'],
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: asBufferSource(salt),
      iterations,
      hash: 'SHA-256',
    },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

/** Canonical Argon2id params (SS-OWN-001) for hash-wasm wiring. */
export const ARGON2ID_PARAMS = {
  m: ARGON2ID_M_KIB,
  t: ARGON2ID_T,
  p: ARGON2ID_P,
} as const;

/**
 * Primary KDF — PART_19 Argon2id via hash-wasm when available.
 * Falls back to PBKDF2-600k if WASM import fails.
 */
export async function derivePassphraseKey(
  passphrase: string,
  salt: Uint8Array,
): Promise<{ key: CryptoKey; kdf: CryptoMeta['kdf'] }> {
  try {
    const key = await deriveArgon2idKey(passphrase, salt);
    return { key, kdf: 'argon2id' };
  } catch {
    const key = await derivePbkdf2Key(passphrase, salt);
    return { key, kdf: 'pbkdf2-sha256' };
  }
}

export async function deriveArgon2idKey(
  passphrase: string,
  salt: Uint8Array,
  params: { m: number; t: number; p: number } = ARGON2ID_PARAMS,
): Promise<CryptoKey> {
  const { argon2id } = await import('hash-wasm');
  const hashHex = await argon2id({
    password: passphrase,
    salt,
    parallelism: params.p,
    iterations: params.t,
    memorySize: params.m,
    hashLength: 32,
    outputType: 'hex',
  });
  const raw = new Uint8Array(hashHex.length / 2);
  for (let i = 0; i < raw.length; i += 1) {
    raw[i] = Number.parseInt(hashHex.slice(i * 2, i * 2 + 2), 16);
  }
  return importAesKey(raw);
}

export async function encryptJson(key: CryptoKey, value: unknown, aad: string): Promise<string> {
  const iv = new Uint8Array(AES_GCM_IV_BYTES);
  crypto.getRandomValues(iv);
  const plaintext = new TextEncoder().encode(JSON.stringify(value));
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: asBufferSource(iv),
        additionalData: new TextEncoder().encode(aad),
      },
      key,
      plaintext,
    ),
  );
  return JSON.stringify({
    v: 1,
    iv: toB64(iv),
    ct: toB64(ciphertext),
  });
}

export async function decryptJson<T>(key: CryptoKey, envelope: string, aad: string): Promise<T> {
  const parsed = JSON.parse(envelope) as { v: number; iv: string; ct: string };
  if (parsed.v !== 1) {
    throw new SentinelError({
      code: ErrorCode.STORAGE,
      message: 'Unsupported crypto envelope',
      retriable: false,
    });
  }
  const plain = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: asBufferSource(fromB64(parsed.iv)),
      additionalData: new TextEncoder().encode(aad),
    },
    key,
    asBufferSource(fromB64(parsed.ct)),
  );
  return JSON.parse(new TextDecoder().decode(plain)) as T;
}

export class ChromeSessionKeyStore implements SessionKeyStore {
  async get(): Promise<Uint8Array | undefined> {
    const result = await chrome.storage.session.get(SESSION_KEY_MATERIAL);
    const value = result[SESSION_KEY_MATERIAL] as string | undefined;
    return value ? fromB64(value) : undefined;
  }

  async set(bytes: Uint8Array): Promise<void> {
    await chrome.storage.session.set({ [SESSION_KEY_MATERIAL]: toB64(bytes) });
  }

  async clear(): Promise<void> {
    await chrome.storage.session.remove(SESSION_KEY_MATERIAL);
  }
}

export class MemorySessionKeyStore implements SessionKeyStore {
  private bytes: Uint8Array | undefined;

  async get(): Promise<Uint8Array | undefined> {
    return this.bytes;
  }

  async set(bytes: Uint8Array): Promise<void> {
    this.bytes = bytes;
  }

  async clear(): Promise<void> {
    this.bytes = undefined;
  }
}

/**
 * Encrypts selected keys at rest in a backing KvStorage.
 * Non-sensitive keys can pass through via `plaintextKeys`.
 *
 * Session key material lives in chrome.storage.session and is wiped when the
 * browser session ends or the extension is reloaded in Developer mode. Orphaned
 * ciphertext cannot be decrypted — initialize() clears local data and starts fresh.
 */
export class EncryptedKvStorage implements KvStorage {
  private aesKey: CryptoKey | null = null;

  constructor(
    private readonly backing: KvStorage,
    private readonly sessionKeys: SessionKeyStore,
    private readonly plaintextKeys: ReadonlySet<string> = new Set([CRYPTO_META_KEY]),
  ) {}

  async initialize(): Promise<void> {
    let raw = await this.sessionKeys.get();
    if (!raw) {
      // Unrecoverable without the session key — drop stale envelopes (PART_19).
      await this.backing.clear();
      raw = await generateDataKey();
      await this.sessionKeys.set(raw);
      const salt = new Uint8Array(16);
      crypto.getRandomValues(salt);
      const meta: CryptoMeta = {
        version: 1,
        kdf: 'raw-session',
        saltB64: toB64(salt),
        pbkdf2Iterations: PBKDF2_ITERATIONS,
        argon2: ARGON2ID_PARAMS,
      };
      await this.backing.set(CRYPTO_META_KEY, meta);
    }
    this.aesKey = await importAesKey(raw);
  }

  private async key(): Promise<CryptoKey> {
    if (!this.aesKey) {
      await this.initialize();
    }
    if (!this.aesKey) {
      throw new SentinelError({
        code: ErrorCode.STORAGE,
        message: 'Crypto key not initialized',
        retriable: false,
      });
    }
    return this.aesKey;
  }

  async get<T>(storageKey: string): Promise<T | undefined> {
    if (this.plaintextKeys.has(storageKey)) {
      return this.backing.get<T>(storageKey);
    }
    const envelope = await this.backing.get<string>(storageKey);
    if (envelope === undefined) return undefined;
    try {
      return await decryptJson<T>(await this.key(), envelope, storageKey);
    } catch {
      // Stale ciphertext after session-key rotation — drop and treat as miss.
      await this.backing.remove(storageKey);
      return undefined;
    }
  }

  async set<T>(storageKey: string, value: T): Promise<void> {
    if (this.plaintextKeys.has(storageKey)) {
      await this.backing.set(storageKey, value);
      return;
    }
    const envelope = await encryptJson(await this.key(), value, storageKey);
    await this.backing.set(storageKey, envelope);
  }

  async remove(storageKey: string): Promise<void> {
    await this.backing.remove(storageKey);
  }

  async clear(): Promise<void> {
    await this.backing.clear();
    await this.sessionKeys.clear();
    this.aesKey = null;
  }
}
