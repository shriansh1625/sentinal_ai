/**
 * Tier-1 detection engine barrel — PART_13 / ADR-002.
 * Pure: no chrome, network, or DOM APIs.
 */

export const DETECTION_ENGINE_PACKAGE = '@sentinel-shield/detection-engine' as const;
/** Research library expansion — catalog-driven Tier-1 (Engineering Excellence Phase A). */
export const DETECTION_ENGINE_SPRINT = 3 as const;
export const DETECTION_RESEARCH_CATALOG_MIN = 100 as const;

export {
  Tier1DetectionEngine,
  createDetectionEngine,
  type DetectionEngine,
  type TextScanInput,
} from './tier1.js';

export function assertDetectionEngineNotReady(): never {
  throw new Error('Use createDetectionEngine().scanText() — Tier-1 is available (Sprint 3).');
}

export type {
  ScanRequest,
  ScanResult,
  DetectionSpan,
  EntityType,
} from '@sentinel-shield/shared-types';
export { PolicyAction, RiskLevel } from '@sentinel-shield/shared-types';
export { getEntityKnowledge, ENTITY_KNOWLEDGE, type EntityKnowledge } from './knowledge/index.js';
export { luhnValid, ibanValid } from './checksum/index.js';
export { shannonEntropy } from './detectors/entropy.js';
export {
  DocumentPipeline,
  MimeFamily,
  planDocumentScan,
  sniffMagicBytes,
  type DocumentScanPlan,
  type DocumentScanRequest,
  type OcrPort,
  type PdfPort,
  type SniffResult,
} from './input/document.js';
export { redactText, buildSafePreview, type RedactionResult } from './redaction/index.js';
export {
  prepareForDetection,
  normalizeForDetection,
  stripZeroWidth,
  resolveSimpleStringConcat,
  collapseSpacedAlphanumerics,
  joinBrokenAlnumLines,
  decodeBasicHtmlEntities,
} from './preprocess/normalize.js';
export { decideAction } from './policy/decide.js';
export { runThreatSimulation, THREAT_CASES, type ThreatCase } from './security/threat-sim.js';
export {
  DETECTOR_CATALOG,
  getDetectorById,
  assertCatalogIntegrity,
  type DetectorSpec,
  type DetectorCategory,
  type DetectorSeverity,
  type EntropyPolicy,
} from './research/index.js';
export { findCatalogSpans } from './research/matcher.js';
