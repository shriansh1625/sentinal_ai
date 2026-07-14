# ARCHITECTURE_DEFENSE_GUIDE.md

**Audience:** Architecture Review Board / Staff+ interview  
**Rule:** Every decision is defensible with problem → alternatives → trade-offs → evidence.  
**Refs:** `PART_08`, Freeze v1.0, `PROJECT_KNOWLEDGE_GRAPH.md`

---

## How to use this guide

For each decision, practice aloud:

1. Problem
2. Choice
3. Alternatives rejected
4. Trade-offs (perf / security / scale / maintainability)
5. What is implemented vs blueprint
6. What you would change under new evidence

---

## D-01 — Chromium MV3 Extension (ADR-001)

|                  |                                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problem**      | Users paste secrets into browser AI UIs; endpoint AV and network DLP miss in-page paste                                                      |
| **Selected**     | MV3 extension on AI hosts                                                                                                                    |
| **Alternatives** | TLS MITM proxy (breaks TLS trust, enterprise-hostile); DNS filter (too coarse); desktop agent (high friction); fork Chromium (unsustainable) |
| **Rejected why** | Wrong trust model or wrong market for consumer/prosumer AI paste risk                                                                        |
| **Trade-offs**   | (+) sits at event boundary; (−) cannot see all channels (clipboard API, native apps)                                                         |
| **Perf**         | SW ephemeral; cold start budget exists (`SW_COLD_START_MS`)                                                                                  |
| **Security**     | Isolated world CS; privileged IPC gated                                                                                                      |
| **Scale**        | Per-browser install; not fleet MDM by itself                                                                                                 |
| **Maintain**     | Chrome API churn; MV3 constraints                                                                                                            |
| **Future**       | Firefox later; never claim “all channels”                                                                                                    |
| **Impl**         | **Implemented**                                                                                                                              |

---

## D-02 — Local-First Detection (ADR-002 / ADR-007)

|                  |                                                                          |
| ---------------- | ------------------------------------------------------------------------ |
| **Problem**      | Sending paste content to cloud DLP recreates the confidentiality failure |
| **Selected**     | 100% on-device detection; no network in `detection-engine`               |
| **Alternatives** | Cloud verify loop; hybrid local+cloud                                    |
| **Rejected**     | Violates product thesis; expands trust boundary                          |
| **Trade-offs**   | (+) privacy; (−) no server-side model updates without ship               |
| **Security**     | Attack surface is local extension compromise, not SaaS paste store       |
| **Future**       | Opt-in metadata-only explain (ADR-030) — **disabled by default**         |
| **Impl**         | **Implemented** for Tier-1                                               |

---

## D-03 — Coordinator–Processor, Not Multi-Agent (ADR-005)

|                  |                                                             |
| ---------------- | ----------------------------------------------------------- |
| **Problem**      | Need deterministic scan orchestration under ephemeral SW    |
| **Selected**     | SW coordinator; processors as libraries/workers             |
| **Alternatives** | Autonomous multi-agent (ADR-S1)                             |
| **Rejected**     | Non-determinism, hard to rate-limit, poor auditability      |
| **Trade-offs**   | (+) single observation point; (−) less “clever” parallelism |
| **Impl**         | **Implemented**                                             |

---

## D-04 — Tiered Detection: Regex → (future NER/OCR) (ADR-008 / ADR-037)

|                  |                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------- |
| **Problem**      | Need fast, explainable catches for structured secrets before expensive ML           |
| **Selected**     | Tier-1 regex + checksum + entropy sync on SW; NER/CV off by default; OCR path armed |
| **Alternatives** | ML-first; cloud classifiers                                                         |
| **Rejected**     | Latency, opacity, privacy, CWS size                                                 |
| **Trade-offs**   | (+) sub-ms text path; (−) regex bypasses (encoding) need preprocess                 |
| **Impl**         | Tier-1 **yes**; OCR capability **no** (fail-closed); NER/CV **disabled by design**  |

**Interview trap:** “You have OCR on — so images work?” → **No. Flag ≠ capability. HOLD.**

---

## D-05 — Regex + Checksum + Entropy (Tier-1)

