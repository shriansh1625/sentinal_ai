# DESIGN OWNERSHIP MATRIX

**Document ID:** SS-OWN-001  
**Classification:** Internal Engineering — Binding  
**Version:** 1.0.0  
**Last Updated:** 2026-07-12  
**Status:** DESIGN FREEZE — Binding  
**Rule:** Exactly one **Owner Document** per domain. All other documents may only **reference** the owner. If text elsewhere conflicts with the owner, **the owner wins** and the other text is non-authoritative.

---

## 1. Authority Hierarchy

| Rank | Artifact | Role |
|---|---|---|
| 0 | `ARCHITECTURE_FREEZE_v1.0.md` | Freeze gate; Go/No-Go |
| 1 | `DESIGN_OWNERSHIP_MATRIX.md` (this file) | Domain → owner mapping |
| 2 | Owner `PART_NN` / handbook section | **Canonical specification** |
| 3 | `PART_08` ADRs | Decisions; when ADR and owner PART conflict on a frozen topic, **later Accepted ADR in PART_08 §8 (PEDR amendments) + this matrix win**, then owner PART must be updated to match |
| 4 | Non-owner PART references | Informative only |
| 5 | `implementation_plan.md` | **Non-binding** narrative; never overrides PART_NN |

---

## 2. Domain Ownership Table

| Domain ID | Domain | Owner Document | Also May Cite (non-owning) | Forbidden: redefine in |
|---|---|---|---|---|
| D-CRYPTO | Cryptography (AES-GCM, KDF, keys, envelopes, rotation) | **PART_19** | PART_14 (controls index only), PART_07, PART_08 ADR-009/010/033 | PART_04, PART_14 algorithm bodies |
| D-STORAGE | Storage tiers, IndexedDB schema, retention, migrations | **PART_19** | PART_07, PART_11 | — |
| D-WASM | WASM load, integrity, SIMD/threads, COI | **PART_16** | PART_12, PART_13, PART_08 ADR-032 | PART_08 ADR-011 (superseded for v1) |
| D-RUNTIME | Threading, queues, budgets, memory ceilings, errors | **PART_12** | PART_10, PART_23 | — |
| D-CONST | Numeric constants (rate limits, sizes, concurrency) | **SS-OWN-001 §3** (this file) + mirrored in `packages/shared-types` at impl | All PARTs reference §3 | Local duplicate tables without pointer |
| D-EXT-ARCH | Manifest structure, CS/SW/OD roles, adapters | **PART_10** | PART_11, PART_15 | — |
| D-LIFECYCLE | Install/update/enable/offline/rollback FSM | **PART_11** | PART_25 | — |
| D-PERMS | Permissions, CSP, sandboxing, host grants | **PART_15** (+ PART_10 manifest snippet must match PART_15) | PART_10 | Host lists in PART_03 alone |
| D-DETECT | Detection pipeline Tier-1/2/3 algorithms | **PART_13** | PART_02, PART_17, PART_20 | — |
| D-SCOPE-V1 | Which detectors ON in v1.0 | **PART_08 ADR-037** + **PART_21** feature defaults | PART_13 | — |
| D-INPUT | Paste/upload/drop/clipboard/PDF/OCR/ZIP pipelines | **PART_17** | PART_10, PART_29 | — |
| D-RISK | Risk math, thresholds | **PART_18** §A | PART_13 Stage 5 | — |
| D-POLICY | Enterprise policy schema/eval | **PART_18** §B | PART_03 FR-ENT | — |
| D-DECISION | Allow/warn/block/redact matrix | **PART_18** §C | PART_01 HITL | — |
| D-REDACT | Redaction algorithms | **PART_18** §D | PART_17 | — |
| D-THREAT | System STRIDE / residual risks | **PART_06** | PART_14, PART_20, PART_29 | — |
| D-ENDPOINT | Per-endpoint threat models | **PART_29** | PART_17, PART_20 | — |
| D-GUARD | Bypass catalog | **PART_20** | PART_24 tests | — |
| D-PRIVACY | PIA, retention policy, consent, claims honesty | **PART_07** | PART_01, PART_26 | — |
| D-CLAIMS | Guaranteed vs best-effort vs limitation | **SS-OWN-001 §4** + PART_07 | PART_01 must align | Marketing copy |
| D-UI | Components, a11y, i18n, Lit | **PART_22** | PART_10 overlay sketch | ADR-023 React clause |
| D-PERF | Budgets, benches, load/stress | **PART_23** | PART_12 numbers must not exceed PART_23 | — |
| D-TEST | Corpus, gates, traceability format | **PART_24** | PART_03 AC | — |
| D-CICD | Build, manifest generation, release, deps | **PART_25** | PART_11 rollback | — |
| D-OBS | Logging allowlist, telemetry, audit ship | **PART_26** | PART_07 carve-outs | PART_14 deny-list samples |
| D-IR | Incident response, runbooks | **PART_27** | PART_14 §outline | — |
| D-PROCESS | How team builds | **handbook/PROJECT_EXECUTION_BIBLE.md** | PART_28 | — |
| D-REPO | Folder map, doc standard | **PART_28** | 00_MASTER_INDEX | — |
| D-VISION | Mission, non-objectives | **PART_01** | — | — |
| D-REQ | Functional/NFR IDs | **PART_03** | PART_24 RTM | — |
| D-SYS | Component inventory, trust boundaries | **PART_04** | PART_05 diagrams | Crypto details |
| D-FLOW | Mermaid flows / sequences | **PART_05** | — | — |
| D-ADR | Decision log | **PART_08** | — | Inline ADR bodies |
| D-PATTERN | Patterns / purity rule | **PART_09** | — | — |
| D-CONFIG | Settings schema, packs, models registry | **PART_21** | PART_13 patterns live in engine | — |
| D-FUTURE | Post-v1 roadmap | **PART_30** | — | — |
| D-SEC-CTRL | Security control inventory (index) | **PART_14** | Points to PART_19/16/26 for algorithms | Algorithm redefinition |

