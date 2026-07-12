import { describe, expect, it } from 'vitest';
import {
  DETECTION_ENGINE_SPRINT,
  DocumentPipeline,
  MimeFamily,
  PolicyAction,
  RiskLevel,
  createDetectionEngine,
  redactText,
  sniffMagicBytes,
} from './index.js';
import { luhnValid, ibanValid } from './checksum/index.js';
import { shannonEntropy } from './detectors/entropy.js';

describe('Tier-1 detection engine', () => {
  it('is Sprint 3+ ready', () => {
    expect(DETECTION_ENGINE_SPRINT).toBe(3);
  });

  it('allows clean text', () => {
    const engine = createDetectionEngine();
    const result = engine.scanText({
      requestId: 'r1',
      text: 'Hello team, shipping the feature tomorrow.',
    });
    expect(result.action).toBe(PolicyAction.ALLOW);
    expect(result.riskLevel).toBe(RiskLevel.NONE);
    expect(result.spans).toEqual([]);
  });

  it('detects email and api key patterns', () => {
    const engine = createDetectionEngine();
    const result = engine.scanText({
      requestId: 'r2',
      text: 'Contact jane@example.com with key sk-abcdefghijklmnopqrstuvwxyz123456',
    });
    expect(result.spans.length).toBeGreaterThan(0);
    expect(result.riskLevel).not.toBe(RiskLevel.NONE);
    expect(result.action).not.toBe(PolicyAction.ALLOW);
  });

  it('validates Luhn and IBAN', () => {
    expect(luhnValid('4111111111111111')).toBe(true);
    expect(luhnValid('4111111111111112')).toBe(false);
    expect(ibanValid('GB82WEST12345698765432')).toBe(true);
  });

  it('computes shannon entropy', () => {
    expect(shannonEntropy('aaaaaaaaaaaaaaaaaaaa')).toBeLessThan(1);
    expect(shannonEntropy('aB3xY9qLmN2pQ8rT5uV')).toBeGreaterThan(3);
  });
});

describe('Sprint 4 document sniff + Sprint 6 redaction', () => {
  it('sniffs PDF and PNG magic bytes', () => {
    expect(sniffMagicBytes(new Uint8Array([0x25, 0x50, 0x44, 0x46])).family).toBe(MimeFamily.PDF);
    expect(sniffMagicBytes(new Uint8Array([0x89, 0x50, 0x4e, 0x47])).family).toBe(MimeFamily.IMAGE);
  });

  it('document pipeline returns unavailable without OCR port', async () => {
    const pipeline = new DocumentPipeline();
    const result = await pipeline.extractText({
      requestId: 'd1',
      bytes: new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a]),
    });
    expect(result.source).toBe('unavailable');
  });

  it('redacts detected spans', () => {
    const engine = createDetectionEngine();
    const text = 'mail me at jane@example.com please';
    const scan = engine.scanText({ requestId: 'r', text });
    const redacted = redactText(text, scan.spans);
    expect(redacted.redactedText.includes('@')).toBe(false);
    expect(redacted.replacements).toBeGreaterThan(0);
  });
});

describe('Sprint 9 threat simulation', () => {
  it('passes deterministic abuse cases', async () => {
    const { runThreatSimulation } = await import('./security/threat-sim.js');
    const result = runThreatSimulation();
    expect(result.failed).toEqual([]);
    expect(result.passed).toBeGreaterThan(0);
  });
});
