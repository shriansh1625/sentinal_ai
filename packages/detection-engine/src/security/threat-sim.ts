/**
 * Security threat simulation harness — PART_06 / Sprint 9.
 * Deterministic abuse cases; no network.
 */

import { createDetectionEngine } from '../tier1.js';
import { PolicyAction } from '@sentinel-shield/shared-types';

export interface ThreatCase {
  readonly id: string;
  readonly name: string;
  readonly input: string;
  readonly expectBlockedOrHeld: boolean;
}

export const THREAT_CASES: readonly ThreatCase[] = [
  {
    id: 'T-SSN',
    name: 'SSN exfiltration paste',
    input: 'My SSN is 123-45-6789',
    expectBlockedOrHeld: true,
  },
  {
    id: 'T-KEY',
    name: 'OpenAI-style key',
    input: 'sk-abcdefghijklmnopqrstuvwxyz123456',
    expectBlockedOrHeld: true,
  },
  {
    id: 'T-AWS',
    name: 'AWS access key id',
    input: 'AKIAIOSFODNN7EXAMPLE',
    expectBlockedOrHeld: true,
  },
  {
    id: 'T-CARD',
    name: 'Luhn card',
    input: 'pay with 4111111111111111',
    expectBlockedOrHeld: true,
  },
  {
    id: 'T-EMAIL',
    name: 'Contact email',
    input: 'contact victim@corp.example',
    expectBlockedOrHeld: true,
  },
  {
    id: 'T-PROTO',
    name: 'Prototype pollution bait in text',
    input: '__proto__ nested constructor spoof',
    expectBlockedOrHeld: false,
  },
  {
    id: 'T-CLEAN',
    name: 'Benign prompt',
    input: 'Summarize this public README',
    expectBlockedOrHeld: false,
  },
];

export function runThreatSimulation(): {
  passed: number;
  failed: string[];
} {
  const engine = createDetectionEngine();
  const failed: string[] = [];
  let passed = 0;
  for (const testCase of THREAT_CASES) {
    const result = engine.scanText({ requestId: testCase.id, text: testCase.input });
    const heldOrBlocked = result.action !== PolicyAction.ALLOW;
    if (heldOrBlocked === testCase.expectBlockedOrHeld) {
      passed += 1;
    } else {
      failed.push(testCase.id);
    }
  }
  return { passed, failed };
}