---

## 3. Canonical Constants (D-CONST) — Single Numeric Truth

All implementations and docs MUST use these values. Owner: this section. Change requires ADR + freeze amendment.

| Constant | Value | Unit | Notes |
|---|---|---|---|
| `MAX_CONCURRENT_SCANS` | **3** | count | Global |
| `MAX_QUEUE_DEPTH_PER_WORKER` | **8** | count | PART_12 |
| `MAX_PENDING_SCANS_PER_TAB` | **10** | count | FIFO; drop oldest beyond |
| `MAX_SCANS_PER_MIN_PER_TAB` | **20** | count | Rate limit (resolves 10 vs 30) |
| `MAX_IPC_MSG_PER_MIN_PER_TAB` | **30** | count | Includes non-scan messages |
| `SCAN_WALL_CLOCK_MS` | **45000** | ms | Global per-scan |
| `SCAN_MAX_BYTES` | **262144000** | bytes | 250 MiB logical expansion |
| `MAX_DECODE_DEPTH` | **3** | levels | ZIP/Base64 |
| `MAX_FILE_BYTES` | **52428800** | bytes | 50 MiB |
| `MAX_PDF_PAGES` | **500** | count | |
| `MAX_IMAGE_EDGE_PX` | **4000** | px | Downscale above |
| `OCR_P99_MS_1080P` | **3000** | ms | SIMD single-thread |
| `NER_P99_MS_512TOK` | **150** | ms | When NER enabled |
| `SW_COLD_START_MS` | **500** | ms | |
| `EXT_IDLE_MEM_MB` | **50** | MB | |
| `EXT_PEAK_MEM_MB` | **256** | MB | **Frozen lower than prior 512** (PEDR F-23) |
| `CRX_MAX_MB` | **25** | MB | Compressed |
| `HISTORY_RETENTION_DAYS_DEFAULT` | **30** | days | When history enabled |
| `HISTORY_DEFAULT_ENABLED` | **false** | bool | ADR-033 |
| `ARGON2ID_M_KIB` | **19456** | KiB | 19 MiB |
| `ARGON2ID_T` | **2** | iterations | |
| `ARGON2ID_P` | **1** | parallelism | |
| `PBKDF2_ITERATIONS` | **600000** | count | Fallback only |
| `AES_GCM_IV_BYTES` | **12** | bytes | |
| `OFFSCREEN_IDLE_MS` | **60000** | ms | |
| `WORKER_IDLE_MS` | **60000** | ms | |
| `NER_DEFAULT_ENABLED` | **false** | bool | ADR-037 |
| `CV_DEFAULT_ENABLED` | **false** | bool | ADR-037 |
| `OCR_DEFAULT_ENABLED` | **true** | bool | |
| `TELEMETRY_DEFAULT_ENABLED` | **false** | bool | |
| `CLOUD_EXPLAIN_DEFAULT_ENABLED` | **false** | bool | |
| `WASM_THREADS_DEFAULT` | **false** | bool | ADR-032 |

---

## 4. Claim Classes (D-CLAIMS) — Canonical Honesty Table

| Claim class | Meaning | Allowed product language |
|---|---|---|
| **Guaranteed** | Enforced by architecture + tests for supported endpoints | “Intercepts paste, file chooser, and drag-drop on protected AI sites (Chromium MV3)” |
| **Best effort** | Attempted; may fail on platform quirks | “Attempts to restore sanitized content into editors; some React apps require manual paste of redacted text” |
| **Platform limitation** | Browser/OS prevents interception | “Cannot intercept `navigator.clipboard.readText()` by the page in v1” |
| **Future capability** | PART_30 only | Never in v1.0 CWS listing as current |
| **Out of scope** | Explicit non-goal | Endpoint AV, TLS MITM, non-browser AI apps |
| **Unsupported** | Not built | Firefox in v1.0 |

**Forbidden v1 claims:** “blocks all leaks,” “prevents all AI exfiltration,” “full clipboard firewall,” “undetectable,” “100% accuracy.”

**Required v1 framing:** “Local privacy assistant that intercepts common upload paths on supported AI sites, warns on detected sensitive patterns, and lets you allow, block, or redact.” Enterprise block mode may say “organization-enforced hold.”

---

## 5. Verification Rule

CI (PART_25) SHALL eventually include `tools/doc-lint`:
1. No second definition of constants in §3 without `<!-- owned by SS-OWN-001 §3 -->`.
2. PART_14/04 must contain supersession banners for crypto.
3. Manifest host list in PART_10 must equal PART_15 allowlist.

---

## 6. Change Control

Changing an owner decision requires: (1) ADR in PART_08, (2) update owner PART, (3) amend ARCHITECTURE_FREEZE, (4) Security or Platform Principal sign-off.
