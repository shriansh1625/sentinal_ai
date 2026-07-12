/**
 * Encrypted scan-history store — PART_19 / PART_22.
 * Default OFF via feature flag; never stores raw paste content.
 */

import { HISTORY_RETENTION_DAYS_DEFAULT } from '@sentinel-shield/shared-types';
import type { KvStorage } from '@sentinel-shield/browser-adapters';

export const HISTORY_STORAGE_KEY = 'sentinel_history_v1';

export interface HistoryEntry {
  readonly id: string;
  readonly interceptId: string;
  readonly decision: string;
  readonly reason: string;
  readonly timestampMs: number;
}

export interface HistoryStore {
  append(entry: Omit<HistoryEntry, 'id'>): Promise<void>;
  list(): Promise<readonly HistoryEntry[]>;
  clear(): Promise<void>;
}

export class EncryptedHistoryStore implements HistoryStore {
  constructor(
    private readonly storage: KvStorage,
    private readonly retentionDays: number = HISTORY_RETENTION_DAYS_DEFAULT,
  ) {}

  async append(entry: Omit<HistoryEntry, 'id'>): Promise<void> {
    const existing = await this.listMutable();
    const next: HistoryEntry = {
      id: `${entry.timestampMs}-${entry.interceptId}`,
      ...entry,
    };
    existing.push(next);
    const cutoff = Date.now() - this.retentionDays * 86_400_000;
    const pruned = existing.filter((e) => e.timestampMs >= cutoff).slice(-500);
    await this.storage.set(HISTORY_STORAGE_KEY, pruned);
  }

  async list(): Promise<readonly HistoryEntry[]> {
    return this.listMutable();
  }

  async clear(): Promise<void> {
    await this.storage.remove(HISTORY_STORAGE_KEY);
  }

  private async listMutable(): Promise<HistoryEntry[]> {
    return (await this.storage.get<HistoryEntry[]>(HISTORY_STORAGE_KEY)) ?? [];
  }
}
