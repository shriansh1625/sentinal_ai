/**
 * Offscreen document manager — PART_10 §7 / PART_11 §7.2.
 * Idle close uses OFFSCREEN_IDLE_MS (SS-OWN-001).
 */

import { OFFSCREEN_IDLE_MS } from '@sentinel-shield/shared-types';
import { ErrorCode, SentinelError, type Logger } from '@sentinel-shield/core';

export const OFFSCREEN_DOCUMENT_PATH = 'offscreen.html';

export interface OffscreenApi {
  createDocument(parameters: {
    url: string;
    reasons: chrome.offscreen.Reason[];
    justification: string;
  }): Promise<void>;
  closeDocument(): Promise<void>;
}

export interface RuntimeContextsApi {
  getContexts(filter: {
    contextTypes?: chrome.runtime.ContextType[];
    documentUrls?: string[];
  }): Promise<chrome.runtime.ExtensionContext[]>;
  getURL(path: string): string;
}

export class OffscreenManager {
  private isCreated = false;
  private inactivityTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly offscreen: OffscreenApi,
    private readonly runtime: RuntimeContextsApi,
    private readonly logger: Logger,
    private readonly idleMs: number = OFFSCREEN_IDLE_MS,
    private readonly schedule: typeof setTimeout = setTimeout,
    private readonly clearSchedule: typeof clearTimeout = clearTimeout,
  ) {}

  async ensureCreated(): Promise<void> {
    if (this.isCreated) {
      this.notifyActivity();
      return;
    }

    const url = this.runtime.getURL(OFFSCREEN_DOCUMENT_PATH);
    const existing = await this.runtime.getContexts({
      contextTypes: ['OFFSCREEN_DOCUMENT' as chrome.runtime.ContextType],
      documentUrls: [url],
    });

    if (existing.length > 0) {
      this.isCreated = true;
      this.notifyActivity();
      this.logger.info('offscreen adopted existing context');
      return;
    }

    try {
      await this.offscreen.createDocument({
        url: OFFSCREEN_DOCUMENT_PATH,
        reasons: ['WORKERS' as chrome.offscreen.Reason],
        justification: 'Host Web Workers for WASM-based OCR and document processing (PART_10/16)',
      });
      this.isCreated = true;
      this.notifyActivity();
      this.logger.info('offscreen document created');
    } catch (cause) {
      // Race: another SW wake may have created it
      const again = await this.runtime.getContexts({
        contextTypes: ['OFFSCREEN_DOCUMENT' as chrome.runtime.ContextType],
        documentUrls: [url],
      });
      if (again.length > 0) {
        this.isCreated = true;
        this.notifyActivity();
        return;
      }
      throw new SentinelError({
        code: ErrorCode.UNKNOWN,
        message: 'Failed to create offscreen document',
        cause,
        retriable: true,
      });
    }
  }

  async close(): Promise<void> {
    if (!this.isCreated) {
      return;
    }
    if (this.inactivityTimer) {
      this.clearSchedule(this.inactivityTimer);
      this.inactivityTimer = null;
    }
    try {
      await this.offscreen.closeDocument();
    } catch {
      // Already closed — ignore
    }
    this.isCreated = false;
    this.logger.info('offscreen document closed');
  }

  notifyActivity(): void {
    if (this.inactivityTimer) {
      this.clearSchedule(this.inactivityTimer);
    }
    this.inactivityTimer = this.schedule(() => {
      void this.close();
    }, this.idleMs);
  }

  get ready(): boolean {
    return this.isCreated;
  }
}
