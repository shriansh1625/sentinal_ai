# Sentinel Shield AI — Human Engineering Runbook

**Audience:** Engineers who have never seen this repository  
**Purpose:** Clone → install → build → load → debug → manually verify → ship internal beta  
**Authority:** `blueprint/` + `ARCHITECTURE_FREEZE_v1.0.md` (design) · this runbook (operations)  
**Do not confuse with:** `implementation_plan.md` (non-binding planning notes)

| Item                | Value                                                            |
| ------------------- | ---------------------------------------------------------------- |
| Remote              | https://github.com/shriansh1625/sentinal_ai                      |
| Extension package   | `@sentinel-shield/extension` **0.2.1**                           |
| Root package        | `sentinel-shield` **0.0.0** (version skew is known — KI-003)     |
| Load unpacked path  | **`packages/extension/dist`**                                    |
| Certification today | Engineering RC + **Internal Beta only** (public CWS still NO-GO) |

---

## How to use this document

1. Read **Sections 1–5** before touching Chrome.
2. Use **Sections 6–7** when you need to understand _why_ something happens.
3. Use **Sections 8–9** as your daily / release QA checklists (print or copy into a ticket).
4. Use **Sections 10–13** when something breaks or you must prove security/performance.
5. Use **Sections 14–16** for day-to-day engineering and bug handling.

If a behaviour in this runbook conflicts with `blueprint/ARCHITECTURE_FREEZE_v1.0.md`, **the freeze wins**. File a doc bug; do not “fix” architecture by inventing features.

---

# SECTION 1 — Repository overview

## 1.1 What this product is

Sentinel Shield AI is a **local-first Chromium Manifest V3 extension**. On supported AI chat hosts it:

1. Intercepts paste / file upload / drag-drop into AI compose surfaces.
2. Scans text **on-device** (Tier-1 detection engine).
3. Decides ALLOW / WARN→HOLD / REDACT / BLOCK.
4. Shows an overlay when the user must decide.
5. Never sends paste contents to a Sentinel cloud (telemetry is off by default and must stay privacy-safe).

Binary documents (images, PDF, DOCX, ZIP, etc.) are **held fail-closed** until OCR/PDF WASM assets are vendored (KI-002). Do not expect image OCR to “work” in current builds.

## 1.2 Monorepo shape

This is a **pnpm + Turborepo** monorepo. There is **no separate “apps/” folder**. The only shippable app is the browser extension under `packages/extension`.

```
Sentinal shield/   (or sentinal_ai after clone)
├── .github/                 CI workflow + CODEOWNERS
├── blueprint/               Architecture authority (PART_01–PART_30, freeze, ADRs)
├── docs/                    Module boundary rules
├── handbook/                Project execution bible (process)
├── packages/                All code packages (workspace)
├── store/                   CWS listing, privacy, beta checklist, assets
├── tests/                   Cross-package integration + Playwright e2e
├── tools/                   Purity, dep-cruise, budgets, certification, icons
├── package.json             Root scripts (build, test, ci, …)
├── pnpm-workspace.yaml      packages/*
├── turbo.json               Task graph
├── playwright.config.ts     E2E config
└── ENGINEERING_RUNBOOK.md   ← this file
```

## 1.3 Packages (responsibilities)

| Package            | NPM name                              | Responsibility                                                                                            | Must NOT                                        |
| ------------------ | ------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Shared types       | `@sentinel-shield/shared-types`       | Pure TypeScript types, platform registry, constants, message enums                                        | Import Chrome, network, or other packages       |
| Core               | `@sentinel-shield/core`               | DI container, errors, logging façades, config helpers, feature flags, rate limiters, perf/memory monitors | Import Chrome APIs or detection                 |
| Browser adapters   | `@sentinel-shield/browser-adapters`   | Chrome storage + PART_19 crypto, messaging envelope helpers, runtime wrappers                             | Contain detection logic                         |
| Detection engine   | `@sentinel-shield/detection-engine`   | Pure Tier-1 scan pipeline (preprocess → detectors → checksum → risk → policy → redaction helpers)         | Import `chrome`, `fetch`, or extension packages |
| Extension          | `@sentinel-shield/extension`          | MV3 service worker, content script, Lit popup/options, offscreen stub, input pipelines, overlay           | Import `enterprise-backend`                     |
| Enterprise backend | `@sentinel-shield/enterprise-backend` | **Phase 4 placeholder only**                                                                              | Be imported by the extension                    |

**Dependency direction (enforced by `pnpm depcruise` + `pnpm purity`):**

```
shared-types
    ↑
detection-engine (types only)     core
    ↑                                ↑
    └──────────── extension ← browser-adapters
```

## 1.4 Other top-level folders

| Folder                                | What engineers use it for                                                                                                                   |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `blueprint/`                          | Read before changing behaviour. Especially PART_10 (MV3), PART_13 (detection), PART_17 (pipelines), PART_18 (policy), PART_20 (guardrails). |
| `docs/MODULE_BOUNDARIES.md`           | Package import rules.                                                                                                                       |
| `handbook/PROJECT_EXECUTION_BIBLE.md` | Sprint/process context (not day-1 load steps).                                                                                              |
| `store/`                              | Release / CWS paperwork. Start with `store/BETA_CHECKLIST.md`.                                                                              |
| `tests/e2e/`                          | Playwright harness + local AI compose fixture.                                                                                              |
| `tests/integration/`                  | Vitest foundation tests (no Chrome).                                                                                                        |
| `tools/`                              | Gate scripts used by `pnpm ci`.                                                                                                             |

## 1.5 Build system

| Layer             | Tool                                                                                               | Role                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Install           | **pnpm 9.15.4** (pinned via `packageManager`)                                                      | Workspace installs                                                      |
| Orchestration     | **Turborepo**                                                                                      | `build` / `test` / `lint` / `typecheck` across packages (`^build` deps) |
| Extension bundler | **Vite 6**                                                                                         | Multi-entry MV3 bundle → `packages/extension/dist`                      |
| Unit tests        | **Vitest**                                                                                         | Per-package + workspace                                                 |
| E2E               | **Playwright**                                                                                     | Optional; **not** in default CI YAML today                              |
| Quality gates     | ESLint, Prettier, dep-cruiser, purity, doc-lint, bench budgets, bundle verify, certification check | `pnpm ci`                                                               |

There is **no** separate backend server to start for local extension QA.

---

# SECTION 2 — Prerequisites

## 2.1 Required

| Tool              | Exact / minimum                      | Why                                              |
| ----------------- | ------------------------------------ | ------------------------------------------------ |
| **Git**           | Any modern 2.x                       | Clone / branch                                   |
| **Node.js**       | **≥ 20** (`engines.node`)            | Tooling + Vite                                   |
| **pnpm**          | **9.15.4** (via Corepack)            | Lockfile + workspace                             |
| **Google Chrome** | **≥ 120** (`minimum_chrome_version`) | MV3 + offscreen + scripting APIs                 |
| **OS**            | Windows 10/11, macOS, or Linux       | Developed/verified primarily on Chromium desktop |

Recommended on Windows (this repo’s primary authoring OS): PowerShell 7+ or Windows Terminal; paths below use forward slashes that work in both shells.

## 2.2 Enable Corepack (recommended)

```bash
corepack enable
corepack prepare pnpm@9.15.4 --activate
node -v    # expect v20+
pnpm -v    # expect 9.15.4
```

If Corepack is blocked by policy, install pnpm 9.15.4 another way, but **do not** casually upgrade major pnpm without re-validating the lockfile.

## 2.3 Optional tools

| Tool                    | When you need it                                 |
| ----------------------- | ------------------------------------------------ |
| **VS Code / Cursor**    | Daily editing; open the repo root                |
| **Chrome DevTools**     | Required for debugging (Section 10)              |
| **Playwright browsers** | Only for `pnpm test:e2e`                         |
| **GitHub CLI (`gh`)**   | PRs / issues; not required to load the extension |

