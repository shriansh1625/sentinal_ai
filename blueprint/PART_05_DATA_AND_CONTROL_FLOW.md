# PART 05 — DATA FLOW & CONTROL FLOW

**Document ID:** SS-BP-005
**Classification:** Internal Engineering — Principal Review
**Version:** 1.0.0
**Last Updated:** 2026-07-12
**Owner:** Principal Platform Architect, Principal Runtime Engineer
**Reviewers:** Principal Security Architect, Distinguished AI Engineer, Principal Performance Engineer

---

## Executive Summary

This is the diagram-centric reference for Sentinel Shield AI. It renders — in Mermaid, never ASCII — every flow that matters: the component graph across trust boundaries, the end-to-end runtime scan, the detection pipeline, the four interception event flows (paste, upload, drag-drop, clipboard), and the control-flow branches for errors, timeouts, cancellation, and Service-Worker-restart resumption. It closes with a data-classification flow that tracks every byte of sensitive data — where it is born, how long it lives, and exactly where it is destroyed.

The subsystem documented here against the standard 20-field template (see `c:\Users\shria\Desktop\Sentinal shield\blueprint\00_MASTER_INDEX.md` §5) is **the scan pipeline** — the logical path a unit of outbound data travels from interception in the content script to a released, blocked, or redacted outcome. This document supersedes the ASCII trust-boundary and data-flow diagrams in `c:\Users\shria\Desktop\Sentinal shield\blueprint\PART_04_SYSTEM_ARCHITECTURE.md` §4.2 and §6.3.

---

## 1. Dependencies

| Dependency | Type | What this document consumes |
|---|---|---|
| `c:\Users\shria\Desktop\Sentinal shield\blueprint\PART_04_SYSTEM_ARCHITECTURE.md` | Authoritative | Component inventory, trust boundaries, Coordinator-Processor model |
| `c:\Users\shria\Desktop\Sentinal shield\blueprint\PART_13_DETECTION_ENGINE.md` | Authoritative | Tier ordering, pipeline stages, confidence scoring |
| `c:\Users\shria\Desktop\Sentinal shield\blueprint\PART_01_EXECUTIVE_VISION.md` | Authoritative | Design principles, NOBJ-005 (no raw PII persisted), IPC envelope |
| Chrome Manifest V3 API | Platform constraint | Service Worker lifetime, offscreen document, `chrome.storage.session` |

---

## 2. System Architecture — Component Graph Across Trust Boundaries

Every node is placed inside the trust boundary that owns it. Solid edges are typed IPC; dashed edges are storage or file-system access. Note the invariant: the content script never talks to the offscreen document directly.

```mermaid
graph TB
    subgraph TB1["Trust Boundary 1 — User Device (shared responsibility)"]
        FS[(File System)]
        CB[(OS Clipboard)]
        subgraph TB2["Trust Boundary 2 — Browser Sandbox"]
            subgraph TB4["Trust Boundary 4 — Web Page Context (UNTRUSTED)"]
                AIP["AI Platform Page<br/>full DOM, untrusted JS"]
                CS["Content Script<br/>isolated world + closed Shadow DOM"]
            end
            subgraph TB3["Trust Boundary 3 — Extension Context (TRUSTED)"]
                SW["Service Worker<br/>Coordinator + Tier-1"]
                OD["Offscreen Document<br/>WASM host"]
                OCR["OCR Worker"]
                NER["NER Worker"]
                CV["CV Worker"]
                PDF["PDF Worker"]
                POP["Popup / Settings / Dashboard UI"]
                SESS[("chrome.storage.session<br/>ephemeral state + session key")]
                LOC[("chrome.storage.local + IndexedDB<br/>AES-256-GCM at rest")]
            end
        end
    end
    EXT["Optional Cloud LLM<br/>explanation only, TLS 1.3, metadata-only"]

    AIP -. "DOM events (untrusted)" .-> CS
    CS -->|"SCAN_REQUEST / decision"| SW
    SW -->|"PROCESS_TIER2/3"| OD
    OD -->|"postMessage + Transferable"| OCR
    OD --> NER
    OD --> CV
    OD --> PDF
    SW <-->|"SCAN_RESULT"| POP
    SW -. "read/write" .-> SESS
    SW -. "encrypted read/write" .-> LOC
    CS -. "FileReader" .-> FS
    CS -. "navigator.clipboard" .-> CB
    SW -. "metadata only, opt-in" .-> EXT

    classDef untrusted fill:#5c1a1a,stroke:#ff6b6b,color:#fff;
    classDef trusted fill:#14351f,stroke:#4caf50,color:#fff;
    classDef external fill:#3a3a1a,stroke:#e0c341,color:#fff;
    class AIP,CS untrusted;
    class SW,OD,OCR,NER,CV,PDF,POP,SESS,LOC trusted;
    class EXT external;
```

