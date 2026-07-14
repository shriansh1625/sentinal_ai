# Sentinel Shield AI

**Local-first Chromium MV3 privacy firewall for browser-based generative AI systems.**

Intercepts paste, file upload, and drag-and-drop on user-enabled AI hosts. Runs **on-device Tier-1 detection** (regex, checksums, entropy, bounded decode/rescan) before content reaches the page. No cloud detection path.

|                                          |                                                                                                                      |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Milestone**                            | [`v0.3.0-internal-beta`](https://github.com/shriansh1625/sentinal_ai/releases/tag/v0.3.0-internal-beta) (2026-07-13) |
| **Extension package**                    | `0.2.1`                                                                                                              |
| **Architecture**                         | Frozen v1.0                                                                                                          |
| **Engineering RC / load-unpacked beta**  | **GO**                                                                                                               |
| **Chrome Web Store / public production** | **NO-GO**                                                                                                            |

> This repository is an **engineering case study and internal beta**, not a store-published product. Claims are evidence-backed. Limitations are documented.

---

## Why it exists

Users paste API keys, cards, and sensitive text into ChatGPT, Claude, Gemini, and similar tools. That content often never crosses a corporate DLP appliance as a distinct network transaction — it leaves through ordinary browser events.

Sentinel Shield sits at that boundary:

```
AI host page (untrusted)
        ↑  decision (allow / hold / redact / block)
Content script  →  Service Worker  →  pure detection-engine (no network)
```

---

## What works today

| Capability                                                                       | Status                                   |
| -------------------------------------------------------------------------------- | ---------------------------------------- |
| Paste / upload / drag-drop intercept on enabled AI hosts                         | Implemented                              |
| On-device Tier-1 text detection + policy overlay                                 | Implemented                              |
| Luhn (PAN) / MOD-97 (IBAN) checksum gates                                        | Implemented                              |
| Adversarial preprocess (spaced secrets, HTML entities, hex/base64 depth-bounded) | Implemented                              |
| IPC auth, dual rate limits (30 msg / 20 scans per tab/min)                       | Implemented                              |
| Encrypted settings; history & telemetry **default off**                          | Implemented                              |
| Fail-closed on oversize text and unavailable modalities                          | Implemented                              |
| OCR / image & scanned PDF text extraction                                        | **Fail-closed HOLD** (WASM not vendored) |
| NER / CV                                                                         | Disabled by design                       |
| Typing / keystroke interception                                                  | Out of scope (Architecture Freeze)       |
| Enterprise backend                                                               | Placeholder only — not claimed           |

---

## Dual certification verdict

Machine-readable source: [`store/CERTIFICATION_STATUS.json`](store/CERTIFICATION_STATUS.json)

| Gate                   | Result                                   |
| ---------------------- | ---------------------------------------- |
| G0 Performance         | PASS WITH FINDINGS                       |
| G1 Security            | PASS WITH FINDINGS                       |
| G2 Privacy             | PASS                                     |
| G3 Live host E2E       | FAIL for public / conditional for eng RC |
| G4 Claims honesty      | PASS                                     |
| G5 Architecture freeze | PASS                                     |

**Public blockers:** live host sign-off (KI-006), counsel privacy policy URL (KI-018).  
**Load-unpacked beta:** authorized.

---

## Architecture (one screen)

| Package                               | Role                                                |
| ------------------------------------- | --------------------------------------------------- |
| `@sentinel-shield/shared-types`       | Canonical constants, IPC types, policy enums        |
| `@sentinel-shield/core`               | Config, feature flags, logging, rate limiters       |
| `@sentinel-shield/browser-adapters`   | Chrome storage / crypto / envelope validation       |
| `@sentinel-shield/detection-engine`   | **Pure** Tier-1 library — no `chrome`, no `fetch`   |
| `@sentinel-shield/extension`          | MV3 SW, content scripts, Lit UI, offscreen scaffold |
| `@sentinel-shield/enterprise-backend` | Empty Phase-4 placeholder                           |

**Trust rule:** content scripts never talk to the offscreen document directly. The service worker is the coordinator.

Deeper map: [`PROJECT_KNOWLEDGE_GRAPH.md`](PROJECT_KNOWLEDGE_GRAPH.md) · defense guide: [`ARCHITECTURE_DEFENSE_GUIDE.md`](ARCHITECTURE_DEFENSE_GUIDE.md)

---

## Detection quality (measured, synthetic)

Harness: `pnpm eval:detection` · seed `1581719041` · n = 20,000 (synthetic)

| Metric               | Phase B (before) | Phase C (after remediations) |
| -------------------- | ---------------: | ---------------------------: |
| Precision            |            0.902 |                    **0.994** |
| Recall               |            0.839 |                    **0.869** |
| F1                   |            0.869 |                    **0.928** |
| FPR                  |            0.091 |                    **0.005** |
| Spaced-secret recall |            0.000 |                    **0.703** |
| Hard-negative FPR    |            0.303 |                    **0.017** |

**Honesty:** synthetic corpus, not production traffic. Do not treat headline precision as a Chrome Web Store claim. Reports: [`POST_REMEDIATION_EVALUATION.md`](POST_REMEDIATION_EVALUATION.md)

---

## Red team

| Result                       |                  Count |
| ---------------------------- | ---------------------: |
| Probes                       |                     39 |
| Pass                         |                 **37** |
| Accepted bypasses            | **2** (ROT13 AWS / SK) |
| False positives in probe set |                  **0** |

Fixed classes include whitespace/newline chunking, HTML entities, hex encoding, and entropy false positives. Catalog: [`BYPASS_DATABASE.md`](BYPASS_DATABASE.md) · report: [`RED_TEAM_REPORT.md`](RED_TEAM_REPORT.md)

---

## Quick start (load unpacked)

**Requirements:** Node ≥ 20, [pnpm](https://pnpm.io) 9.x, Chromium-based browser.

```bash
corepack enable
pnpm install
pnpm --filter @sentinel-shield/extension build
```

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. **Load unpacked** → `packages/extension/dist`
4. Open the popup → enable an AI platform → grant host permission
5. Paste a clean sentence (expect allow) and a fake secret such as `AKIAIOSFODNN7EXAMPLE` (expect hold/block/redact)

Full demo scripts: [`LIVE_DEMO_SCRIPT.md`](LIVE_DEMO_SCRIPT.md)

### Engineering gates

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm purity          # detection-engine has no chrome/network
pnpm depcruise
pnpm bench:budgets
pnpm eval:detection
pnpm certify
# or: pnpm ci
```

---

## Known limitations (read before demos)

| Topic                                   | Truth                                                       |
| --------------------------------------- | ----------------------------------------------------------- |
| OCR on images/PDFs                      | **Does not extract text today** — HOLD fail-closed (KI-002) |
| ROT13-encoded secrets                   | Accepted residual bypass                                    |
| `clipboard.readText()`                  | Not intercepted in v1                                       |
| Live ChatGPT/Claude/Gemini CDP sign-off | Open public blocker (KI-006)                                |
| Chrome Web Store                        | **Not authorized**                                          |

Full list: [`UPDATED_LIMITATIONS.md`](UPDATED_LIMITATIONS.md)

---

## Documentation map

| Audience            | Start here                                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exec / hiring skim  | This README · [`RELEASE_v0.3.0_INTERNAL_BETA.md`](RELEASE_v0.3.0_INTERNAL_BETA.md)                                                                  |
| Architecture review | [`blueprint/ARCHITECTURE_FREEZE_v1.0.md`](blueprint/ARCHITECTURE_FREEZE_v1.0.md) · [`ARCHITECTURE_DEFENSE_GUIDE.md`](ARCHITECTURE_DEFENSE_GUIDE.md) |
| Engineering paper   | [`WHITEPAPER_SENTINEL_SHIELD_AI.md`](WHITEPAPER_SENTINEL_SHIELD_AI.md)                                                                              |
| Threat / bypasses   | [`blueprint/PART_06_THREAT_MODEL_STRIDE_ABUSE.md`](blueprint/PART_06_THREAT_MODEL_STRIDE_ABUSE.md) · [`BYPASS_DATABASE.md`](BYPASS_DATABASE.md)     |
| Interview prep      | [`TECHNICAL_INTERVIEW_BIBLE.md`](TECHNICAL_INTERVIEW_BIBLE.md) · [`INTERVIEW_DEFENSE_PLAYBOOK.md`](INTERVIEW_DEFENSE_PLAYBOOK.md)                   |
| Portfolio framing   | [`PORTFOLIO_GUIDE.md`](PORTFOLIO_GUIDE.md)                                                                                                          |
| Mastery index       | [`ENGINEERING_MASTERY_INDEX.md`](ENGINEERING_MASTERY_INDEX.md)                                                                                      |

Blueprint `PART_NN` documents + `DESIGN_OWNERSHIP_MATRIX.md` are authoritative for architecture.  
`implementation_plan.md` is non-binding.

---

## Explicit non-claims

- Not a Chrome Web Store product
- Not an enterprise SOC / network DLP replacement
- Not OCR-capable for images or PDFs in the current build
- Not production-traffic-validated detection rates
- Not immune to user override, ROT13, or channels outside paste/upload/drop

---

## License / contribution

Private engineering milestone published for review and load-unpacked beta. Architecture is frozen; further value is expected from validation, feedback, and technical communication rather than feature expansion unless a Category A defect is proven.

---

**Built as a security-engineering case study:** local-first by design, fail-closed where capability is absent, and honest about what is still open.
