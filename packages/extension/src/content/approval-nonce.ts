/**
 * Approved-event nonce — PART_10 §5.2 / PART_17.
 * Re-dispatched events carry this so we do not re-intercept (fail closed if missing).
 *
 * Cross-pipeline releases (paste-PDF → file input change) mark with one interceptor's
 * nonce; other pipelines accept any nonce registered by createApprovalNonce().
 */

export const SENTINEL_APPROVED_KEY = '__sentinelShieldApproved' as const;

const registeredNonces = new Set<string>();

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

/** True when the event was marked by any Sentinel interceptor in this world. */
export function isSentinelRelease(event: Event): boolean {
  const value = (event as unknown as Record<string, unknown>)[SENTINEL_APPROVED_KEY];
  return typeof value === 'string' && registeredNonces.has(value);
}

export function createApprovalNonce(random: () => number = Math.random): string {
  const nonce = `ss-${Date.now().toString(36)}-${Math.floor(random() * 1e9).toString(36)}`;
  registeredNonces.add(nonce);
  return nonce;
}