|                  |                                                                   |
| ---------------- | ----------------------------------------------------------------- |
| **Problem**      | Catch AWS keys, PANs, IBANs, high-entropy tokens in paste         |
| **Selected**     | Catalog regex; Luhn/MOD-97 filters; entropy with charset gates    |
| **Alternatives** | Pure ML NER; YARA-only; no entropy                                |
| **Rejected**     | ML alone missy on tokens; entropy alone FP-heavy (Phase B FPR)    |
| **Trade-offs**   | Precision improved Phase C (entropy `/+`/`=`); ROT13 still misses |
| **Evidence**     | Eval BEFORE/AFTER; red-team 37/39                                 |
| **Impl**         | **Implemented**                                                   |

---

## D-06 — Offscreen Document + Workers (ADR-006 / ADR-028 / ADR-032)

|                     |                                                                              |
| ------------------- | ---------------------------------------------------------------------------- |
| **Problem**         | MV3 SW cannot host long-lived DOM/WASM the same way; need worker host        |
| **Selected**        | Offscreen document; lazy workers; 60s idle; **single-thread SIMD** (ADR-032) |
| **Alternatives**    | Threaded WASM + COOP/COEP (ADR-011); SW-only                                 |
| **Rejected for v1** | COI brittleness; host WAR complexity                                         |
| **Trade-offs**      | (+) simpler packaging; (−) no threaded OCR speedup                           |
| **Impl**            | Scaffold **yes**; OCR WASM **not vendored** → fail-closed                    |

---

## D-07 — Closed Shadow DOM Overlay (ADR-014)

|                  |                                                 |
| ---------------- | ----------------------------------------------- |
| **Problem**      | Page JS can spoof or restyle open overlays      |
| **Selected**     | Closed Shadow DOM for decision UI               |
| **Alternatives** | Open shadow; iframe overlay; page-injected HTML |
| **Rejected**     | Spoof / CSS injection risk                      |
| **Trade-offs**   | (+) harder page tamper; (−) a11y testing harder |
| **Impl**         | **Implemented** (`ui/overlay.ts`)               |

---

## D-08 — Capture-Phase Interception (ADR-024)

|                  |                                                                               |
| ---------------- | ----------------------------------------------------------------------------- |
| **Problem**      | Bubble-phase handlers lose race to page listeners                             |
| **Selected**     | Capture-phase `paste`/`drop`/`change` + `stopImmediatePropagation`            |
| **Alternatives** | Bubble only; MutationObserver on inputs                                       |
| **Rejected**     | Race losses on AI editors                                                     |
| **Trade-offs**   | (+) wins most DOM races; (−) exotic editors / programmatic set still residual |
| **Impl**         | **Implemented**                                                               |

---

## D-09 — Dynamic Host Permissions (ADR-013 / ADR-035)

|                  |                                                                          |
| ---------------- | ------------------------------------------------------------------------ |
| **Problem**      | Broad `<all_urls>` is CWS/privacy hostile                                |
| **Selected**     | Optional AI-host permissions; dynamic `scripting.registerContentScripts` |
| **Alternatives** | Always-on all URLs; static content_scripts for all hosts                 |
| **Rejected**     | Overcollection; review risk                                              |
| **Trade-offs**   | (+) least privilege; (−) user must enable each platform                  |
| **Impl**         | **Implemented**                                                          |

---

## D-10 — Service Worker Ephemerality

|                  |                                                            |
| ---------------- | ---------------------------------------------------------- |
| **Problem**      | MV3 SW can die mid-scan                                    |
| **Selected**     | Externalize state; ADR-036: never silent-release unscanned |
| **Alternatives** | Persist background page (MV2 — dead); ignore restart       |
| **Rejected**     | Silent leak                                                |
| **Trade-offs**   | (+) honesty under failure; (−) more HOLD UX                |
| **Impl**         | **Implemented** (HOLD on SW unavailable)                   |

---

## D-11 — Fail-Closed vs Fail-Open (ADR-021 / ADR-036)

|                  |                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| **Problem**      | What if scan cannot complete?                                                                   |
| **Selected**     | Individual product may warn/hold; **never silent unscanned release**; enterprise block = closed |
| **Alternatives** | Classic fail-open release                                                                       |
| **Rejected**     | Undermines “privacy firewall” claim                                                             |
| **Trade-offs**   | (+) no silent leak; (−) more friction / HOLDs                                                   |
| **Impl**         | Binary OCR path HOLD; oversize BLOCK/HOLD                                                       |

---

