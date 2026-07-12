# BETA_CHECKLIST.md — Phase 9 beta release validation

**Package:** `packages/extension/dist` @ `0.2.1`  
**Refs:** Freeze G3, PART_25 test channel, KI-006/014/017/018

## Automated (CI / agent)

| #   | Check                                             | Evidence                               |
| --- | ------------------------------------------------- | -------------------------------------- |
| B1  | MV3 package shape + i18n locales                  | `verify:bundle`, e2e package-shape     |
| B2  | axe serious/critical = 0 on overlay/popup/options | `phase9.beta.test.ts`                  |
| B3  | Engineering screenshots for popup/options         | `store/assets/*.png` (e2e)             |
| B4  | Local compose fixture (paste path smoke)          | `tests/e2e/beta-local-fixture.spec.ts` |
| B5  | `--load-extension` SW observe                     | Attempted; may skip (KI-014)           |

## Manual (human beta / CWS Test channel)

| #   | Check                                                         | Status               |
| --- | ------------------------------------------------------------- | -------------------- |
| M1  | Chrome → Load unpacked → `packages/extension/dist`            | Required             |
| M2  | Enable ChatGPT host; paste email/CC; overlay appears          | Required (G3)        |
| M3  | Repeat on Claude + Gemini                                     | Required (G3)        |
| M4  | Upload + drag-drop paths on one host                          | Required             |
| M5  | Escape → block; Redact applies; focus restore                 | Required             |
| M6  | Options toggles persist; telemetry default off                | Required             |
| M7  | CWS Test channel 24h (optional if Load unpacked signed off)   | Optional pre-public  |
| M8  | Counsel privacy URL live (KI-018)                             | **Blocks public**    |
| M9  | Human-reviewed promo screenshots replace engineering fixtures | Before public submit |

## Explicit non-claims for beta

- Live ChatGPT/Claude/Gemini CDP in this agent environment is **not** treated as PASS when skipped.
- OCR image scanning is fail-closed without WASM (KI-002).
