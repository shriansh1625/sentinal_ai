# Sentinel Shield AI

### Local-first privacy firewall for browser-based generative AI

<p align="center">
  <strong>Intercept · Detect on-device · Decide before the page gets the data</strong>
</p>

<p align="center">
  <img alt="Milestone" src="https://img.shields.io/badge/milestone-v0.3.0--internal--beta-0B3D2E?style=for-the-badge" />
  <img alt="Architecture Freeze" src="https://img.shields.io/badge/architecture-freeze%20v1.0-1B4F72?style=for-the-badge" />
  <img alt="Engineering RC" src="https://img.shields.io/badge/engineering%20RC-GO-1E8449?style=for-the-badge" />
  <img alt="Public CWS" src="https://img.shields.io/badge/Chrome%20Web%20Store-NO--GO-922B21?style=for-the-badge" />
</p>

<p align="center">
  <a href="#quick-start-60-seconds">Quick Start</a> ·
  <a href="#what-you-get">Capabilities</a> ·
  <a href="#measured-results">Evidence</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#documentation">Docs</a> ·
  <a href="#honest-limitations">Limitations</a>
</p>

---

## The problem in one line

People paste API keys, cards, and private text into ChatGPT, Claude, Gemini, and coding copilots — often **before any enterprise DLP ever sees it**.

**Sentinel Shield** sits in that gap: a Chromium **Manifest V3** extension that intercepts paste / upload / drag-drop on **user-enabled AI hosts**, runs **100% on-device Tier-1 detection**, and returns allow / hold / redact / block — **with no cloud detection path**.

---

## Snapshot

