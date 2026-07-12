/**
 * IPC envelope types — PART_10 §IPC / PART_11 internal interfaces.
 * Schemas validated at the extension boundary; this package stays pure.
 */

export const MessageType = {
  PING: 'PING',
  PONG: 'PONG',
  HEALTH_CHECK: 'HEALTH_CHECK',
  SCAN_REQUEST: 'SCAN_REQUEST',
  SCAN_RESULT: 'SCAN_RESULT',
  SCAN_ERROR: 'SCAN_ERROR',
  CONFIG_GET: 'CONFIG_GET',
  CONFIG_SET: 'CONFIG_SET',
  FEATURE_FLAGS_GET: 'FEATURE_FLAGS_GET',
  PLATFORM_ENABLE: 'PLATFORM_ENABLE',
  PLATFORM_DISABLE: 'PLATFORM_DISABLE',
  PLATFORM_LIST: 'PLATFORM_LIST',
  OFFSCREEN_ENSURE: 'OFFSCREEN_ENSURE',
  OFFSCREEN_PING: 'OFFSCREEN_PING',
  CS_LIFECYCLE: 'CS_LIFECYCLE',
  SW_ALIVE_PING: 'SW_ALIVE_PING',
  INTERCEPT_EVENT: 'INTERCEPT_EVENT',
  INTERCEPT_DECISION: 'INTERCEPT_DECISION',
} as const;

export type MessageType = (typeof MessageType)[keyof typeof MessageType];

export interface IpcEnvelope<TPayload = unknown> {
  readonly type: MessageType;
  readonly requestId: string;
  readonly tabId: number | null;
  readonly timestampMs: number;
  readonly payload: TPayload;
}

export interface IpcSuccessResponse<T = unknown> {
  readonly ok: true;
  readonly requestId: string;
  readonly data: T;
}

export interface IpcErrorResponse {
  readonly ok: false;
  readonly requestId: string;
  readonly error:
    | 'INVALID_MESSAGE'
    | 'RATE_LIMITED'
    | 'UNKNOWN_MESSAGE_TYPE'
    | 'TIMEOUT'
    | 'INTERNAL_ERROR'
    | 'FORBIDDEN'
    | 'NOT_READY'
    | 'SAFE_MODE';
}

export type IpcResponse<T = unknown> = IpcSuccessResponse<T> | IpcErrorResponse;

export interface PingPayload {
  readonly nonce: string;
}

export interface PongPayload {
  readonly nonce: string;
  readonly version: string;
}

export interface HealthCheckPayload {
  readonly readonly?: true;
}

export interface HealthCheckResult {
  readonly version: string;
  readonly schemaVersion: number;
  readonly safeMode: boolean;
  readonly offscreenReady: boolean;
  readonly telemetryEnabled: boolean;
}

export interface PlatformTogglePayload {
  readonly platformId: string;
}

export interface CsLifecyclePayload {
  readonly phase: 'init' | 'spa-nav' | 'teardown';
  readonly tabId: number;
}
