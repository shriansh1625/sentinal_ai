# PART 14 — SECURITY

**Document ID:** SS-BP-014
**Classification:** Internal Engineering — Principal Review  
**Version:** 1.0.0  
**Last Updated:** 2026-07-12  
**Owner:** Principal Security Architect, Principal Privacy Engineer  
**Reviewers:** Distinguished AI Engineer, Principal Browser Security Engineer

---

## Executive Summary

This document is the security bible for Sentinel Shield AI. It defines every security control, every encryption decision, every access boundary, and every attack mitigation. A privacy firewall that is itself insecure is worse than useless — it creates false confidence. This document ensures Sentinel Shield meets the standard expected if reviewed by security teams at Palo Alto Networks, Google Chrome, and Apple Security Engineering.

---

## 1. Objectives

| ID | Objective |
|---|---|
| OBJ-001 | Define the complete encryption architecture (at rest and in transit) |
| OBJ-002 | Specify the Content Security Policy and its justification |
| OBJ-003 | Define IPC message security (validation, authentication, rate limiting) |
| OBJ-004 | Specify WASM binary integrity verification |
| OBJ-005 | Define the supply chain security strategy |
| OBJ-006 | Specify the incident response plan |

---

## 2. Security Architecture

> **ARCHITECTURE FREEZE NOTICE (2026-07-12):**  
> Algorithmic cryptography, KDF parameters, key hierarchy, and storage envelopes are owned exclusively by **`PART_19_STORAGE_ENCRYPTION_KEY_MANAGEMENT.md`** (ADR-033).  
> Sections below that show PBKDF2 @ 100000 or “live CryptoKey in session” are **HISTORICAL / NON-AUTHORITATIVE**. Implementers MUST follow PART_19.  
> This document remains the **security controls index** (CSP, IPC, supply chain, IR pointer).

### 2.1 Defense-in-Depth Layers

```
Layer 1: Browser Sandbox
  Chrome's process-per-site isolation
  Extension process separation
  → We rely on this. We do not attempt to replace it.

Layer 2: Extension Permissions
  Minimal static permissions (storage, activeTab, scripting, offscreen)
  Dynamic host permissions (per-platform, user-granted)
  No externally_connectable
  → We control this via manifest.json

Layer 3: Content Security Policy
  script-src 'self' 'wasm-unsafe-eval'
  No unsafe-eval, no unsafe-inline
  → We control this via manifest.json

Layer 4: IPC Message Validation
  JSON Schema validation on every message
  Source verification (sender.tab, sender.id)
  Rate limiting per sender
  → We implement this in the Service Worker message router

Layer 5: Encryption at Rest
  AES-256-GCM for all stored data
  PBKDF2 key derivation from user passphrase
  Non-exportable CryptoKey objects
  → We implement this via Web Crypto API

Layer 6: Component Isolation
  Shadow DOM (closed mode) for UI
  Web Workers for WASM (separate threads)
  Offscreen Document for Worker hosting
  → We implement this via browser APIs

Layer 7: Code Integrity
  WASM binary SHA-256 verification
  No dynamic code loading
  Build-time dead code elimination
  → We implement this in the build pipeline and runtime
```

### 2.2 Encryption Architecture

#### Key Hierarchy

**CANONICAL:** See PART_19 §6–§9. Summary only:

| Tier | Mechanism | Persist |
|---|---|---|
| 1 No passphrase | Random 256-bit **material** in `chrome.storage.session`; re-import CryptoKey each SW wake | Material in session only |
| 2 Passphrase | **Argon2id m=19MiB,t=2,p=1** (PBKDF2-HMAC-SHA256 @ 600000 fallback) | Salt+params only; never passphrase |
| 3 Enterprise | AES-KW unwrap per PART_19 | Managed wrap |

~~PBKDF2 100000 / CryptoKey-in-session diagrams below are obsolete.~~

#### Encryption Operations

**CANONICAL implementations:** PART_19 `CryptoManager` / `KeyManager`. Do not copy obsolete samples from earlier drafts of this file.

### 2.3 IPC Message Security

#### Schema Validation

Every incoming message is validated against a JSON Schema before processing:

```typescript
// Message schemas are defined per message type
const SCAN_REQUEST_SCHEMA = {
  type: 'object',
  required: ['type', 'id', 'timestamp', 'source', 'payload'],
  properties: {
    type: { const: 'SCAN_REQUEST' },
    id: { type: 'string', format: 'uuid' },
    timestamp: { type: 'number', minimum: 0 },
    source: { enum: ['CONTENT_SCRIPT', 'POPUP', 'SETTINGS'] },
    payload: {
      type: 'object',
      required: ['inputType', 'data'],
      properties: {
        inputType: { enum: ['text', 'file', 'image', 'clipboard'] },
        data: {}, // ArrayBuffer — validated separately
        mimeType: { type: 'string' },
        fileName: { type: 'string', maxLength: 255 },
        fileSize: { type: 'number', maximum: 52428800 } // 50MB
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};
```

