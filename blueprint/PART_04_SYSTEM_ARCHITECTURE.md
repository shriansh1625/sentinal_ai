# PART 04 — SYSTEM ARCHITECTURE

**Document ID:** SS-BP-004
**Classification:** Internal Engineering — Principal Review
**Version:** 1.0.0
**Last Updated:** 2026-07-12
**Owner:** Principal Platform Architect, Principal Software Architect
**Reviewers:** Principal Security Architect, Distinguished AI Engineer

---

## Executive Summary

This document defines the complete system architecture for Sentinel Shield AI. It specifies every component, every boundary, every communication channel, and every data flow. This is the master architectural reference — all subsystem blueprints (detection engine, browser extension, WASM runtime, etc.) are subordinate to the architecture defined here.

---

## 1. Objectives

| ID | Objective |
|---|---|
| OBJ-001 | Define a modular architecture that separates detection logic from browser extension plumbing |
| OBJ-002 | Establish clear trust boundaries between all components |
| OBJ-003 | Design for testability: every component testable in isolation |
| OBJ-004 | Design for extensibility: new detectors, platforms, and file formats addable without architecture changes |
| OBJ-005 | Define the Coordinator-Processor model that replaces the traditional agent architecture |

---

## 2. Dependencies

| Dependency | Type |
|---|---|
| PART_01_EXECUTIVE_VISION.md | Design principles, non-objectives |
| PART_03_PRODUCT_REQUIREMENTS.md | Functional and non-functional requirements |
| Chrome Manifest V3 API | Platform constraint |

---

## 3. Design Principles

| Principle | Architectural Implication |
|---|---|
| **Separation of Concerns** | Detection engine is a pure library — no browser API imports. Browser extension is the integration layer. |
| **Dependency Inversion** | High-level modules (pipeline coordinator) depend on abstractions (Detector interface), not concrete implementations. |
| **Single Responsibility** | Each module has exactly one reason to change. RegexEngine changes when patterns change. RiskScorer changes when scoring logic changes. They never change for the same reason. |
| **Fail-Open for Individuals** | If detection fails, data passes through (with warning). User productivity is not blocked by bugs. |
| **Fail-Closed for Enterprise** | If detection fails in block mode, data is held. Security is not compromised by bugs. |
| **State Externalization** | Service Workers are ephemeral. All state lives in `chrome.storage.session` (memory-only) or `chrome.storage.local` (persistent, encrypted). |

---

## 4. Threat Model

### 4.1 Architecture-Level Threats

| Threat | Component | Mitigation |
|---|---|---|
| Message injection from web page | Content Script IPC | No `externally_connectable`. All IPC is internal `chrome.runtime` messaging. |
| Malicious mutation of detection results | IPC channel | Immutable result objects. Results are frozen (`Object.freeze`) before transmission. |
| Component impersonation | IPC messages | Source field is set by the receiving component based on `chrome.runtime.MessageSender`, not by the sender. |
| Unbounded resource consumption | WASM Workers | Timeouts on every async operation. Memory budgets enforced by Worker termination. |
| Race conditions in scan state | Service Worker | Per-tab scan state machine with mutex-like locking (only one active scan per tab). |

### 4.2 Trust Boundaries