## 2.4 What you do **not** need

- No Docker
- No cloud API keys for core detection
- No `.env` file for default local load
- No native OCR SDK install (WASM not shipped yet)

---

# SECTION 3 — Installation

## 3.1 Clone

```bash
git clone https://github.com/shriansh1625/sentinal_ai.git
cd sentinal_ai
```

**Expected:** Repository root contains `package.json`, `pnpm-workspace.yaml`, `packages/`, `blueprint/`.

**Common errors**

| Symptom                       | Cause                                  | Fix                                                              |
| ----------------------------- | -------------------------------------- | ---------------------------------------------------------------- |
| `fatal: repository not found` | Wrong URL / no access                  | Confirm URL; authenticate to GitHub                              |
| Nested wrong folder           | Cloned into parent with another `.git` | Open the `sentinal_ai` folder that contains `packages/extension` |

## 3.2 Install dependencies

```bash
corepack enable
pnpm install
```

**What it does:** Resolves `pnpm-lock.yaml`, links workspace packages, runs `prepare` → Husky git hooks.

**Expected output (shape):**

- Progress lines for packages
- `Done in Xs` (or similar)
- `node_modules/` appears at root (and package-local links)

**Possible errors**

| Symptom                         | Cause                 | Fix                                                                   |
| ------------------------------- | --------------------- | --------------------------------------------------------------------- |
| `Unsupported engine`            | Node &lt; 20          | Upgrade Node                                                          |
| `ERR_PNPM_OUTDATED_LOCKFILE`    | Manual package edits  | Restore lockfile or run intentional `pnpm install` with matching pnpm |
| Network / registry TLS errors   | Corporate proxy       | Configure npm/pnpm registry + CA; retry                               |
| Husky / prepare fails           | Git hooks path oddity | Ensure you are in a real git checkout; re-run `pnpm install`          |
| Disk / path-too-long on Windows | Deep `node_modules`   | Enable long paths or clone closer to drive root                       |

## 3.3 Sanity check after install

```bash
pnpm -v
ls packages
pnpm --filter @sentinel-shield/extension exec node -e "console.log('ok')"
```

**Expected:** Packages listed; no crash.

## 3.4 Environment configuration

For **default local development and Load unpacked QA**:

- **No `.env` is required.**
- Do **not** create API keys for Tier-1 detection.
- Feature flags live in extension **Options** UI / `chrome.storage` after first run (see Section 6).

If you later add local secrets for tooling, keep them out of git (`.gitignore` already excludes `.env`, `.env.*`, `*.pem`, `*.key`).

---

# SECTION 4 — Build, test, and gates

Run these from the **repository root**.

## 4.1 Command map

| Command                                          | What it does                                                                             | Expected success signal             |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------- |
| `pnpm install`                                   | Install / link workspace                                                                 | Exit 0; lockfile respected          |
| `pnpm build`                                     | Turbo builds all packages with `build` script; extension emits `packages/extension/dist` | Exit 0; `dist/manifest.json` exists |
| `pnpm test`                                      | Turbo runs package Vitest suites                                                         | Exit 0                              |
| `pnpm lint`                                      | Turbo ESLint per package                                                                 | Exit 0                              |
| `pnpm typecheck`                                 | Turbo `tsc --noEmit` (depends on `^build`)                                               | Exit 0                              |
| `pnpm run ci`                                    | Full local gate (see below)                                                              | Exit 0                              |
| `pnpm --filter @sentinel-shield/extension build` | Build **only** the extension                                                             | Fastest path to Load unpacked       |
| `pnpm test:e2e`                                  | Playwright e2e (needs prior extension build)                                             | Exit 0 or documented skips (KI-014) |
| `pnpm certify`                                   | Certification JSON/script check                                                          | Exit 0                              |
| `pnpm bench:budgets`                             | Bundle size + Tier-1 latency budgets                                                     | Exit 0                              |
| `pnpm purity`                                    | Detection-engine purity (no chrome/network)                                              | Exit 0                              |
| `pnpm depcruise`                                 | Dependency boundary cruise                                                               | Exit 0                              |

### What `pnpm run ci` runs (in order)

1. `typecheck`
2. `lint`
3. `test`
4. `build`
5. `purity`
6. `depcruise`
7. `doc-lint`
8. `bench:budgets`
9. `pnpm --filter @sentinel-shield/extension verify:bundle`
10. `node tools/certification/check.mjs`

Playwright e2e is **not** part of `pnpm ci`.

## 4.2 Icons before first load (important)

Manifest expects icons under `public/icons/`. If `dist` is missing icons after build:

```bash
node tools/generate-icons.cjs
pnpm --filter @sentinel-shield/extension build
```

Then confirm:

```bash
# PowerShell
Test-Path packages/extension/dist/manifest.json
Test-Path packages/extension/dist/background.js
Test-Path packages/extension/dist/content.js
Get-ChildItem packages/extension/dist/public/icons
```

**Expected dist essentials:**

- `manifest.json`
- `background.js`
- `content.js`
- `popup.html` / `popup.js`
- `options.html` / `options.js`
- `offscreen.html` / `offscreen.js`
- `_locales/en/messages.json`
- icons under `public/icons/`
- `wasm/INTEGRITY.json` metadata (binaries may be absent — KI-002)

## 4.3 Typical failures

| Symptom                           | Likely cause                                           | Fix                                                                                    |
| --------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Typecheck fails after clean clone | Forgot `pnpm install` / build order                    | `pnpm install` then `pnpm build` / `pnpm typecheck`                                    |
| `verify:bundle` fails             | Dist incomplete or workspace import leaked into bundle | Rebuild extension; read script `packages/extension/scripts/verify-bundle.mjs`          |
| Bench budgets fail                | Dist oversized or machine extremely slow               | Check dist size &lt; 25 MB; do not “fix” by deleting source maps unless policy says so |
| Tests fail on first run           | Stale dist / missing build deps                        | `pnpm build` then `pnpm test`                                                          |
| E2E cannot find extension         | Dist not built                                         | Build extension first                                                                  |

---

# SECTION 5 — Loading the extension in Chrome

## 5.1 Build the loadable package

```bash
pnpm install
node tools/generate-icons.cjs   # if icons missing
pnpm --filter @sentinel-shield/extension build
```

## 5.2 Load unpacked — exact steps

1. Open **Google Chrome** (version ≥ 120).
2. Navigate to `chrome://extensions`.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked**.
5. Select this folder **exactly**:

   ```
   <repo-root>/packages/extension/dist
   ```

   **Wrong folders (common mistakes):**

   - `<repo-root>` (root has no MV3 manifest for Chrome)
   - `packages/extension` (source, not built)
   - `packages/extension/src`
   - `packages/extension/public` alone

6. Confirm the extension card appears.

## 5.3 What should appear on success

| Check          | Expected                                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Extension name | Localized name from `_locales` (English default) — product name **Sentinel Shield** / equivalent `__MSG_extensionName__` |
| Version        | **0.2.1**                                                                                                                |
| Errors         | No red **Errors** button on the card                                                                                     |
| Service worker | “Service worker” / “Inspect views: service worker” link present                                                          |
| Toolbar icon   | Shield/icon visible; click opens **popup**                                                                               |
| First install  | Options / onboarding may open automatically                                                                              |

## 5.4 First-run configuration (required for interception)

**Fresh install enables zero AI platforms.** Content scripts are registered **only** for platforms you enable (ADR-035).

1. Click the extension icon → **popup**.
2. Enable at least one host (start with **ChatGPT**).
3. Chrome shows a **host permission** prompt → **Allow**.
4. Open that host in a tab and **hard-refresh** the page (Ctrl+Shift+R / Cmd+Shift+R) so `content.js` injects at `document_start`.