#### Source Verification

```typescript
// In Service Worker message handler
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Verify sender identity
  if (sender.id !== chrome.runtime.id) {
    // Message from another extension — reject
    logWarn('Message from foreign extension rejected', { 
      senderId: sender.id 
    });
    return;
  }
  
  // For content script messages, verify tab exists
  if (message.source === 'CONTENT_SCRIPT') {
    if (!sender.tab || !sender.tab.id) {
      logWarn('Content script message without tab ID rejected');
      return;
    }
    // Attach verified tab ID (not from message payload)
    message._verifiedTabId = sender.tab.id;
    message._verifiedUrl = sender.tab.url;
  }
  
  // Process...
});
```

#### Rate Limiting

```typescript
class RateLimiter {
  #counts: Map<number, { count: number; resetAt: number }> = new Map();
  #maxPerMinute = 30; // MAX_IPC_MSG_PER_MIN_PER_TAB — canonical DESIGN_OWNERSHIP_MATRIX §3
  // Scan-specific limiter uses MAX_SCANS_PER_MIN_PER_TAB = 20 (same matrix)
  
  allow(tabId: number | undefined): boolean {
    if (!tabId) return true; // Non-tab sources (popup, settings) are not rate-limited
    
    const now = Date.now();
    const entry = this.#counts.get(tabId);
    
    if (!entry || entry.resetAt < now) {
      this.#counts.set(tabId, { count: 1, resetAt: now + 60000 });
      return true;
    }
    
    if (entry.count >= this.#maxPerMinute) {
      logWarn('Rate limit exceeded', { tabId, count: entry.count });
      return false;
    }
    
    entry.count++;
    return true;
  }
}
```

### 2.4 WASM Binary Integrity

```typescript
// Verify WASM binary before instantiation
async function verifyWasmIntegrity(
  wasmPath: string, 
  expectedHash: string
): Promise<boolean> {
  const response = await fetch(chrome.runtime.getURL(wasmPath));
  const buffer = await response.arrayBuffer();
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  if (hashHex !== expectedHash) {
    logError('WASM integrity check FAILED', {
      path: wasmPath,
      expected: expectedHash,
      actual: hashHex
    });
    return false;
  }
  
  return true;
}

// Known-good hashes (updated with each build)
const WASM_HASHES: Record<string, string> = {
  'public/wasm/tesseract-core.wasm': 'a1b2c3d4...', // Updated by build script
  'public/wasm/ort-wasm-simd.wasm': 'e5f6g7h8...',
  'public/wasm/zxing.wasm': 'i9j0k1l2...'
};
```

### 2.5 Supply Chain Security

| Control | Implementation |
|---|---|
| **Minimal dependencies** | Target: < 20 direct dependencies. Each new dependency requires ADR approval. |
| **Lock file integrity** | `pnpm-lock.yaml` committed. CI runs `pnpm install --frozen-lockfile`. |
| **Vulnerability scanning** | `npm audit` on every CI run. Zero critical/high allowed. |
| **License compliance** | `license-checker` in CI. Only OSI-approved licenses allowed. |
| **Dependency pinning** | Exact versions in `package.json` (no `^` or `~`). |
| **WASM build-from-source** | Critical WASM binaries (Tesseract, ONNX) built from pinned Git commits in CI. |
| **Build reproducibility** | Deterministic builds with pinned tool versions. Two builds from same commit produce identical output. |
| **Code review** | All PRs require 2 approvals, including 1 from security team. |
| **No postinstall scripts** | `.npmrc` sets `ignore-scripts=true`. Exceptions explicitly allowed. |

### 2.6 Content Security Policy

```
Extension pages:
  script-src 'self' 'wasm-unsafe-eval';
  object-src 'self';
  
Justification:
  'self' — Only scripts bundled with the extension can execute
  'wasm-unsafe-eval' — Required for WebAssembly.compile() and WebAssembly.instantiate()
  
NOT included:
  'unsafe-eval' — Blocked by MV3. No eval(), no Function(), no setTimeout(string)
  'unsafe-inline' — No inline scripts. All JS is in separate files.
  connect-src — Not specified, defaults to 'self'. Cloud LLM calls require explicit CSP exception (added only if cloud feature is enabled).
```

---

## 3. Logging (PII)

> **CANONICAL:** **PART_26** — allowlist structured `LogEvent` only (ADR-012 / DEF-04).  
> Deny-list regex sanitizers are **rejected** for production. Do not implement the historical deny-list sample formerly in this section.

### 3.2 Structured Logger

