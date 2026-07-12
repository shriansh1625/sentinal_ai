/**
 * WASM asset integrity pins — PART_16.
 * OCR/PDF binaries are optional; loader fails closed when missing or mismatched.
 */

export interface WasmAssetPin {
  readonly id: string;
  readonly path: string;
  readonly sha256: string;
  readonly optional: boolean;
}

/** Pins file is shipped empty until vendored WASM lands (pre-CWS). */
export const WASM_ASSET_PINS: readonly WasmAssetPin[] = [
  {
    id: 'tesseract-core',
    path: 'public/wasm/tesseract-core.wasm',
    sha256: '',
    optional: true,
  },
  {
    id: 'pdf-extract',
    path: 'public/wasm/pdf-extract.wasm',
    sha256: '',
    optional: true,
  },
];

export async function sha256Hex(bytes: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyWasmAsset(
  pin: WasmAssetPin,
  bytes: ArrayBuffer,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  if (!pin.sha256) {
    return { ok: false, reason: `Pin missing for ${pin.id} — refuse load (PART_16)` };
  }
  const hash = await sha256Hex(bytes);
  if (hash !== pin.sha256.toLowerCase()) {
    return { ok: false, reason: `Integrity mismatch for ${pin.id}` };
  }
  return { ok: true };
}

/**
 * OCR worker contract — returns unavailable until pinned WASM is present.
 */
export class OcrWasmLoader {
  constructor(private readonly fetchAsset: (path: string) => Promise<Response>) {}

  async tryLoad(pin: WasmAssetPin = WASM_ASSET_PINS[0]!): Promise<{
    available: boolean;
    reason: string;
  }> {
    try {
      const response = await this.fetchAsset(pin.path);
      if (!response.ok) {
        return { available: false, reason: `Asset HTTP ${response.status}` };
      }
      const bytes = await response.arrayBuffer();
      if (bytes.byteLength === 0) {
        return { available: false, reason: 'Empty WASM asset' };
      }
      const verified = await verifyWasmAsset(pin, bytes);
      if (!verified.ok) {
        return { available: false, reason: verified.reason };
      }
      return { available: true, reason: 'verified' };
    } catch (cause) {
      return {
        available: false,
        reason: cause instanceof Error ? cause.message : 'load failed',
      };
    }
  }
}
