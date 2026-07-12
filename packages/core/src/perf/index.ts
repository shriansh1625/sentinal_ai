/**
 * Performance instrumentation + memory monitoring — PART_23 budgets.
 * Telemetry export is separate and disabled by default.
 */

import { EXT_PEAK_MEM_MB } from '@sentinel-shield/shared-types';
import { ErrorCode, SentinelError } from '../errors/index.js';

export interface PerfMark {
  readonly name: string;
  readonly startedAtMs: number;
}

export interface PerfSample {
  readonly name: string;
  readonly durationMs: number;
}

export interface MemorySnapshot {
  readonly usedJsHeapBytes: number | null;
  readonly totalJsHeapBytes: number | null;
  readonly peakBudgetBytes: number;
  readonly withinBudget: boolean;
  readonly capturedAtMs: number;
}

export class PerformanceMonitor {
  private readonly active = new Map<string, PerfMark>();
  private readonly samples: PerfSample[] = [];

  start(name: string): void {
    this.active.set(name, { name, startedAtMs: performance.now() });
  }

  end(name: string): PerfSample {
    const mark = this.active.get(name);
    if (!mark) {
      throw new SentinelError({
        code: ErrorCode.NOT_INITIALIZED,
        message: `Perf mark not started: ${name}`,
        retriable: false,
      });
    }
    this.active.delete(name);
    const sample: PerfSample = {
      name,
      durationMs: performance.now() - mark.startedAtMs,
    };
    this.samples.push(sample);
    return sample;
  }

  getSamples(): readonly PerfSample[] {
    return this.samples;
  }

  clear(): void {
    this.active.clear();
    this.samples.length = 0;
  }
}

export interface MemoryProvider {
  read(): { usedJsHeapBytes: number | null; totalJsHeapBytes: number | null };
}

export class BrowserMemoryProvider implements MemoryProvider {
  read(): { usedJsHeapBytes: number | null; totalJsHeapBytes: number | null } {
    const perf = globalThis.performance as Performance & {
      memory?: { usedJSHeapSize: number; totalJSHeapSize: number };
    };
    if (!perf.memory) {
      return { usedJsHeapBytes: null, totalJsHeapBytes: null };
    }
    return {
      usedJsHeapBytes: perf.memory.usedJSHeapSize,
      totalJsHeapBytes: perf.memory.totalJSHeapSize,
    };
  }
}

export class MemoryMonitor {
  private readonly peakBudgetBytes = EXT_PEAK_MEM_MB * 1024 * 1024;

  constructor(private readonly provider: MemoryProvider) {}

  snapshot(): MemorySnapshot {
    const reading = this.provider.read();
    const withinBudget =
      reading.usedJsHeapBytes === null || reading.usedJsHeapBytes <= this.peakBudgetBytes;
    return {
      usedJsHeapBytes: reading.usedJsHeapBytes,
      totalJsHeapBytes: reading.totalJsHeapBytes,
      peakBudgetBytes: this.peakBudgetBytes,
      withinBudget,
      capturedAtMs: Date.now(),
    };
  }

  assertWithinBudget(): void {
    const snap = this.snapshot();
    if (!snap.withinBudget) {
      throw new SentinelError({
        code: ErrorCode.BUDGET_EXCEEDED,
        message: 'Extension memory peak budget exceeded',
        details: {
          usedJsHeapBytes: snap.usedJsHeapBytes ?? -1,
          peakBudgetBytes: snap.peakBudgetBytes,
        },
        retriable: false,
      });
    }
  }
}
