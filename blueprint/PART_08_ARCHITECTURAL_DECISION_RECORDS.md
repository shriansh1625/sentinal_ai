# PART 08 — ARCHITECTURAL DECISION RECORDS (LOG)

**Document ID:** SS-BP-008
**Classification:** Internal Engineering — Principal Review
**Version:** 1.0.0
**Last Updated:** 2026-07-12
**Owner:** Principal Software Architect, Principal Platform Architect
**Reviewers:** Principal Security Architect, Distinguished AI Engineer, Engineering Director

---

## Executive Summary

This is the single authoritative Architectural Decision Record log for Sentinel Shield AI. It resolves audit gap **G-01** (see `c:\Users\shria\Desktop\Sentinal shield\blueprint\REPOSITORY_AUDIT_REPORT.md` §G-01): ADRs were previously scattered inline with duplicate numbering — ADR-003 in `PART_02`, ADR-004/005/006 in `PART_04`. Those inline ADRs are hereby renumbered into a clean, contiguous sequence (ADR-001 … ADR-031) and the inline copies become back-references to this log. When an inline ADR and this log disagree, **this log wins**.

Each record carries: Context, Problem, Alternatives (table), Decision, Consequences, Status, Date. Records with an inline origin are summarized here with a back-reference to their home document; newly consolidated records are stated in full.

---

## 1. ADR Status Table

| ADR | Title | Status | Origin | Date |
|---|---|---|---|---|
| ADR-001 | Browser extension as primary delivery vehicle | Accepted | `PART_01` | 2026-06-02 |
| ADR-002 | Local-first detection, zero cloud dependency | Accepted | `PART_01` | 2026-06-02 |
| ADR-003 | Exhaustive vs focused entity coverage | Accepted | `PART_02` | 2026-06-05 |
| ADR-004 | Monorepo + pnpm workspaces + Turborepo | Accepted | `PART_04` | 2026-06-08 |
| ADR-005 | Coordinator-Processor over autonomous agents | Accepted | `PART_04` | 2026-06-08 |
| ADR-006 | Offscreen Document as WASM processing host | Accepted | `PART_04` | 2026-06-08 |
| ADR-007 | On-device ML inference (no cloud verification loop) | Accepted | this log | 2026-06-12 |
| ADR-008 | Regex-before-NER tiered execution | Accepted | this log | 2026-06-12 |
| ADR-009 | AES-256-GCM for data at rest | Accepted | this log | 2026-06-15 |
| ADR-010 | Argon2id over PBKDF2-600k for passphrase KDF | Accepted | this log | 2026-06-15 |
| ADR-011 | Cross-origin isolation (COOP/COEP) for WASM threads | Accepted | this log | 2026-06-18 |
| ADR-012 | Allowlist structured logging over deny-list sanitizer | Accepted | this log | 2026-06-18 |
| ADR-013 | Dynamic content-script registration | Accepted | this log | 2026-06-20 |
| ADR-014 | Shadow DOM closed mode for overlay | Accepted | this log | 2026-06-20 |
| ADR-015 | TypeScript strict mode across all packages | Accepted | this log | 2026-06-22 |
| ADR-016 | Vitest + Playwright test stack | Accepted | this log | 2026-06-22 |
| ADR-017 | Semantic versioning, independently versioned packages | Accepted | this log | 2026-06-24 |
| ADR-018 | ONNX Runtime Web + Transformers.js, INT8 models | Accepted | this log | 2026-06-24 |
| ADR-019 | Single global per-scan processing budget | Accepted | this log | 2026-06-26 |
| ADR-020 | No `chrome.storage.sync` | Accepted | this log | 2026-06-26 |
| ADR-021 | Fail-open (individual) / fail-closed (enterprise) | Accepted | this log | 2026-06-28 |
| ADR-022 | IndexedDB (via `idb`) for scan history | Accepted | this log | 2026-06-30 |
| ADR-023 | Lit web components over React for injected UI | Accepted | this log | 2026-06-30 |
| ADR-024 | Capture-phase event interception | Accepted | this log | 2026-07-02 |
| ADR-025 | Idempotent scans keyed by SHA-256 input hash | Accepted | this log | 2026-07-02 |
| ADR-026 | Non-exportable session `CryptoKey`, never persisted | Accepted | this log | 2026-07-04 |
| ADR-027 | JSON Schema (Ajv) validation for all IPC | Accepted | this log | 2026-07-04 |
| ADR-028 | One worker per modality, lazily pooled | Accepted | this log | 2026-07-06 |
| ADR-029 | Models bundled in package, not downloaded | Accepted | this log | 2026-07-06 |
| ADR-030 | Cloud LLM explanation is opt-in and metadata-only | Accepted | this log | 2026-07-08 |
| ADR-031 | Strict CSP: no remote code, `wasm-unsafe-eval` only | Accepted | this log | 2026-07-08 |
| ADR-032 | v1 WASM = single-thread SIMD (supersedes ADR-011 for v1.0) | Accepted | PEDR | 2026-07-12 |
| ADR-033 | Tier-1 session key material + history default (supersedes ADR-026) | Accepted | PEDR | 2026-07-12 |
| ADR-034 | Lit-only UI for v1 (supersedes ADR-023 React clause) | Accepted | PEDR | 2026-07-12 |
| ADR-035 | Optional host permissions = AI platforms only (v1) | Accepted | PEDR | 2026-07-12 |
| ADR-036 | Fail-open must not silent-release unscanned payloads | Accepted | PEDR | 2026-07-12 |
| ADR-037 | v1 detection scope = Tier-1 + OCR; NER/CV off by default | Accepted | PEDR | 2026-07-12 |
| ADR-S1 | Autonomous multi-agent architecture | **Superseded** by ADR-005 | draft | 2026-05-28 |
| ADR-S2 | Deny-list PII log sanitizer | **Superseded** by ADR-012 | draft | 2026-05-30 |
| ADR-S3 | Remote model download on first run | **Superseded** by ADR-029 | draft | 2026-05-30 |
| ADR-011 (v1 effect) | COOP/COEP threaded WASM | **Superseded for v1.0** by ADR-032 | this log | 2026-07-12 |
| ADR-026 (v1 effect) | Non-exportable CryptoKey in session | **Superseded** by ADR-033 | this log | 2026-07-12 |

