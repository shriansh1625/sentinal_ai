/**
 * Settings / feature flag shapes — PART_21 (schema only; no I/O).
 * Defaults match DESIGN_OWNERSHIP_MATRIX §3.
 */

import {
  CLOUD_EXPLAIN_DEFAULT_ENABLED,
  CV_DEFAULT_ENABLED,
  HISTORY_DEFAULT_ENABLED,
  HISTORY_RETENTION_DAYS_DEFAULT,
  NER_DEFAULT_ENABLED,
  OCR_DEFAULT_ENABLED,
  TELEMETRY_DEFAULT_ENABLED,
  WASM_THREADS_DEFAULT,
} from '../constants/index.js';

export interface FeatureFlags {
  readonly nerEnabled: boolean;
  readonly cvEnabled: boolean;
  readonly ocrEnabled: boolean;
  readonly telemetryEnabled: boolean;
  readonly cloudExplainEnabled: boolean;
  readonly wasmThreadsEnabled: boolean;
  readonly historyEnabled: boolean;
}

export interface AppSettings {
  readonly version: 1;
  readonly featureFlags: FeatureFlags;
  readonly historyRetentionDays: number;
}

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  nerEnabled: NER_DEFAULT_ENABLED,
  cvEnabled: CV_DEFAULT_ENABLED,
  ocrEnabled: OCR_DEFAULT_ENABLED,
  telemetryEnabled: TELEMETRY_DEFAULT_ENABLED,
  cloudExplainEnabled: CLOUD_EXPLAIN_DEFAULT_ENABLED,
  wasmThreadsEnabled: WASM_THREADS_DEFAULT,
  historyEnabled: HISTORY_DEFAULT_ENABLED,
};

export const DEFAULT_APP_SETTINGS: AppSettings = {
  version: 1,
  featureFlags: DEFAULT_FEATURE_FLAGS,
  historyRetentionDays: HISTORY_RETENTION_DAYS_DEFAULT,
};