```
┌─────────────────────────────────────────────────────────┐
│ TRUST BOUNDARY 1: User Device                           │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │ TRUST BOUNDARY 2: Browser Sandbox                 │   │
│  │                                                    │   │
│  │  ┌─────────────────────────────────────────────┐  │   │
│  │  │ TRUST BOUNDARY 3: Extension Context          │  │   │
│  │  │                                               │  │   │
│  │  │  ┌──────────────┐  ┌──────────────────────┐  │  │   │
│  │  │  │Service Worker│  │ Offscreen Document    │  │  │   │
│  │  │  │(Coordinator) │  │ ┌──────┐ ┌──────┐    │  │  │   │
│  │  │  │              │  │ │OCR   │ │NER   │    │  │  │   │
│  │  │  │              │  │ │Worker│ │Worker│    │  │  │   │
│  │  │  │              │  │ └──────┘ └──────┘    │  │  │   │
│  │  │  │              │  │ ┌──────┐ ┌──────┐    │  │  │   │
│  │  │  │              │  │ │CV    │ │PDF   │    │  │  │   │
│  │  │  │              │  │ │Worker│ │Worker│    │  │  │   │
│  │  │  │              │  │ └──────┘ └──────┘    │  │  │   │
│  │  │  └──────────────┘  └──────────────────────┘  │  │   │
│  │  │  ┌──────────┐  ┌────────────┐                │  │   │
│  │  │  │ Popup UI │  │ Settings   │                │  │   │
│  │  │  └──────────┘  └────────────┘                │  │   │
│  │  └─────────────────────────────────────────────┘  │   │
│  │                                                    │   │
│  │  ┌─────────────────────────────────────────────┐  │   │
│  │  │ TRUST BOUNDARY 4: Web Page Context           │  │   │
│  │  │                                               │  │   │
│  │  │  ┌──────────────┐  ┌────────────────────┐    │  │   │
│  │  │  │Content Script│  │ AI Platform Page   │    │  │   │
│  │  │  │(our code,    │  │ (untrusted code,   │    │  │   │
│  │  │  │ isolated     │  │  full DOM access)  │    │  │   │
│  │  │  │ world)       │  │                    │    │  │   │
│  │  │  └──────────────┘  └────────────────────┘    │  │   │
│  │  └─────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │ File System  │  │ Clipboard    │                    │
│  └──────────────┘  └──────────────┘                    │
└─────────────────────────────────────────────────────────┘

External:
  ┌────────────────────────────────────┐
  │ Cloud LLM API (Optional, TLS 1.3) │
  └────────────────────────────────────┘
```

---

## 5. Architecture Decisions

### ADR-004: Monorepo with Package Separation

**Context:** The detection engine is pure logic. The browser extension is integration glue. They change for different reasons.

**Problem:** Should we use a monorepo with packages, separate repos, or a single flat project?

**Alternatives:**

| Alternative | Pros | Cons |
|---|---|---|
| Single flat project | Simple setup | Detection engine entangled with browser APIs. Untestable without browser. |
| Separate repos | Strong isolation | Dependency management overhead. Cross-repo PRs. |
| Monorepo with packages | Isolation + shared tooling. Single PR for cross-cutting changes. | Slightly more complex build. |

**Decision:** Monorepo with packages (pnpm workspaces + Turborepo).

**Packages:**
- `packages/shared-types` — TypeScript interfaces, enums, constants
- `packages/detection-engine` — Pure detection library (zero browser imports)
- `packages/extension` — Chrome extension (integrates detection engine with browser APIs)
- `packages/enterprise-backend` — Optional enterprise API server

**Consequences:**
- Detection engine is testable with plain Node.js/Vitest (no browser needed)
- Detection engine could be reused in a Node.js server, Electron app, or VS Code extension
- Shared types ensure type-safe IPC between all components
- Turborepo caches build outputs for faster CI

### ADR-005: Coordinator-Processor Model (Not Autonomous Agents)

**Context:** The user requested a multi-agent architecture. We need to evaluate whether autonomous agents are appropriate for a browser extension's constrained runtime.

**Problem:** How should the detection pipeline be organized — as autonomous agents or as coordinated processors?

**Analysis:**

| Aspect | Autonomous Agents | Coordinator-Processor |
|---|---|---|
| **Decision-making** | Each agent decides independently | Coordinator makes all decisions |
| **Communication** | Agent-to-agent (mesh) | Hub-and-spoke (coordinator in center) |
| **State management** | Distributed state across agents | Centralized state in coordinator |
| **Failure handling** | Complex (agent failure affects peers) | Simple (coordinator handles all failures) |
| **Debugging** | Difficult (distributed tracing needed) | Easy (single point of observation) |
| **Runtime overhead** | High (agent runtime, message bus) | Low (simple function calls + Worker postMessage) |
| **Appropriate when** | Complex, non-deterministic decision chains | Deterministic pipeline with fixed stages |

**Decision:** Coordinator-Processor model.

**Rationale:**
1. Our pipeline is **deterministic**: input → preprocess → detect (multi-tier) → aggregate → score → explain → present. There are no autonomous decisions.
2. Browser extensions have **ephemeral Service Workers** (5-minute timeout). Agent state machines that survive SW restarts add unjustifiable complexity.
3. The coordinator pattern gives us **a single point of observation** for logging, timing, and debugging.
4. Processors are still **independently deployable and testable** — they implement a common interface.

