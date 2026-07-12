# PART 10 — BROWSER EXTENSION ARCHITECTURE

**Document ID:** SS-BP-010
**Classification:** Internal Engineering — Principal Review
**Version:** 1.0.0
**Last Updated:** 2026-07-12
**Owner:** Principal Browser Security Engineer, Chrome Extension Specialist
**Reviewers:** Principal Security Architect, Principal Platform Architect

---

## Executive Summary

This document is the definitive engineering guide for the Sentinel Shield AI browser extension. It specifies every Manifest V3 configuration choice, every content script behavior, every Service Worker lifecycle decision, every UI component, and every browser API interaction. Engineers implementing the extension reference this document for all browser-specific decisions.

---

## 1. Objectives

| ID | Objective |
|---|---|
| OBJ-001 | Define the complete Manifest V3 configuration with justification for every field |
| OBJ-002 | Specify content script injection strategy, event interception, and DOM interaction |
| OBJ-003 | Specify Service Worker architecture, lifecycle management, and state persistence |
| OBJ-004 | Define the Offscreen Document lifecycle and Worker pool management |
| OBJ-005 | Specify all UI surfaces (popup, settings, dashboard, onboarding, overlay) |

---

## 2. Dependencies

| Dependency | Type |
|---|---|
| PART_04_SYSTEM_ARCHITECTURE.md | Component architecture, trust boundaries |
| PART_03_PRODUCT_REQUIREMENTS.md | Functional requirements |
| Chrome Extensions API Documentation | Platform reference |
| PART_15_PERMISSIONS_AND_SANDBOXING.md | Permission model |

---

## 3. Design Principles

| Principle | Extension-Specific Implication |
|---|---|
| **Minimal permissions** | Only `storage`, `activeTab`, `scripting`, `offscreen` as static. Everything else via `optional_host_permissions`. |
| **Dynamic injection** | Content scripts injected via `chrome.scripting.registerContentScripts()`, not static `content_scripts` in manifest. |
| **Ephemeral Service Worker** | All state externalized. No in-memory state that cannot be reconstructed from storage. |
| **Shadow DOM isolation** | All UI injected into web pages uses closed Shadow DOM. |
| **Event-driven** | No polling. All operations triggered by user actions or browser events. |

---

## 4. Manifest V3 Configuration

### 4.1 Complete Manifest

```json
{
  "manifest_version": 3,
  "name": "Sentinel Shield AI",
  "version": "1.0.0",
  "description": "Local privacy assistant for AI sites — intercepts paste/upload/drag-drop, warns on sensitive patterns, allow/block/redact.",
  "default_locale": "en",
  "minimum_chrome_version": "120",
  
  "permissions": [
    "storage",
    "activeTab",
    "scripting",
    "offscreen",
    "alarms"
  ],
  
  "optional_host_permissions": [
    "*://chat.openai.com/*",
    "*://chatgpt.com/*",
    "*://gemini.google.com/*",
    "*://claude.ai/*",
    "*://chat.deepseek.com/*",
    "*://perplexity.ai/*",
    "*://grok.com/*",
    "*://x.com/i/grok*",
    "*://copilot.microsoft.com/*",
    "*://github.com/copilot*",
    "*://cursor.sh/*"
  ],
  
  "background": {
    "service_worker": "dist/background.js",
    "type": "module"
  },
  
  "action": {
    "default_popup": "src/popup/index.html",
    "default_icon": {
      "16": "public/icons/icon-16.png",
      "32": "public/icons/icon-32.png",
      "48": "public/icons/icon-48.png",
      "128": "public/icons/icon-128.png"
    }
  },
  
  "icons": {
    "16": "public/icons/icon-16.png",
    "32": "public/icons/icon-32.png",
    "48": "public/icons/icon-48.png",
    "128": "public/icons/icon-128.png"
  },
  
  "content_security_policy": {
    "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'"
  },
  
  "web_accessible_resources": [
    {
      "resources": [
        "public/models/*",
        "public/wasm/*",
        "src/offscreen/index.html"
      ],
      "matches": []
    }
  ],
  
  "storage": {
    "managed_schema": "schemas/managed-storage-schema.json"
  }
}
```