Without enabling a platform, paste on ChatGPT will **not** be intercepted. This is expected, not a bug.

## 5.5 Verify successful load (2-minute smoke)

1. Popup opens; platforms list visible.
2. Enable ChatGPT; permission granted.
3. Open https://chatgpt.com (or chat.openai.com).
4. Open DevTools → Console on the page. You should not see a flood of extension fatal errors.
5. Paste a test email into the compose box, e.g. `alice@example.com`.
6. Expect either:
   - Overlay (HOLD/WARN path), or
   - Immediate REDACT / BLOCK depending on risk scoring for that entity,
   - Or ALLOW if scored NONE (email may WARN/HOLD depending on current weights — see Section 8).

If nothing happens: see Section 11 (“No interception”).

## 5.6 Debugging load errors

| Chrome UI symptom                        | Where to look                              | Typical fix                                             |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------------------- |
| “Manifest file is missing or unreadable” | Selected wrong folder                      | Select `packages/extension/dist`                        |
| “Service worker registration failed”     | `chrome://extensions` → Errors; SW inspect | Rebuild; check `background.js` exists; read SW console  |
| Missing icons                            | Dist icons absent                          | Run `node tools/generate-icons.cjs` + rebuild           |
| Extension ID changes every reload        | Normal for unpacked                        | Re-grant host permissions if needed                     |
| Old behaviour after code change          | Stale SW / CS                              | Click **Reload** on extension card; hard-refresh AI tab |

Also run:

```bash
pnpm --filter @sentinel-shield/extension verify:bundle
```

---

# SECTION 6 — Extension architecture

## 6.1 Process model (MV3)

```
┌─────────────────────────────────────────────────────────────┐
│ Chrome                                                      │
│  ┌──────────────────┐   messages    ┌────────────────────┐  │
│  │ Content script   │ ◄───────────► │ Service Worker (SW)│  │
│  │ content.js       │               │ background.js      │  │
│  │ • paste/upload/  │               │ • IPC router       │  │
│  │   drop intercept │               │ • detection engine │  │
│  │ • DecisionOverlay│               │ • platform regist. │  │
│  └────────┬─────────┘               │ • storage / crypto │  │
│           │                         └─────────┬──────────┘  │
│           │ DOM overlay                       │             │
│  ┌────────▼─────────┐               ┌─────────▼──────────┐  │
│  │ AI page DOM      │               │ Offscreen document │  │
│  │ (ChatGPT, etc.)  │               │ (stub today)       │  │
│  └──────────────────┘               │ future OCR/WASM    │  │
│                                     └────────────────────┘  │
│  ┌──────────────────┐  ┌─────────────────────────────────┐  │
│  │ Popup (Lit)      │  │ Options (Lit)                   │  │
│  │ platforms toggle │  │ feature flags                   │  │
│  └──────────────────┘  └─────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 6.2 Background service worker

**Source:** `packages/extension/src/background.ts`  
**Built:** `packages/extension/dist/background.js`

Responsibilities:

- Boot lifecycle / migrations (`lifecycle/`)
- Register dynamic content scripts for enabled platforms (`lifecycle/registration.ts`)
- Create IPC handlers (`messaging/handlers.ts`) + router (`messaging/router.ts`)
- Host in-process `createDetectionEngine()` for text scans
- Encrypted settings storage via browser-adapters
- Offscreen ensure/ping (placeholder path)
- Perf/memory monitors on bootstrap

MV3 workers can sleep. After idle, the first event restarts the worker (cold start). Keep this in mind when debugging “first paste after idle”.

## 6.3 Content script

**Source:** `packages/extension/src/content.ts`  
**Built:** `content.js`  
**Injection:** Dynamic `chrome.scripting.registerContentScripts` — **not** static `content_scripts` in the manifest.

On init:

1. Sends `CS_LIFECYCLE` (`init`)
2. Starts interception controller (`input-pipelines/`)

Pipelines:

| File                             | Event                                 |
| -------------------------------- | ------------------------------------- |
| `input-pipelines/paste.ts`       | Paste into AI-like inputs             |
| `input-pipelines/file-upload.ts` | `input[type=file]`                    |
| `input-pipelines/drag-drop.ts`   | Drop onto page/composer               |
| `input-pipelines/context.ts`     | Heuristics for “is this an AI input?” |
| `ui/overlay.ts`                  | Decision overlay (closed shadow DOM)  |

## 6.4 Popup

**Source:** `ui/popup-app.ts`, `ui/popup-main.ts`  
**Built:** `popup.html` + `popup.js`

- Health check (version, safe mode)
- Platform enable/disable (triggers `permissions.request`)
- Link to options

## 6.5 Options

**Source:** `ui/options-app.ts`, `ui/options-main.ts`  
**Built:** `options.html` + `options.js`

Toggles (persisted via `CONFIG_SET`):

| Flag               | Default | Notes                                     |
| ------------------ | ------- | ----------------------------------------- |
| `ocrEnabled`       | `true`  | Path still fail-closed without WASM       |
| `nerEnabled`       | `false` | Not a Tier-1 live path in v1 freeze sense |
| `telemetryEnabled` | `false` | Must stay off unless explicitly enabled   |
| `historyEnabled`   | `false` | Metadata-only history if enabled          |

## 6.6 Offscreen document

**Source:** `offscreen/manager.ts`, `offscreen/offscreen.ts`, `offscreen/worker-pool.ts`  
**Status:** Handshake implemented; **OCR/PDF worker returns fail-closed** (“WASM not vendored”).

Do not spend QA time expecting image text extraction until WASM is pinned and shipped.

## 6.7 Messaging

**Types:** `packages/shared-types/src/messages/index.ts`  
**Envelope validation:** `packages/browser-adapters/src/messaging`  
**Auth:** `packages/extension/src/messaging/sender-auth.ts`  
**Router:** `packages/extension/src/messaging/router.ts`

Important rules:

- Privileged messages (`CONFIG_SET`, `PLATFORM_ENABLE` / `DISABLE`, `OFFSCREEN_ENSURE`) **must not** come from a tab/content-script sender.
- Tab-scoped messages (`INTERCEPT_EVENT`, `CS_LIFECYCLE`) must come from a tab.
- IPC rate limit: **30 messages / minute / tab**.
- Scan rate limit: **20 scans / minute / tab** on `INTERCEPT_EVENT` / `SCAN_REQUEST` (`createScanRateLimiter` — KI-022 closed).

## 6.8 Detection engine

**Package:** `packages/detection-engine`  
**Entry:** `createDetectionEngine()` → `tier1.ts` `scanText()`

Pure functions only. Unit-testable without Chrome.

## 6.9 Storage

| Key / area            | Purpose                                                  |
| --------------------- | -------------------------------------------------------- |
| `schemaVersion`       | Migration stamp                                          |
| `safeMode`            | Restricts SW to health/config-get when migration fails   |
| `appSettings`         | Feature flags blob                                       |
| `enabledPlatforms`    | Platform ID array                                        |
| `sentinel_history_v1` | Optional metadata history (no raw paste)                 |
| Session crypto keys   | PART_19 encrypted KV (`browser-adapters` storage crypto) |

## 6.10 Permissions (manifest)

**Always:** `storage`, `activeTab`, `scripting`, `offscreen`, `alarms`  
**Optional host permissions:** AI hosts only (ChatGPT, Gemini, Claude, DeepSeek, Perplexity, Grok, Copilot, GitHub Copilot, Cursor) — requested when user enables a platform.

---

# SECTION 7 — Runtime flow

## 7.1 Happy-path text paste

```
User pastes text into AI composer
        │
        ▼
Capture-phase listener (paste.ts)
  • isLikelyAiInput(target)?
  • size ≤ MAX_TEXT_SCAN_BYTES (1 MiB)?
        │ yes
        ▼
preventDefault + stopImmediatePropagation
        │
        ▼
