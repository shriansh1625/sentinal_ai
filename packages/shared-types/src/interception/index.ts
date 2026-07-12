/**
 * Interception types — PART_10 / PART_17.
 */

export const InterceptKind = {
  PASTE: 'PASTE',
  FILE_UPLOAD: 'FILE_UPLOAD',
  DRAG_DROP: 'DRAG_DROP',
} as const;

export type InterceptKind = (typeof InterceptKind)[keyof typeof InterceptKind];

export interface InterceptedTextPayload {
  readonly kind: 'text';
  readonly text: string;
  readonly byteLength: number;
}

export interface InterceptedFileMeta {
  readonly name: string;
  readonly mimeType: string;
  readonly sizeBytes: number;
}

export interface InterceptedFilesPayload {
  readonly kind: 'files';
  readonly files: readonly InterceptedFileMeta[];
  readonly totalBytes: number;
}

export type InterceptPayload = InterceptedTextPayload | InterceptedFilesPayload;

export interface InterceptEvent {
  readonly interceptId: string;
  readonly kind: InterceptKind;
  readonly payload: InterceptPayload;
  readonly targetHint: 'ai-input' | 'file-input' | 'drop-target' | 'unknown';
  readonly timestampMs: number;
}

export const InterceptDecision = {
  /** Sprint 2: hold until scan path exists; never silent release (ADR-036). */
  HOLD: 'HOLD',
  ALLOW: 'ALLOW',
  BLOCK: 'BLOCK',
  REDACT: 'REDACT',
} as const;

export type InterceptDecision = (typeof InterceptDecision)[keyof typeof InterceptDecision];

export interface InterceptOutcome {
  readonly interceptId: string;
  readonly decision: InterceptDecision;
  readonly reason: string;
  /** Present when spans were redacted for REDACT / overlay actions (PART_18). */
  readonly redactedText?: string;
  /** Safe preview for overlay (PART_10 §5.4 / PART_18). */
  readonly preview?: string;
  readonly riskLevel?: string;
  readonly spanCount?: number;
}
