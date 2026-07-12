/**
 * Browser API mocks for unit/integration tests — PART_25 / Sprint 0.
 */

import type { KvStorage } from '../storage/index.js';
import { MemoryKvStorage } from '../storage/index.js';

export interface ChromeMock {
  storage: {
    local: {
      get: (
        keys?: string | string[] | Record<string, unknown> | null,
      ) => Promise<Record<string, unknown>>;
      set: (items: Record<string, unknown>) => Promise<void>;
      remove: (keys: string | string[]) => Promise<void>;
      clear: () => Promise<void>;
    };
  };
  runtime: {
    id: string;
    getManifest: () => { version: string };
    openOptionsPage: () => Promise<void>;
  };
}

export function createChromeMock(options?: {
  version?: string;
  id?: string;
  storage?: KvStorage;
}): ChromeMock {
  const store = options?.storage ?? new MemoryKvStorage();
  return {
    storage: {
      local: {
        async get(keys) {
          if (keys == null) {
            return {};
          }
          if (typeof keys === 'string') {
            const value = await store.get(keys);
            return value === undefined ? {} : { [keys]: value };
          }
          if (Array.isArray(keys)) {
            const out: Record<string, unknown> = {};
            for (const key of keys) {
              const value = await store.get(key);
              if (value !== undefined) {
                out[key] = value;
              }
            }
            return out;
          }
          const out: Record<string, unknown> = { ...keys };
          for (const key of Object.keys(keys)) {
            const value = await store.get(key);
            if (value !== undefined) {
              out[key] = value;
            }
          }
          return out;
        },
        async set(items) {
          for (const [key, value] of Object.entries(items)) {
            await store.set(key, value);
          }
        },
        async remove(keys) {
          const list = Array.isArray(keys) ? keys : [keys];
          for (const key of list) {
            await store.remove(key);
          }
        },
        async clear() {
          await store.clear();
        },
      },
    },
    runtime: {
      id: options?.id ?? 'sentinel-shield-mock',
      getManifest: () => ({ version: options?.version ?? '0.1.0' }),
      openOptionsPage: () => Promise.resolve(),
    },
  };
}