### 4.2 Manifest Field Justifications

| Field | Value | Justification |
|---|---|---|
| `manifest_version` | 3 | Required for Chrome ≥ 120. MV2 is deprecated. |
| `minimum_chrome_version` | "120" | Chrome 120 stabilized offscreen API and WASM improvements. |
| `permissions: storage` | Required | Encrypted local storage for settings, scan history, model cache. |
| `permissions: activeTab` | Required | Grants access to the active tab when user interacts with extension. Lower privilege than broad host permissions. |
| `permissions: scripting` | Required | `chrome.scripting.registerContentScripts()` for dynamic content script injection. |
| `permissions: offscreen` | Required | Create offscreen document for WASM Worker hosting. |
| `permissions: alarms` | Required | Optional SW warm-up while a protected AI tab is focused (PART_11). Cleared when no protected tab focused. |
| `default_locale` | `en` | i18n + CWS localization (PART_22). |
| `optional_host_permissions` | **AI platform URLs only (v1)** | ADR-035 / PART_15. Drive/Gmail/Outlook/OneDrive **removed** from v1. Requested dynamically per platform. |
| `background.service_worker` | `dist/background.js` | **Built** artifact only (PART_25). Never TypeScript source in shipped manifest. |
| `content_security_policy` | `wasm-unsafe-eval` | Required for WebAssembly compilation. Cannot use `unsafe-eval` (blocked in MV3). `wasm-unsafe-eval` is the narrowest CSP directive that allows WASM. |
| **NOT included: `tabs`** | — | Not needed. We use `activeTab` + `scripting` instead. `tabs` would grant access to all tab URLs (privacy risk). |
| **NOT included: `webNavigation`** | — | Not needed. We use `chrome.tabs.onUpdated` for URL matching. |
| **NOT included: `history`** | — | Not needed. Never access browsing history. |
| **NOT included: `externally_connectable`** | — | Never allow external pages to send messages to our extension. |
| **NOT included: `update_url`** | — | Updates come only through Chrome Web Store. No self-hosted updates (security). |

---

## 5. Content Script Architecture

### 5.1 Injection Strategy

**Dynamic injection via `chrome.scripting.registerContentScripts()`:**

```typescript
// Called when user enables protection for a platform
async function enablePlatformProtection(platformId: string): Promise<void> {
  const platform = PLATFORMS[platformId];
  
  await chrome.scripting.registerContentScripts([{
    id: `sentinel-shield-${platformId}`,
    matches: platform.urlPatterns,
    js: ['src/content/index.js'],
    css: ['src/content/styles.css'],
    runAt: 'document_start',
    allFrames: false,
    world: 'ISOLATED'
  }]);
}
```

**Why dynamic injection:**
1. Content scripts are only injected on platforms the user has activated
2. Avoids requesting broad host permissions at install time
3. User can add/remove platforms without extension reinstall
4. Reduces performance overhead (no content script on non-AI pages)

### 5.2 Event Interception

**Critical design:** All event listeners are registered in the **capture phase** with **`document_start`** timing to ensure our handlers fire before the platform's handlers.

#### Paste Event Interception

```
Execution Order:
1. Our paste handler fires (capture phase, document-level)
2. event.preventDefault() + event.stopImmediatePropagation()
3. Extract clipboardData
4. Send SCAN_REQUEST to Service Worker
5. Wait for SCAN_RESULT
6. If clean: re-dispatch synthetic paste event
7. If risky: show overlay, wait for user decision
```

**Implementation details:**
- Use `event.stopImmediatePropagation()` (not just `stopPropagation()`) to prevent ANY other listeners on the same element from firing
- Re-dispatching uses `InputEvent` or `ClipboardEvent` construction with the original data
- The re-dispatched event has a custom property `__sentinelShieldApproved: true` so our handler ignores it on re-dispatch
- This property is set on the event object directly (not via `detail`) because Clipboard events don't have `detail`

