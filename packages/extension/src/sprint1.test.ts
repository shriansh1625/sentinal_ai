import { describe, expect, it } from 'vitest';
import {
  AllowlistLogger,
  ConfigurationService,
  FeatureFlagService,
  InMemorySettingsStore,
  LogLevel,
  MemoryLogSink,
  createIpcRateLimiter,
} from '@sentinel-shield/core';
import { MemoryKvStorage, createEnvelope } from '@sentinel-shield/browser-adapters';
import { MessageType } from '@sentinel-shield/shared-types';
import {
  CURRENT_SCHEMA_VERSION,
  isSafeMode,
  readSchemaVersion,
  runMigrations,
  setSafeMode,
} from './lifecycle/migrations.js';
import { LifecycleCoordinator } from './lifecycle/index.js';
import { enablePlatform, listEnabledPlatforms } from './lifecycle/registration.js';
import { OffscreenManager } from './offscreen/manager.js';
import { MessageRouter } from './messaging/router.js';
import { createHandlers } from './messaging/handlers.js';
import { createPingEnvelope, defaultSettingsSnapshot } from './background.js';

describe('Sprint 1 — migrations', () => {
  it('seeds defaults and stamps schema version last', async () => {
    const storage = new MemoryKvStorage();
    const sink = new MemoryLogSink();
    const logger = new AllowlistLogger(sink, LogLevel.DEBUG);
    const result = await runMigrations(storage, logger);
    expect(result.to).toBe(CURRENT_SCHEMA_VERSION);
    expect(await readSchemaVersion(storage)).toBe(1);
    expect(await isSafeMode(storage)).toBe(false);
    expect(await storage.get('appSettings')).toBeTruthy();
  });

  it('enters SafeMode when a migration step fails', async () => {
    const storage = new MemoryKvStorage();
    const originalGet = storage.get.bind(storage);
    storage.get = async <T>(key: string): Promise<T | undefined> => {
      if (key === 'appSettings') {
        throw new Error('boom');
      }
      return originalGet<T>(key);
    };
    const sink = new MemoryLogSink();
    const logger = new AllowlistLogger(sink, LogLevel.DEBUG);
    await expect(runMigrations(storage, logger)).rejects.toThrow('boom');
    expect(await isSafeMode(storage)).toBe(true);
  });
});

describe('Sprint 1 — platform registration', () => {
  it('enables AI platforms only', async () => {
    const storage = new MemoryKvStorage();
    const sink = new MemoryLogSink();
    const logger = new AllowlistLogger(sink, LogLevel.DEBUG);
    const registered: string[] = [];
    const scripting = {
      async registerContentScripts(scripts: { id?: string }[]) {
        for (const s of scripts) {
          if (s.id) registered.push(s.id);
        }
      },
      async unregisterContentScripts() {
        registered.length = 0;
      },
      async getRegisteredContentScripts() {
        return registered.map((id) => ({ id }));
      },
    };
    await enablePlatform(storage, scripting, logger, 'claude');
    expect(await listEnabledPlatforms(storage)).toEqual(['claude']);
    expect(registered).toContain('sentinel-shield-claude');
  });
});

describe('Sprint 1 — offscreen manager', () => {
  it('creates once and adopts existing context', async () => {
    const sink = new MemoryLogSink();
    const logger = new AllowlistLogger(sink, LogLevel.DEBUG);
    let created = 0;
    const contexts: { length: number } = { length: 0 };
    const manager = new OffscreenManager(
      {
        async createDocument() {
          created += 1;
          contexts.length = 1;
        },
        async closeDocument() {
          contexts.length = 0;
        },
      },
      {
        async getContexts() {
          return Array.from({
            length: contexts.length,
          }) as unknown as chrome.runtime.ExtensionContext[];
        },
        getURL: (path) => `chrome-extension://test/${path}`,
      },
      logger,
      50,
    );
    await manager.ensureCreated();
    await manager.ensureCreated();
    expect(created).toBe(1);
    expect(manager.ready).toBe(true);
    await manager.close();
    expect(manager.ready).toBe(false);
  });
});

