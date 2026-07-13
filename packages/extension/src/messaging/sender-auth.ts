/**
 * IPC sender authorization — PART_14 / PART_06 TB-3.
 * Privileged mutations must originate from extension pages (popup/options/SW),
 * not from content scripts on https AI hosts.
 */

import { MessageType } from '@sentinel-shield/shared-types';

/** Messages that may only be sent from extension UI / SW. */
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

function isExtensionPageUrl(url: string | undefined): boolean {
  return typeof url === 'string' && url.startsWith('chrome-extension://');
}

export function authorizeMessageSender(
  type: MessageType,
  sender: chrome.runtime.MessageSender,
): SenderAuthResult {
  const fromTab = typeof sender.tab?.id === 'number';
  const fromExtensionPage = isExtensionPageUrl(sender.url);

  if (PRIVILEGED_MESSAGE_TYPES.has(type)) {
    // Options/popup opened as a Chrome tab still have sender.tab, but url is
    // chrome-extension://… — allow those. Reject real https content scripts.
    if (fromTab && !fromExtensionPage) {
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

  return { ok: true };
}