#### File Upload Interception

```
Execution Order:
1. MutationObserver detects <input type="file"> creation
2. Attach 'change' event listener (capture phase)
3. On change: event.preventDefault()
4. Read files via FileReader.readAsArrayBuffer()
5. Send SCAN_REQUEST to Service Worker
6. Wait for SCAN_RESULT
7. If clean: set files on input (via DataTransfer hack or re-trigger)
8. If risky: show overlay
```

**Challenge:** You cannot programmatically set files on an `<input type="file">` in Chrome (security restriction). 

**Solution:** Instead of trying to set files on the existing input, we:
1. Clone the file input element
2. Set the approved/redacted files on a `DataTransfer` object
3. Set the `DataTransfer.files` on the cloned input
4. Replace the original input with the clone
5. Dispatch a `change` event on the clone

This works because `DataTransfer` objects can have files added programmatically, and the `files` property of an `<input>` can be set from a `DataTransfer`.

#### Drag-and-Drop Interception

```
Execution Order:
1. Register 'drop' listener on document (capture phase)
2. On drop: event.preventDefault()
3. Extract dataTransfer.files and dataTransfer.getData('text/plain')
4. Send SCAN_REQUEST to Service Worker
5. Wait for SCAN_RESULT
6. If clean: re-dispatch drop event with original data
7. If risky: show overlay
```

### 5.3 MutationObserver Configuration

```typescript
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node instanceof HTMLElement) {
        // Find file inputs in added subtree
        const fileInputs = node.querySelectorAll('input[type="file"]');
        for (const input of fileInputs) {
          attachFileListener(input);
        }
        
        // Check if the node itself is a file input
        if (node.matches('input[type="file"]')) {
          attachFileListener(node);
        }
      }
    }
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
  // NOT attributes — we don't need attribute changes
  // NOT characterData — we don't need text changes
});
```

**Performance optimization:**
- Observe only `childList` and `subtree` (minimal)
- Debounce callback: batch mutations, process every 100ms
- Disconnect when tab is hidden (`document.addEventListener('visibilitychange')`)
- Reconnect when tab becomes visible again

### 5.4 Shadow DOM Overlay

**Closed Shadow DOM** ensures:
1. Page CSS cannot style our overlay
2. Page JavaScript cannot query our overlay elements
3. Our styles do not leak into the page

```typescript
class OverlayRenderer {
  #host: HTMLElement;
  #shadow: ShadowRoot;
  
  constructor() {
    this.#host = document.createElement('sentinel-shield-overlay');
    this.#host.setAttribute('style', 'all: initial; position: fixed; z-index: 2147483647;');
    this.#shadow = this.#host.attachShadow({ mode: 'closed' });
  }
  
  show(result: ScanResult): void {
    // Inject self-contained CSS into shadow root
    const style = document.createElement('style');
    style.textContent = OVERLAY_STYLES; // Self-contained CSS string
    this.#shadow.appendChild(style);
    
    // Build overlay DOM
    const overlay = this.#buildOverlay(result);
    this.#shadow.appendChild(overlay);
    
    // Append to document body
    document.body.appendChild(this.#host);
  }
  
  hide(): void {
    this.#host.remove();
  }
}
```

**z-index:** `2147483647` (max 32-bit integer) ensures overlay appears above all page content.

**Style isolation:** All CSS is defined as a string constant compiled into the content script bundle. No external stylesheet requests.

---

## 6. Service Worker Architecture

### 6.1 Lifecycle Management

```
Browser Start
    │
    ▼
Service Worker installed (chrome.runtime.onInstalled)
    │
    ├── First install: trigger onboarding page
    ├── Update: migrate storage schema if needed
    └── Register dynamic content scripts for enabled platforms
    │
    ▼
Service Worker idle
    │
    ├── Message received → activate → process → respond → idle
    ├── Tab updated → check URL → inject content script if match → idle
    ├── Alarm fired → run scheduled task → idle
    └── 5 minutes idle → Chrome terminates Service Worker
    │
    ▼
Next event → Chrome re-activates Service Worker
    │
    ▼
Service Worker reads state from chrome.storage.session
    │
    ▼
Ready to process
```

