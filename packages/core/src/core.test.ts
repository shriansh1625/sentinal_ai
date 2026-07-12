import { describe, expect, it } from 'vitest';
import {
  AllowlistLogger,
  ConfigurationService,
  Container,
  createToken,
  ErrorCode,
  FeatureFlagService,
  InMemorySettingsStore,
  MemoryLogSink,
  MemoryMonitor,
  NullTelemetryTransport,
  PerformanceMonitor,
  SentinelError,
  TELEMETRY_BOOTSTRAP_ENABLED,
  TelemetryService,
  createRequestId,
} from './index.js';

describe('Container', () => {
  it('resolves singleton once', () => {
    const container = new Container();
    const token = createToken<{ id: number }>('svc');
    let builds = 0;
    container.registerSingleton(token, () => {
      builds += 1;
      return { id: builds };
    });
    expect(container.resolve(token)).toEqual({ id: 1 });
    expect(container.resolve(token)).toEqual({ id: 1 });
    expect(builds).toBe(1);
  });

  it('detects circular dependencies', () => {
    const container = new Container();
    const a = createToken<unknown>('a');
    const b = createToken<unknown>('b');
    container.registerSingleton(a, (c) => c.resolve(b));
    container.registerSingleton(b, (c) => c.resolve(a));
    expect(() => container.resolve(a)).toThrow(/circular/);
  });
});

describe('AllowlistLogger', () => {
  it('strips forbidden fields', () => {
    const sink = new MemoryLogSink();
    const logger = new AllowlistLogger(sink, 10);
    logger.info('scan', { content: 'secret-text', tabId: 3 });
    expect(sink.records[0]?.fields).toEqual({ tabId: 3 });
    expect(sink.records[0]?.fields).not.toHaveProperty('content');
  });
});

describe('Configuration + flags + telemetry', () => {
  it('defaults fail closed for telemetry', async () => {
    expect(TELEMETRY_BOOTSTRAP_ENABLED).toBe(false);
    const store = new InMemorySettingsStore();
    const config = new ConfigurationService(store);
    await config.initialize();
    const flags = new FeatureFlagService(config);
    expect(flags.isEnabled('telemetryEnabled')).toBe(false);
    expect(flags.isEnabled('nerEnabled')).toBe(false);
    expect(flags.isEnabled('ocrEnabled')).toBe(true);

    const sent: string[] = [];
    const telemetry = new TelemetryService(flags, {
      async send(event) {
        sent.push(event.name);
      },
    });
    await telemetry.track('boot');
    expect(sent).toEqual([]);
    expect(new NullTelemetryTransport()).toBeDefined();
  });
});

describe('PerformanceMonitor + MemoryMonitor', () => {
  it('records durations and enforces peak budget', () => {
    const perf = new PerformanceMonitor();
    perf.start('x');
    const sample = perf.end('x');
    expect(sample.durationMs).toBeGreaterThanOrEqual(0);

    const monitor = new MemoryMonitor({
      read: () => ({ usedJsHeapBytes: 1, totalJsHeapBytes: 2 }),
    });
    expect(monitor.snapshot().withinBudget).toBe(true);

    const over = new MemoryMonitor({
      read: () => ({
        usedJsHeapBytes: 300 * 1024 * 1024,
        totalJsHeapBytes: 400 * 1024 * 1024,
      }),
    });
    expect(() => over.assertWithinBudget()).toThrow(SentinelError);
    try {
      over.assertWithinBudget();
    } catch (error) {
      expect(error).toBeInstanceOf(SentinelError);
      expect((error as SentinelError).code).toBe(ErrorCode.BUDGET_EXCEEDED);
    }
  });
});

describe('utils', () => {
  it('creates deterministic-shaped request ids', () => {
    const id = createRequestId(() => 0.5);
    expect(id.includes('-')).toBe(true);
  });
});
