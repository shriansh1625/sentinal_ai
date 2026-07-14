# LIVE_DEMO_SCRIPT.md

**Product:** Sentinel Shield AI `0.2.1`  
**Rule:** Demo honesty > spectacle. A correct HOLD on an image is a **success**.

---

## Shared preparation (all lengths)

### Environment

1. `pnpm install`
2. `pnpm --filter @sentinel-shield/extension build`
3. Chrome → Extensions → Load unpacked → `packages/extension/dist`
4. Open popup → enable **one** AI host (or local fixture page if used) → grant permission
5. Confirm content script injected (popup/platform status)

### Props

| Prop                                    | Purpose                                     |
| --------------------------------------- | ------------------------------------------- |
| Clean prose sentence                    | Expect ALLOW                                |
| `AKIAIOSFODNN7EXAMPLE` (or spaced form) | Expect non-ALLOW                            |
| `4111 1111 1111 1111`                   | Expect non-ALLOW (Luhn)                     |
| Small `.png` / binary                   | Expect HOLD OCR unavailable                 |
| ROT13(AWS key) card                     | Show accepted residual (optional, advanced) |

### Metrics you may cite (only with labels)

- Eng RC GO / Public NO-GO (`CERTIFICATION_STATUS.json`)
- Red-team 37/39; ROT13 residual
- Synthetic eval Phase C — **say “synthetic”**
- Dist ≪ 25 MB; `bench:budgets` PASS

### Metrics you must not cite as production truth

- “100% precision” / “enterprise grade” / “OCR detects PII in images”

### Failure recovery (always ready)

| Failure                          | Recovery                                        |
| -------------------------------- | ----------------------------------------------- |
| Extension inactive               | Reload extension; re-enable platform            |
| No intercept                     | Wrong host; permission missing; CS not injected |
| Always HOLD on text              | Check MIME/sniff; ensure text paste not file    |
| Audience asks live ChatGPT proof | State KI-006; show fixture + docs               |
| Crash / SW sleep                 | Reload tab; explain ephemeral SW + HOLD policy  |

---

## 5-minute demo

### Goal

Prove local intercept + Tier-1 + honest OCR limitation.

### Script

| Time      | Action                                   | Say                                                                    |
| --------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| 0:00–0:40 | Show extension loaded + one host enabled | “MV3, optional AI-host permission, local-first.”                       |
| 0:40–1:40 | Paste clean prose                        | “ALLOW — we optimize precision, not fear.”                             |
| 1:40–3:00 | Paste AWS-looking key / card             | “Non-ALLOW → hold/block/redact via Tier-1.”                            |
| 3:00–4:10 | Upload/drop PNG                          | “HOLD — OCR flag armed, WASM absent, fail-closed. Not a silent allow.” |
| 4:10–5:00 | Dual verdict                             | “Engineering RC yes. Public CWS no — G3/KI-006/KI-018.”                |

### Expected outputs

- Clean → proceeds
- Secret → overlay decision UI
- PNG → HOLD reason mentions OCR/PDF unavailable

### Common questions (5 min)

- “Does OCR work?” → **No.**
- “Is this on the store?” → **Not authorized.**

---

## 15-minute demo

### Goal

Add architecture + adversarial + evaluation honesty.

### Outline

| Block          | Minutes | Content                                           |
| -------------- | ------- | ------------------------------------------------- |
| Setup & thesis | 2       | Local-first paste firewall; not network DLP       |
| Happy path     | 2       | Clean + secret paste                              |
| Architecture   | 3       | CS → SW → pure detection-engine; trust boundaries |
| Adversarial    | 3       | Spaced key (detect); mention ROT13 residual       |
| OCR honesty    | 2       | Binary HOLD                                       |
| Eval/red-team  | 2       | Synthetic metrics + 37/39; no marketing           |
| Close          | 1       | Dual verdict + limitations                        |

### Talking points

- Coordinator–Processor, not agents (`ADR-005`)
- Rate limits 30 IPC / 20 scans
- Closed Shadow DOM overlay
- History/telemetry default off

### Trade-offs to volunteer

- ROT13 accepted
- No typing intercept
- Live host sign-off open

---

## 30-minute demo

### Goal

Survive skeptical staff/principal audience.

### Outline

| Block                  | Minutes | Content                                             |
| ---------------------- | ------- | --------------------------------------------------- |
| Problem & threat model | 4       | ROOT1/ROOT2; TB-1…4                                 |
| Live intercept         | 5       | Clean, secret, spaced, card                         |
| Code tour (shallow)    | 5       | `paste.ts` → `router.ts` → `tier1.ts` → `decide.ts` |
| Security controls      | 4       | Auth, rate limits, nonce, encryption defaults       |
| OCR/WASM story         | 3       | Flag vs capability; enablement checklist            |
| Evaluation science     | 4       | Seed, slices, holdout, Phase B→C deltas             |
| Red team               | 3       | Fixed vs accepted; open BYPASS_DATABASE             |
| Q&A hostile            | 2       | Dual verdict; non-claims                            |

### Architecture explanations (keep crisp)

1. Why MV3 over TLS MITM
2. Why pure detection package
3. Why fail-closed on unscanned
4. Why AI-hosts-only permissions

### Audience questions bank

| Question                   | Answer spine                          |
| -------------------------- | ------------------------------------- |
| Better than Palo Alto DLP? | Different layer; no superiority claim |
| Production FPR?            | Unknown; synthetic only               |
| Firefox?                   | Out of freeze                         |
| Enterprise?                | Package placeholder                   |
| Why ocrEnabled true?       | Ownership freeze; capability HOLD     |

### Recovery plan if demo fails mid-flight

1. Switch to **recorded fixture** / unit test screen
2. Open `BYPASS_DATABASE.md` and walk a fixed case
3. Open `CERTIFICATION_STATUS.json` and narrate dual verdict
4. Never fake a detection

---

## Demo success criteria

| Length | Pass if                                                       |
| ------ | ------------------------------------------------------------- |
| 5 min  | Secret caught; OCR HOLD honest; dual verdict stated           |
| 15 min | Plus architecture + one residual + eval caveat                |
| 30 min | Plus code pointers + red-team + hostile Q&A without overclaim |