## D-12 — Encrypted Storage (ADR-009 / ADR-010 / ADR-033)

|                  |                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------- |
| **Problem**      | History/settings on disk are theft targets                                               |
| **Selected**     | AES-256-GCM; Argon2id (19MiB/t=2/p=1) with PBKDF2-600k fallback; history **default off** |
| **Alternatives** | Plain `chrome.storage.local`; sync storage                                               |
| **Rejected**     | Sync = cloud sync of sensitive config (ADR-020); plaintext history indefensible          |
| **Trade-offs**   | (+) disk theft harder; (−) key material still in session (RR-10)                         |
| **Impl**         | Crypto path **implemented**; history off by default                                      |

---

## D-13 — Policy Engine (local)

|                  |                                                            |
| ---------------- | ---------------------------------------------------------- |
| **Problem**      | Map detections to user-visible actions                     |
| **Selected**     | Risk → ALLOW/WARN/REDACT/BLOCK; WARN bridged to HOLD in UI |
| **Alternatives** | Always block; always allow+log                             |
| **Rejected**     | Too harsh / too weak for consumer AI paste                 |
| **Trade-offs**   | User override remains residual (RR-09)                     |
| **Impl**         | **Implemented** (`policy/decide.ts`, `scan-bridge.ts`)     |

---

## D-14 — Rate Limits (PART_12 / KI-022)

|                  |                                           |
| ---------------- | ----------------------------------------- |
| **Problem**      | Malicious page floods SW with IPC/scans   |
| **Selected**     | 30 IPC/min/tab + 20 scans/min/tab         |
| **Alternatives** | Global only; no scan-specific limit       |
| **Rejected**     | Under-defense (KI-022 was gap)            |
| **Impl**         | **Implemented** (Gap Board closed KI-022) |

---

## D-15 — Preprocess for Adversarial Encoding (Phase C)

|                  |                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------- |
| **Problem**      | Spaced/newline/HTML/hex bypass regex                                                    |
| **Selected**     | Collapse spaced alnum; join broken lines; decode entities; hex/b64 rescan depth-bounded |
| **Alternatives** | ROT13 decode; aggressive join                                                           |
| **Rejected**     | ROT13 → FP risk; aggressive join → prose FP                                             |
| **Evidence**     | Spaced recall 0→~0.70; ROT13 accepted                                                   |
| **Impl**         | **Implemented**                                                                         |

---

## D-16 — Evaluation Harness (Phase B)

|                  |                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------- |
| **Problem**      | Cannot claim detection quality without methodology                                        |
| **Selected**     | Fixed-seed synthetic corpus; per-slice metrics; holdout excluding exact catalog positives |
| **Alternatives** | Hand-waved “looks good”; cherry-picked demos                                              |
| **Rejected**     | Interview indefensible                                                                    |
| **Honesty**      | Synthetic ≠ production; do not CWS-claim 99%                                              |
| **Impl**         | **Implemented**                                                                           |

---

## D-17 — Monorepo Purity (ADR-004 / ADR-015)

|                |                                                    |
| -------------- | -------------------------------------------------- |
| **Problem**    | Detection entangled with Chrome APIs is untestable |
| **Selected**   | Pure `detection-engine`; strict TS; pnpm+turbo     |
| **Trade-offs** | (+) Node eval/red-team; (−) package choreography   |
| **Impl**       | **Implemented**                                    |

---

## D-18 — Lit UI Only (ADR-034)

|              |                                           |
| ------------ | ----------------------------------------- |
| **Problem**  | Injected React footprint / dual UI stacks |
| **Selected** | Lit for popup/options/overlay             |
| **Rejected** | React dashboards in v1                    |
| **Impl**     | **Implemented**                           |

---

## Quick “why not X” sheet

| Suggestion                    | Answer                                                    |
| ----------------------------- | --------------------------------------------------------- |
| Why not intercept typing?     | Freeze out of scope; high UX/perf cost; incomplete anyway |
| Why not all_urls?             | ADR-035 least privilege                                   |
| Why not cloud DLP?            | Product is local-first; cloud is the problem class        |
| Why not claim OCR works?      | WASM not vendored; HOLD only                              |
| Why accept ROT13?             | Universal decode FP; disclose residual                    |
| Why enterprise package empty? | Phase 4 placeholder — do not claim                        |

---

_End architecture defense guide._