**Boundary-crossing controls.** Every arrow that crosses a trust boundary is validated:

| Crossing | Direction | Control |
|---|---|---|
| AI Page → Content Script | inbound (untrusted) | Capture-phase listeners; no page JS can read our isolated world; closed Shadow DOM |
| Content Script → Service Worker | inbound to trusted | JSON-Schema validation; `sender.tab.id` set by receiver, never by sender; rate limit **`MAX_SCANS_PER_MIN_PER_TAB=20`** (`DESIGN_OWNERSHIP_MATRIX.md` §3) |
| Service Worker → Offscreen | intra-trusted | Structured-clone payloads; result objects `Object.freeze`d |
| Offscreen → Worker | intra-trusted | Transferable `ArrayBuffer` (zero-copy); worker cannot touch `chrome.*` |
| Service Worker → Cloud LLM | outbound | TLS 1.3, cert validation, entity-type metadata only, opt-in |

---

## 3. Runtime Flow — End-to-End Scan

```mermaid
flowchart TD
    A["User action: paste / upload / drop / clipboard-read"] --> B{"Content Script<br/>capture-phase intercept"}
    B --> C["Read payload<br/>text via clipboardData, file via FileReader"]
    C --> D["preventDefault + show 'Scanning…' chip"]
    D --> E["SCAN_REQUEST → Service Worker"]
    E --> F{"Schema valid?<br/>size within budget?"}
    F -->|no| Z1["SCAN_REJECTED → chip: 'Could not scan'"]
    F -->|yes| G["Compute SHA-256, classify InputType"]
    G --> H["Tier 1: regex + checksum + entropy<br/>synchronous, &lt;10ms"]
    H --> I{"Needs Tier 2/3?<br/>text OR image present"}
    I -->|no| N["Aggregate"]
    I -->|yes| J["Ensure Offscreen Document + Worker pool"]
    J --> K["Tier 2 NER (text) / Tier 3 CV+OCR (image)<br/>async, budgeted"]
    K --> N
    N --> O["Risk scoring + context multipliers"]
    O --> P{"Enterprise policy present?"}
    P -->|yes| Q["Policy evaluation → monitor/warn/block"]
    P -->|no| R["Explanation generation (local templates)"]
    Q --> R
    R --> S["SCAN_RESULT → Content Script"]
    S --> T{"riskLevel"}
    T -->|"none / low"| U["Auto-release: re-dispatch original event"]
    T -->|"medium / high / critical"| V["Render Shadow DOM overlay"]
    V --> W{"User decision"}
    W -->|Allow| U
    W -->|Block| X["Discard payload"]
    W -->|Redact| Y["REDACT_REQUEST → Redaction Engine → release sanitized"]
```

**Global budget.** A single per-scan processing budget of **1500 ms** governs the entire async portion (Tier 2 + Tier 3 + aggregation). If the budget is exceeded, the coordinator returns partial results with `tiersCompleted` reflecting only what finished (see ADR-025 in `PART_08`). Tier 1 is never subject to the budget because it is synchronous and sub-10ms.

---

## 4. Detection Pipeline (Logical Tiers)

```mermaid
flowchart LR
    IN["RawInput"] --> P0["Stage 0 Preprocess<br/>NFKD, strip zero-width,<br/>EXIF strip, file→text"]
    P0 --> T1["Stage 1 · Tier 1<br/>Regex → Checksum → Entropy"]
    T1 --> D1{"text present?"}
    D1 -->|yes| T2["Stage 2 · Tier 2<br/>NER ONNX inference"]
    D1 -->|no| AGG
    P0 --> D2{"image present?"}
    D2 -->|yes| T3["Stage 3 · Tier 3<br/>OCR + BlazeFace + ZXing + signature"]
    D2 -->|no| AGG
    T2 --> AGG["Stage 4 Aggregate<br/>dedup + cross-validate + context"]
    T3 --> AGG
    T3 -. "OCR text re-enters Tier 1+2" .-> T1
    AGG --> SC["Stage 5 Score<br/>per-entity + document risk"]
    SC --> OUT["ScanResult (frozen)"]
```