chrome.runtime.sendMessage { type: INTERCEPT_EVENT, payload: text }
        │
        ▼
SW router: validate → authorize → rate-limit → handler
        │
        ▼
detection-engine.scanText(text)
  1. size gate (else HIGH/BLOCK)
  2. preprocess (NFKD, zero-width strip, homoglyph map, concat)
  3. Base64 span decode (bounded depth)
  4. regex + entropy detectors
  5. checksum enrich (Luhn / IBAN MOD-97)
  6. scoreRisk
  7. decideAction (NONE→ALLOW, LOW→WARN, MEDIUM→REDACT, HIGH/CRITICAL→BLOCK)
        │
        ▼
scan-bridge maps PolicyAction → InterceptDecision
  ALLOW  → ALLOW
  WARN   → HOLD (overlay “review”)
  BLOCK  → BLOCK
  REDACT → REDACT (+ redactedText)
        │
        ├── ALLOW  → content script re-dispatches approved paste
        ├── REDACT → may auto-apply redacted text (paste path)
        └── HOLD/BLOCK → DecisionOverlay
                ├── Allow once (HOLD only)
                ├── Block
                └── Redact & allow (if redactedText available)
```

## 7.2 File upload / drag-drop of binaries

```
File chosen / dropped
  → size > 50 MiB? → HOLD (too large)
  → magic-byte sniff says TEXT and small? → scan as text
  → otherwise files payload → SW returns HOLD
       reason: OCR/PDF WASM not available (fail-closed)
  → overlay; upload input cleared on non-ALLOW
```

## 7.3 Policy table (memorize this)

| RiskLevel | PolicyAction | User-visible intercept   |
| --------- | ------------ | ------------------------ |
| NONE      | ALLOW        | Paste proceeds           |
| LOW       | WARN         | HOLD overlay             |
| MEDIUM    | REDACT       | Redacted text / overlay  |
| HIGH      | BLOCK        | Block overlay (no Allow) |
| CRITICAL  | BLOCK        | Block overlay (no Allow) |

---

# SECTION 8 — Manual feature verification

Use a **built** extension, Developer mode loaded from `packages/extension/dist`. Enable the target platform and hard-refresh the AI tab before each feature.

For each item: **Purpose → Trigger → Expected → Success → Failure → Debug → Files → Logs**.

### F01 — Extension loads

|          |                                                    |
| -------- | -------------------------------------------------- |
| Purpose  | Confirm package is valid MV3                       |
| Trigger  | Load unpacked `packages/extension/dist`            |
| Expected | Card shows v0.2.1, no Errors                       |
| Success  | SW inspectable; popup opens                        |
| Failure  | Manifest/SW errors                                 |
| Debug    | `chrome://extensions` Errors; rebuild              |
| Files    | `manifest.json`, `background.ts`, `vite.config.ts` |
| Logs     | SW console                                         |

### F02 — Platform enable + host permission

|          |                                                                   |
| -------- | ----------------------------------------------------------------- |
| Purpose  | Dynamic CS registration (ADR-035)                                 |
| Trigger  | Popup → enable ChatGPT → Allow permission                         |
| Expected | Checkbox stays on; revisit popup still on                         |
| Success  | `chrome://extensions` → Details → Site access includes host       |
| Failure  | Checkbox flips back; no prompt                                    |
| Debug    | SW console during enable; storage `enabledPlatforms`              |
| Files    | `lifecycle/registration.ts`, `popup-app.ts`, `platforms/index.ts` |
| Logs     | SW + popup DevTools                                               |

### F03 — Content script injection

|          |                                                               |
| -------- | ------------------------------------------------------------- |
| Purpose  | Ensure `content.js` runs on host                              |
| Trigger  | Open enabled host; hard refresh                               |
| Expected | CS lifecycle init; interceptors attached                      |
| Success  | Paste of secrets triggers scan path                           |
| Failure  | No overlay ever; page unaffected                              |
| Debug    | Page DevTools → Sources → Content scripts; check registration |
| Files    | `content.ts`, `registration.ts`                               |
| Logs     | Page console + SW                                             |

### F04 — Paste interception (email)

|          |                                                                               |
| -------- | ----------------------------------------------------------------------------- |
| Purpose  | Core paste pipeline                                                           |
| Trigger  | Paste `qa.user@example.com` into composer                                     |
| Expected | Event held; scan runs; WARN→HOLD or policy outcome                            |
| Success  | Overlay or redaction; raw paste not silently sent without decision when risky |
| Failure  | Text appears immediately with no scan                                         |
| Debug    | Breakpoint in `paste.ts`; watch `INTERCEPT_EVENT`                             |
| Files    | `paste.ts`, `handlers.ts`, `tier1.ts`, `regex.ts`                             |
| Logs     | SW handler timing; overlay reason string                                      |

### F05 — Paste API key / AWS-like key

|          |                                                                                              |
| -------- | -------------------------------------------------------------------------------------------- |
| Purpose  | Secrets detection                                                                            |
| Trigger  | Paste `AKIAIOSFODNN7EXAMPLE` (Amazon **example** key) or a synthetic `sk_live_…` test string |
| Expected | Elevated risk → HOLD/REDACT/BLOCK                                                            |
| Success  | Overlay reason mentions secret/key class; Allow not available on BLOCK                       |
| Failure  | ALLOW with no UI                                                                             |
| Debug    | `findRegexSpans` / entropy path unit tests as oracle                                         |
| Files    | `detectors/regex.ts`, `detectors/entropy.ts`, `policy/decide.ts`                             |
| Logs     | Scan result action in SW                                                                     |

### F06 — Credit card (Luhn)

|          |                                                                                                                        |
| -------- | ---------------------------------------------------------------------------------------------------------------------- |
| Purpose  | PAN + checksum                                                                                                         |
| Trigger  | Paste a **valid-Luhn test PAN** (e.g. well-known Stripe test `4111111111111111`) into composer — use only test numbers |
| Expected | Detection after Luhn enrich; high severity path                                                                        |
| Success  | BLOCK or strong HOLD/REDACT                                                                                            |
| Failure  | Invalid Luhn ignored (may be correct); valid Luhn missed = bug                                                         |
| Debug    | `checksum/index.ts`                                                                                                    |
| Files    | `regex.ts`, `checksum/index.ts`                                                                                        |
| Logs     | Entity type in result                                                                                                  |

### F07 — IBAN (including spaced)

|          |                                             |
| -------- | ------------------------------------------- |
| Purpose  | IBAN continuous + spaced (KI-020 closed)    |
| Trigger  | Paste spaced test IBAN known-valid MOD-97   |
| Expected | Detected                                    |
| Success  | Policy fires                                |
| Failure  | Only continuous form works                  |
| Debug    | Spaced IBAN regex tests in detection-engine |
| Files    | `regex.ts`, `checksum/index.ts`             |

### F08 — PEM / SSH private key material

|          |                                                                                       |
| -------- | ------------------------------------------------------------------------------------- |
| Purpose  | Private key header detection                                                          |
| Trigger  | Paste a **synthetic** `-----BEGIN OPENSSH PRIVATE KEY-----` fixture (never real keys) |
| Expected | High/critical → BLOCK                                                                 |
| Success  | Block overlay                                                                         |
| Failure  | ALLOW                                                                                 |
| Files    | `regex.ts`, `isvv.stress.test.ts` (fixtures)                                          |

### F09 — Zero-width / homoglyph bypass attempts

|          |                                                                                            |
| -------- | ------------------------------------------------------------------------------------------ |
| Purpose  | PART_20 preprocess                                                                         |
| Trigger  | Insert ZW chars inside `AKIA…` or homoglyph variants of “password” contexts per unit tests |
| Expected | Still detected after normalize                                                             |
| Success  | Same class as clean string                                                                 |
| Failure  | Clean detects, obfuscated allows                                                           |
| Files    | `preprocess/normalize.ts`                                                                  |
| Notes    | Homoglyph table is a **subset** (KI-010)                                                   |

