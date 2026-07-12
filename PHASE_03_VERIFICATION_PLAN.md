# PHASE_03_VERIFICATION_PLAN — Security Validation

**Refs:** PART_06, PART_14, PART_19, PART_20, ADR-036, ADR-035  
**Goal:** Disprove security claims of Engineering RC.

## Objectives

1. IPC envelope validation fail-closed
2. Privileged message sender authorization (PART_14 MessageSender)
3. Rate limiting / safe-mode
4. PART_19 crypto integrity (AAD mismatch, ciphertext opacity)
5. Approval nonce non-forgeability
6. Threat-sim harness expansion (secrets / SSN / clean)
7. WASM integrity refuse empty pin
8. History never stores raw content
9. Dependency audit high+

## Risk areas

- Content script spoofing CONFIG_SET / PLATFORM_DISABLE
- Prototype pollution via IPC payload
- Silent fail-open on malformed intercept

## Success

No critical unmitigated findings; gates green; privileged IPC locked.