**Consequences:**
- Service Worker is the sole coordinator (no secondary decision-makers)
- Each processor (OCR, NER, Regex, CV, Risk, Redaction, Explanation) is a stateless function or Worker
- Processing order is determined by the coordinator based on input type and configuration
- Recovery from processor failure is handled centrally by the coordinator

### ADR-006: Offscreen Document as WASM Processing Hub

**Context:** Manifest V3 Service Workers cannot create Web Workers directly (`new Worker()` is not available).

**Problem:** Where do we run WASM-heavy computation (Tesseract, ONNX, TensorFlow)?

**Alternatives:**

| Alternative | Pros | Cons |
|---|---|---|
| Service Worker only (main thread) | Simple | Blocks all message processing during WASM inference. 5-minute timeout kills long OCR. |
| Offscreen Document with Web Workers | Full Worker API available. Stable lifecycle. | Extra IPC hop (SW → OD → Worker). Only one OD per extension. |
| Native Messaging Host | Full OS access. No browser limits. | Requires native app install. Defeats "just install the extension" UX. |
| Sandboxed iframe | More flexible CSP | Limited API access. Cannot use `chrome.runtime`. |

**Decision:** Offscreen Document with Web Workers.

**Rationale:**
1. Offscreen Document provides a document context where `new Worker()` is valid
2. Workers run WASM on separate threads, keeping the Offscreen Document responsive
3. Only one extra IPC hop: SW → OD (chrome.runtime.sendMessage) → Worker (postMessage)
4. Chrome guarantees one Offscreen Document per extension — no resource leak risk

**Implementation details:**
- Offscreen Document is created lazily (on first WASM processing request)
- Closed after 60 seconds of inactivity (configurable)
- Reasons: `["WORKERS"]` in `chrome.offscreen.createDocument()`
- Worker pool: 1 OCR Worker, 1 NER Worker, 1 CV Worker, 1 PDF Worker (created on demand)

---

## 6. Component Architecture

### 6.1 Component Inventory

| Component | Runtime | Package | Responsibility |
|---|---|---|---|
| **Content Script** | Tab process (isolated world) | `extension` | Event interception, overlay rendering, file reading |
| **Service Worker** | Extension process | `extension` | Coordination, routing, state management, Tier 1 detection |
| **Offscreen Document** | Extension process | `extension` | WASM Worker hosting |
| **OCR Worker** | Worker thread | `extension` | Tesseract.js WASM execution |
| **NER Worker** | Worker thread | `extension` | ONNX Runtime / Transformers.js inference |
| **CV Worker** | Worker thread | `extension` | BlazeFace, ZXing, signature detection |
| **PDF Worker** | Worker thread | `extension` | pdf.js text extraction |
| **Document Worker** | Worker thread | `extension` | DOCX, CSV, JSON, XML parsing |
| **Popup UI** | Extension popup | `extension` | Quick status, scan summary, settings shortcut |
| **Settings Page** | Extension page | `extension` | Full configuration UI |
| **Dashboard Page** | Extension page | `extension` | Scan history, statistics, export |
| **Onboarding Page** | Extension page | `extension` | First-run wizard |
| **Regex Engine** | Any (pure library) | `detection-engine` | Pattern matching with checksum validation |
| **Checksum Engine** | Any (pure library) | `detection-engine` | Luhn, Verhoeff, MOD-97 |
| **Entropy Engine** | Any (pure library) | `detection-engine` | Shannon entropy calculation |
| **NER Engine** | Any (pure library) | `detection-engine` | Transformers.js model loading and inference |
| **CV Engine** | Any (pure library) | `detection-engine` | BlazeFace, ZXing, contour analysis |
| **OCR Engine** | Any (pure library) | `detection-engine` | Tesseract.js wrapper |
| **Risk Engine** | Any (pure library) | `detection-engine` | Risk score calculation |
| **Knowledge Engine** | Any (pure library) | `detection-engine` | Entity and platform knowledge queries |
| **Explanation Engine** | Any (pure library) | `detection-engine` | Template-based explanation generation |
| **Redaction Engine** | Any (pure library) | `detection-engine` | Text, image, PDF redaction |
| **Rule Engine** | Any (pure library) | `detection-engine` | Pattern + keyword + context rules |
| **Policy Engine** | Service Worker | `extension` | Enterprise policy evaluation |
| **Storage Manager** | Service Worker | `extension` | Encrypted IndexedDB + chrome.storage |