### F10 — Base64 wrapped secret

|          |                                                          |
| -------- | -------------------------------------------------------- |
| Purpose  | Decode depth scanning                                    |
| Trigger  | Paste Base64 that decodes to an email/key (bounded size) |
| Expected | Inner finding surfaces                                   |
| Success  | Non-ALLOW                                                |
| Failure  | Outer ALLOW only                                         |
| Files    | `preprocess/base64.ts`                                   |

### F11 — Oversize paste (≥ 1 MiB)

|          |                                          |
| -------- | ---------------------------------------- |
| Purpose  | DoS / fail-closed size gate              |
| Trigger  | Paste &gt; 1,048,576 bytes into composer |
| Expected | HOLD or BLOCK without full scan hang     |
| Success  | UI decision; browser remains responsive  |
| Failure  | Tab freeze / SW crash                    |
| Files    | `paste.ts`, `tier1.ts` constants         |

### F12 — File upload text `.txt`

|          |                                                  |
| -------- | ------------------------------------------------ |
| Purpose  | Text file scanned as text                        |
| Trigger  | Attach small `.txt` containing an email          |
| Expected | Text scan path (not OCR hold) if sniffed as TEXT |
| Success  | Overlay/policy for content                       |
| Failure  | Always OCR hold for `.txt`                       |
| Files    | `file-upload.ts`, `document.ts` sniff            |

### F13 — File upload image / PDF / DOCX / ZIP

|          |                                                                  |
| -------- | ---------------------------------------------------------------- |
| Purpose  | Fail-closed binary path                                          |
| Trigger  | Upload PNG/PDF/DOCX/ZIP &lt; 50 MiB                              |
| Expected | HOLD citing OCR/PDF WASM unavailable; file input cleared on deny |
| Success  | No silent upload of unscanned binary as “clean”                  |
| Failure  | File uploads with ALLOW and no hold                              |
| Files    | `handlers.ts`, `worker-pool.ts`, KI-002                          |
| Notes    | **This is correct behaviour today**                              |

### F14 — Drag and drop

|          |                                        |
| -------- | -------------------------------------- |
| Purpose  | Drop pipeline parity                   |
| Trigger  | Drop text file / image onto composer   |
| Expected | Same decisions as upload/paste analogs |
| Success  | Overlay; no bypass vs paste            |
| Files    | `drag-drop.ts`                         |

### F15 — Overlay a11y basics

|          |                                                            |
| -------- | ---------------------------------------------------------- |
| Purpose  | Dialog semantics                                           |
| Trigger  | Force HOLD/BLOCK                                           |
| Expected | Focus trap; Esc → Block; Block focused by default on risky |
| Success  | Keyboard-only operable                                     |
| Files    | `overlay.ts`                                               |
| Logs     | axe coverage in `phase7` / `phase9` tests                  |

### F16 — Options persistence

|          |                                          |
| -------- | ---------------------------------------- |
| Purpose  | Config round-trip                        |
| Trigger  | Toggle history/telemetry; reload options |
| Expected | Values persist; telemetry default off    |
| Success  | Matches storage                          |
| Files    | `options-app.ts`, `handlers.ts` CONFIG_* |

### F17 — Safe mode (migration failure simulation)

|          |                                                  |
| -------- | ------------------------------------------------ |
| Purpose  | Degraded mode                                    |
| Trigger  | Only if reproducing migration failure (advanced) |
| Expected | Router allows only health/config-get/flags       |
| Success  | Intercepts stop; popup still shows safe mode     |
| Files    | `migrations.ts`, `router.ts`                     |

### F18 — Extension reload / browser restart

|          |                                                      |
| -------- | ---------------------------------------------------- |
| Purpose  | Persistence of platforms + settings                  |
| Trigger  | Reload extension; restart Chrome                     |
| Expected | Enabled platforms remain; CS re-registers on startup |
| Success  | Paste still intercepted after refresh                |
| Files    | `lifecycle/index.ts`, `registration.ts`              |

### F19 — Local fixture without live AI host

|          |                                                                                                                                                                                                                                                            |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Purpose  | Offline-ish smoke when hosts blocked                                                                                                                                                                                                                       |
| Trigger  | Serve/open `tests/e2e/fixtures/ai-compose.html` **only helps Playwright**; for manual MV3 CS you still need a matching registered pattern **or** temporary test registration (do not change prod code without review). Prefer live host or Playwright e2e. |
| Expected | `pnpm test:e2e` beta-local fixture passes after build                                                                                                                                                                                                      |
| Files    | `tests/e2e/beta-local-fixture.spec.ts`                                                                                                                                                                                                                     |

### F20 — Popup health

|          |                                        |
| -------- | -------------------------------------- |
| Purpose  | SW alive                               |
| Trigger  | Open popup                             |
| Expected | Version 0.2.1; safeMode false          |
| Files    | `popup-app.ts`, `HEALTH_CHECK` handler |

---

# SECTION 9 — Manual testing matrix

Mark each cell: **Pass / Fail / N/A / Blocked (KI-xxx)**.

## 9.1 Input channels

| ID         | Case                                                      | Pass? | Notes       |
| ---------- | --------------------------------------------------------- | ----- | ----------- |
| M-CLIP-01  | Copy then paste plain text email                          |       |             |
| M-PASTE-01 | Paste into ChatGPT composer                               |       |             |
| M-PASTE-02 | Paste into non-AI page textbox (should **not** intercept) |       |             |
| M-PASTE-03 | Paste into contenteditable AI input                       |       |             |
| M-DD-01    | Drag text onto composer                                   |       |             |
| M-DD-02    | Drag image onto composer                                  |       | KI-002 hold |
| M-DD-03    | Drag PDF onto composer                                    |       | KI-002 hold |
| M-UP-01    | `<input type=file>` txt                                   |       |             |
| M-UP-02    | Upload PNG                                                |       | KI-002      |
| M-UP-03    | Upload PDF                                                |       | KI-002      |
| M-UP-04    | Upload DOCX                                               |       | KI-002      |
| M-UP-05    | Upload ZIP                                                |       | KI-002      |
| M-UP-06    | Upload &gt; 50 MiB file                                   |       | HOLD size   |

## 9.2 Secret & PII entities

| ID       | Payload class               | Example approach                      | Pass?             |
| -------- | --------------------------- | ------------------------------------- | ----------------- |
| M-SEC-01 | Password-like high entropy  | Long random token near “password”     |                   |
| M-SEC-02 | API key prefix patterns     | Synthetic `sk_live_…` / docs examples |                   |
| M-SEC-03 | JWT shape                   | `header.payload.sig` synthetic        |                   |
| M-SEC-04 | SSH/PEM headers             | Synthetic BEGIN PRIVATE KEY           |                   |
| M-SEC-05 | AWS AKIA example            | `AKIAIOSFODNN7EXAMPLE` only           |                   |
| M-PII-01 | Email                       | `a@b.co`                              |                   |
| M-PII-02 | Phone                       | E.164-like test                       |                   |
| M-PII-03 | Credit card Luhn-valid test | Stripe test PANs only                 |                   |
| M-PII-04 | Grouped PAN                 | `4111 1111 1111 1111`                 |                   |
| M-PII-05 | IBAN continuous             | Test IBAN                             |                   |
| M-PII-06 | IBAN spaced                 | Spaced test IBAN                      |                   |
| M-PII-07 | Passport-like               | Pattern per regex suite               |                   |
| M-PII-08 | Aadhaar                     | **Expect gap** — KI-021 not Tier-1    | N/A or Fail=known |
| M-PII-09 | PAN-IN                      | **Expect gap** — KI-021               | N/A or Fail=known |

## 9.3 Evasion / unicode

