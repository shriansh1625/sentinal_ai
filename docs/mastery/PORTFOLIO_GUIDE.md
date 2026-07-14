# PORTFOLIO_GUIDE.md

**Principle:** Evidence-based positioning. Never oversell. Never understate engineering depth.

---

## One-sentence positioning (use everywhere)

> Local-first Chromium MV3 extension that intercepts paste/upload/drag-drop on enabled AI hosts and runs on-device Tier-1 secret/PII detection with explicit fail-closed behavior and documented residuals — engineering RC, not public-store production.

---

## GitHub

### README hero (recommended tone)

- What it does (3 bullets max)
- Dual status: **Eng RC GO** / **Public CWS NO-GO**
- Link Freeze, Limitations, Whitepaper, Certification JSON
- Setup: load unpacked from `packages/extension/dist`

### Pin these files

| File                               | Why                           |
| ---------------------------------- | ----------------------------- |
| `WHITEPAPER_SENTINEL_SHIELD_AI.md` | Technical narrative           |
| `ARCHITECTURE_DEFENSE_GUIDE.md`    | Decision quality              |
| `UPDATED_LIMITATIONS.md`           | Honesty                       |
| `BYPASS_DATABASE.md`               | Red-team maturity             |
| `store/CERTIFICATION_STATUS.json`  | Dual verdict machine-readable |
| `PROJECT_KNOWLEDGE_GRAPH.md`       | System understanding          |

### Do not pin / do not headline

- Detector count as a vanity badge
- Synthetic precision as “accuracy”
- `enterprise-backend` as a feature

### Topics / tags

`browser-extension` `manifest-v3` `privacy` `security-engineering` `dlp` `local-first` — avoid `ocr`, `enterprise-ready`, `production` unless qualified.

---

## LinkedIn

### Featured section blurb

Built Sentinel Shield AI — an on-device MV3 privacy firewall for AI web apps. Focus: threat modeling, fail-closed design, Tier-1 detection science, red-team residuals, and interview-defensible architecture documentation. Public store release intentionally blocked pending live-host validation and counsel privacy review.

### What to avoid

- “Shipped to Chrome Web Store”
- “Stops all AI data leaks”
- “Uses advanced OCR/ML” (capability absent)

---

## Resume bullets (pick 3–5)

Use **action + constraint + evidence**:

1. Designed and implemented a local-first MV3 interception pipeline (paste/upload/drag-drop) with IPC authentication, dual rate limits (30 IPC / 20 scans per tab/min), and fail-closed oversize handling.
2. Built a pure Tier-1 detection engine (regex, Luhn/IBAN, entropy, bounded decode/rescan) testable in Node; improved synthetic FPR from ~0.091 to ~0.005 in a fixed-seed harness after adversarial remediations (report-cited).
3. Led red-team probe program documenting fixed bypass classes and accepted ROT13 residual (37/39 pass).
4. Authored architecture freeze alignment, ADR-backed trade-off docs, and dual certification (eng RC vs public NO-GO).
5. Explicitly scoped non-goals (typing intercept, enterprise backend, OCR capability) to preserve claim integrity.

### Resume anti-patterns

| Bad                                   | Why               |
| ------------------------------------- | ----------------- |
| “Built enterprise DLP”                | False             |
| “115+ detectors” as lead metric       | Vanity            |
| “99.4% precision” without “synthetic” | Misleading        |
| “OCR pipeline” as working feature     | Capability absent |

---

## HR screen (5 minutes)

**Say:**  
Privacy-focused browser extension for AI paste risk. On-device detection. Strong on architecture and security judgment. Not claiming store production yet.

**If asked “is it live for users?”**  
Load-unpacked beta posture; public CWS not authorized.

---

## Technical interview

| Do                                  | Don’t                   |
| ----------------------------------- | ----------------------- |
| Whiteboard CS→SW→engine             | Feature laundry list    |
| Name residuals first when asked OCR | Pivot to detector count |
| Cite files/reports                  | Invent numbers          |
| Dual verdict                        | “Basically production”  |

Primary drills: `TECHNICAL_INTERVIEW_BIBLE.md`, `INTERVIEW_DEFENSE_PLAYBOOK.md`.

---

## System design interview

Frame as: **“Design a browser-side control to reduce secret paste into AI web apps.”**

Cover: trust boundaries, MV3 constraints, local-first, rate limits, fail-closed, evaluation plan, residuals.  
Use Sentinel as a **case study**, not as proof you would copy every choice blindly.

---

## Security interview

Lead with threat model (ROOT1/ROOT2), IPC auth, overlay anti-spoof, crypto defaults, red-team database.  
Volunteer ROT13 and clipboard API residuals before being trapped.

---

## Evidence pack (bring links)

1. `store/CERTIFICATION_STATUS.json`
2. `POST_REMEDIATION_EVALUATION.md`
3. `BYPASS_DATABASE.md`
4. `UPDATED_LIMITATIONS.md`
5. `WHITEPAPER_SENTINEL_SHIELD_AI.md`

---

## Final portfolio test

If you delete the product name from your README, does the first screen still read as **security engineering with constraints**—or as a fake SaaS landing page? Prefer the former.
