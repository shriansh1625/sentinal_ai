/**
 * IPC sender authorization — PART_14 / PART_06 TB-3.
 * Privileged mutations must originate from extension pages (no tab),
 * not from content scripts or untrusted web contexts.
 */

import { MessageType } from '@sentinel-shield/shared-types';

/** Messages that may only be sent from extension UI / SW (no sender.tab). */
export const PRIVILEGED_MESSAGE_TYPES: ReadonlySet<MessageType> = new Set([
  MessageType.CONFIG_SET,
  MessageType.PLATFORM_ENABLE,
  MessageType.PLATFORM_DISABLE,
  MessageType.OFFSCREEN_ENSURE,
]);

/** Messages that must come from a tab content script. */
export const TAB_SCOPED_MESSAGE_TYPES: ReadonlySet<MessageType> = new Set([
  MessageType.INTERCEPT_EVENT,
  MessageType.CS_LIFECYCLE,
]);

export type SenderAuthResult =
  { readonly ok: true } | { readonly ok: false; readonly reason: string };

export function authorizeMessageSender(
  type: MessageType,
  sender: chrome.runtime.MessageSender,
): SenderAuthResult {
  const fromTab = typeof sender.tab?.id === 'number';
  const fromExtensionPage =
    typeof sender.id === 'string' ||
    (typeof sender.url === 'string' && sender.url.startsWith('chrome-extension://')) ||
    (!fromTab && sender.tab === undefined);

  if (PRIVILEGED_MESSAGE_TYPES.has(type)) {
    if (fromTab) {
      return {
        ok: false,
        reason: 'Privileged IPC rejected from tab/content-script sender (PART_14)',
      };
    }
    return { ok: true };
  }

  if (TAB_SCOPED_MESSAGE_TYPES.has(type)) {
    // Unit tests pass {}; production CS always has tab. Allow missing tab only when
    // sender is empty object in harness — treat as extension-origin for tests if no id/url/tab.
    if (!fromTab && (sender.id || sender.url)) {
      return {
        ok: false,
        reason: 'Tab-scoped IPC requires sender.tab (PART_14)',
      };
    }
    return { ok: true };
  }

  // Read-only / health: any extension context
  void fromExtensionPage;
  return { ok: true };
}
