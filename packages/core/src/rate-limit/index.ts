/**
 * Per-tab sliding-window rate limiter — PART_12 / SS-OWN-001 §3.
 */

import {
  MAX_IPC_MSG_PER_MIN_PER_TAB,
  MAX_SCANS_PER_MIN_PER_TAB,
} from '@sentinel-shield/shared-types';

export interface RateLimitDecision {
  readonly allowed: boolean;
  readonly remaining: number;
}

export class SlidingWindowRateLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number = 60_000,
    private readonly now: () => number = Date.now,
  ) {}

  allow(key: string): RateLimitDecision {
    const now = this.now();
    const cutoff = now - this.windowMs;
    const prior = this.hits.get(key) ?? [];
    const recent = prior.filter((t) => t > cutoff);
    if (recent.length >= this.limit) {
      this.hits.set(key, recent);
      return { allowed: false, remaining: 0 };
    }
    recent.push(now);
    this.hits.set(key, recent);
    return { allowed: true, remaining: this.limit - recent.length };
  }

  reset(key?: string): void {
    if (key === undefined) {
      this.hits.clear();
      return;
    }
    this.hits.delete(key);
  }
}

export function createIpcRateLimiter(): SlidingWindowRateLimiter {
  return new SlidingWindowRateLimiter(MAX_IPC_MSG_PER_MIN_PER_TAB);
}

export function createScanRateLimiter(): SlidingWindowRateLimiter {
  return new SlidingWindowRateLimiter(MAX_SCANS_PER_MIN_PER_TAB);
}