### 6.2 Message Router

```typescript
// background/message-router.ts

type MessageHandler = (
  message: ValidatedMessage,
  sender: chrome.runtime.MessageSender
) => Promise<MessageResponse>;

const handlers: Record<MessageType, MessageHandler> = {
  SCAN_REQUEST: handleScanRequest,
  REDACT_REQUEST: handleRedactRequest,
  SETTINGS_UPDATE: handleSettingsUpdate,
  HEALTH_CHECK: handleHealthCheck,
  // ... all message types
};

chrome.runtime.onMessage.addListener(
  (rawMessage, sender, sendResponse) => {
    // 1. Validate schema
    const validated = validateMessageSchema(rawMessage);
    if (!validated.success) {
      logWarn('Invalid message rejected', { 
        error: validated.error,
        source: sender.tab?.id 
      });
      sendResponse({ error: 'INVALID_MESSAGE' });
      return true; // Async response
    }
    
    // 2. Rate limit check
    if (!rateLimiter.allow(sender.tab?.id)) {
      sendResponse({ error: 'RATE_LIMITED' });
      return true;
    }
    
    // 3. Dispatch to handler
    const handler = handlers[validated.data.type];
    if (!handler) {
      sendResponse({ error: 'UNKNOWN_MESSAGE_TYPE' });
      return true;
    }
    
    // 4. Execute handler with timeout
    const timeout = setTimeout(() => {
      sendResponse({ error: 'TIMEOUT' });
    }, 30000);
    
    handler(validated.data, sender)
      .then(response => {
        clearTimeout(timeout);
        sendResponse(response);
      })
      .catch(error => {
        clearTimeout(timeout);
        logError('Handler error', { 
          type: validated.data.type,
          error: sanitizeError(error)
        });
        sendResponse({ error: 'INTERNAL_ERROR' });
      });
    
    return true; // Keep channel open for async response
  }
);
```

### 6.3 State Persistence Strategy

| State Category | Storage | Survives SW Restart | Survives Browser Restart |
|---|---|---|---|
| Active scan state | `chrome.storage.session` | ✅ | ❌ |
| Worker health status | `chrome.storage.session` | ✅ | ❌ |
| Encryption key (no passphrase) | `chrome.storage.session` | ✅ | ❌ |
| User settings | `chrome.storage.local` (encrypted) | ✅ | ✅ |
| Scan history | IndexedDB (encrypted) | ✅ | ✅ |
| Model cache | IndexedDB | ✅ | ✅ |
| Enterprise policy | `chrome.storage.managed` | ✅ | ✅ |
| Encryption salt | `chrome.storage.local` | ✅ | ✅ |

---

## 7. Offscreen Document Management

### 7.1 Lifecycle

```typescript
// background/offscreen-manager.ts

class OffscreenManager {
  #isCreated = false;
  #inactivityTimer: number | null = null;
  
  async ensureCreated(): Promise<void> {
    if (this.#isCreated) return;
    
    // Check if already exists (survives SW restart)
    const existingContexts = await chrome.runtime.getContexts({
      contextTypes: ['OFFSCREEN_DOCUMENT'],
      documentUrls: [chrome.runtime.getURL('src/offscreen/index.html')]
    });
    
    if (existingContexts.length > 0) {
      this.#isCreated = true;
      return;
    }
    
    await chrome.offscreen.createDocument({
      url: 'src/offscreen/index.html',
      reasons: ['WORKERS'],
      justification: 'Host Web Workers for WASM-based OCR, NER, and CV processing'
    });
    
    this.#isCreated = true;
    this.#resetInactivityTimer();
  }
  
  async close(): Promise<void> {
    if (!this.#isCreated) return;
    await chrome.offscreen.closeDocument();
    this.#isCreated = false;
  }
  
  #resetInactivityTimer(): void {
    if (this.#inactivityTimer) clearTimeout(this.#inactivityTimer);
    this.#inactivityTimer = setTimeout(() => {
      this.close();
    }, 60000); // Close after 60 seconds of inactivity
  }
  
  // Call this on every message sent to offscreen document
  notifyActivity(): void {
    this.#resetInactivityTimer();
  }
}
```

