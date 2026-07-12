/** Detection result shapes — PART_04 / PART_13 (types only; no detectors in Sprint 0). */

import type { EntityType, PolicyAction, RiskLevel } from '../entities/index.js';

export interface DetectionSpan {
  readonly start: number;
  readonly end: number;
  readonly entityType: EntityType;
  readonly confidence: number;
}

export interface ScanResult {
  readonly requestId: string;
  readonly riskLevel: RiskLevel;
  readonly action: PolicyAction;
  readonly spans: readonly DetectionSpan[];
  readonly durationMs: number;
}

export interface ScanRequest {
  readonly requestId: string;
  readonly tabId: number;
  readonly contentType: 'text' | 'file' | 'image';
  readonly byteLength: number;
}