| ID      | Case                                      | Pass?                         |
| ------- | ----------------------------------------- | ----------------------------- |
| M-EV-01 | Zero-width in secret                      |                               |
| M-EV-02 | Homoglyph substitution                    | KI-010 subset                 |
| M-EV-03 | NFKC/NFKD weirdness                       |                               |
| M-EV-04 | Base64-wrapped email                      |                               |
| M-EV-05 | String concatenation obfuscation (simple) | AST concat out of v1 — KI-011 |
| M-EV-06 | QR code image upload                      | KI-002 hold (no decode)       |

## 9.4 Scale & concurrency

| ID      | Case                          | Pass?                       |
| ------- | ----------------------------- | --------------------------- |
| M-SC-01 | ~1 KiB clean text ALLOW       |                             |
| M-SC-02 | ~10 KiB mixed                 |                             |
| M-SC-03 | ~100 KiB                      | latency note                |
| M-SC-04 | &gt;1 MiB paste               | fail-closed                 |
| M-SC-05 | Two AI tabs same host         |                             |
| M-SC-06 | Rapid pastes (IPC rate limit) | may HOLD/error after 30/min |
| M-SC-07 | Large file 40 MiB binary      | HOLD OCR                    |
| M-SC-08 | Concurrent upload + paste     |                             |

## 9.5 Lifecycle / environment

| ID      | Case                                         | Pass?                     |
| ------- | -------------------------------------------- | ------------------------- |
| M-LF-01 | Extension Reload button                      |                           |
| M-LF-02 | Chrome restart                               |                           |
| M-LF-03 | Disable extension then enable                |                           |
| M-LF-04 | Offline (airplane mode) after load           | detection still local     |
| M-LF-05 | Revoke host permission                       | interception stops        |
| M-LF-06 | Re-grant permission                          | works again after refresh |
| M-LF-07 | Disable platform in popup                    | CS unregistered           |
| M-LF-08 | Options telemetry remains off by default     |                           |
| M-LF-09 | History enable → confirm no raw paste stored | inspect storage           |

## 9.6 Multi-host (G3 manual — KI-006)

| ID     | Host           | Paste email | Paste test PAN | Upload PNG hold | Pass? |
| ------ | -------------- | ----------- | -------------- | --------------- | ----- |
| M-H-01 | ChatGPT        |             |                |                 |       |
| M-H-02 | Claude         |             |                |                 |       |
| M-H-03 | Gemini         |             |                |                 |       |
| M-H-04 | Perplexity     |             |                |                 |       |
| M-H-05 | Grok           |             |                |                 |       |
| M-H-06 | Copilot        |             |                |                 |       |
| M-H-07 | DeepSeek       |             |                |                 |       |
| M-H-08 | GitHub Copilot |             |                |                 |       |
| M-H-09 | Cursor         |             |                |                 |       |

---

# SECTION 10 — Debugging guide

## 10.1 Where logs appear

| Context        | How to open                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| Service worker | `chrome://extensions` → Sentinel Shield → **Service worker** / Inspect views |
| Popup          | Right-click popup → Inspect                                                  |
| Options        | Right-click options page → Inspect                                           |
| Content script | AI tab DevTools → Sources → Content scripts → extension id                   |
| Offscreen      | `chrome://extensions` → Inspect views: `offscreen.html` (when created)       |

There is no remote log drain in default config (`telemetryEnabled` false).

## 10.2 Inspect service worker

1. Keep the SW DevTools open (otherwise worker may sleep and you miss logs).
2. Watch boot logs, handler errors, registration failures.
3. In Console, you can exercise messaging only carefully; prefer UI triggers.

## 10.3 Inspect popup / options

Use the popup/options DevTools Network/Console. Privileged `CONFIG_SET` / platform toggles originate here (no `sender.tab`).

## 10.4 Inspect content script

1. Open AI tab DevTools.
2. Console: filter by extension.
3. Elements: look for `<sentinel-shield-overlay>` host when overlay shows (closed shadow — use overlay test seams in automated tests; in DevTools pierce shadow if needed).

## 10.5 Inspect offscreen

Trigger paths that call `OFFSCREEN_ENSURE` (advanced). Expect ping handshake; do not expect OCR success.

## 10.6 Inspect storage

1. SW DevTools → Application → Extension storage, **or**
2. Use `chrome.storage.local.get(null, console.log)` from an **extension** page console (popup/SW), not from the AI page.

Look for: `enabledPlatforms`, `appSettings`, `schemaVersion`, `safeMode`, history key if enabled.

Values may be encrypted blobs (PART_19) — interpret via app UI if ciphertext.

## 10.7 Inspect runtime messages

- Breakpoints in `router.ts` / `handlers.ts` (source maps in dist `*.map` if present).
- Temporary `console.log` **only in a private branch** if needed; do not commit debug spam.

## 10.8 Inspect alarms

SW DevTools → Chrome APIs / or Application. Used for lifecycle/idle patterns (offscreen idle close 60s).

## 10.9 Inspect permissions

`chrome://extensions` → Details → Site access / Permissions.  
Also `chrome://settings/content/all` for site controls.

## 10.10 Inspect memory / CPU

| Goal      | Method                                                                    |
| --------- | ------------------------------------------------------------------------- |
| SW memory | SW DevTools → Memory heap snapshot; compare idle vs after scans           |
| Page jank | AI tab Performance panel while pasting                                    |
| Budgets   | Design: idle ~50 MB / peak 256 MB (`EXT_IDLE_MEM_MB` / `EXT_PEAK_MEM_MB`) |
| CPU       | Performance monitor; Rapid paste stress                                   |

For automated latency: `pnpm bench:budgets` and detection-engine performance tests.

---

# SECTION 11 — Common failures

| Issue                                   | Cause                                                         | Diagnosis                                   | Fix                                                          |
| --------------------------------------- | ------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| Nothing intercepts on ChatGPT           | Platform not enabled / permission missing / tab not refreshed | Popup checkboxes; site access; hard refresh | Enable + Allow + reload tab                                  |
| Intercepts on wrong pages               | Unexpected registration                                       | Check `enabledPlatforms` + `urlPatterns`    | Disable extra platforms                                      |
| “Errors” on extension card              | SW exception at boot                                          | Open Errors + SW console                    | Rebuild; read stack; check migrations/safeMode               |
| Popup blank                             | JS error in Lit popup                                         | Inspect popup console                       | Rebuild; check i18n messages                                 |
| Overlay never shows but paste blocked   | Decision ALLOW path vs preventDefault bug                     | Trace paste release path                    | Check `INTERCEPT_EVENT` response                             |
| Overlay shows but Allow does nothing    | Approval nonce / re-dispatch failed                           | Console errors on redispatch                | `approval-nonce.ts`, interceptor release                     |
| Always HOLD on every file               | Expected without WASM                                         | Reason string mentions OCR/PDF              | Treat as known KI-002                                        |
| Permission prompt never appears         | Enable from wrong context / already denied                    | Site access “On click” / blocked            | Reset permissions; enable from popup                         |
| Privileged config ignored from page     | Sender auth blocking CS                                       | Attempt from CS fails by design             | Change settings only via Options/Popup                       |
| Rate limit errors                       | &gt;30 IPC/min/tab                                            | Burst paste                                 | Slow down; wait window                                       |
| Safe mode stuck                         | Migration/`safeMode` true                                     | Storage flag                                | Fix migration cause; clear extension data **wipes settings** |
| Dist load fails after pull              | Need rebuild / icons                                          | Missing files in dist                       | `generate-icons` + build                                     |
| CI passes but manual fails on live host | KI-006 environment gap                                        | Fixture ≠ live DOM                          | Manual M2–M4 on real hosts                                   |
| Aadhaar not detected                    | Not in Tier-1                                                 | KI-021                                      | Do not “fix” without ADR                                     |
| Homoglyph bypass works                  | Incomplete table                                              | KI-010                                      | Document; do not expand casually under freeze                |
| E2E SW test skipped                     | Playwright limitation                                         | KI-014                                      | Rely on package-shape + manual SW inspect                    |