---

## 2. Back-Referenced ADRs (Origin in Other Documents)

### ADR-001 — Browser Extension as Primary Delivery Vehicle
**Summary:** Deliver as a Chromium Manifest V3 extension rather than desktop proxy, DNS filter, network appliance, or browser fork.
**Decision & rationale:** Full record in `c:\Users\shria\Desktop\Sentinal shield\blueprint\PART_01_EXECUTIVE_VISION.md` §ADR-001. Alternatives (proxy breaks TLS, DNS too coarse, appliance wrong market, fork unsustainable) evaluated there. **Status:** Accepted.

### ADR-002 — Local-First Detection, Zero Cloud Dependency
**Summary:** Detect entirely on-device; the only network call is the optional, metadata-only cloud explanation (see ADR-030).
**Decision & rationale:** Full record in `PART_01` §ADR-002. **Status:** Accepted. **Related:** ADR-007 (on-device inference), ADR-018 (model format), ADR-030 (explanation boundary).

### ADR-003 — Exhaustive vs Focused Entity Coverage
**Summary:** Ship a broad, prioritized entity taxonomy rather than a minimal set, gated by precision thresholds to control false positives.
**Decision & rationale:** Full record in `c:\Users\shria\Desktop\Sentinal shield\blueprint\PART_02_REAL_WORLD_PROBLEM_ANALYSIS.md` §ADR-003. **Status:** Accepted.

### ADR-004 — Monorepo + pnpm Workspaces + Turborepo
**Context:** The pure detection engine and the browser-integration glue change for different reasons and must be independently testable. **Problem:** Single flat project, multiple repos, or monorepo?

| Alternative | Pros | Cons |
|---|---|---|
| Single flat project | Simplest setup | Detection engine entangled with `chrome.*`; untestable without browser |
| Multiple repos | Strong isolation | Cross-repo PRs, version drift, tooling duplication |
| **Monorepo (pnpm + Turborepo)** | Isolation + shared tooling; one PR for cross-cutting change; cached builds | Slightly more complex build graph |

**Decision:** Monorepo with pnpm workspaces and Turborepo. Packages: `shared-types`, `detection-engine`, `extension`, `enterprise-backend`. pnpm's content-addressed store and strict `node_modules` prevent phantom dependencies; Turborepo caches and parallelizes task graphs. **Consequences:** detection-engine testable in plain Node/Vitest; reusable in Electron/VS Code; type-safe IPC via shared-types; CI cache hits cut build time. Full context also in `PART_04` §ADR-004. **Status:** Accepted.

### ADR-005 — Coordinator-Processor over Autonomous Agents
**Summary:** A single Service-Worker coordinator drives stateless processors (hub-and-spoke), rejecting an autonomous-agent mesh.
**Decision & rationale:** Full comparison table in `PART_04` §ADR-005 (deterministic pipeline, ephemeral SW, single observation point). Supersedes draft **ADR-S1**. **Status:** Accepted.

### ADR-006 — Offscreen Document as WASM Processing Host
**Summary:** Run WASM-heavy work in Web Workers hosted by a single Offscreen Document, because MV3 Service Workers cannot call `new Worker()`.
**Decision & rationale:** Full record in `PART_04` §ADR-006 (`reasons: ["WORKERS"]`, lazy create, 60 s idle close). **Status:** Accepted. **Related:** ADR-011, ADR-028.