|                    |                                                                                                         |
| :----------------- | :------------------------------------------------------------------------------------------------------ |
| **What it is**     | Engineering case study + load-unpacked **internal beta**                                                |
| **What it is not** | Chrome Web Store app · enterprise SOC · network DLP                                                     |
| **Detection**      | On-device regex + checksums + entropy + bounded decode/rescan                                           |
| **Milestone**      | [`v0.3.0-internal-beta`](https://github.com/shriansh1625/sentinal_ai/releases/tag/v0.3.0-internal-beta) |
| **Extension**      | `0.2.1`                                                                                                 |
| **Verdict**        | Engineering RC **GO** · Public production **NO-GO**                                                     |

```
  ┌─────────────────── AI host page (untrusted) ───────────────────┐
  │  ChatGPT · Claude · Gemini · Copilot · …                       │
  └─────────────────────────────▲──────────────────────────────────┘
                                │ policy decision
  ┌─────────────────────────────┴──────────────────────────────────┐
  │  Content script (capture-phase)  →  Service Worker             │
  │       validate · auth · rate-limit · fail-closed               │
  │                         ↓                                      │
  │              @sentinel-shield/detection-engine                 │
  │              pure library · zero network I/O                   │
  └────────────────────────────────────────────────────────────────┘
```

---

## What you get

<table>
  <tr>
    <td width="50%">

### Implemented

- Paste, upload, and drag-drop interception
- On-device Tier-1 secret / PII detection
- Luhn (cards) + MOD-97 (IBAN) validation
- Spaced / HTML / hex / base64 preprocess
- Closed Shadow DOM decision overlay
- IPC auth + **30/min** IPC & **20/min** scan limits
- Encrypted settings · history **off** by default
- Architecture Freeze + ADR-backed trade-offs

</td>
<td width="50%">

### Intentionally not claimed

- OCR that “reads” images / PDFs _(HOLD fail-closed)_
- NER / CV models _(disabled by design)_
- Typing / keystroke interception _(out of freeze)_
- Enterprise policy backend _(placeholder only)_
- Public Chrome Web Store readiness
- Production-traffic precision guarantees

</td>
  </tr>
</table>

---

## Measured results

Evidence over slogans. Full write-ups linked below.

### Detection evaluation _(synthetic, fixed seed `1581719041`, n = 20,000)_

| Metric                  | Before (Phase B) | After remediations (Phase C) |
| :---------------------- | ---------------: | ---------------------------: |
| **Precision**           |            0.902 |                    **0.994** |
| **Recall**              |            0.839 |                    **0.869** |
| **F1**                  |            0.869 |                    **0.928** |
| **False positive rate** |            0.091 |                    **0.005** |
| Spaced-secret recall    |            0.000 |                    **0.703** |
| Hard-negative FPR       |            0.303 |                    **0.017** |

> Synthetic ≠ production traffic. Numbers are reproducible engineering signals — not Store marketing copy.  
> Details: [`docs/red-team/POST_REMEDIATION_EVALUATION.md`](docs/red-team/POST_REMEDIATION_EVALUATION.md)

### Red team

|                        |               |
| :--------------------- | ------------: |
| Probes executed        |        **39** |
| Passed                 |        **37** |
| Accepted residuals     | **2** (ROT13) |
| False positives in set |         **0** |

Fixed: whitespace / newline chunking, HTML entities, hex, entropy FPs.  
Catalog: [`docs/red-team/BYPASS_DATABASE.md`](docs/red-team/BYPASS_DATABASE.md) · Report: [`docs/red-team/RED_TEAM_REPORT.md`](docs/red-team/RED_TEAM_REPORT.md)

### Engineering gates

`typecheck` · `lint` · `test` · `build` · `purity` · `depcruise` · `bench:budgets` · `certify` — **PASS** on milestone release.

---

## Quick start (60 seconds to load)

**Need:** Node ≥ 20 · pnpm 9 · Chrome / Edge

```bash
corepack enable
pnpm install
pnpm --filter @sentinel-shield/extension build
```

1. Open `chrome://extensions` → enable **Developer mode**
2. **Load unpacked** → select `packages/extension/dist`
3. Popup → enable one AI platform → grant permission
4. Try:
   - Clean sentence → should **allow**
   - `AKIAIOSFODNN7EXAMPLE` → should **hold / block / redact**
   - A PNG upload → **HOLD** (OCR unavailable — expected & honest)

Demo scripts (5 / 15 / 30 min): [`docs/mastery/LIVE_DEMO_SCRIPT.md`](docs/mastery/LIVE_DEMO_SCRIPT.md)

```bash
pnpm ci                 # full engineering gate
pnpm eval:detection     # regenerate synthetic metrics
```

---

## Architecture

Built as a **monorepo** so detection stays pure and interview-defensible.

| Package                | Responsibility                                |
| :--------------------- | :-------------------------------------------- |
| `shared-types`         | Freeze constants, IPC contracts, policy enums |
| `core`                 | Config, flags, logging, rate limiters         |
| `browser-adapters`     | Chrome storage / crypto / envelope assert     |
| **`detection-engine`** | Tier-1 engine — **no `chrome`, no `fetch`**   |
| `extension`            | MV3 service worker, content scripts, Lit UI   |
| `enterprise-backend`   | Empty placeholder — **not a shipped product** |

**Invariant:** content scripts never talk to offscreen workers directly. The service worker coordinates.

| Dig deeper       |                                                                                                      |
| :--------------- | :--------------------------------------------------------------------------------------------------- |
| System map       | [`docs/architecture/PROJECT_KNOWLEDGE_GRAPH.md`](docs/architecture/PROJECT_KNOWLEDGE_GRAPH.md)       |
| Decision defense | [`docs/architecture/ARCHITECTURE_DEFENSE_GUIDE.md`](docs/architecture/ARCHITECTURE_DEFENSE_GUIDE.md) |
| Freeze (binding) | [`blueprint/ARCHITECTURE_FREEZE_v1.0.md`](blueprint/ARCHITECTURE_FREEZE_v1.0.md)                     |
| Whitepaper       | [`docs/mastery/WHITEPAPER_SENTINEL_SHIELD_AI.md`](docs/mastery/WHITEPAPER_SENTINEL_SHIELD_AI.md)     |

---

## Certification at a glance

Source of truth: [`store/CERTIFICATION_STATUS.json`](store/CERTIFICATION_STATUS.json)

| Gate                   | Status                            |
| :--------------------- | :-------------------------------- |
| G0 Performance         | PASS WITH FINDINGS                |
| G1 Security            | PASS WITH FINDINGS                |
| G2 Privacy             | PASS                              |
| G3 Live-host E2E       | Conditional eng / **FAIL public** |
| G4 Claims honesty      | PASS                              |
| G5 Architecture freeze | PASS                              |

**Authorized:** load-unpacked internal beta  
**Not authorized:** Chrome Web Store publish  
**Open public blockers:** live host sign-off (KI-006) · counsel privacy URL (KI-018)

---

## Honest limitations

| Topic                   | Reality                                                 |
| :---------------------- | :------------------------------------------------------ |
| Images / scanned PDFs   | **HOLD** — OCR WASM not shipped; do not claim OCR works |
| ROT13 secrets           | Accepted residual bypass                                |
| Page `clipboard.read()` | Not intercepted in v1                                   |
| Iframes                 | Limited (`allFrames: false`)                            |
| User “Allow anyway”     | Explicit residual — human override                      |

Full matrix: [`docs/security/UPDATED_LIMITATIONS.md`](docs/security/UPDATED_LIMITATIONS.md)

---

## Documentation

All engineering reports live under **[`docs/`](docs/README.md)** (not the repo root).

| If you are…                     | Open this                                                                                                                                                                             |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Browsing the docs tree          | [`docs/README.md`](docs/README.md)                                                                                                                                                    |
| Skimming the milestone          | [`docs/release/RELEASE_v0.3.0_INTERNAL_BETA.md`](docs/release/RELEASE_v0.3.0_INTERNAL_BETA.md)                                                                                        |
| Challenging architecture        | [`docs/architecture/ARCHITECTURE_DEFENSE_GUIDE.md`](docs/architecture/ARCHITECTURE_DEFENSE_GUIDE.md)                                                                                  |
| Reading the engineering paper   | [`docs/mastery/WHITEPAPER_SENTINEL_SHIELD_AI.md`](docs/mastery/WHITEPAPER_SENTINEL_SHIELD_AI.md)                                                                                      |
| Preparing a technical interview | [`docs/mastery/TECHNICAL_INTERVIEW_BIBLE.md`](docs/mastery/TECHNICAL_INTERVIEW_BIBLE.md) · [`docs/mastery/INTERVIEW_DEFENSE_PLAYBOOK.md`](docs/mastery/INTERVIEW_DEFENSE_PLAYBOOK.md) |
| Running a live demo             | [`docs/mastery/LIVE_DEMO_SCRIPT.md`](docs/mastery/LIVE_DEMO_SCRIPT.md)                                                                                                                |
| Framing the portfolio           | [`docs/mastery/PORTFOLIO_GUIDE.md`](docs/mastery/PORTFOLIO_GUIDE.md)                                                                                                                  |
| Red-team / bypasses             | [`docs/red-team/BYPASS_DATABASE.md`](docs/red-team/BYPASS_DATABASE.md)                                                                                                                |
| Known issues                    | [`docs/security/KNOWN_ISSUES.md`](docs/security/KNOWN_ISSUES.md)                                                                                                                      |

Blueprint `PART_*` + `DESIGN_OWNERSHIP_MATRIX.md` own architecture.  
`docs/sprints/implementation_plan.md` is non-binding.

---

## Repository layout

```
├── README.md                 ← you are here
├── CHANGELOG.md
├── SECURITY.md
├── blueprint/                ← architecture freeze & PART_* specs
├── docs/                     ← all engineering reports (organized)
│   ├── architecture/
│   ├── release/
│   ├── validation/
│   ├── excellence/
│   ├── red-team/
│   ├── phases/
│   ├── sprints/
│   ├── security/
│   ├── performance/
│   ├── quality/
│   └── mastery/
├── packages/                 ← source code
├── store/                    ← certification & CWS packaging
└── tools/                    ← eval, red-team, benches, CI helpers
```

---

## Design principles (how this was built)

1. **Local-first** — detection never phones home
2. **Fail closed when unsure** — no silent unscanned release
3. **Precision over vanity metrics** — detector count is not the scoreboard
4. **Residuals are named** — ROT13, OCR HOLD, live-host gap are documented, not hidden
5. **Architecture Freeze** — credibility from constraints, not feature sprawl

---

## Explicit non-claims

- Not Chrome Web Store ready
- Not an enterprise DLP replacement
- Not OCR-capable in the current build
- Not validated on production user traffic
- Not “better than” commercial security products

---

<p align="center">
  <strong>Engineering judgment under constraints.</strong><br/>
  Built to be demonstrated, measured, red-teamed — and defended in a senior security interview.
</p>

<p align="center">
  <sub>Milestone <code>v0.3.0-internal-beta</code> · Further value: validation, feedback, and technical communication — not unchecked feature growth.</sub>
</p>