```typescript
class Logger {
  #sanitizer = new PIISanitizer();
  #level: LogLevel;
  
  info(message: string, context?: Record<string, unknown>): void {
    this.#log('INFO', message, context);
  }
  
  warn(message: string, context?: Record<string, unknown>): void {
    this.#log('WARN', message, context);
  }
  
  error(message: string, context?: Record<string, unknown>): void {
    this.#log('ERROR', message, context);
  }
  
  #log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    // Sanitize message
    const sanitizedMessage = this.#sanitizer.sanitize(message);
    
    // Sanitize context values
    const sanitizedContext = context 
      ? JSON.parse(this.#sanitizer.sanitize(JSON.stringify(context)))
      : undefined;
    
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message: sanitizedMessage,
      context: sanitizedContext
    };
    
    // In production: store in ring buffer, no console output
    // In development: console output
    if (IS_DEVELOPMENT) {
      console[level.toLowerCase()](entry);
    }
    
    // Store in ring buffer (last 1000 entries)
    this.#ringBuffer.push(entry);
  }
}
```

---

## 4. Incident Response Plan

### 4.1 Security Incident Classification

| Severity | Definition | Response Time | Examples |
|---|---|---|---|
| **P0 (Critical)** | Active data exposure, extension compromise | 1 hour | Supply chain attack, CWS account compromise |
| **P1 (High)** | Vulnerability that could lead to data exposure | 4 hours | XSS in overlay, storage encryption bypass |
| **P2 (Medium)** | Security weakness without immediate exploit path | 24 hours | Missing rate limiting, weak CSP |
| **P3 (Low)** | Minor security improvement | 1 week | Better error messages, additional logging |

### 4.2 Response Procedure

```
1. DETECT
   - Automated: npm audit, Snyk, CI security tests
   - Manual: Security researcher report, user report, internal audit
   
2. ASSESS
   - Classify severity (P0-P3)
   - Determine blast radius (how many users affected)
   - Determine exploit complexity (requires physical access? network access? extension install?)
   
3. CONTAIN
   - P0/P1: Immediately pull extension from Chrome Web Store (if actively exploited)
   - Disable affected feature via quick config push (if possible)
   
4. FIX
   - Develop fix on a private branch
   - Security review of fix (2 reviewers minimum)
   - Build and test fix in isolated environment
   
5. RELEASE
   - P0: Emergency release (skip canary, direct to 100%)
   - P1: Accelerated release (24-hour canary, then 100%)
   - P2/P3: Normal release cycle
   
6. COMMUNICATE
   - Update SECURITY.md with advisory
   - Notify affected enterprise customers directly
   - Publish CVE if applicable
   
7. POST-MORTEM
   - Root cause analysis
   - Update threat model
   - Add regression tests
   - Update this security document
```

---

## 5. Edge Cases

| Edge Case | Security Implication | Handling |
|---|---|---|
| User installs extension, sets passphrase, forgets it | Cannot decrypt historical scan data | Provide "reset" option that wipes encrypted data and creates new key. No passphrase recovery (by design). |
| Two extensions running simultaneously | Potential IPC interference | `sender.id` verification prevents cross-extension messaging. |
| Extension installed in Incognito mode | Different storage context | `chrome.storage.local` is shared with normal mode. `chrome.storage.session` is separate. Encryption works identically. |
| Browser crashes during encryption | Partial write to IndexedDB | IndexedDB transactions are atomic. Partial writes are rolled back automatically. |

---

## 6. Acceptance Criteria

- [ ] All stored data is encrypted with AES-256-GCM
- [ ] PII sanitizer catches all known entity patterns in log output
- [ ] IPC messages validated against JSON Schema
- [ ] WASM integrity verified before instantiation
- [ ] Rate limiting prevents message flooding
- [ ] No `eval()`, `Function()`, or `unsafe-eval` in codebase
- [ ] npm audit returns 0 critical and 0 high vulnerabilities
- [ ] Build is reproducible (identical output from identical input)
- [ ] Incident response plan documented and team trained

---

## 7. Production Checklist

- [ ] Security review completed by Principal Security Architect
- [ ] Penetration testing completed (internal or external)
- [ ] All findings remediated or documented as accepted risks
- [ ] FIDO2 key configured for Chrome Web Store account
- [ ] Two-person publishing rule established
- [ ] SECURITY.md published with vulnerability disclosure process
- [ ] Incident response team identified and trained
- [ ] Security-focused code review checklist in PR template

---

## 8. Future Improvements

| Improvement | Impact |
|---|---|
| Subresource Integrity (SRI) for CDN resources | Additional integrity check (though we bundle everything) |
| Web Crypto API key wrapping (AES-KW) | Enterprise key distribution |
| Certificate Transparency monitoring | Detect MITM on cloud LLM calls |
| WASM sandboxing via WASI | Additional isolation layer for WASM modules |
| Formal verification of crypto implementation | Mathematical proof of encryption correctness |
