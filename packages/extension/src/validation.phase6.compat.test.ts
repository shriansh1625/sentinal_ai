/**
 * Independent Validation Lab — Phase 6 browser/host compatibility probes.
 * MV3 packaging, ADR-035 hosts, WAR, content IIFE. No product feature work.
 */

import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  AI_HOST_PERMISSIONS,
  AI_PLATFORMS,
  AI_WAR_MATCHES,
  getPlatform,
  toWebAccessibleOriginPattern,
} from '@sentinel-shield/shared-types';
import { contentScriptId } from './lifecycle/registration.js';
import { isLikelyAiInput } from './input-pipelines/context.js';

const extRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = join(extRoot, 'dist');

describe('Lab P6 — AI platform registry (ADR-035)', () => {
  it('ships exactly nine AI platforms and no mail/Drive hosts', () => {
    expect(AI_PLATFORMS).toHaveLength(9);
    const blob = JSON.stringify(AI_PLATFORMS).toLowerCase();
    expect(blob.includes('gmail')).toBe(false);
    expect(blob.includes('mail.google')).toBe(false);
    expect(blob.includes('drive.google')).toBe(false);
    expect(blob.includes('slack.com')).toBe(false);
  });

  it('every platform pattern is covered by optional host permissions', () => {
    for (const platform of AI_PLATFORMS) {
      expect(getPlatform(platform.id)?.displayName).toBe(platform.displayName);
      for (const pattern of platform.urlPatterns) {
        expect(AI_HOST_PERMISSIONS.includes(pattern as (typeof AI_HOST_PERMISSIONS)[number])).toBe(
          true,
        );
      }
      expect(contentScriptId(platform.id)).toBe(`sentinel-shield-${platform.id}`);
    }
  });

  it('WAR matches are origin-only projections of host permissions', () => {
    for (const host of AI_HOST_PERMISSIONS) {
      const origin = toWebAccessibleOriginPattern(host);
      expect(AI_WAR_MATCHES).toContain(origin);
      expect(origin.endsWith('/*')).toBe(true);
    }
    expect(AI_WAR_MATCHES.some((m) => m.includes('/i/'))).toBe(false);
  });
});

describe('Lab P6 — dist loadable package shape', () => {
  it('dist has MV3 entrypoints and classic content.js (no ES imports)', () => {
    expect(existsSync(join(distRoot, 'manifest.json'))).toBe(true);
    for (const name of [
      'background.js',
      'content.js',
      'popup.js',
      'options.js',
      'popup.html',
      'options.html',
      '_locales/en/messages.json',
    ]) {
      expect(existsSync(join(distRoot, name)), name).toBe(true);
    }
    const content = readFileSync(join(distRoot, 'content.js'), 'utf8');
    expect(/^\s*import\s/m.test(content)).toBe(false);
    expect(content.includes(' from "./chunks/')).toBe(false);
    expect(content.startsWith('"use strict"') || content.includes('(() => {')).toBe(true);

    const distManifest = JSON.parse(readFileSync(join(distRoot, 'manifest.json'), 'utf8')) as {
      optional_host_permissions: string[];
      content_scripts?: unknown;
      minimum_chrome_version: string;
    };
    expect(distManifest.minimum_chrome_version).toBe('120');
    expect(distManifest.content_scripts).toBeUndefined();
    expect(distManifest.optional_host_permissions).toEqual([...AI_HOST_PERMISSIONS]);
  });
});

describe('Lab P6 — composer heuristic compatibility smoke', () => {
  it('matches ChatGPT-like and ProseMirror composers', () => {
    const prompt = document.createElement('div');
    prompt.id = 'prompt-textarea';
    prompt.setAttribute('contenteditable', 'true');
    document.body.appendChild(prompt);
    expect(isLikelyAiInput(prompt)).toBe(true);
    prompt.remove();

    const pm = document.createElement('div');
    pm.className = 'ProseMirror';
    pm.setAttribute('contenteditable', 'true');
    document.body.appendChild(pm);
    expect(isLikelyAiInput(pm)).toBe(true);
    pm.remove();
  });
});
