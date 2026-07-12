/**
 * Offscreen worker pool host — PART_10 §7.2 / PART_12 / PART_16.
 * Sprint 4: pool lifecycle + stub workers (OCR WASM binary lands with assets).
 */

export type WorkerType = 'ocr' | 'pdf' | 'document';

export interface WorkerJob {
  readonly type: WorkerType;
  readonly requestId: string;
  readonly payload: ArrayBuffer;
}

export interface WorkerResult {
  readonly requestId: string;
  readonly ok: boolean;
  readonly text?: string;
  readonly error?: string;
  readonly durationMs: number;
}

type PoolEntry = {
  status: 'idle' | 'busy';
  lastUsed: number;
};

/**
 * In-process stub pool used until real Worker scripts are bundled.
 * Integrity pin check via WASM_ASSET_PINS — empty pin → unavailable (fail closed).
 */
export class WorkerPool {
  private readonly entries = new Map<WorkerType, PoolEntry>();
  private readonly queue: Array<{
    job: WorkerJob;
    resolve: (r: WorkerResult) => void;
  }> = [];

  async dispatch(job: WorkerJob): Promise<WorkerResult> {
    const started = performance.now();
    let entry = this.entries.get(job.type);
    if (!entry) {
      entry = { status: 'idle', lastUsed: Date.now() };
      this.entries.set(job.type, entry);
    }
    if (entry.status === 'busy') {
      return new Promise<WorkerResult>((resolve) => {
        this.queue.push({ job, resolve });
      });
    }
    entry.status = 'busy';
    entry.lastUsed = Date.now();
    try {
      // PART_16: refuse OCR until integrity-pinned WASM is vendored.
      return {
        requestId: job.requestId,
        ok: false,
        error: 'OCR/PDF WASM not vendored — fail closed (PART_16)',
        text: '',
        durationMs: performance.now() - started,
      };
    } finally {
      entry.status = 'idle';
      const next = this.queue.shift();
      if (next) {
        void this.dispatch(next.job).then(next.resolve);
      }
    }
  }

  size(): number {
    return this.entries.size;
  }
}
