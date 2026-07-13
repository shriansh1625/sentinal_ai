/**
 * Runtime message handlers — PART_10 / PART_11 / PART_13.
 */

import type { ConfigurationService, FeatureFlagService, Logger } from '@sentinel-shield/core';
import type { KvStorage } from '@sentinel-shield/browser-adapters';
import { createDetectionEngine, type DetectionEngine } from '@sentinel-shield/detection-engine';
import {
  InterceptDecision,
  MAX_TEXT_SCAN_BYTES,
  MessageType,
  type HealthCheckResult,
  type InterceptEvent,
  type InterceptOutcome,
  type IpcEnvelope,
  type PlatformTogglePayload,
} from '@sentinel-shield/shared-types';
import { CURRENT_SCHEMA_VERSION, SETTINGS_KEY } from '../lifecycle/migrations.js';
import {
  disablePlatform,
  enablePlatform,
  listEnabledPlatforms,
  type PermissionsApi,
  type ScriptingApi,
  type TabsApi,
} from '../lifecycle/registration.js';
import type { OffscreenManager } from '../offscreen/manager.js';
import type { MessageHandler } from './router.js';
import { scanResultToInterceptOutcome } from './scan-bridge.js';

export interface HandlerDeps {
  readonly storage: KvStorage;
  readonly scripting: ScriptingApi;
  readonly config: ConfigurationService;
  readonly flags: FeatureFlagService;
  readonly offscreen: OffscreenManager;
  readonly logger: Logger;
  readonly getVersion: () => string;
  readonly isSafeMode: () => Promise<boolean>;
  readonly detectionEngine?: DetectionEngine;
  readonly permissions?: PermissionsApi;
  readonly tabs?: TabsApi;
  readonly historyStore?: {
    append(entry: {
      readonly interceptId: string;
      readonly decision: string;
      readonly reason: string;
      readonly timestampMs: number;
    }): Promise<void>;
  };
}

export function createHandlers(deps: HandlerDeps): Partial<Record<MessageType, MessageHandler>> {
  const engine = deps.detectionEngine ?? createDetectionEngine();

  return {
    [MessageType.PING]: async (envelope) => {
      const payload = envelope.payload as { nonce?: string };
      return {
        nonce: payload.nonce ?? '',
        version: deps.getVersion(),
      };
    },

    [MessageType.HEALTH_CHECK]: async (): Promise<HealthCheckResult> => ({
      version: deps.getVersion(),
      schemaVersion: CURRENT_SCHEMA_VERSION,
      safeMode: await deps.isSafeMode(),
      offscreenReady: deps.offscreen.ready,
      telemetryEnabled: deps.flags.isEnabled('telemetryEnabled'),
    }),

    [MessageType.CONFIG_GET]: async () => deps.config.get(),

    [MessageType.FEATURE_FLAGS_GET]: async () => deps.flags.snapshot(),

    [MessageType.CONFIG_SET]: async (envelope) => {
      const patch = envelope.payload as Parameters<ConfigurationService['update']>[0];
      return deps.config.update(patch);
    },

    [MessageType.PLATFORM_LIST]: async () => listEnabledPlatforms(deps.storage),

    [MessageType.PLATFORM_ENABLE]: async (envelope) => {
      const { platformId } = envelope.payload as PlatformTogglePayload;
      await enablePlatform(
        deps.storage,
        deps.scripting,
        deps.logger,
        platformId,
        deps.permissions,
        deps.tabs,
      );
      return { platformId, enabled: true };
    },

    [MessageType.PLATFORM_DISABLE]: async (envelope) => {
      const { platformId } = envelope.payload as PlatformTogglePayload;
      await disablePlatform(deps.storage, deps.scripting, deps.logger, platformId, deps.tabs);
      return { platformId, enabled: false };
    },

    [MessageType.OFFSCREEN_ENSURE]: async () => {
      await deps.offscreen.ensureCreated();
      return { ready: true };
    },

    [MessageType.OFFSCREEN_PING]: async () => {
      deps.offscreen.notifyActivity();
      return { ready: deps.offscreen.ready };
    },

    [MessageType.CS_LIFECYCLE]: async (envelope) => {
      const payload = envelope.payload as { phase: string; tabId: number };
      deps.logger.info('content script lifecycle', {
        phase: payload.phase,
        tabId: payload.tabId,
      });
      return { acknowledged: true };
    },

    [MessageType.SW_ALIVE_PING]: async () => ({ ts: Date.now() }),

    [MessageType.INTERCEPT_EVENT]: async (envelope): Promise<InterceptOutcome> => {
      const event = envelope.payload as InterceptEvent;
      if (event.payload.kind === 'text') {
        if (event.payload.byteLength > MAX_TEXT_SCAN_BYTES) {
          return {
            interceptId: event.interceptId,
            decision: InterceptDecision.HOLD,
            reason: 'Text exceeds MAX_TEXT_SCAN_BYTES — hold (PART_17)',
          };
        }
        const result = engine.scanText({
          requestId: event.interceptId,
          text: event.payload.text,
        });
        deps.logger.info('tier1 scan complete', {
          kind: event.kind,
          risk: result.riskLevel,
          action: result.action,
          spans: result.spans.length,
          durationMs: Math.round(result.durationMs),
        });
        const outcome = scanResultToInterceptOutcome(event.interceptId, result, event.payload.text);
        if (deps.flags.isEnabled('historyEnabled') && deps.historyStore) {
          await deps.historyStore.append({
            interceptId: event.interceptId,
            decision: outcome.decision,
            reason: outcome.reason,
            timestampMs: Date.now(),
          });
        }
        return outcome;
      }
      deps.logger.info('file intercept held for OCR/PDF worker', {
        kind: event.kind,
        files: event.payload.files.length,
        totalBytes: event.payload.totalBytes,
      });
      return {
        interceptId: event.interceptId,
        decision: InterceptDecision.HOLD,
        reason: 'Binary/document requires OCR/PDF WASM — held until assets available (ADR-036)',
      };
    },

    [MessageType.SCAN_REQUEST]: async (envelope: IpcEnvelope) => {
      const payload = envelope.payload as { text?: string; requestId?: string };
      if (typeof payload.text !== 'string') {
        return {
          ok: false as const,
          error: 'NOT_READY' as const,
          requestId: envelope.requestId,
        };
      }
      return engine.scanText({
        requestId: payload.requestId ?? envelope.requestId,
        text: payload.text,
      });
    },
  };
}

export { SETTINGS_KEY };
