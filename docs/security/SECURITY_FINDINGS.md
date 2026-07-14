# SECURITY_FINDINGS.md

**Document ID:** SS-AUDIT-SEC-001  
**Date:** 2026-07-12  
**Standards lens:** PART_06 / PART_14 / PART_15 / PART_19 · MV3 · Zero Trust

---

## Findings

### SEC-001 — Extension package not sandbox-loadable (import resolution)

- **ID:** SEC-001 / F-001
- **Severity:** Critical
- **Category:** Extension runtime integrity
- **Affected Files:** `packages/extension/dist/background.js`, `content.js`, build pipeline
- **Evidence:** Emitted JS imports `@sentinel-shield/*` unresolved by Chrome
- **Root Cause:** No bundler / import map for MV3
- **Impact:** Failure to activate protection; users may disable extension or force unsafe workarounds
- **Likelihood:** Certain
- **Recommendation:** Bundle to single-file (or chrome-relative) modules with integrity
- **Effort:** L
- **Priority:** P0

### SEC-002 — Plaintext persistence of settings / platform enablement

- **ID:** SEC-002 / F-005
- **Severity:** High
- **Category:** Storage / Confidentiality
- **Affected Files:** `ChromeLocalStorage`, `SETTINGS_KEY`, `ENABLED_PLATFORMS_KEY`
- **Evidence:** No AES-GCM/Argon2 implementation; PART_19 constants unused
- **Root Cause:** Crypto deferred
- **Impact:** Local malware/other extensions with storage access (where applicable) or forensic disk access can read config; Freeze crypto unmet
- **Likelihood:** Medium–High on shared devices
- **Recommendation:** Implement PART_19 or document temporary plaintext with user warning + freeze amendment
- **Effort:** L
- **Priority:** P0

### SEC-003 — Vulnerable Vitest / Vite toolchain

- **ID:** SEC-003 / F-007
- **Severity:** High (Critical advisory on Vitest)
- **Category:** Supply chain
- **Affected Files:** root `package.json`, lockfile, all packages using vitest 2.1.9
- **Evidence:** `pnpm audit` — GHSA-5xrq-8626-4rwp (Vitest <3.2.6 critical); Vite fs.deny bypass high
- **Root Cause:** Pinned older Vitest 2.x
- **Impact:** Dev/CI compromise if Vitest UI/server paths used; supply-chain exposure
- **Likelihood:** Medium (dev), Low (prod extension if not shipped)
- **Recommendation:** Upgrade Vitest≥3.2.6 / Vite≥6.4.3; re-run audit in CI as gate
- **Effort:** M
- **Priority:** P1

### SEC-004 — Git root at user home

- **ID:** SEC-004 / F-002
- **Severity:** Critical
- **Category:** Secrets / Integrity
- **Affected Files:** Environment VCS
- **Evidence:** `git rev-parse --show-toplevel` = `C:/Users/shria`
- **Root Cause:** Accidental nesting under home git
- **Impact:** Risk of committing unrelated private files; hooks/CI ambiguity
- **Likelihood:** High operational risk
- **Recommendation:** Dedicated repo root immediately
- **Effort:** S
- **Priority:** P0

### SEC-005 — Content script isolation OK, but approval nonce forgeability model incomplete

- **ID:** SEC-005
- **Severity:** Medium
- **Category:** Interception integrity
- **Affected Files:** `content/approval-nonce.ts`
- **Evidence:** Nonce on Event object in isolated world — page cannot forge isolated-world properties; good. Re-dispatch still best-effort.
- **Root Cause:** Platform limitation acknowledged
- **Impact:** Controlled editors may bypass UX; not a cross-world forge
- **Likelihood:** Medium (platform quirks)
- **Recommendation:** Keep; document residual PART_17/20 risks
- **Effort:** S (docs)
- **Priority:** P2

### SEC-006 — Message validation present; SCAN payload trust

- **ID:** SEC-006
- **Severity:** Medium
- **Category:** Messaging
- **Affected Files:** `messaging/router.ts`, `handlers.ts`
- **Evidence:** Envelope schema checked; text from CS scanned; no size cap on IPC payload beyond rate limit
- **Root Cause:** Rate limit ≠ byte budget on IPC
- **Impact:** Malicious/compromised CS could send huge text → memory pressure
- **Likelihood:** Low–Medium
- **Recommendation:** Enforce `SCAN_MAX_BYTES` / `MAX_FILE_BYTES` at router for INTERCEPT_EVENT
- **Effort:** S
- **Priority:** P1

### SEC-007 — CSP includes wasm-unsafe-eval without wasm assets

- **ID:** SEC-007
- **Severity:** Low
- **Category:** Least privilege
- **Affected Files:** `manifest.json` CSP
- **Evidence:** `wasm-unsafe-eval` present; no wasm shipped
- **Root Cause:** Forward-looking CSP
- **Impact:** Slightly broader CSP than needed today
- **Likelihood:** N/A
- **Recommendation:** Add wasm when assets land; keep justification
- **Effort:** S
- **Priority:** P3

### SEC-008 — Permissions set mostly Freeze-aligned

- **ID:** SEC-008
- **Severity:** Info / Positive
- **Category:** MV3 permissions
- **Affected Files:** `manifest.json`
- **Evidence:** `storage, activeTab, scripting, offscreen, alarms` + optional AI hosts only; no `tabs`/`history`/`externally_connectable`
- **Root Cause:** N/A
- **Impact:** Positive least-privilege posture
- **Likelihood:** N/A
- **Recommendation:** Preserve; request hosts only when enabling platforms
- **Effort:** —
- **Priority:** —

### SEC-009 — Fail-closed text path partially sound

- **ID:** SEC-009
- **Severity:** Info / Positive
- **Category:** Abuse resistance
- **Evidence:** Clean ALLOW; risky WARN→HOLD / BLOCK mapping; files HOLD without OCR
- **Recommendation:** Ensure HOLD surfaces user-visible UX (currently missing — SEC-010)

### SEC-010 — No user-visible block/hold UI

- **ID:** SEC-010 / F-003
- **Severity:** High
- **Category:** Safety UX / PART_29
- **Affected Files:** manifest action (no popup), no overlay
- **Evidence:** Intercept HOLD/BLOCK with no overlay module
- **Impact:** User cannot understand hold; may force-disable extension → unprotected paste
- **Likelihood:** High
- **Recommendation:** Shadow DOM overlay (PART_10/29) + popup
- **Effort:** L
- **Priority:** P0

---

## STRIDE Snapshot (abbreviated)

| Threat            | Status                                                 |
| ----------------- | ------------------------------------------------------ |
| Spoofing IPC      | Envelope validation helps; no auth beyond extension ID |
| Tampering storage | Plaintext — weak                                       |
| Repudiation       | Minimal logs (good privacy)                            |
| Info disclosure   | Logs allowlisted — good; storage weak                  |
| DoS               | Rate limits present; IPC byte DoS gap                  |
| Elevation         | Isolated world CS — good                               |

---

## Security Verdict

**Not production-safe** until SEC-001, SEC-002, SEC-004, SEC-010 addressed and SEC-003 patched.