---

## 3. Consolidated ADRs (Stated in Full)

### ADR-007 — On-Device ML Inference (No Cloud Verification Loop)
**Context:** ADR-002 mandates local-first. This ADR fixes *where inference runs*, closing the door on any "local-detect + cloud-verify" hybrid. **Problem:** May we ever send ambiguous spans to a cloud model to raise accuracy?

| Alternative | Pros | Cons |
|---|---|---|
| Hybrid (local + cloud verify) | +2–4% recall on unstructured PII | Sends candidate PII to cloud — violates the product thesis |
| **Pure on-device inference** | Zero data egress; works offline | Accuracy bounded by on-device model; larger bundle |

**Decision:** All inference runs on-device. No cloud verification path exists in the detection pipeline. **Consequences:** Detection accuracy is our engineering responsibility (quantization, distillation, evaluation); the pipeline has provably zero `fetch` in `detection-engine` (CI-enforced per `PART_01` Principle 1). **Status:** Accepted.

### ADR-008 — Regex-Before-NER Tiered Execution
**Context:** Structured entities (cards, IDs, keys) are checksum-verifiable and deterministic; unstructured PII (names, addresses) needs ML. **Problem:** Run detectors in parallel, or order them?

| Alternative | Pros | Cons |
|---|---|---|
| All tiers in parallel | Lowest wall-clock for full scan | Wastes CPU on clean inputs; NER cost paid even when regex already conclusive |
| NER first | Best unstructured recall early | Slow, probabilistic result gates fast deterministic ones |
| **Regex+checksum first, then NER** | Clean/structured inputs resolve in <10 ms; NER only when needed | Two-phase orchestration |

**Decision:** Tier 1 (regex + checksum + entropy, synchronous) completes before Tier 2 (NER) is awaited; Tier 2 is skipped when no text remains ambiguous. **Consequences:** P50 latency for clean text ~7 ms; Luhn-validated card detected with certainty even if the model fails to load. Enforces `PART_01` Principle 3. **Status:** Accepted.

### ADR-009 — AES-256-GCM for Data at Rest
**Context:** Scan history and settings persist to IndexedDB and must be encrypted (attack-surface control, `PART_01` §18). **Problem:** Which authenticated cipher?

| Alternative | Pros | Cons |
|---|---|---|
| AES-256-CBC + HMAC | Widely available | Encrypt-then-MAC assembly error-prone; two keys |
| **AES-256-GCM (Web Crypto)** | AEAD in one primitive; hardware-accelerated; native `crypto.subtle` | Nonce reuse is catastrophic — must manage IVs |
| ChaCha20-Poly1305 | Fast without AES-NI | Not in Web Crypto `subtle` across all targets |

**Decision:** AES-256-GCM via `crypto.subtle`, 96-bit random IV per record, IV stored alongside ciphertext, never reused with the same key. **Consequences:** Single AEAD primitive; tamper-evident; no third-party crypto library. IV-management unit tests are mandatory. **Status:** Accepted. **Related:** ADR-010, ADR-026.

### ADR-010 — Argon2id over PBKDF2-600k for Passphrase KDF
**Context:** When a user sets an optional passphrase, we derive the storage key from it. **Problem:** Argon2id or PBKDF2-HMAC-SHA-256 (OWASP-2023 600k iterations)?

| Alternative | Pros | Cons |
|---|---|---|
| PBKDF2-SHA-256 (600k) | Native in Web Crypto; FIPS-friendly | CPU-only hardness; cheap for GPU/ASIC attackers |
| **Argon2id (WASM)** | Memory-hard; resists GPU/ASIC; tunable m/t/p | Requires audited WASM (`argon2-browser`); +~1 MB |
| scrypt | Memory-hard, mature | Weaker side-channel story than Argon2id; less tunable |

**Decision:** **Argon2id** with parameters **`m=19 MiB, t=2, p=1`** (canonical `DESIGN_OWNERSHIP_MATRIX` §3 / PART_19; PEDR closed the prior 64 MiB/t=3 draft). Delivered via audited, integrity-verified WASM. PBKDF2-HMAC-SHA256 @ **600,000** iterations is the Web-Crypto fallback if Argon2 WASM fails integrity. **Rationale:** memory-hardness vs offline cracking; 19 MiB fits 8GB reference laptops. **Consequences:** unlock latency budgeted; params versioned in salt record. **Status:** Accepted (parameters amended 2026-07-12).

### ADR-011 — Cross-Origin Isolation (COOP/COEP) for WASM Threads
**Context:** Multi-threaded WASM (ONNX Runtime Web, Tesseract) needs `SharedArrayBuffer`, which requires a cross-origin-isolated context. **Problem:** How do we obtain isolation for the Offscreen Document without breaking extension pages?

