/**
 * Phase C red-team regression — verified bypasses + FP hardenings.
 */

import { describe, expect, it } from 'vitest';
import { PolicyAction } from '@sentinel-shield/shared-types';
import {
  collapseSpacedAlphanumerics,
  createDetectionEngine,
  decodeBasicHtmlEntities,
  joinBrokenAlnumLines,
  prepareForDetection,
} from './index.js';

const AWS = 'AKIAIOSFODNN7EXAMPLE';
const SK = 'sk-abcdefghijklmnopqrstuvwxyz123456';

describe('Phase C — whitespace / newline defrag (RT-SPACE / RT-NL)', () => {
  it('collapses spaced AWS key and detects', () => {
    const spaced = [...AWS].join(' ');
    expect(collapseSpacedAlphanumerics(spaced)).toBe(AWS);
    const engine = createDetectionEngine();
    expect(engine.scanText({ requestId: 'sp', text: spaced }).action).not.toBe(PolicyAction.ALLOW);
  });

  it('joins newline-split AWS key and detects', () => {
    const broken = `${AWS.slice(0, 10)}\n${AWS.slice(10)}`;
    expect(joinBrokenAlnumLines(broken)).toBe(AWS);
    const engine = createDetectionEngine();
    expect(engine.scanText({ requestId: 'nl', text: broken }).action).not.toBe(PolicyAction.ALLOW);
  });

  it('collapses tab-separated sk- key', () => {
    const tabs = [...SK].join('\t');
    const engine = createDetectionEngine();
    expect(engine.scanText({ requestId: 'tab', text: tabs }).action).not.toBe(PolicyAction.ALLOW);
  });
});

describe('Phase C — HTML entities + hex encoding', () => {
  it('decodes numeric HTML entities before detect', () => {
    const encoded = [...AWS].map((c) => `&#${c.charCodeAt(0)};`).join('');
    expect(decodeBasicHtmlEntities(encoded)).toBe(AWS);
    const engine = createDetectionEngine();
    expect(engine.scanText({ requestId: 'html', text: encoded }).action).not.toBe(
      PolicyAction.ALLOW,
    );
  });

  it('detects hex-encoded AWS access key id', () => {
    const hexed = Buffer.from(AWS, 'utf8').toString('hex');
    const engine = createDetectionEngine();
    expect(engine.scanText({ requestId: 'hex', text: `hex=${hexed}` }).action).not.toBe(
      PolicyAction.ALLOW,
    );
  });
});

describe('Phase C — FP hardenings', () => {
  it('does not flag random 40-char pure alnum as secret', () => {
    const engine = createDetectionEngine();
    const text = 'marker AbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKl';
    expect(engine.scanText({ requestId: 'fp40', text }).action).toBe(PolicyAction.ALLOW);
  });

  it('does not flag short public demo base64', () => {
    const engine = createDetectionEngine();
    expect(
      engine.scanText({ requestId: 'fpb64', text: 'base64=cHVibGljLWRlbW8tMjc=' }).action,
    ).toBe(PolicyAction.ALLOW);
  });
});

describe('Phase C — accepted limitation (ROT13)', () => {
  it('documents ROT13 AWS as residual bypass (not remediated)', () => {
    const rot = AWS.replace(/[A-Za-z]/g, (ch) => {
      const base = ch <= 'Z' ? 65 : 97;
      return String.fromCharCode(((ch.charCodeAt(0) - base + 13) % 26) + base);
    });
    expect(prepareForDetection(rot)).toBe(rot);
    const engine = createDetectionEngine();
    // Accepted limitation: may ALLOW — assert remaining residual for honesty.
    expect(engine.scanText({ requestId: 'rot', text: rot }).action).toBe(PolicyAction.ALLOW);
  });
});