The OCR loop is deliberate: text extracted from an image is fed back through Tier 1 and Tier 2 so that a credit-card number photographed on a card is Luhn-validated exactly like a pasted one.

---

## 5. Event Flow — The Four Interception Endpoints

```mermaid
flowchart TD
    subgraph Paste
        PA["paste event (capture)"] --> PA1["clipboardData.getData('text')"]
        PA1 --> PA2["InputType = TEXT"]
    end
    subgraph Upload
        UP["change / input on file input"] --> UP1["FileReader.readAsArrayBuffer"]
        UP1 --> UP2["sniff MIME → IMAGE/PDF/DOCX/…"]
    end
    subgraph DragDrop
        DD["drop event (capture)"] --> DD1["dataTransfer.files / getData"]
        DD1 --> DD2["route text→TEXT, file→sniff"]
    end
    subgraph Clipboard
        CL["explicit clipboard read (user gesture)"] --> CL1["navigator.clipboard.read()"]
        CL1 --> CL2["text→TEXT, image blob→IMAGE"]
    end
    PA2 --> HUB["Unified SCAN_REQUEST envelope"]
    UP2 --> HUB
    DD2 --> HUB
    CL2 --> HUB
    HUB --> SW["Service Worker Coordinator"]
```

All four endpoints normalize to a single `SCAN_REQUEST` envelope (see `PART_01` §8), so the coordinator has exactly one entry contract regardless of interception source. Per-endpoint attack surface and bypass analysis lives in `PART_29`.

---

## 6. Sequence Diagram — Clean Paste Released

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant CS as Content Script
    participant SW as Service Worker
    U->>CS: paste "See you at 3pm"
    CS->>CS: capture-phase preventDefault, show chip
    CS->>SW: SCAN_REQUEST {type:TEXT, hash}
    SW->>SW: schema+size OK, classify
    SW->>SW: Tier 1 regex/checksum/entropy → 0 detections (3ms)
    SW->>SW: no text-secret / no image → skip Tier 2/3
    SW->>SW: risk = 0.0, level = none
    SW-->>CS: SCAN_RESULT {detections:[], level:none} (7ms total)
    CS->>CS: auto-release path
    CS->>U: re-dispatch original paste, remove chip
```

For a clean input the user perceives no overlay and near-zero latency (P50 ~7 ms). The overlay is reserved for `medium+` risk per Principle 7 (human-in-the-loop only where it matters).

---

## 7. Sequence Diagram — Risky Paste → Overlay → Redact

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant CS as Content Script
    participant SW as Service Worker
    participant OD as Offscreen Doc
    participant NER as NER Worker
    U->>CS: paste text incl. "AKIA...", "John Doe", card
    CS->>SW: SCAN_REQUEST {type:TEXT}
    SW->>SW: Tier 1 → AWS key (0.95), card Luhn-valid (0.99) [8ms]
    SW->>OD: PROCESS_TIER2 {text}
    OD->>NER: postMessage(text buffer, transferable)
    NER-->>OD: entities [PERSON "John Doe" 0.88]
    OD-->>SW: TIER2_RESULT
    SW->>SW: aggregate + cross-validate + score → CRITICAL
    SW->>SW: generate explanations (local)
    SW-->>CS: SCAN_RESULT {3 detections, level:critical}
    CS->>U: render closed Shadow DOM overlay
    U->>CS: choose "Redact"
    CS->>SW: REDACT_REQUEST {scanId, actions}
    SW->>SW: Redaction Engine → masked text
    SW-->>CS: REDACT_RESULT {sanitizedText}
    CS->>U: dispatch sanitized paste, discard rawValue
```

The `rawValue` of each detection exists only inside the Service Worker for the lifetime of the scan and is never returned to the content script (only `maskedPreview` crosses back). The redaction is performed in the trusted context; the content script receives only the sanitized string.

---

