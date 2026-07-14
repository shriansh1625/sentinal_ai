# SECURITY_FINDINGS_v2.md

## Resolved

- SEC-001 loadable package
- SEC-002 AES-GCM at-rest for settings path
- SEC-003/DEP vitest+vite patched; audit clean
- SEC-004 project git root
- SEC-010 popup/options exist (overlay still future)

## Remaining

- Passphrase tier / Argon2 WASM not active (raw-session tier OK for F-005)
- IPC byte budget still rate-limit only
- No full IndexedDB history encryption (history default off)
