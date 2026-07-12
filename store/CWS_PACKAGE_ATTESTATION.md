# CWS_PACKAGE_ATTESTATION.md — Pre-submission package attestation

**Package root to load:** `packages/extension/dist`  
**Version:** `0.2.1`  
**Attestation date:** 2026-07-12 (Phase 8)

## Automated attestations (CI)

| Check                                          | Evidence                                 |
| ---------------------------------------------- | ---------------------------------------- |
| MV3 + Chrome ≥120                              | `manifest.json`                          |
| Bundled SW/CS (no bare workspace imports)      | `verify:bundle`                          |
| Popup + options present                        | `verify:bundle`                          |
| Optional hosts = `AI_HOST_PERMISSIONS`         | `phase6.browser.test.ts` / Phase 8 suite |
| CSP has `wasm-unsafe-eval`, no `unsafe-eval`   | Phase 6/8 tests                          |
| Dist size ≪ 25MB                               | `bench:budgets`                          |
| `default_locale` + `_locales/en`               | build copies locales                     |
| Manifest name/description via `__MSG_*`        | Phase 8 tests                            |
| Engine purity (no network in detection-engine) | `pnpm purity`                            |

## Manual attestations (human before upload)

| Check                                              | Status                                                    |
| -------------------------------------------------- | --------------------------------------------------------- |
| Privacy policy URL live + counsel-approved         | **PENDING** (KI-018)                                      |
| CWS screenshots uploaded                           | **PENDING** (KI-017)                                      |
| OCR/PDF WASM vendored if OCR advertised as working | **NOT vendored** — listing discloses fail-closed (KI-002) |
| FIDO2 on publisher account                         | **Human ops** (PART_25)                                   |
| Two-person publish rehearsal                       | **Human ops**                                             |
| Test-channel smoke 24h                             | **Phase 9**                                               |

## Claim honesty (G4)

Listing source of truth: `store/CWS_LISTING.md` — must match Ownership Matrix §4; forbidden phrases gated in `phase8.cws.test.ts`.

## Publish decision

Phase 8 certifies **readiness materials + package gates**. It does **not** authorize public CWS publish (Architecture Freeze).