## 8. Sequence Diagram — File Upload With OCR

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant CS as Content Script
    participant SW as Service Worker
    participant OD as Offscreen Doc
    participant OCR as OCR Worker
    participant CVW as CV Worker
    U->>CS: upload photo of PAN card (2.1 MB JPEG)
    CS->>CS: FileReader → ArrayBuffer, MIME=image/jpeg
    CS->>SW: SCAN_REQUEST {type:IMAGE, size} (transferable)
    SW->>SW: size < 10MB OK, EXIF strip, SHA-256
    SW->>OD: ensure OD + worker pool (lazy create)
    par OCR path
        OD->>OCR: recognize(imageBitmap)
        OCR-->>OD: text "ABCDE1234F ... John Doe"
        OD-->>SW: OCR_TEXT
        SW->>SW: Tier1+Tier2 on OCR text → PAN 0.90
    and CV path
        OD->>CVW: detect(imageBitmap)
        CVW-->>OD: face@[x,y,w,h] 0.97, no QR
        OD-->>SW: CV_RESULT
    end
    SW->>SW: aggregate (PAN + face) → HIGH
    SW-->>CS: SCAN_RESULT {2 detections, thumbnail masked}
    CS->>U: overlay with redact-image option
```

OCR (≤2500 ms budget) and CV (≤550 ms budget) run in parallel on separate workers. The coordinator awaits both under the 1500 ms async budget with OCR granted an extended sub-budget for image inputs (documented in `PART_23`); if OCR exceeds it, CV + Tier 1 results are still returned.

---

## 9. Control Flow — Error, Timeout, and Cancellation Branches

```mermaid
stateDiagram-v2
    [*] --> Scanning
    Scanning --> Tier1Done: Tier 1 OK
    Tier1Done --> AwaitingAsync: dispatch Tier 2/3
    AwaitingAsync --> Aggregating: all workers resolved
    AwaitingAsync --> PartialResults: budget 1500ms exceeded
    AwaitingAsync --> PartialResults: worker error / crash
    AwaitingAsync --> Cancelled: SCAN_CANCELLED (navigation/close)
    Aggregating --> Scored
    PartialResults --> Scored: score with tiersCompleted flag
    Scored --> Delivered
    Delivered --> [*]
    Cancelled --> Cleanup
    Cleanup --> [*]
    Scanning --> Rejected: schema/size fail
    Rejected --> [*]
```

| Branch | Trigger | Coordinator action | User-visible outcome |
|---|---|---|---|
| Rejected | Schema/size invalid | Drop scan, log (allowlisted) | Chip: "Could not scan — released" (individual) |
| PartialResults (timeout) | Async budget 1500 ms exceeded | Cancel pending worker promises, score what completed | Overlay flagged "partial scan" |
| PartialResults (worker error) | Worker `onerror` / rejected promise | Respawn worker for next scan, return other tiers | Overlay flagged "partial scan" |
| Cancelled | Tab navigation / close | Abort scan, discard partials; workers finish but results dropped | No overlay |
| Fail-open / Fail-closed | Terminal failure in delivery | Individual → release; Enterprise `block` → hold | Per policy |

**Fail-open vs fail-closed** (ADR-030 in `PART_08`): individual installs release on unrecoverable failure to preserve productivity; enterprise installs in `block` mode hold the payload and show a blocking overlay. This is a single branch keyed on `enforcementMode`.

---

## 10. Control Flow — Service-Worker-Restart Resumption

MV3 Service Workers are evicted after ~30 s idle or 5 min hard cap. Scan state is externalized to `chrome.storage.session` so an in-flight scan survives eviction.

```mermaid
sequenceDiagram
    autonumber
    participant CS as Content Script
    participant SW1 as Service Worker (v1, evicted)
    participant ST as chrome.storage.session
    participant SW2 as Service Worker (respawned)
    CS->>SW1: SCAN_REQUEST
    SW1->>ST: write {scanId, status:SCANNING, tier1:done, partials}
    Note over SW1: Chrome evicts SW1 (idle)
    CS->>SW2: (any message wakes SW) or resend on timeout
    SW2->>ST: read activeScansByTab
    alt session data still present
        SW2->>SW2: resume from checkpoint (re-run Tier 2/3 only)
        SW2-->>CS: SCAN_RESULT
    else session cleared / scan too old (>30s)
        SW2-->>CS: SCAN_STALE
        CS->>SW2: re-send SCAN_REQUEST (idempotent by hash)
    end
