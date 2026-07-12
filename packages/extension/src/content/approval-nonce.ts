/**
 * Approved-event nonce — PART_10 §5.2 / PART_17.
 * Re-dispatched events carry this so we do not re-intercept (fail closed if missing).
 */

export const SENTINEL_APPROVED_KEY = '__sentinelShieldApproved' as const;

export function markApproved(event: Event, nonce: string): void {
  Object.defineProperty(event, SENTINEL_APPROVED_KEY, {
    value: nonce,
    enumerable: false,
    configurable: false,
    writable: false,
  });
}

export function isApproved(event: Event, expectedNonce: string): boolean {
  const value = (event as unknown as Record<string, unknown>)[SENTINEL_APPROVED_KEY];
  return value === expectedNonce;
}

export function createApprovalNonce(random: () => number = Math.random): string {
  return `ss-${Date.now().toString(36)}-${Math.floor(random() * 1e9).toString(36)}`;
}