describe('Sprint 1 — message router', () => {
  it('validates, rate-limits, and dispatches health checks', async () => {
    const storage = new MemoryKvStorage();
    await runMigrations(storage, new AllowlistLogger(new MemoryLogSink(), LogLevel.DEBUG));
    const config = new ConfigurationService(new InMemorySettingsStore());
    await config.initialize();
    const flags = new FeatureFlagService(config);
    const sink = new MemoryLogSink();
    const logger = new AllowlistLogger(sink, LogLevel.DEBUG);
    const offscreen = new OffscreenManager(
      { createDocument: async () => undefined, closeDocument: async () => undefined },
      {
        getContexts: async () => [],
        getURL: (p) => p,
      },
      logger,
    );
    const scripting = {
      registerContentScripts: async () => undefined,
      unregisterContentScripts: async () => undefined,
      getRegisteredContentScripts: async () => [],
    };
    const router = new MessageRouter({
      handlers: createHandlers({
        storage,
        scripting,
        config,
        flags,
        offscreen,
        logger,
        getVersion: () => '0.2.0',
        isSafeMode: async () => false,
      }),
      logger,
      rateLimiter: createIpcRateLimiter(),
    });

    const health = await router.handle(createEnvelope(MessageType.HEALTH_CHECK, {}), {});
    expect(health.ok).toBe(true);
    if (health.ok) {
      expect(health.data).toMatchObject({ version: '0.2.0', schemaVersion: 1 });
    }

    const bad = await router.handle({ nope: true }, {});
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.error).toBe('INVALID_MESSAGE');
  });

  it('blocks non-allowlisted messages in SafeMode', async () => {
    const storage = new MemoryKvStorage();
    const logger = new AllowlistLogger(new MemoryLogSink(), LogLevel.DEBUG);
    await runMigrations(storage, logger);
    await setSafeMode(storage, true);
    const config = new ConfigurationService(new InMemorySettingsStore());
    await config.initialize();
    const flags = new FeatureFlagService(config);
    const offscreen = new OffscreenManager(
      { createDocument: async () => undefined, closeDocument: async () => undefined },
      { getContexts: async () => [], getURL: (p) => p },
      logger,
    );
    const router = new MessageRouter({
      handlers: createHandlers({
        storage,
        scripting: {
          registerContentScripts: async () => undefined,
          unregisterContentScripts: async () => undefined,
          getRegisteredContentScripts: async () => [],
        },
        config,
        flags,
        offscreen,
        logger,
        getVersion: () => '0.2.0',
        isSafeMode: async () => true,
      }),
      logger,
      isSafeMode: async () => true,
    });
    const blocked = await router.handle(
      createEnvelope(MessageType.PLATFORM_ENABLE, { platformId: 'claude' }),
      {},
    );
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.error).toBe('SAFE_MODE');
  });
});

describe('Sprint 1 — lifecycle install', () => {
  it('handles fresh install', async () => {
    const storage = new MemoryKvStorage();
    const logger = new AllowlistLogger(new MemoryLogSink(), LogLevel.DEBUG);
    const lifecycle = new LifecycleCoordinator({
      storage,
      scripting: {
        registerContentScripts: async () => undefined,
        unregisterContentScripts: async () => undefined,
        getRegisteredContentScripts: async () => [],
      },
      logger,
      openOnboarding: async () => undefined,
    });
    await lifecycle.handleInstalled({ reason: 'install' });
    expect(await lifecycle.checkSafeMode()).toBe(false);
    expect(await readSchemaVersion(storage)).toBe(1);
  });
});

describe('Sprint 1 — background exports', () => {
  it('exposes frozen defaults and ping envelope', () => {
    expect(defaultSettingsSnapshot().featureFlags.telemetryEnabled).toBe(false);
    expect(createPingEnvelope().type).toBe(MessageType.PING);
  });
});

describe('Sprint 1 — rate limiter constants', () => {
  it('enforces IPC budget', () => {
    const limiter = createIpcRateLimiter();
    let blocked = false;
    for (let i = 0; i < 40; i += 1) {
      if (!limiter.allow('tab-1').allowed) {
        blocked = true;
        break;
      }
    }
    expect(blocked).toBe(true);
  });
});