### 6.2 Component Communication Map

```
Content Script ←──chrome.runtime.sendMessage──→ Service Worker
Service Worker ←──chrome.runtime.sendMessage──→ Offscreen Document
Offscreen Document ←──postMessage (transferable)──→ Web Workers
Service Worker ←──chrome.runtime.sendMessage──→ Popup UI
Service Worker ←──chrome.storage.onChanged──→ Settings Page
Service Worker ←──chrome.storage.local──→ IndexedDB (via Storage Manager)
```

**Critical rule:** Content scripts NEVER communicate directly with the Offscreen Document. All communication goes through the Service Worker. This ensures the coordinator has full visibility of all data flows.

### 6.3 Data Flow: Complete Scan Pipeline

```
Phase 1: Interception
  Content Script intercepts event (paste/upload/drop)
  Content Script reads data (text via clipboardData, file via FileReader)
  Content Script sends SCAN_REQUEST to Service Worker
  Content Script shows "Scanning..." indicator

Phase 2: Preprocessing (Service Worker)
  Validate message schema
  Determine input type (text, image, PDF, DOCX, CSV, JSON, XML, ZIP)
  Apply size limits (reject if over budget)
  Compute SHA-256 hash (for deduplication and integrity)

Phase 3: Tier 1 Detection (Service Worker — synchronous, <10ms)
  Run Regex Engine on text content
  Run Checksum Engine on regex matches
  Run Entropy Engine on remaining text
  Aggregate Tier 1 results

Phase 4: Tier 2 Detection (Offscreen Document — async, <200ms)
  IF input contains text:
    Send text to NER Worker
    NER Worker runs ONNX inference
    Return entity spans with confidence
  IF input is image or scanned PDF page:
    Send image to OCR Worker
    OCR Worker runs Tesseract WASM
    Return extracted text
    Run Tier 1 + NER on extracted text

Phase 5: Tier 3 Detection (Offscreen Document — async, <500ms per image)
  IF input is image:
    Send image to CV Worker
    CV Worker runs BlazeFace (face detection)
    CV Worker runs ZXing (QR/barcode detection)
    CV Worker runs signature detection
    CV Worker runs document classification
    Return visual detections

Phase 6: Aggregation (Service Worker)
  Merge results from all tiers
  Deduplicate overlapping entity spans
  Cross-validate (regex + NER agreement boosts confidence)

Phase 7: Risk Scoring (Service Worker)
  Calculate per-entity risk scores
  Calculate document-level risk score
  Apply context multiplier (platform, code context)
  Apply volume multiplier (entity count)
  Determine risk level (low/medium/high/critical)

Phase 8: Policy Evaluation (Service Worker)
  IF enterprise policy exists:
    Evaluate policy rules against detections
    Apply enforcement mode (monitor/warn/block)

Phase 9: Explanation Generation (Service Worker)
  For each detection, generate explanation from template
  Include risk context, platform context, recommendation

Phase 10: Result Delivery
  Service Worker sends SCAN_RESULT to Content Script
  Content Script renders Shadow DOM overlay
  Content Script updates extension badge

Phase 11: User Decision
  User reviews detections and chooses:
    Allow → Content Script re-dispatches original event
    Block → Content Script discards event
    Redact → Service Worker runs Redaction Engine → Content Script dispatches with sanitized data
```

### 6.4 State Management

> **SUPERSEDED CRYPTO FIELD (Architecture Freeze 2026-07-12):**  
> Do **not** store a live `CryptoKey` in `chrome.storage.session`. Canonical crypto/storage: **PART_19** + ADR-033.  
> Tier-1 may store **raw 256-bit key material** (bytes) in session and re-`importKey` on each SW wake.  
> Scan/UI state below remains valid; encryption key handling is owned exclusively by PART_19.

**State location:** `chrome.storage.session` (memory-only, ephemeral) for scan coordination.