| Alternative | Pros | Cons |
|---|---|---|
| Single-threaded WASM | No isolation headers needed | 2–4x slower OCR/NER |
| **COOP: same-origin + COEP: require-corp on offscreen/worker docs** | Unlocks `SharedArrayBuffer` + threads | All sub-resources must be CORP/CORS-clean |

**Decision:** Serve the Offscreen Document and worker scripts with `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`; all WASM/model assets are packaged in-extension (ADR-029), so CORP compliance is trivial. **Consequences:** threaded inference enabled; any future remote asset would break isolation — reinforces ADR-029. **Status:** Accepted.

### ADR-012 — Allowlist Structured Logging over Deny-List Sanitizer
**Context:** Logs must never contain PII (`PART_01` §17). **Problem:** Scrub known-bad patterns from free-form logs (deny-list), or only emit explicitly allowed fields (allowlist)?

| Alternative | Pros | Cons |
|---|---|---|
| Deny-list regex sanitizer | Works with existing free-form logs | Fails open — any unforeseen PII shape leaks |
| **Allowlist structured logging** | Fails closed — only whitelisted keys/types emitted | Requires structured log call sites |

**Decision:** All logging is structured; a log event may only carry fields from a typed allowlist (e.g. `entityType`, `count`, `tier`, `latencyMs`, `errorCode`) — never `rawValue`, `text`, or `maskedPreview`. **Rationale:** security review (Cloudflare/MS Defender posture) rejects deny-lists for PII because they leak on the first unmodeled format. Supersedes draft **ADR-S2**. **Consequences:** slightly more verbose call sites; a lint rule bans string interpolation into log calls. **Status:** Accepted.

### ADR-013 — Dynamic Content-Script Registration
**Context:** Host permissions are optional and user-granted per platform (`PART_01` §5, minimal attack surface). **Problem:** Declare static `content_scripts` in the manifest, or register at runtime?

| Alternative | Pros | Cons |
|---|---|---|
| Static `content_scripts` | Simple | Forces broad host permissions at install; CWS friction |
| **`chrome.scripting.registerContentScripts` at runtime** | Inject only where the user granted access | Requires lifecycle management on permission change |

**Decision:** Register content scripts dynamically after the user grants a host permission; unregister when revoked. **Consequences:** install-time permission prompt is minimal; interception appears exactly on granted platforms; requires `permissions.onAdded/onRemoved` handling. **Status:** Accepted.

### ADR-014 — Shadow DOM Closed Mode for the Overlay
**Context:** The warning overlay renders inside an untrusted AI-platform page. **Problem:** How do we isolate our UI from the page's CSS/JS?

| Alternative | Pros | Cons |
|---|---|---|
| Plain DOM injection | Simplest | Page CSS/JS can read, restyle, or remove it |
| Open Shadow DOM | Style isolation | `element.shadowRoot` readable by page scripts |
| **Closed Shadow DOM** | Style + script isolation; page cannot access `shadowRoot` | We must retain our own root reference |

**Decision:** Render the overlay in a closed Shadow DOM root held only by our content script. **Consequences:** page cannot introspect or tamper with our UI; all overlay styles are scoped; we manage focus/ARIA ourselves (see `PART_22`). **Status:** Accepted.

### ADR-015 — TypeScript Strict Mode Across All Packages
**Context:** Type safety underpins IPC contracts and the pure-engine boundary. **Problem:** Gradual typing or full strict?