```

The content script arms a 30 s response timeout on every `SCAN_REQUEST`; if no result arrives it re-sends. Requests are idempotent (keyed by SHA-256 input hash), so a resend after eviction cannot double-process or produce two overlays.

---

## 11. Data Classification Flow — Lifetime and Destruction

This is the privacy heart of the document: what sensitive data exists at each hop, its classification, its lifetime, and where it is destroyed. Nothing raw is ever persisted (NOBJ-005).

```mermaid
flowchart TD
    A["RAW payload (SECRET)<br/>born: interception<br/>where: content script memory"] --> B["SCAN_REQUEST (SECRET)<br/>structured-clone copy in SW memory"]
    B --> C["Tier 1/2/3 working set (SECRET)<br/>SW + Worker memory"]
    C --> D["Detection.rawValue (SECRET)<br/>SW memory only, never leaves SW"]
    D --> E["maskedPreview (INTERNAL)<br/>e.g. 4111****1111"]
    E --> F["SCAN_RESULT (INTERNAL)<br/>no rawValue crosses to CS"]
    F --> G["Scan history entry (INTERNAL, encrypted)<br/>entity TYPES + counts only"]
    D --> H["destroyed at scan end<br/>SW GC + explicit null of rawValue map"]
    C --> I["Worker buffers destroyed<br/>transferable neutered + worker idle-terminate"]
    A --> J["content script copy destroyed<br/>on decision (release/block/redact)"]
    G --> K["auto-purge after retention window<br/>+ AES-256-GCM at rest"]

    classDef secret fill:#5c1a1a,stroke:#ff6b6b,color:#fff;
    classDef internal fill:#14351f,stroke:#4caf50,color:#fff;
    class A,B,C,D secret;
    class E,F,G,K internal;
