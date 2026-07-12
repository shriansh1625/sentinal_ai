import { describe, expect, it } from 'vitest';
import { SlidingWindowRateLimiter, createIpcRateLimiter, createScanRateLimiter } from './index.js';

describe('SlidingWindowRateLimiter', () => {
  it('allows up to limit then denies', () => {
    let now = 0;
    const limiter = new SlidingWindowRateLimiter(3, 1000, () => now);
    expect(limiter.allow('a').allowed).toBe(true);
    expect(limiter.allow('a').allowed).toBe(true);
    expect(limiter.allow('a').allowed).toBe(true);
    expect(limiter.allow('a').allowed).toBe(false);
    now = 1001;
    expect(limiter.allow('a').allowed).toBe(true);
  });

  it('uses frozen IPC and scan budgets', () => {
    expect(createIpcRateLimiter()).toBeInstanceOf(SlidingWindowRateLimiter);
    expect(createScanRateLimiter()).toBeInstanceOf(SlidingWindowRateLimiter);
  });
});
