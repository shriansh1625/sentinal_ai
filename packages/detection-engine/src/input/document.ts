/**
 * Document / OCR input router — PART_17 / PART_16 (Sprint 4).
 * Pure routing + magic-byte sniff. WASM OCR workers are hosted offscreen;
 * this module stays free of browser APIs and network I/O (callable from engine or SW).
 */

import { MAX_PDF_PAGES } from '@sentinel-shield/shared-types';

export const MimeFamily = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  PDF: 'PDF',
  ARCHIVE: 'ARCHIVE',
  OFFICE: 'OFFICE',
  UNKNOWN: 'UNKNOWN',
} as const;

export type MimeFamily = (typeof MimeFamily)[keyof typeof MimeFamily];

export interface SniffResult {
  readonly family: MimeFamily;
  readonly mime: string;
}

export function sniffMagicBytes(bytes: Uint8Array): SniffResult {
  if (bytes.length >= 4) {
    if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
      return { family: MimeFamily.PDF, mime: 'application/pdf' };
    }
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
      return { family: MimeFamily.IMAGE, mime: 'image/png' };
    }
    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
      return { family: MimeFamily.IMAGE, mime: 'image/jpeg' };
    }
    if (bytes[0] === 0x50 && bytes[1] === 0x4b) {
      return { family: MimeFamily.ARCHIVE, mime: 'application/zip' };
    }
  }
  let textLike = true;
  const n = Math.min(bytes.length, 512);
  for (let i = 0; i < n; i += 1) {
    const b = bytes[i] ?? 0;
    if (b === 0) {
      textLike = false;
      break;
    }
  }
  if (textLike) {
    return { family: MimeFamily.TEXT, mime: 'text/plain' };
  }
  return { family: MimeFamily.UNKNOWN, mime: 'application/octet-stream' };
}

export interface DocumentScanRequest {
  readonly requestId: string;
  readonly bytes: Uint8Array;
  readonly fileName?: string;
}

export interface DocumentScanPlan {
  readonly requestId: string;
  readonly family: MimeFamily;
  readonly mime: string;
  readonly requiresOcr: boolean;
  readonly requiresPdfParse: boolean;
  readonly maxPages: number;
}

export function planDocumentScan(request: DocumentScanRequest): DocumentScanPlan {
  const sniff = sniffMagicBytes(request.bytes);
  return {
    requestId: request.requestId,
    family: sniff.family,
    mime: sniff.mime,
    requiresOcr: sniff.family === MimeFamily.IMAGE,
    requiresPdfParse: sniff.family === MimeFamily.PDF,
    maxPages: MAX_PDF_PAGES,
  };
}

export interface OcrPort {
  recognize(imageBytes: Uint8Array): Promise<{ text: string; durationMs: number }>;
}

export interface PdfPort {
  extractText(pdfBytes: Uint8Array, maxPages: number): Promise<{ text: string; pages: number }>;
}

export class DocumentPipeline {
  constructor(
    private readonly ocr?: OcrPort,
    private readonly pdf?: PdfPort,
  ) {}

  async extractText(request: DocumentScanRequest): Promise<{
    text: string;
    plan: DocumentScanPlan;
    source: 'inline-text' | 'ocr' | 'pdf' | 'unavailable';
  }> {
    const plan = planDocumentScan(request);
    if (plan.family === MimeFamily.TEXT) {
      return {
        text: new TextDecoder().decode(request.bytes),
        plan,
        source: 'inline-text',
      };
    }
    if (plan.requiresOcr) {
      if (!this.ocr) {
        return { text: '', plan, source: 'unavailable' };
      }
      const result = await this.ocr.recognize(request.bytes);
      return { text: result.text, plan, source: 'ocr' };
    }
    if (plan.requiresPdfParse) {
      if (!this.pdf) {
        return { text: '', plan, source: 'unavailable' };
      }
      const result = await this.pdf.extractText(request.bytes, plan.maxPages);
      return { text: result.text, plan, source: 'pdf' };
    }
    return { text: '', plan, source: 'unavailable' };
  }
}