```

| Hop | Data | Classification | Lifetime | Destruction mechanism |
|---|---|---|---|---|
| Content script | Raw text/file bytes | SECRET | Until user decision | Dereferenced on release/block/redact; overlay removed |
| IPC envelope | Raw payload copy | SECRET | Duration of transit + scan | GC after coordinator finishes; never written to disk |
| SW working set | Normalized text, buffers | SECRET | Duration of scan | GC at scan completion |
| `Detection.rawValue` | Exact matched value | SECRET | Duration of scan (SW only) | Explicit `null` + map cleared before `SCAN_RESULT` |
| Worker buffers | Image/text `ArrayBuffer` | SECRET | Duration of worker task | Transferable neutered on return; worker idle-terminated at 60 s |
| `maskedPreview` | Masked value | INTERNAL | Life of result/history | Purged with history |
| Scan history | Entity types + counts | INTERNAL | Retention window | AES-256-GCM at rest; auto-purge |
| Cloud LLM (opt-in) | Entity-type metadata | INTERNAL | Request lifetime | Never includes raw value; TLS 1.3 |

**Invariant enforced in CI:** `SCAN_RESULT` and any persisted structure are asserted to contain no field carrying a raw value. `rawValue` is typed as SW-internal and stripped by a freezing serializer before the message crosses back to the content script.

---

## 12. The Scan Pipeline as a Subsystem — 20-Field Template

### 12.1 Purpose
Transport a unit of outbound data from interception to a released/blocked/redacted outcome, applying multi-tier detection, risk scoring, and (optional) policy, while never persisting raw sensitive values.

### 12.2 Responsibilities
Interception normalization; schema/size gating; tier orchestration; budget enforcement; aggregation; scoring; explanation; policy; result delivery; state checkpointing; deterministic teardown of sensitive data.

### 12.3 Public Interfaces
`SCAN_REQUEST`, `SCAN_RESULT`, `REDACT_REQUEST`, `REDACT_RESULT`, `SCAN_CANCELLED`, `SCAN_STALE`, `SCAN_REJECTED` — all conforming to the `PART_01` §8 envelope with `type`, `id`, `timestamp`, `source`, `tabId`, `payload`.

### 12.4 Internal Interfaces
`Detector.detect(ProcessedInput)`, `Preprocessor.process(RawInput)`, `ResultAggregator.aggregate(Detection[])`, `RiskScorer.score(...)`, `PolicyEngine.evaluate(...)`, `StorageManager.appendHistory(...)`.

### 12.5 Data Flow
See §3 (runtime), §4 (pipeline), §11 (classification). Text and image paths converge at Aggregate (§4).

### 12.6 Control Flow
See §9 (errors/timeouts/cancellation) and §10 (SW restart). Single 1500 ms async budget; synchronous Tier 1 exempt.

### 12.7 Lifecycle
Created on `SCAN_REQUEST`; checkpointed to `chrome.storage.session`; destroyed on delivery or cancellation. Offscreen document and workers are lazily created and idle-terminated at 60 s.

### 12.8 Dependencies
`detection-engine` (pure), `shared-types`, Chrome offscreen/storage APIs, WASM runtimes (Tesseract, ONNX, TF.js, ZXing).

### 12.9 Memory Usage

| Phase | SW | Offscreen | Workers | Total |
|---|---|---|---|---|
| Idle | 5 MB | 0 (not created) | 0 | 12 MB |
| Text scan (10 KB) | 15 MB | 20 MB | 50 MB (NER) | ~90 MB |
| Image scan (1080p) | 15 MB | 20 MB | 120 MB (OCR) + 50 MB (CV) | ~210 MB |
| Peak (OCR+NER concurrent) | 30 MB | 20 MB | 200 MB | ~340 MB |

### 12.10 CPU Budget
Tier 1 ≤ 10 ms (single-thread SW); NER ≤ 150 ms (worker); OCR ≤ 2500 ms (worker); CV ≤ 550 ms (worker); aggregation + scoring ≤ 10 ms.

### 12.11 Latency Budget

| Input | P50 | P99 |
|---|---|---|
| Clean text 1 KB | 7 ms | 50 ms |
| Risky text 10 KB (Tier 1+2) | 120 ms | 200 ms |
| Image 1080p (OCR+CV) | 1300 ms | 3000 ms |
| PDF 10 text pages | 400 ms | 1000 ms |

### 12.12 Failure Modes
Worker crash (tier lost), OD crash (all WASM tiers lost), SW eviction (state in session), IndexedDB corruption (history reset), model cache corruption (re-extract from bundle), async budget exceeded (partial results).

### 12.13 Recovery Strategy
Respawn worker (<3 s); recreate OD (<5 s); resume from session checkpoint (<1 s); idempotent resend by hash; fail-open (individual) / fail-closed (enterprise block).

### 12.14 Security Concerns
Message spoofing (verify `sender.tab`); prototype pollution (parse/reserialize + schema); ReDoS (validated patterns, 1 MB cap); WASM sandbox (accepted residual, browser-sandboxed).

### 12.15 Privacy Concerns
Raw values never persisted, never cross back to content script, never sent to cloud. See §11 classification and destruction invariants.

### 12.16 Performance Concerns
Cold-start OD + worker init adds one-time ~300 ms; mitigated by lazy creation + 60 s keep-alive. Global budget prevents runaway inference.

### 12.17 Testing Strategy
Unit (each stage), integration (IPC round-trips, resumption), E2E Playwright (paste→overlay→redact), performance (budget assertions), chaos (kill SW mid-scan, kill worker mid-inference).

### 12.18 Production Checklist
See §13.

### 12.19 Future Improvements
See §14.

### 12.20 Open Risks (register)

| ID | Risk | Severity | Owner | Mitigation status |
|---|---|---|---|---|
| RISK-05-1 | OCR budget overrun on 4K screenshots | Medium | Runtime Eng | Downscale to 1080p before OCR — planned P2 |
| RISK-05-2 | Session state loss on browser crash mid-scan | Low | Platform Arch | Idempotent resend covers; accepted |
| RISK-05-3 | Overlay race on rapid multi-paste | Medium | Extension Eng | Per-tab scan mutex — implemented |

---

## 13. Production Checklist

- [ ] All Mermaid diagrams render in GitHub, VS Code, and Cursor without syntax error
- [ ] `SCAN_RESULT` provably contains no `rawValue` (CI assertion)
- [ ] 1500 ms async budget enforced and unit-tested for partial-result path
- [ ] SW-restart resumption verified by chaos test (kill SW mid-scan)
- [ ] Idempotent resend verified (double `SCAN_REQUEST` → single overlay)
- [ ] Data-classification destruction points covered by tests (rawValue nulled, buffers neutered)
- [ ] Cancellation on navigation discards partials and removes chip
- [ ] Fail-open (individual) and fail-closed (enterprise block) branches tested
- [ ] Per-tab scan mutex prevents concurrent-scan overlay races
- [ ] Memory budget verified at ≤340 MB peak over 500-scan soak

## 14. Future Improvements

| Improvement | Flow impact |
|---|---|
| Streaming Tier 1 on partial paste | Begin regex before full payload assembled; earlier chip feedback |
| WebGPU NER path | Cuts Tier 2 latency ~3x (150 ms → 50 ms); adds capability-detection branch |
| Speculative OD warm-up on AI-platform navigation | Removes cold-start ~300 ms from first image scan |
| Per-entity incremental delivery | Show high-confidence detections in overlay before slow tiers finish |