---

# SECTION 12 — Performance validation

## 12.1 Bundle size

```bash
pnpm --filter @sentinel-shield/extension build
pnpm bench:budgets
```

**Budgets (shared-types constants / bench tool):**

- Packaged extension **&lt; 25 MB** (`CRX_MAX_MB`)
- Code sanity threshold enforced in bench script (see `tools/benchmarks/check-budgets.mjs`)

Manually: measure folder size of `packages/extension/dist`.

## 12.2 Detection latency

- Automated: `pnpm bench:budgets` (Tier-1 1KB / 10KB / 100KB with CI slack).
- Manual: SW DevTools → Performance; paste samples; note handler duration.
- Design targets (median-ish): ~10 ms (1KB), ~300 ms (10KB), ~800 ms (100KB) before slack.

## 12.3 Extension startup

- Reload extension with SW DevTools open; measure time to ready.
- Design cold start budget: `SW_COLD_START_MS` = 500 (aspirational under freeze; validate qualitatively).

## 12.4 Memory

- Idle after load: snapshot SW heap.
- Peak: 20 rapid pastes + overlay open; snapshot again.
- Compare to 50 MB idle / 256 MB peak design caps.

## 12.5 OCR timing

**Not measurable end-to-end** until WASM is vendored. Design constant `OCR_P99_MS_1080P` = 3000 exists for future.

## 12.6 CPU

- Chrome Task Manager (`Shift+Esc`): watch extension + tab during paste storms.
- Fail if tab permanently pegs CPU after interception stops.

---

# SECTION 13 — Security validation (40+ attack scenarios)

**Rules for testers:** Use **synthetic** secrets and **test** PANs only. Never paste production credentials into third-party AI hosts.

For each scenario, **expected outcome** assumes platform enabled + content script active.

| #   | Attack / scenario                                | Expected outcome                                                             |
| --- | ------------------------------------------------ | ---------------------------------------------------------------------------- |
| 1   | Paste production-like AWS key shape (synthetic)  | Non-ALLOW (HOLD/REDACT/BLOCK)                                                |
| 2   | Paste Stripe live-key shape synthetic            | Non-ALLOW                                                                    |
| 3   | Paste Stripe `sk_test_`                          | Informational/lower severity per design docs — still observe; must not crash |
| 4   | Paste PEM private key block synthetic            | BLOCK                                                                        |
| 5   | Paste OPENSSH private key header synthetic       | BLOCK                                                                        |
| 6   | Paste JWT with three base64url parts             | Detected as sensitive pattern class                                          |
| 7   | Paste Luhn-valid test PAN                        | Strong action                                                                |
| 8   | Paste Luhn-**invalid** 16 digits                 | Prefer no false PAN (checksum drop)                                          |
| 9   | Spaced PAN                                       | Detected (KI-020)                                                            |
| 10  | Spaced IBAN valid                                | Detected                                                                     |
| 11  | Email paste                                      | At least WARN/HOLD path typical                                              |
| 12  | Phone paste                                      | Detected per regex                                                           |
| 13  | Zero-width joiner inside AKIA                    | Still detected                                                               |
| 14  | Homoglyph “раssword” contexts                    | Best-effort (KI-010)                                                         |
| 15  | Base64(email)                                    | Inner detect                                                                 |
| 16  | Double Base64 within depth                       | Detect or depth-stop safely                                                  |
| 17  | &gt;1 MiB paste                                  | Fail-closed; no SW hang                                                      |
| 18  | 50 MiB+ file                                     | HOLD size                                                                    |
| 19  | PNG with text “secret” pixels                    | HOLD OCR unavailable — **must not ALLOW as clean text scan skip**            |
| 20  | PDF with embedded secrets                        | Same HOLD fail-closed                                                        |
| 21  | DOCX                                             | HOLD                                                                         |
| 22  | ZIP bomb small archive                           | HOLD / size handling; no crash                                               |
| 23  | Content script tries `CONFIG_SET`                | Rejected (sender auth)                                                       |
| 24  | Content script tries `PLATFORM_ENABLE`           | Rejected                                                                     |
| 25  | Page script tries to read extension storage      | Cannot (isolated world / no API)                                             |
| 26  | Page tries to invoke overlay Allow via DOM hack  | Closed shadow + nonce; must not approve without UI path                      |
| 27  | Replay paste without approval nonce              | Should not loop infinitely                                                   |
| 28  | Rapid 100 pastes/min                             | Rate limited / safe degrade                                                  |
| 29  | Disable host permission mid-session              | Interception stops                                                           |
| 30  | Enable telemetry and confirm no raw paste exfil  | Network panel: no Sentinel upload of body (local-first)                      |
| 31  | History on: confirm entries lack raw secret text | Storage inspection                                                           |
| 32  | XSS in AI page attempting to `eval` extension    | Extension isolated; page XSS ≠ extension compromise                          |
| 33  | Prototype pollution JSON message                 | Envelope validation rejects malformed                                        |
| 34  | Oversized IPC envelope (~&gt;1.2MB)              | Local HOLD before SW                                                         |
| 35  | Malformed `INTERCEPT_EVENT`                      | Error response; no crash                                                     |
| 36  | Drag file while paste interceptor active         | Consistent decisions                                                         |
| 37  | Paste into hidden non-AI field on AI origin      | Heuristic may skip — document if allows                                      |
| 38  | Service worker killed mid-scan                   | Fail closed / retry safe; no silent ALLOW without scan                       |
| 39  | Corrupt `appSettings` blob                       | safeMode or recovery path                                                    |
| 40  | Sideload old dist with new hosts                 | Re-test permissions                                                          |
| 41  | Clickjack overlay                                | Modal dialog + focus trap                                                    |
| 42  | Keyboard-only Esc on BLOCK                       | Stays blocked / Esc = Block                                                  |
| 43  | Redact path leaks original in preview            | Preview must be safe (`buildSafePreview`)                                    |
| 44  | Enterprise-backend import attempt in extension   | Build/depcruise must forbid                                                  |
| 45  | `fetch` inside detection-engine                  | Purity gate fails in CI — keep it that way                                   |
| 46  | User allows HOLD once for secret                 | Document residual risk (user override)                                       |
| 47  | Multiple frames                                  | `allFrames: false` — iframes may not protect; note residual                  |
| 48  | Grok on `x.com/i/grok` URL                       | Pattern match after enable                                                   |
| 49  | Paste after extension update mid-tab             | Refresh required                                                             |
| 50  | Concurrent tabs different hosts                  | Isolation by tab rate limits                                                 |

Record failures with: scenario #, host, screenshot, SW log, extension version, whether platform enabled.

---

# SECTION 14 — Daily development workflow

## 14.1 Start of day

```bash
git pull
pnpm install
pnpm --filter @sentinel-shield/extension build
```

Reload the unpacked extension in Chrome.

## 14.2 While coding

1. **Read the freeze + owning PART** before behaviour changes.
2. Prefer TDD in the owning package (`detection-engine` for detectors; `extension` for IPC/UI).
3. Keep detection-engine **pure**.
4. Run narrow tests while iterating:

```bash
pnpm --filter @sentinel-shield/detection-engine test
pnpm --filter @sentinel-shield/extension test
pnpm --filter @sentinel-shield/extension build
```

5. Reload extension + hard-refresh AI tab after each SW/CS change.

## 14.3 Before you push

```bash
pnpm run ci
```

Fix failures locally. Do not disable gates.

## 14.4 Branch hygiene

- Small PRs mapped to one PART / one concern.
- No secrets in commits.
- No `dist/` / `node_modules` commits (gitignored).
- Do not expand scope past Architecture Freeze without an ADR.

## 14.5 What not to do daily