| Alternative | Pros | Cons |
|---|---|---|
| Loose/gradual TS | Faster onboarding | `any` leaks; nullish bugs at IPC edges |
| **`strict: true` (+ `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)** | Catches null/undefined and index errors at compile time | Stricter authoring |

**Decision:** `strict: true` plus `noUncheckedIndexedAccess`, `noImplicitOverride`, and `exactOptionalPropertyTypes` in every package's `tsconfig`. **Consequences:** IPC payloads are exhaustively typed; frozen result objects are `readonly`; `any` is banned by lint. **Status:** Accepted.

### ADR-016 — Vitest + Playwright Test Stack
**Context:** We need fast unit tests for the pure engine and real-browser E2E for extension flows. **Problem:** Which runners?

| Alternative | Pros | Cons |
|---|---|---|
| Jest + Selenium | Mature | Slow; Selenium flaky for extensions |
| **Vitest + Playwright** | Vite-native speed, ESM-first; Playwright loads unpacked extension | Two tools to maintain |

**Decision:** Vitest for unit/integration (with `c8` coverage), Playwright for E2E driving an unpacked build (install → navigate → paste → overlay → decision). **Consequences:** detection-engine tested with zero browser mocks; E2E covers the trust-boundary crossings. **Status:** Accepted.

### ADR-017 — Semantic Versioning, Independently Versioned Packages
**Context:** Packages evolve at different rates; the extension ships to CWS on its own cadence. **Problem:** Lockstep versioning or independent SemVer?

| Alternative | Pros | Cons |
|---|---|---|
| Fixed/lockstep versions | One number to reason about | Forces meaningless bumps across packages |
| **Independent SemVer** | Each package versions on real change | Requires changesets discipline |

**Decision:** Each package follows SemVer independently, managed with Changesets; `detection-engine` breaking changes force a major bump and an extension compatibility check in CI. **Consequences:** clear compatibility guarantees for embedders reusing `detection-engine`. **Status:** Accepted. **Related:** `PART_25`.

### ADR-018 — ONNX Runtime Web + Transformers.js, INT8 Models
**Context:** ADR-007 fixes on-device inference; this fixes the runtime and format. **Problem:** Which ML runtime and model format for NER?

| Alternative | Pros | Cons |
|---|---|---|
| TensorFlow.js only | Mature, good CV support | Heavier for transformer NER |
| **ONNX Runtime Web + Transformers.js (INT8)** | Broad operator support; WASM+WebGPU; 12 MB quantized DistilBERT | Version churn — pin exactly |
| WebLLM / GGUF | Cutting-edge | Overkill; large; unstable API |

**Decision:** NER via Transformers.js on ONNX Runtime Web (WASM primary, WebGPU when available), model INT8-quantized to ~12 MB; TensorFlow.js retained for CV (BlazeFace). Versions pinned. **Consequences:** ~150 ms/512-token NER on WASM, ~50 ms on WebGPU; bundle within the 25 MB target. **Status:** Accepted.

### ADR-019 — Single Global Per-Scan Processing Budget
**Context:** Async tiers can hang (model stalls, huge images). **Problem:** Per-tier timeouts, or one global budget?

| Alternative | Pros | Cons |
|---|---|---|
| Per-tier timeouts only | Granular | Sum of timeouts can exceed acceptable UX; complex |
| **One global async budget (1500 ms) + per-tier sub-budgets** | Bounds total wait; simple UX contract | A slow tier can consume budget from another |

**Decision:** A single 1500 ms budget governs the async portion (Tier 2 + Tier 3 + aggregation); exceeding it returns partial results with `tiersCompleted` set. Synchronous Tier 1 is exempt. Image OCR gets an extended documented sub-budget (`PART_23`). **Consequences:** predictable worst-case latency; partial-result path is a first-class, tested branch. **Status:** Accepted.

### ADR-020 — No `chrome.storage.sync`
**Context:** `chrome.storage.sync` replicates data through the user's Google account to Google servers. **Problem:** Use it for settings convenience?

| Alternative | Pros | Cons |
|---|---|---|
| `chrome.storage.sync` | Cross-device settings | Data leaves device via Google — violates local-first |
| **`chrome.storage.local` + IndexedDB (encrypted)** | Stays on device | No automatic cross-device sync |

**Decision:** Never use `chrome.storage.sync`. Settings live in `chrome.storage.local`; sensitive records in encrypted IndexedDB; ephemeral state in `chrome.storage.session`. **Consequences:** no covert egress path; enterprise settings distributed via managed storage/GPO instead. **Status:** Accepted.

### ADR-021 — Fail-Open (Individual) / Fail-Closed (Enterprise)
**Context:** Detection can fail. Blocking productivity is bad for individuals; leaking data is worse for enterprises. **Problem:** What is the terminal-failure default?

| Alternative | Pros | Cons |
|---|---|---|
| Always fail-open | Never blocks work | Enterprise data may leak on failure |
| Always fail-closed | Never leaks | Individual productivity blocked by bugs |
| **Mode-keyed: open for individual, closed for enterprise-block** | Matches each audience's risk posture | Two tested branches |

**Decision:** On unrecoverable failure, individual installs release with a warning (fail-open); enterprise installs with `enforcementMode: "block"` hold the payload and show a blocking overlay (fail-closed). **Consequences:** a single branch keyed on `enforcementMode`; both paths are integration-tested. Implements `PART_04` §3 principles. **Status:** Accepted.

### ADR-022 — IndexedDB (via `idb`) for Scan History
**Context:** Scan history and cached models exceed `chrome.storage.local` practical limits and need indexed queries. **Problem:** `chrome.storage.local` blobs or IndexedDB?

| Alternative | Pros | Cons |
|---|---|---|
| `chrome.storage.local` | Simple KV | Poor for large/queryable records; quota pressure |
| **IndexedDB via `idb`** | Indexed queries, large objects, transactions | More code; migrations needed |

**Decision:** Store encrypted scan-history records and cached model blobs in IndexedDB (thin `idb` wrapper); settings stay in `chrome.storage.local`. **Consequences:** paginated history; versioned schema migrations (`PART_19`); auto-purge by retention. **Status:** Accepted.

### ADR-023 — Lit Web Components over React for Injected UI
**Context:** The overlay is injected into hostile pages and must be tiny and Shadow-DOM-native. **Problem:** React or Lit for the content-script UI?

| Alternative | Pros | Cons |
|---|---|---|
| React | Familiar; rich ecosystem | ~45 KB runtime; Shadow DOM friction |
| **Lit** | ~5 KB; native Shadow DOM + reactive props | Smaller ecosystem |
| Vanilla DOM | Zero deps | Verbose, error-prone for stateful overlay |

**Decision:** Lit for the injected overlay and popup; extension option/dashboard pages may use React (not injected, no footprint constraint). **Consequences:** minimal injected footprint; Shadow-DOM-first ergonomics (ADR-014). **Status:** Accepted.

### ADR-024 — Capture-Phase Event Interception
**Context:** We must intercept paste/drop *before* the page's own handlers run. **Problem:** Bubble-phase listeners, MutationObserver, or capture-phase?

| Alternative | Pros | Cons |
|---|---|---|
| Bubble-phase | Simple | Page handler may run first and send data |
| MutationObserver | Catches DOM changes | Too late — data already in the editor/model |
| **Capture-phase `addEventListener(..., true)`** | Runs before page handlers; can `preventDefault` | Must be careful not to break legitimate UX |

**Decision:** Register capture-phase listeners for `paste`, `drop`, `change`, and file-input events; `preventDefault` until the scan resolves, then re-dispatch or discard. **Consequences:** reliable pre-upload interception; requires precise event re-dispatch on release (`PART_29`). **Status:** Accepted.

### ADR-025 — Idempotent Scans Keyed by SHA-256 Input Hash
**Context:** SW eviction (ADR-006 host) forces content-script resends. **Problem:** How do we avoid double-processing and duplicate overlays?

| Alternative | Pros | Cons |
|---|---|---|
| Sequence numbers | Simple | Doesn't dedupe identical retries across SW restart |
| **SHA-256 content hash as scan key** | Same input → same scan; safe resend | Hashing cost (negligible, one-time) |

**Decision:** Each scan is keyed by the SHA-256 of its normalized input; a resend with a matching in-flight/recent hash returns the existing result instead of starting a new scan. **Consequences:** SW-restart resends are safe; enables dedup and integrity checks. Supports `PART_05` §10. **Status:** Accepted.

### ADR-026 — Non-Exportable Session `CryptoKey`, Never Persisted
**Context:** The storage-encryption key must survive SW restarts within a session but never touch disk in usable form. **Problem:** Where does the working key live?

| Alternative | Pros | Cons |
|---|---|---|
| Persist raw key in storage | Simple unlock | Key at rest = game over if storage read |
| **Non-exportable `CryptoKey` in `chrome.storage.session`** | Memory-only; cleared on browser restart; not exportable | Re-derive on new browser session |

**Decision:** The data key is held as a non-exportable `CryptoKey` in `chrome.storage.session`; only a salt + KDF params (ADR-010) persist, never the key material. **Consequences:** browser restart requires re-derivation (passphrase) or ephemeral regeneration (no-passphrase mode); a memory dump yields a non-exportable handle, not raw bytes. **Status:** Accepted.

### ADR-027 — JSON Schema (Ajv) Validation for All IPC
**Context:** Messages cross trust boundaries and may be malformed or hostile. **Problem:** Hand-rolled guards or schema validation?

| Alternative | Pros | Cons |
|---|---|---|
| Manual type guards | No dependency | Drifts from types; easy to miss fields |
| **Ajv JSON Schema (compiled)** | Single source of truth; fast compiled validators; strips unknowns | Build step to compile schemas |

**Decision:** Every IPC message is validated against a compiled Ajv schema at the receiving boundary; unknown properties are stripped, and the message is parse-then-reserialize to defeat prototype pollution. **Consequences:** malformed/hostile messages rejected and logged (allowlisted fields only); schemas generated from shared-types. **Status:** Accepted.

### ADR-028 — One Worker per Modality, Lazily Pooled
**Context:** Workers consume tens of MB each (models). **Problem:** Thread pool, one big worker, or one per modality?

| Alternative | Pros | Cons |
|---|---|---|
| Single multipurpose worker | Fewer contexts | One crash kills all tiers; no parallelism |
| Large generic pool | Max parallelism | Memory blowup; over-provisioned |
| **One worker per modality (OCR/NER/CV/PDF), lazy + idle-terminate** | Isolation; bounded memory; parallel OCR∥CV | Cold-start on first use |

**Decision:** Exactly one worker per modality, created on first use and terminated after 60 s idle; a crashed worker is respawned without affecting others. **Consequences:** bounded 340 MB peak (`PART_04` §11); OCR and CV run in parallel (`PART_05` §8). **Status:** Accepted.

### ADR-029 — Models Bundled in Package, Not Downloaded
**Context:** ADR-002/007 require true offline operation and COEP compliance (ADR-011). **Problem:** Bundle ~20 MB of models or download on first run?

| Alternative | Pros | Cons |
|---|---|---|
| Remote download on first run | Smaller install | Fails offline; breaks CORP/COEP; supply-chain surface |
| **Bundled in extension package** | Offline day one; CORP-clean; integrity via package signature | Larger download; CWS 25 MB budget |

**Decision:** All WASM binaries and models ship inside the extension package; a SHA-256 manifest verifies integrity on load; corrupted cache is re-extracted from the bundle. Supersedes draft **ADR-S3**. **Consequences:** guaranteed offline; no runtime fetch of code/models; package ~20 MB (within 25 MB target). **Status:** Accepted.

### ADR-030 — Cloud LLM Explanation Is Opt-In and Metadata-Only
**Context:** A richer natural-language explanation can optionally use a cloud LLM. **Problem:** How do we offer it without any raw-value egress?

| Alternative | Pros | Cons |
|---|---|---|
| Send masked/raw context to cloud | Best explanations | Any raw value egress violates the thesis |
| **Opt-in; send only entity-type metadata; local template fallback** | No sensitive value leaves device | Slightly less specific explanations |
| No cloud option | Zero risk | Loses a differentiator for users who want it |

**Decision:** The cloud explanation is disabled by default; when enabled it transmits only entity-type metadata (never raw or masked values) over TLS 1.3, and always has a local template fallback. **Consequences:** the ONLY network call in the product (`PART_01` Principle 1); CI asserts payloads contain no value fields. **Status:** Accepted.

### ADR-031 — Strict CSP: No Remote Code, `wasm-unsafe-eval` Only
**Context:** MV3 forbids remote code; WASM instantiation needs a narrow allowance. **Problem:** What CSP for extension pages and offscreen doc?

| Alternative | Pros | Cons |
|---|---|---|
| Permissive CSP (`unsafe-eval`) | Fewer build constraints | Enables arbitrary eval — rejected by CWS/security review |
| **`script-src 'self' 'wasm-unsafe-eval'`; `object-src 'none'`; no remote origins** | Allows WASM only; blocks remote/eval code | All assets must be local (aligns with ADR-029) |

**Decision:** CSP is `script-src 'self' 'wasm-unsafe-eval'; object-src 'none'; connect-src 'self' https://<optional-explain-endpoint>`. **Consequences:** no remote script/eval; WASM permitted; the single optional `connect-src` matches ADR-030. **Status:** Accepted.

---

## 4. Superseded ADRs

| ID | Title | Superseded by | Reason |
|---|---|---|---|
| ADR-S1 | Autonomous multi-agent architecture | ADR-005 | Pipeline is deterministic; agent mesh added state/debug complexity unjustified on ephemeral SWs. |
| ADR-S2 | Deny-list PII log sanitizer | ADR-012 | Deny-lists fail open on unmodeled PII shapes; allowlist structured logging fails closed. |
| ADR-S3 | Remote model download on first run | ADR-029 | Breaks offline guarantee and COEP; adds supply-chain surface. |

Superseded ADRs are retained (never deleted) so that the reasoning trail — and why the current decision is *better* — remains auditable. The duplicate inline numbering flagged in audit gap G-01 is formally retired by §1 of this document; inline ADR headings in `PART_01`, `PART_02`, and `PART_04` are now aliases of the corresponding entries here.

---

## 5. ADR Authoring Process

| Step | Rule |
|---|---|
| Proposal | New ADR opens in `Proposed` status with all seven sections filled — no TODOs. |
| Review | Requires sign-off from at least one Principal (Security or Platform) named in this document's Reviewers. |
| Numbering | Allocated only from this log (never inline) to prevent G-01 recurrence. |
| Acceptance | Status → `Accepted` with date; conflicting inline text updated to back-reference. |
| Supersession | Old ADR → `Superseded`; a row is added to §4; the record is kept, not deleted. |

---

## 6. Production Checklist

- [ ] Every ADR in §1 has status, origin, and date populated
- [ ] No duplicate ADR numbers exist anywhere in the repository (doc-lint check, `PART_25`)
- [ ] Inline ADRs in `PART_01`/`PART_02`/`PART_04` back-reference this log
- [ ] Every consolidated ADR (§3) has all seven sections with no placeholders
- [ ] Superseded ADRs retained with supersession rationale
- [ ] KDF (ADR-010) parameters calibrated on reference hardware and versioned in key records
- [ ] CSP (ADR-031) and COOP/COEP (ADR-011) verified in the built manifest and served headers
- [ ] CI asserts `detection-engine` has zero network APIs (ADR-002/007/030)
- [ ] Reviewers named above have signed off on all `Accepted` records

## 7. Future Improvements

| Improvement | ADR impact |
|---|---|
| WebGPU-default NER once support is ubiquitous | Revisit ADR-018 backend priority |
| Post-quantum wrapping for exported backups | New ADR extending ADR-009/026 |
| Firefox port | New ADR for WebExtension API deltas; ADR-006/011 revisited (no offscreen API) |
| Passkey-derived storage key | New ADR possibly superseding parts of ADR-010/033 |

---

## 8. PEDR Amendments (2026-07-12) — Append-Only

Source: `DESIGN_REVIEW_BOARD_REPORT.md` (SS-PEDR-001). These records **do not delete** prior ADR text; they supersede where stated.

### ADR-032 — v1.0 WASM Uses Single-Thread SIMD (Supersedes ADR-011 for v1.0)

**Context:** ADR-011 accepted COOP/COEP + threaded WASM. PART_16 (DEF-03) correctly found COI brittle for MV3 offscreen in v1 and set OCR budget on SIMD single-thread.  
**Problem:** Two binding decisions cannot both be true.  
**Decision:** For **v1.0**, ship **simd single-thread** WASM only. ADR-011 remains the design for **Phase-2** behind `threadsWasmPhase2` when `crossOriginIsolated === true`.  
**Consequences:** OCR P99 target stays &lt;3000ms on reference HW without SAB; PART_16 is authoritative for v1.  
**Status:** Accepted. **Date:** 2026-07-12.

### ADR-033 — Session Key Material & History Default (Supersedes ADR-026)

**Context:** ADR-026 claimed a non-exportable `CryptoKey` lives in `chrome.storage.session`. PART_19 proved that fails across SW process restart; Tier-1 must store **raw 256-bit key material** and re-import.  
**Problem:** ADR-026 is incorrect as written.  
**Decision:** (1) Tier-1: persist raw key material in `chrome.storage.session`; import non-extractable `CryptoKey` per wake (PART_19). (2) Tier-2: re-derive via Argon2id **m=19 MiB, t=2, p=1** (PART_19 wins over ADR-010’s 64 MiB/t=3 for v1; ADR-010 parameters revised to match). (3) **Default:** durable scan history **disabled** until user enables it or sets a passphrase — reduces blast radius of Tier-1 key material.  
**Consequences:** PART_04 §6.4 and PART_14 §2.2 are **non-authoritative** for crypto; PART_19 wins.  
**Status:** Accepted. **Date:** 2026-07-12.

### ADR-034 — Lit-Only UI for v1 (Supersedes ADR-023 React Clause)

**Context:** ADR-023 allowed React on options/dashboard; PART_22 chose Lit everywhere.  
**Decision:** **Lit only** for overlay, popup, settings, dashboard, onboarding in v1. No React.  
**Status:** Accepted. **Date:** 2026-07-12.

### ADR-035 — AI-Platform Host Permissions Only (v1)

**Context:** PART_10 listed Drive/Gmail/Outlook/OneDrive as optional hosts.  
**Problem:** Violates least privilege and CWS privacy justification for an AI-paste firewall.  
**Decision:** v1 `optional_host_permissions` = GenAI platform URL patterns only (ChatGPT, Claude, Gemini, Copilot, DeepSeek, Perplexity, Grok, Cursor as product-approved). Mail/Drive hosts require a **separate ADR + product justification** before reintroduction.  
**Status:** Accepted. **Date:** 2026-07-12.

### ADR-036 — Fail-Open Must Not Silent-Release Unscanned Payloads

**Context:** PART_12 recovery allowed individual fail-open to re-dispatch original content after SW restart.  
**Problem:** Converts reliability failure into a confidentiality failure.  
**Decision:** On SW restart / scan abort: **hold** and show overlay (“Scan interrupted — review before send”) or **automatically re-queue scan** with original bytes still held in the content script. Never silently `dispatch` unscanned data. Enterprise block mode unchanged (hold).  
**Status:** Accepted. **Date:** 2026-07-12.

### ADR-037 — v1 Detection Scope: Tier-1 + OCR; NER/CV Off by Default

**Context:** Shipping NER+CV+OCR+regex simultaneously maximizes supply chain, FP, and memory risk before core interception is proven.  
**Decision:** v1.0 default detectors: regex/checksum/entropy + OCR-extracted text re-scan. NER and CV ship in package **disabled** behind settings/flags until PART_24 gates pass on a release train.  
**Status:** Accepted. **Date:** 2026-07-12.