```
{
  "activeScansByTab": {
    "12345": {
      "scanId": "uuid",
      "status": "SCANNING" | "AWAITING_USER" | "PROCESSING_REDACTION" | "INTERRUPTED",
      "startTime": 1720777600000,
      "inputHash": "sha256",
      "tier1Complete": true,
      "tier2Complete": false,
      "tier3Complete": false,
      "partialResults": [...],
      "timeoutId": "uuid"
    }
  },
  "workerHealth": {
    "ocr": "READY" | "BUSY" | "ERROR" | "UNINITIALIZED",
    "ner": "READY" | "BUSY" | "ERROR" | "UNINITIALIZED",
    "cv": "READY" | "BUSY" | "ERROR" | "UNINITIALIZED",
    "pdf": "READY" | "BUSY" | "ERROR" | "UNINITIALIZED"
  }
}
```

**Why `chrome.storage.session`:** Survives Service Worker restarts within a browser session; cleared on browser restart. Crypto key material rules: **PART_19 only**.

---

## 7. Interfaces

### 7.1 Detector Interface

```typescript
interface Detector {
  readonly name: string;
  readonly version: string;
  readonly supportedInputTypes: readonly InputType[];
  
  initialize(): Promise<void>;
  detect(input: ProcessedInput): Promise<readonly Detection[]>;
  isReady(): boolean;
  shutdown(): Promise<void>;
}
```

### 7.2 Detection Result

```typescript
interface Detection {
  readonly entityType: EntityType;
  readonly entitySubtype: string;
  readonly confidence: number;        // 0.0 - 1.0
  readonly source: DetectionSource;    // 'regex' | 'ner' | 'entropy' | 'cv' | 'rule'
  readonly position: TextPosition | ImagePosition;
  readonly rawValue?: string;          // In-memory only, NEVER persisted
  readonly maskedPreview: string;      // e.g., "4111****1111"
  readonly checksum?: ChecksumResult;  // If checksum-validated
}
```

### 7.3 Scan Result

```typescript
interface ScanResult {
  readonly scanId: string;
  readonly timestamp: number;
  readonly detections: readonly Detection[];
  readonly riskScore: number;          // 0.0 - 1.0
  readonly riskLevel: RiskLevel;       // 'low' | 'medium' | 'high' | 'critical'
  readonly explanations: readonly Explanation[];
  readonly processingTimeMs: number;
  readonly tiersCompleted: readonly DetectionTier[];
  readonly policyAction?: PolicyAction; // Enterprise only
}
```

---

## 8. Edge Cases

| Edge Case | Architectural Handling |
|---|---|
| **Service Worker dies during scan** | Scan state is in `chrome.storage.session`. On SW restart, coordinator checks for in-progress scans and either resumes (if data is still in session) or sends `SCAN_FAILED` to content script. |
| **Offscreen Document is closed during processing** | SW detects via health check failure. Recreates OD. Returns partial results (Tier 1 only). |
| **User opens 20 tabs to AI platforms** | Each tab has an independent content script. Service Worker queues scans: max 3 concurrent, rest queued FIFO. |
| **Extension update deployed while scans are active** | Chrome handles this: old SW continues until it goes idle, then new SW activates. In-progress scans complete under old version. |
| **User revokes host permission for a platform** | Content script is automatically removed by Chrome. Next navigation to that platform will not have interception. Badge shows gray. |

---

## 9. Failure Modes

| Failure | Blast Radius | Recovery | Time to Recovery |
|---|---|---|---|
| Single Worker crash | One detection tier unavailable | Respawn Worker, return partial results | < 3 seconds |
| Offscreen Document crash | All WASM-based tiers unavailable | Recreate OD + Workers, return Tier 1 results only | < 5 seconds |
| Service Worker restart | All state in memory lost | Reload from `chrome.storage.session`, re-initialize | < 1 second |
| IndexedDB corruption | Scan history lost, settings lost | Reset to defaults, warn user, rebuild from backup | Immediate (graceful degradation) |
| Model cache corruption | NER/OCR produces errors | Checksum validation fails, re-extract from extension package | < 5 seconds |

---

## 10. Performance Budget

