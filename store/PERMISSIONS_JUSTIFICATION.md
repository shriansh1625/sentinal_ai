# PERMISSIONS_JUSTIFICATION.md — Manifest permission justifications

**Refs:** handbook Commandment 7, PART_10, ADR-035  
**Package:** `@sentinel-shield/extension` `0.2.1`

Every permission below must remain justified. New permissions require an ADR + security review.

## Required permissions

| Permission  | Why required                                                                                                                               | User-visible effect                              | Alternatives rejected                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------- |
| `storage`   | Persist settings, platform enablement, encrypted history flags (PART_19). Uses `chrome.storage.local` / `session` only — **not** `sync`.   | Settings and opt-in history survive restarts     | In-memory only would lose config on SW death      |
| `activeTab` | Temporary access to the active tab when the user invokes the extension (toolbar), supporting onboarding / diagnostics without broad `tabs` | No standing URL access to all tabs               | `tabs` rejected (privacy risk — all tab URLs)     |
| `scripting` | Dynamically inject content scripts **only** on AI hosts the user enabled (PART_10 dynamic CS; no static `content_scripts`)                 | Protection runs on granted AI sites              | Static CS on all optional hosts would over-inject |
| `offscreen` | Host WASM / heavy crypto workers off the service worker (PART_16 / ADR-032)                                                                | Enables on-device OCR/crypto without remote code | In-SW WASM alone is fragile under SW lifetime     |
| `alarms`    | Lifecycle maintenance (idle cleanup, retention purge timers) per PART_11                                                                   | Background maintenance without keep-alive hacks  | Busy-wait / persistent SW rejected                |

## Optional host permissions

All entries are **AI chat hosts only** (`AI_HOST_PERMISSIONS` / ADR-035). Granted via `chrome.permissions.request` on user gesture when enabling a platform in the popup.

| Origin pattern                               | Purpose             |
| -------------------------------------------- | ------------------- |
| `*://chat.openai.com/*`, `*://chatgpt.com/*` | OpenAI ChatGPT      |
| `*://gemini.google.com/*`                    | Google Gemini       |
| `*://claude.ai/*`                            | Anthropic Claude    |
| `*://chat.deepseek.com/*`                    | DeepSeek            |
| `*://perplexity.ai/*`                        | Perplexity          |
| `*://grok.com/*`, `*://x.com/i/grok*`        | Grok                |
| `*://copilot.microsoft.com/*`                | Microsoft Copilot   |
| `*://github.com/copilot*`                    | GitHub Copilot Chat |
| `*://cursor.sh/*`                            | Cursor              |

**Not requested:** mail, Drive, Docs, Slack, Teams, wildcards beyond the frozen AI list.

## Explicitly absent (privacy)

| Not present                  | Reason                            |
| ---------------------------- | --------------------------------- |
| `tabs`                       | Would expose all tab URLs         |
| `history`                    | Not needed; privacy liability     |
| `webRequest` / DNR block-all | Out of scope for v1 assistant     |
| `externally_connectable`     | No external web apps              |
| `update_url`                 | Updates only via Chrome Web Store |

## Single-purpose statement (CWS)

Sentinel Shield AI helps users avoid accidentally pasting or uploading sensitive content to supported AI chat sites by scanning on-device and warning before send.
