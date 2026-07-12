import { describe, expect, it } from 'vitest';
import { assertWithinScanBudget, chunkText, estimateUtf8Bytes } from './index.js';

describe('Sprint 8 streaming helpers', () => {
  it('chunks text and estimates utf8 bytes', () => {
    const parts = [...chunkText('abcdefghij', 3)];
    expect(parts).toEqual(['abc', 'def', 'ghi', 'j']);
    expect(estimateUtf8Bytes('hi')).toBe(2);
    expect(() => assertWithinScanBudget(1)).not.toThrow();
  });
});