| Component | Operation | Budget |
|---|---|---|
| Content Script | Event handler execution | < 5ms |
| Content Script | File reading (10MB) | < 500ms |
| Service Worker | Message routing | < 1ms |
| Service Worker | Tier 1 detection (10KB) | < 50ms |
| Offscreen Document | Worker dispatch | < 5ms |
| OCR Worker | Tesseract inference (1080p) | < 2500ms |
| NER Worker | ONNX inference (1KB) | < 150ms |
| CV Worker | BlazeFace (1080p) | < 50ms |
| CV Worker | ZXing (1080p) | < 20ms |
| Risk Engine | Score calculation | < 5ms |
| Explanation Engine | Template rendering | < 10ms |

---

## 11. Memory Budget

| Component | Idle | Active | Peak |
|---|---|---|---|
| Content Script | 2MB | 5MB | 10MB (large overlay) |
| Service Worker | 5MB | 15MB | 30MB (large text scan) |
| Offscreen Document | 5MB | 20MB | 50MB (Worker initialization) |
| OCR Worker | 0MB | 80MB | 120MB (multi-page) |
| NER Worker | 0MB | 50MB | 80MB (model + inference) |
| CV Worker | 0MB | 30MB | 50MB (model + image) |
| **Total Extension** | **12MB** | **≤200MB** | **≤256MB** (canonical `EXT_PEAK_MEM_MB`; serialize OCR vs NER) |

---

## 12. Security Risks

| Risk | Component | Mitigation |
|---|---|---|
| Message spoofing via `chrome.runtime.sendMessage` from compromised content script | IPC | Verify `sender.tab` in Service Worker. Content scripts cannot fake their tab ID. |
| Prototype pollution in message parsing | Service Worker | Use `JSON.parse(JSON.stringify(msg))` to strip prototypes. Schema validate before use. |
| Resource exhaustion via repeated scan requests | Service Worker | Rate limit: **`MAX_SCANS_PER_MIN_PER_TAB=20`** (canonical: `DESIGN_OWNERSHIP_MATRIX.md` §3). Queue excess. |
| WASM sandbox escape | Offscreen Document | WASM runs in browser sandbox. No direct OS access. Accepted residual risk. |

---

## 13. Testing Strategy

| Test Type | Scope | Tool |
|---|---|---|
| **Unit** | Individual engines, components | Vitest |
| **Integration** | IPC roundtrips, pipeline end-to-end | Vitest + chrome-extension-mock |
| **E2E** | Full browser flow (install → navigate → paste → detect → display) | Playwright |
| **Architecture** | Dependency direction, import validation | Custom ESLint rules + Turborepo graph |
| **Performance** | Latency and memory benchmarks | Custom benchmark harness |

### Architecture Test Rules

| Rule | Enforcement |
|---|---|
| `detection-engine` MUST NOT import from `extension` | Turborepo dependency graph + ESLint no-restricted-imports |
| `detection-engine` MUST NOT import browser APIs (`chrome.*`, `window.*`, `document.*`) | Custom ESLint rule |
| `shared-types` MUST NOT import from any other package | Turborepo dependency graph |
| Content scripts MUST NOT import `chrome.storage` directly | Custom ESLint rule |

---

## 14. Acceptance Criteria

- [ ] All components communicate via typed IPC messages
- [ ] Detection engine is testable without browser APIs
- [ ] Service Worker survives restart and resumes from stored state
- [ ] Offscreen Document is created lazily and cleaned up on inactivity
- [ ] All trust boundary crossings have validation
- [ ] Architecture dependency rules enforced in CI
- [ ] Performance budget met for all operations
- [ ] Memory budget met under sustained load (500 scans)

---

## 15. Production Checklist

- [ ] Architecture diagram matches implementation
- [ ] All IPC message types implemented and tested
- [ ] State management survives Service Worker restart
- [ ] Worker pool handles concurrent requests correctly
- [ ] Rate limiting prevents resource exhaustion
- [ ] Health monitoring detects and recovers from failures
- [ ] Architecture tests pass in CI
- [ ] Load test confirms no memory leaks over 500 scans

---

## 16. Future Improvements

| Improvement | Architecture Impact |
|---|---|
| Desktop app (Electron) | Detection engine reused directly (no browser API deps). New integration layer for Electron IPC. |
| VS Code extension | Detection engine reused. New integration layer for VS Code extension API. |
| Firefox port | Extension package restructured for WebExtension API differences. Detection engine unchanged. |
| Native Messaging Host | Optional alternative to Offscreen Document for systems with native app support. |
