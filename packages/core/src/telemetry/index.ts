/**
 * Telemetry interface — DISABLED by default (SS-OWN-001 / PART_26).
 * No network transport is wired in Sprint 0.
 */

import { TELEMETRY_DEFAULT_ENABLED } from '@sentinel-shield/shared-types';
import type { FeatureFlagService } from '../feature-flags/index.js';

export interface TelemetryEvent {
  readonly name: string;
  readonly timestampMs: number;
  readonly properties: Readonly<Record<string, string | number | boolean>>;
}

export interface TelemetryTransport {
  send(event: TelemetryEvent): Promise<void>;
}

/** No-op transport — production default when telemetry is off. */
export class NullTelemetryTransport implements TelemetryTransport {
  async send(_event: TelemetryEvent): Promise<void> {
    // intentionally empty
  }
}

export class TelemetryService {
  constructor(
    private readonly flags: FeatureFlagService,
    private readonly transport: TelemetryTransport = new NullTelemetryTransport(),
  ) {}

  isEnabled(): boolean {
    return this.flags.isEnabled('telemetryEnabled');
  }

  async track(
    name: string,
    properties: Readonly<Record<string, string | number | boolean>> = {},
  ): Promise<void> {
    if (!this.isEnabled()) {
      return;
    }
    await this.transport.send({
      name,
      timestampMs: Date.now(),
      properties,
    });
  }
}

export const TELEMETRY_BOOTSTRAP_ENABLED = TELEMETRY_DEFAULT_ENABLED;
