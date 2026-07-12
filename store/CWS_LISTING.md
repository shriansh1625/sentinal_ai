# CWS_LISTING.md — Chrome Web Store listing copy (v1 honesty)

**Gate:** Architecture Freeze G4 / Ownership Matrix §4  
**Status:** Ready for human paste into CWS console (not auto-published)  
**Version aligned:** extension `0.2.1`

## Short description (manifest / CWS ≤132 chars)

Local privacy assistant for supported AI sites. Intercepts paste/upload/drag-drop; warn, allow, block, or redact.

## Detailed description (store listing)

Sentinel Shield AI is a **local privacy assistant** for supported AI chat sites on Chromium (Chrome ≥120, Manifest V3).

**What it does (guaranteed for supported endpoints):**

- Intercepts common **paste**, **file chooser**, and **drag-and-drop** paths on AI sites you enable
- Analyzes content **on-device** for sensitive patterns (structured PII/secrets heuristics)
- Warns you and lets you **allow**, **block**, or **redact** before content is sent

**Best effort:**

- Restoring redacted text into some rich editors may require a manual paste of the redacted result

**Platform limitations (honest):**

- Does **not** intercept `navigator.clipboard.readText()` reads performed by the page
- Does **not** monitor browsing history or act as endpoint antivirus / network DLP
- Does **not** claim total leak prevention or universal AI exfiltration blocking

**Privacy:**

- Detection runs locally. Telemetry and history are **off by default**
- Optional host access is requested **per AI platform** when you enable it
- Image OCR requires on-device WASM assets; if assets are missing, image OCR fails closed (warn/hold) rather than silently scanning

**Unsupported in v1:** Firefox; mail/Drive hosts; cloud detection; perfect-accuracy guarantees.

## Category

Productivity / Privacy & Security (as applicable in CWS UI)

## Language

English (`en`) — `default_locale`

## Forbidden phrases (must never appear in listing)

- blocks all leaks
- prevents all AI exfiltration
- full clipboard firewall
- undetectable
- 100% accuracy

## Screenshots / promo assets

**Residual (Phase 9):** promotional screenshots not produced in this phase. Do not submit without human-reviewed screenshots.