- Do not vendor random WASM “to make OCR pass” without integrity pins + security review.
- Do not enable telemetry by default in code.
- Do not add new AI hosts without registry + permission + WAR review.
- Do not force-push `master`.

---

# SECTION 15 — Pre-release checklist (internal beta)

Complete **before** calling a build “internal beta ready”. Aligns with `store/BETA_CHECKLIST.md`.

### Automated

- [ ] `pnpm run ci` green on release commit
- [ ] `pnpm --filter @sentinel-shield/extension verify:bundle` green
- [ ] `pnpm bench:budgets` green
- [ ] Unit/phase tests green (`pnpm test`)
- [ ] Optional: `pnpm test:e2e` (note KI-014 skips)

### Package

- [ ] Load unpacked from **`packages/extension/dist`** on clean Chrome profile
- [ ] Version shows **0.2.1** (or intended tag)
- [ ] Icons present; name/description localized
- [ ] No Errors on `chrome://extensions`

### Functional manual (minimum)

- [ ] M1 Load unpacked
- [ ] M2 ChatGPT: paste email + test PAN → overlay/policy
- [ ] M3 Claude + Gemini same
- [ ] M4 Upload + drag-drop on one host (binary → HOLD)
- [ ] M5 Escape → block; Redact applies; focus usable
- [ ] M6 Options persist; telemetry **off** by default
- [ ] Platform disable removes protection; re-enable works

### Security / privacy

- [ ] No `.env` / keys in release tag tree
- [ ] History (if on) stores metadata only
- [ ] Section 13 sample (≥10 scenarios) executed on at least one host

### Known issues acknowledged

- [ ] KI-002 OCR fail-closed communicated to beta users
- [ ] KI-006 live host sign-off owner assigned
- [ ] KI-021 Aadhaar/PAN-IN gap documented for testers
- [ ] Public CWS blockers (privacy counsel URL, etc.) **not** claimed fixed

### Sign-off

- [ ] Engineer name / date / commit SHA: `__________________`
- [ ] Build path hashed or ZIP attested per `store/CWS_PACKAGE_ATTESTATION.md` if distributing packaged build

---

# SECTION 16 — If you discover a bug

## 16.1 Locate

1. Capture: Chrome version, extension version, platform enabled, host URL, exact payload class (redact real secrets), screenshots, SW + page console.
2. Classify layer:

| Symptom domain        | Look first                                                       |
| --------------------- | ---------------------------------------------------------------- |
| Did not inject        | `registration.ts`, permissions, popup enable                     |
| Did not intercept DOM | `paste.ts` / `file-upload.ts` / `drag-drop.ts` / `context.ts`    |
| IPC error             | `router.ts`, `sender-auth.ts`, envelope types                    |
| Wrong decision        | `tier1.ts`, detectors, `score.ts`, `decide.ts`, `scan-bridge.ts` |
| Overlay UX            | `overlay.ts`, i18n messages                                      |
| Storage / flags       | `migrations.ts`, options handlers, crypto storage                |
| Binary hold “wrong”   | Confirm KI-002 before filing as regression                       |

## 16.2 Debug

1. Reproduce with **minimal synthetic** payload.
2. Write or extend a **unit test** in the owning package (preferred over UI-only repro).
3. Use SW breakpoints on `INTERCEPT_EVENT` handler.
4. Compare `PolicyAction` vs `InterceptDecision` in `scan-bridge.ts`.

## 16.3 Identify responsible module

Use `docs/MODULE_BOUNDARIES.md` + ownership matrix in blueprint. Example: regex false negative → `detection-engine` / PART_13, not popup.

## 16.4 Fix (when you are allowed to code)

1. Confirm change does **not** violate Architecture Freeze.
2. Implement smallest fix in owning package.
3. Add regression test.
4. Run:

```bash
pnpm --filter <owning-package> test
pnpm run ci
pnpm --filter @sentinel-shield/extension build
```

5. Manual retest the failing matrix row + nearby rows (paste/upload/drop).

## 16.5 Retest & regression

- Re-run Section 8 features touched.
- Re-run Section 9 subset for same input channel.
- If detection changed: run adversarial tests in `adversarial.test.ts` / `isvv.stress.test.ts`.
- If IPC/auth changed: re-run privileged-message negative tests (`phase3.security.test.ts`).

## 16.6 Architecture compliance

Before merge:

- [ ] No new Chrome imports in `detection-engine`
- [ ] No `enterprise-backend` import from extension
- [ ] `pnpm purity` + `pnpm depcruise` clean
- [ ] Permissions / host list changes reviewed against PART_15
- [ ] Update `KNOWN_ISSUES.md` if behaviour is accepted residual
- [ ] Do not expand Tier-1 entity set (e.g. Aadhaar) without ADR

---

# Appendix A — Supported platforms (quick reference)

| ID               | Name              | URL patterns                                 |
| ---------------- | ----------------- | -------------------------------------------- |
| `openai-chat`    | ChatGPT           | `*://chat.openai.com/*`, `*://chatgpt.com/*` |
| `gemini`         | Gemini            | `*://gemini.google.com/*`                    |
| `claude`         | Claude            | `*://claude.ai/*`                            |
| `deepseek`       | DeepSeek          | `*://chat.deepseek.com/*`                    |
| `perplexity`     | Perplexity        | `*://perplexity.ai/*`                        |
| `grok`           | Grok              | `*://grok.com/*`, `*://x.com/i/grok*`        |
| `copilot`        | Microsoft Copilot | `*://copilot.microsoft.com/*`                |
| `github-copilot` | GitHub Copilot    | `*://github.com/copilot*`                    |
| `cursor`         | Cursor            | `*://cursor.sh/*`                            |

Source: `packages/shared-types/src/platforms/index.ts`.

---

# Appendix B — Critical file map

| Concern        | Path                                                    |
| -------------- | ------------------------------------------------------- |
| Manifest       | `packages/extension/manifest.json`                      |
| SW boot        | `packages/extension/src/background.ts`                  |
| CS boot        | `packages/extension/src/content.ts`                     |
| Registration   | `packages/extension/src/lifecycle/registration.ts`      |
| Paste          | `packages/extension/src/input-pipelines/paste.ts`       |
| Upload         | `packages/extension/src/input-pipelines/file-upload.ts` |
| Drop           | `packages/extension/src/input-pipelines/drag-drop.ts`   |
| Overlay        | `packages/extension/src/ui/overlay.ts`                  |
| Router         | `packages/extension/src/messaging/router.ts`            |
| Auth           | `packages/extension/src/messaging/sender-auth.ts`       |
| Handlers       | `packages/extension/src/messaging/handlers.ts`          |
| Scan mapping   | `packages/extension/src/messaging/scan-bridge.ts`       |
| Engine entry   | `packages/detection-engine/src/tier1.ts`                |
| Regex          | `packages/detection-engine/src/detectors/regex.ts`      |
| Policy         | `packages/detection-engine/src/policy/decide.ts`        |
| Constants      | `packages/shared-types/src/constants/index.ts`          |
| Beta checklist | `store/BETA_CHECKLIST.md`                               |
| Known issues   | `KNOWN_ISSUES.md`                                       |

---

# Appendix C — One-page cheat sheet

```bash
git clone https://github.com/shriansh1625/sentinal_ai.git
cd sentinal_ai
corepack enable
pnpm install
node tools/generate-icons.cjs
pnpm --filter @sentinel-shield/extension build
# Chrome → Extensions → Developer mode → Load unpacked → packages/extension/dist
# Popup → enable ChatGPT → Allow → open chatgpt.com → hard refresh → paste test data
pnpm run ci   # before you claim “green”
```

**Remember:** No platforms enabled ⇒ no interception. Binaries ⇒ HOLD (KI-002). Public CWS ≠ internal beta.

---

_End of ENGINEERING_RUNBOOK.md — official human onboarding guide for Sentinel Shield AI local development, manual QA, debugging, and verification._