### 7.2 Worker Pool (Inside Offscreen Document)

```typescript
// offscreen/worker-pool.ts

class WorkerPool {
  #workers: Map<WorkerType, {
    worker: Worker;
    status: 'idle' | 'busy';
    lastUsed: number;
  }> = new Map();
  
  async dispatch(type: WorkerType, payload: ArrayBuffer): Promise<WorkerResult> {
    let entry = this.#workers.get(type);
    
    if (!entry) {
      // Lazy initialization
      entry = {
        worker: this.#createWorker(type),
        status: 'idle',
        lastUsed: Date.now()
      };
      this.#workers.set(type, entry);
    }
    
    if (entry.status === 'busy') {
      // Queue the request (one at a time per worker type)
      return this.#queueRequest(type, payload);
    }
    
    entry.status = 'busy';
    entry.lastUsed = Date.now();
    
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        // Worker timed out — terminate and respawn
        entry!.worker.terminate();
        this.#workers.delete(type);
        reject(new WorkerTimeoutError(type));
      }, this.#getTimeout(type));
      
      entry!.worker.onmessage = (event) => {
        clearTimeout(timeout);
        entry!.status = 'idle';
        resolve(event.data);
      };
      
      entry!.worker.onerror = (error) => {
        clearTimeout(timeout);
        entry!.worker.terminate();
        this.#workers.delete(type);
        reject(new WorkerCrashError(type, error));
      };
      
      // Transfer ownership (zero-copy)
      entry!.worker.postMessage(payload, [payload]);
    });
  }
  
  #createWorker(type: WorkerType): Worker {
    const workerPaths: Record<WorkerType, string> = {
      ocr: 'workers/ocr-worker.js',
      ner: 'workers/ner-worker.js',
      cv: 'workers/cv-worker.js',
      pdf: 'workers/pdf-worker.js',
      document: 'workers/document-worker.js'
    };
    return new Worker(workerPaths[type], { type: 'module' });
  }
  
  #getTimeout(type: WorkerType): number {
    const timeouts: Record<WorkerType, number> = {
      ocr: 30000,      // OCR can be slow for multi-page
      ner: 15000,       // NER should be fast
      cv: 10000,        // CV is fast
      pdf: 30000,       // PDF parsing can be slow
      document: 10000   // Document parsing is fast
    };
    return timeouts[type];
  }
}
```

---

## 8. UI Components

### 8.1 Popup

**Purpose:** Quick status view and settings shortcut. Opens when user clicks extension icon.

**Layout:**
```
┌─────────────────────────────────┐
│ 🛡️ Sentinel Shield AI          │
│ Status: Protected               │
├─────────────────────────────────┤
│ Current Page: chatgpt.com       │
│ Risk: Low ●                     │
├─────────────────────────────────┤
│ Today's Scans: 12               │
│ Detections: 3                   │
│ Blocked: 1                      │
├─────────────────────────────────┤
│ [Settings]  [Dashboard]  [Help] │
└─────────────────────────────────┘
```

**Technology:** Vanilla HTML/CSS/TypeScript. No framework needed for a simple popup.

**Performance:** Must render within 200ms of click. Pre-compute all displayed values in Service Worker, cache in `chrome.storage.session`.

### 8.2 Settings Page

**Purpose:** Full configuration UI. Opens as a new tab.

**Sections:**
1. **Platforms** — Toggle protection per AI platform
2. **Detectors** — Enable/disable individual detector categories
3. **Sensitivity** — Global sensitivity slider (affects confidence thresholds)
4. **Allowlist** — Add entities that should never be flagged (e.g., user's own email)
5. **Privacy** — Data retention period, clear history, telemetry opt-in
6. **Security** — Extension passphrase, encryption status
7. **Cloud AI** — Optional cloud LLM for enhanced explanations (API key entry)
8. **Enterprise** — Read-only display of managed policy (if present)
9. **About** — Version, licenses, links

### 8.3 Dashboard Page

**Purpose:** Scan history visualization and export. Opens as a new tab.

**Features:**
- Scan history table (last 30 days) with filtering and sorting
- Detection type distribution chart (bar or pie)
- Risk level trend chart (line)
- Per-platform statistics
- Export to JSON/CSV
- "Clear All Data" with confirmation

### 8.4 Warning Overlay (Content Script)

See Section 5.4 for Shadow DOM implementation details.

---

## 9. Platform Adapter System

### 9.1 Why Platform Adapters

Different AI platforms have different DOM structures. While our event interception is generic (document-level paste/drop/change handlers), some platforms require platform-specific handling:

- **Input location:** Some use `contenteditable`, others use `textarea`, others use custom elements
- **Submit mechanism:** Some use Enter key, others use a submit button, some use Ctrl+Enter
- **File upload UI:** Some use a button that triggers a hidden file input, others use drag-drop zones

### 9.2 Adapter Interface

```typescript
interface PlatformAdapter {
  readonly platformId: string;
  readonly urlPatterns: readonly string[];
  
  // Find the primary text input element
  findTextInput(document: Document): HTMLElement | null;
  
  // Find file upload trigger elements
  findFileInputs(document: Document): HTMLInputElement[];
  
  // Find drag-drop zones
  findDropZones(document: Document): HTMLElement[];
  
  // Determine if a paste event is into the AI input (vs. browser address bar, etc.)
  isAIInput(target: EventTarget | null): boolean;
  
  // Re-dispatch approved text to the AI input
  reDispatchText(element: HTMLElement, text: string): void;
}
```

### 9.3 Generic Adapter

The generic adapter works for all platforms by intercepting at the document level without relying on specific DOM selectors. Platform-specific adapters extend the generic adapter with better selectors when available.

```typescript
class GenericPlatformAdapter implements PlatformAdapter {
  readonly platformId = 'generic';
  readonly urlPatterns = [];
  
  findTextInput(document: Document): HTMLElement | null {
    // Look for contenteditable or textarea that's focused or visible
    return document.querySelector(
      '[contenteditable="true"]:not([aria-hidden]), textarea:not([aria-hidden])'
    );
  }
  
  findFileInputs(document: Document): HTMLInputElement[] {
    return Array.from(document.querySelectorAll('input[type="file"]'));
  }
  
  findDropZones(document: Document): HTMLElement[] {
    // All elements that have dragover/drop listeners
    // Note: we can't detect this reliably, so we intercept at document level
    return [];
  }
  
  isAIInput(target: EventTarget | null): boolean {
    if (!target || !(target instanceof HTMLElement)) return false;
    return target.matches('[contenteditable], textarea, input[type="text"]');
  }
  
  reDispatchText(element: HTMLElement, text: string): void {
    if (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement) {
      element.value = text;
      element.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (element.getAttribute('contenteditable')) {
      element.textContent = text;
      element.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}
```

---

## 10. Edge Cases

| Edge Case | Handling |
|---|---|
| **SPA navigation (same-tab, URL change)** | `chrome.tabs.onUpdated` detects URL change. Content script re-initializes listeners. MutationObserver restarts. |
| **iframe-based AI interface** | `allFrames: false` in content script registration (top frame only). If platform uses iframes for input, we add `allFrames: true` for that specific platform. |
| **Extension installed while AI page is already open** | `chrome.scripting.executeScript()` injects content script into existing tabs matching enabled platforms on extension install/enable. |
| **Multiple AI platforms in same tab** | Content script detects URL and loads appropriate platform adapter. Only one adapter active per tab. |
| **Browser developer tools open on extension page** | Accepted risk. DevTools access is a feature for the extension's user. Encrypted storage prevents casual data access. |

---

## 11. Failure Modes

| Failure | Impact | Recovery |
|---|---|---|
| Content script fails to inject | No interception on that page | Service Worker retries on next `tabs.onUpdated`. Badge shows warning. |
| Content script `paste` handler throws | Platform receives un-scanned paste | Global error boundary catches exception. Re-attaches listener. Logs error. |
| Service Worker times out (5 min idle) | Delayed first response on next event | Chrome automatically re-activates SW. State reloaded from `chrome.storage.session`. <1s recovery. |
| Popup fails to load | User sees blank popup | Generic error message. "Open settings in new tab" fallback link. |

---

## 12. Performance Budget

| Operation | Budget |
|---|---|
| Content script load and initialization | < 50ms |
| Event listener attachment | < 5ms |
| Clipboard data extraction | < 2ms |
| File reading (1MB, readAsArrayBuffer) | < 100ms |
| File reading (10MB, readAsArrayBuffer) | < 500ms |
| Shadow DOM overlay creation | < 50ms |
| Shadow DOM overlay render (first paint) | < 100ms |
| Popup DOMContentLoaded | < 200ms |
| Settings page DOMContentLoaded | < 500ms |

---

## 13. Memory Budget

| Component | Budget |
|---|---|
| Content script (per tab) | < 5MB |
| Shadow DOM overlay | < 2MB |
| Popup | < 10MB |
| Settings page | < 15MB |
| Dashboard page | < 20MB |

---

## 14. Security Risks

| Risk | Mitigation |
|---|---|
| Page JS modifies our Shadow DOM | Closed mode Shadow DOM. Page JS cannot access `shadowRoot`. |
| Page JS removes our overlay element | Overlay has MutationObserver on its parent. If removed unexpectedly, re-inject and escalate to browser notification. |
| Page JS intercepts our re-dispatched events | Re-dispatched events have a nonce. Our handler verifies nonce and skips re-interception. Page cannot forge the nonce. |
| Page JS floods MutationObserver | Debounced callback (100ms). Max 100 mutations per batch. Excess ignored. |

---

## 15. Testing Strategy

| Test Type | Scope | Tool |
|---|---|---|
| Unit | Message router, state management, platform adapters | Vitest with chrome-mock |
| Integration | Content script ↔ Service Worker IPC roundtrip | Playwright with extension loaded |
| E2E | Full flow on live AI platforms | Playwright (headed mode, test accounts) |
| Visual | Overlay rendering, popup layout | Playwright screenshot comparison |
| Compatibility | Chrome, Edge, Brave, Arc | CI matrix with multiple browsers |

---

## 16. Acceptance Criteria

- [ ] Extension installs cleanly on Chrome ≥ 120
- [ ] Dynamic content script injection works for all enabled platforms
- [ ] Paste interception works on ChatGPT, Claude, Gemini, Copilot, DeepSeek, Perplexity
- [ ] File upload interception works on all above platforms
- [ ] Drag-drop interception works on all above platforms
- [ ] Shadow DOM overlay renders correctly and is not affected by page styles
- [ ] Service Worker survives restart and resumes operation
- [ ] Offscreen Document is created and closed correctly
- [ ] Worker pool handles concurrent requests without deadlock
- [ ] All UI surfaces load within performance budgets
- [ ] Manifest passes Chrome Web Store review

---

## 17. Production Checklist

- [ ] Manifest permissions minimized and justified
- [ ] Content script tested on current versions of all AI platforms
- [ ] Service Worker lifecycle tested (install, activate, idle, restart)
- [ ] Offscreen Document lifecycle tested (create, use, idle, close, recreate)
- [ ] All platform adapters tested and DOM selectors verified
- [ ] Shadow DOM overlay tested across page styles (dark mode, RTL, high-contrast)
- [ ] Extension badge states all verified
- [ ] Chrome Web Store listing complete

---

## 18. Future Improvements

| Improvement | Impact |
|---|---|
| `chrome.sidePanel` API | Persistent side panel for scan results (better UX than popup) |
| `chrome.declarativeNetRequest` | Block specific network requests as last-resort prevention |
| Firefox WebExtension port | Different manifest format, different background script model |
| Service Worker keep-alive via periodic alarms | Faster first-scan experience (no cold start) |
