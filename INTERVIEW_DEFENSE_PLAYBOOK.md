# INTERVIEW_DEFENSE_PLAYBOOK.md

**Mode:** Hostile interviewer. No encouragement. Interrupt weak answers.
**How to use:** Cover Ideal Response. Speak. Then read Interrupts. Retry until clean.
**Sessions:** 124

## Rules of engagement

- If you claim OCR works → session fail.
- If you claim CWS-ready → session fail.
- If you invent metrics → session fail.
- If you cannot name a residual → session fail.

---

## S001 · Architecture

**Interviewer:** Why should I trust an extension with paste content?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Local-only Tier-1; no detection-engine network; history off; explain TB-3 vs TB-4.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S002 · Architecture

**Interviewer:** Draw the system. I will interrupt.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** CS → SW → detection-engine; offscreen stub; no CS→offscreen.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S003 · Architecture

**Interviewer:** Blueprint says OCR workers. Where are they?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Flag armed; worker-pool fail-closed; KI-002; do not claim OCR.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S004 · Architecture

**Interviewer:** Coordinator vs agents — prove you understand ADR-005.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Determinism, rate limits, single observation; reject ADR-S1.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S005 · Architecture

**Interviewer:** What does Freeze authorize today?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Implement frozen arch; NOT CWS publish; NOT NER/CV on; NOT all_urls.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S006 · MV3

**Interviewer:** Service worker died. Did you leak?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** ADR-036 HOLD; no silent release; cite input-pipelines.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S007 · MV3

**Interviewer:** Why sync onMessage registration?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Avoid Receiving end does not exist; background.ts pattern.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S008 · MV3

**Interviewer:** Optional permissions theater — defend ADR-035.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Least privilege; AI hosts only; user gesture enable.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S009 · MV3

**Interviewer:** allFrames false — attack?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Iframe AI embeds may bypass; accepted residual; document it.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S010 · MV3

**Interviewer:** Offscreen justification if OCR absent?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Architecture ready; fail-closed honest; handshake exists.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S011 · IPC

**Interviewer:** Forge CONFIG_SET from a tab.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Sender auth FORBIDDEN; phase3 tests.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S012 · IPC

**Interviewer:** Flood INTERCEPT_EVENT.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** IPC 30 + scan 20; KI-022 closed; RATE_LIMITED.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S013 · IPC

**Interviewer:** Malformed envelope.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** assertIpcEnvelope → INVALID_MESSAGE fail-closed.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S014 · IPC

**Interviewer:** Safe mode purpose?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Blast radius reduction; allow health/config get only.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S015 · IPC

**Interviewer:** SCAN_REQUEST vs INTERCEPT_EVENT?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Live path uses INTERCEPT_EVENT; both scan-limited.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S016 · Detection

**Interviewer:** Walk scanText.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Size→prepare→regex/entropy→b64/hex→checksum→risk→policy.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S017 · Detection

**Interviewer:** Show a bypass you accept.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** ROT13 AWS; BYPASS_DATABASE; FP risk if decoded.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S018 · Detection

**Interviewer:** Show a bypass you fixed.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Spaced AKIA; collapseSpacedAlphanumerics; spaced recall.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S019 · Detection

**Interviewer:** Why Luhn after regex?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Drop non-PAN digit strings; raise confidence.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S020 · Detection

**Interviewer:** Entropy FP story.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Phase B hard-neg FPR ~0.30; Phase C charset gates.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S021 · Detection

**Interviewer:** Phone precision gate.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Separators required; contiguous digits FN accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S022 · Detection

**Interviewer:** Detector count flex.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Reject; optimize precision; catalog is research metadata.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S023 · Detection

**Interviewer:** WARN vs HOLD.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Policy WARN; UI bridge HOLD for human decision.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S024 · Detection

**Interviewer:** Oversize text.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** MAX_TEXT_SCAN_BYTES 1MiB; BLOCK fail-closed.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S025 · Detection

**Interviewer:** Secret in base64.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Depth-bounded decode+rescan; MAX_DECODE_DEPTH=3.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S026 · Threat

**Interviewer:** ROOT1 compromise extension.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Update integrity, storage encryption, minimal telemetry.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S027 · Threat

**Interviewer:** ROOT2 bypass detection.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Encoding, clipboard API, native apps, Allow Anyway.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S028 · Threat

**Interviewer:** Overlay spoof.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Closed Shadow DOM ADR-014 + approval nonce.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S029 · Threat

**Interviewer:** WASM supply chain.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Must pin SHA-256 before enable; currently absent.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S030 · Threat

**Interviewer:** User clicks Allow always.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** RR-09 product limit; enterprise block future.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S031 · Threat

**Interviewer:** Memory dump.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Minimize lifetime; history off; residual RR-03.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S032 · Privacy

**Interviewer:** What leaves device default?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Nothing for detection; telemetry off; cloud explain off.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S033 · Privacy

**Interviewer:** History on — consequences?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Encrypted at rest; still sensitive; default off ADR-033.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S034 · Privacy

**Interviewer:** KI-018?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Counsel URL blocker; eng cannot invent policy.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S035 · Privacy

**Interviewer:** storage.sync?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Forbidden ADR-020; would sync secrets config.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S036 · Crypto

**Interviewer:** Why Argon2id params?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Ownership matrix; interactive KDF budget; PBKDF2 fallback.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S037 · Crypto

**Interviewer:** AES-GCM IV reuse?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Random IV per record; never reuse with key.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S038 · Crypto

**Interviewer:** RR-10 session key.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Session material risk; short-lived; history off mitigates.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S039 · Perf

**Interviewer:** Is 256MB measured?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Design contract EXT_PEAK_MEM_MB; benches check constants/dist.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S040 · Perf

**Interviewer:** OCR 3000ms?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Design only; N/A without WASM.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S041 · Perf

**Interviewer:** Why no threads?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** ADR-032 COI brittleness; SIMD single-thread.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S042 · Perf

**Interviewer:** If p99 regresses 10x?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Rollback; profile prepare vs catalog; do not add complexity first.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S043 · Eval

**Interviewer:** Sell me 99% precision.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Refuse; synthetic; holdout; not production.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S044 · Eval

**Interviewer:** Seed importance?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Reproducibility contract 1581719041.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S045 · Eval

**Interviewer:** Phase C ROT13 recall drop.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Expected side effect of entropy harden; accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S046 · Eval

**Interviewer:** Red team vs eval.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Probes adversarial classes; eval aggregate metrics.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S047 · Eval

**Interviewer:** Overfit risk.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** malicious_exact; holdout excludes; still synthetic.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S048 · Product

**Interviewer:** Production ready?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Eng RC yes; public NO-GO G3/KI-006/KI-018.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S049 · Product

**Interviewer:** Better than enterprise DLP?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Different problem class; no superiority claim.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S050 · Product

**Interviewer:** Typing next?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Out of freeze; high cost; incomplete coverage anyway.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S051 · Product

**Interviewer:** Enterprise backend?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Placeholder 0.0.0; do not claim.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S052 · Demo

**Interviewer:** Binary upload in demo.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Expect HOLD OCR unavailable — success if fail-closed.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S053 · Demo

**Interviewer:** Demo extension fails to inject.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Check permission enable; reload; fixture host.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S054 · Demo

**Interviewer:** Audience asks for ChatGPT live.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** State KI-006; offer fixture + honest status.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S055 · Hiring

**Interviewer:** What would you not put on a resume?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Production precision %; OCR capability; CWS ready.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S056 · Hiring

**Interviewer:** Biggest engineering mistake in project?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** e.g. scan limiter unwired until gap board — fixed.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S057 · Hiring

**Interviewer:** Why diminishing returns on code?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Board statement; whitepaper/external validation next.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S058 · Staff

**Interviewer:** Falsify local-first thesis.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** If detection required cloud to be useful — product fails thesis.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S059 · Staff

**Interviewer:** Reopen freeze criteria.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** New threat class with measured evidence + ADR.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S060 · Staff

**Interviewer:** Maintainability risk.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Doc/code drift blueprint vs handlers; mitigate with honesty docs.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S061 · Principal

**Interviewer:** Innovation vs competence?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Competence in MV3 privacy boundary; innovation limited — honest.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S062 · Principal

**Interviewer:** Production credibility 5 — agree?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Yes; public blockers + OCR absent + synthetic eval.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S063 · Principal

**Interviewer:** What hires you from this?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Judgment under constraints; evidence discipline; threat honesty.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S064 · Chrome

**Interviewer:** Why not declarativeNetRequest?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Need payload inspection before page consume; DNR wrong layer.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S065 · Chrome

**Interviewer:** WAR least privilege.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Match AI hosts; ADR-035.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S066 · Chrome

**Interviewer:** Ephemeral SW design implications.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Externalize state; HOLD on death; early listeners.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S067 · PANW

**Interviewer:** How is this not endpoint DLP?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Browser event boundary; AI host scoped; local-first paste firewall.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S068 · PANW

**Interviewer:** Detection quality bar.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Checksum+entropy+red team; not signature count vanity.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S069 · PANW

**Interviewer:** Residual risk communication.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** BYPASS_DATABASE + UPDATED_LIMITATIONS.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S070 · ApplePriv

**Interviewer:** On-device story holes?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Session keys; user override; clipboard API residual.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S071 · ApplePriv

**Interviewer:** Preview text on overlay?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Minimization; history off; no telemetry.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S072 · ToB

**Interviewer:** Attack the approval nonce.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Forged events without nonce fail; cite tests.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S073 · ToB

**Interviewer:** Find a logic bug class.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** WARN/HOLD mapping; rate limit keying; OCR flag confusion.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S074 · PZ

**Interviewer:** Weird machine / encoding bypass beyond ROT13.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Chunk beyond heuristics; novel ciphers; disclose + defer.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S075 · PZ

**Interviewer:** Browser bug trust.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** RR-02 WASM escape accepted; depend on Chrome.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S076 · IEEE

**Interviewer:** Related work honesty.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Browser DLP extensions; enterprise DLP; secret scanners — different constraints.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S077 · IEEE

**Interviewer:** Evaluation methodology critique.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Synthetic imbalance risk; holdout helps; need external corpus.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S078 · EM

**Interviewer:** Ship decision tomorrow?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Load-unpacked beta yes; CWS no.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S079 · EM

**Interviewer:** Team composition if continuing.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Detection research + WASM integrity + counsel + live QA.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S080 · EM

**Interviewer:** Docs vs code investment now?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Communication/mastery > code per board.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S081 · Whiteboard

**Interviewer:** Sequence diagram paste secret.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Include rate limit + overlay + nonce.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S082 · Whiteboard

**Interviewer:** Threat tree bypass.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Include clipboard API and Allow Anyway.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S083 · Whiteboard

**Interviewer:** Package dependency graph.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** shared-types root; detection pure; extension integrates.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S084 · Deep

**Interviewer:** joinBrokenAlnumLines FP case.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Short words; threshold ≥6; explain.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S085 · Deep

**Interviewer:** Hex rescan vs entropy on hex.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Decode path vs skip pure hex in entropy.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S086 · Deep

**Interviewer:** Policy CRITICAL always BLOCK?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** decide.ts HIGH/CRITICAL BLOCK; yes.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S087 · Deep

**Interviewer:** Feature flag ocrEnabled read path.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Flags service; still HOLD in handler for binary.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S088 · Deep

**Interviewer:** Manifest version vs root 0.0.0.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** KI-003 low; extension 0.2.1 certified.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S089 · Adversarial

**Interviewer:** ZWSP in AWS key.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Non-finding if probes pass; cite BYPASS_DATABASE.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S090 · Adversarial

**Interviewer:** Homoglyph email.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Subset table residual KI-010.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S091 · Adversarial

**Interviewer:** Double base64.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Depth path; may catch via entropy/decode.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S092 · Adversarial

**Interviewer:** Prompt injection wrapper around secret.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Still detect secret if plaintext present.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S093 · Ops

**Interviewer:** Beta user reports always HOLD on PNG.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Expected KI-002; communicate fail-closed.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S094 · Ops

**Interviewer:** Beta user wants history.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Opt-in; warn encryption threat model.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S095 · Ops

**Interviewer:** CI SW observe flake.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** KI-014; package-shape gates.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S096 · Ops

**Interviewer:** Release language review.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** G4 claims PASS; no CWS authorize.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S097 · Meta

**Interviewer:** Stop coding — defend.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Diminishing returns; Category A closed; whitepaper next.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S098 · Meta

**Interviewer:** What is still Category A if anything?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Only new evidence (live bypass / security defect).

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S099 · Meta

**Interviewer:** How do you avoid doc rot?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** CERTIFICATION_STATUS + limitations as SoT; blueprint aspirational tagged.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S100 · Meta

**Interviewer:** Interview scoring yourself.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Architecture high; production credibility low-mid; say so.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S101 · Close

**Interviewer:** Ask me a question that would fail a weak candidate.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Does OCR work? / Are you CWS ready? / What is your FPR in production?

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S102 · Close

**Interviewer:** Strongest evidence artifact?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Dual verdict JSON + red-team 37/39 + eval seed reports.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S103 · Close

**Interviewer:** Weakest subsystem to attack in interview?

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** OCR narrative; live G3; synthetic eval marketing.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S104 · Close

**Interviewer:** One-sentence thesis.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Local-first MV3 paste firewall for AI hosts with Tier-1 on-device detection and explicit residuals.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S105 · Drill

**Interviewer:** Rapid fire 1: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S106 · Drill

**Interviewer:** Rapid fire 2: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S107 · Drill

**Interviewer:** Rapid fire 3: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S108 · Drill

**Interviewer:** Rapid fire 4: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S109 · Drill

**Interviewer:** Rapid fire 5: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S110 · Drill

**Interviewer:** Rapid fire 6: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S111 · Drill

**Interviewer:** Rapid fire 7: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S112 · Drill

**Interviewer:** Rapid fire 8: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S113 · Drill

**Interviewer:** Rapid fire 9: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S114 · Drill

**Interviewer:** Rapid fire 10: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S115 · Drill

**Interviewer:** Rapid fire 11: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S116 · Drill

**Interviewer:** Rapid fire 12: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S117 · Drill

**Interviewer:** Rapid fire 13: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S118 · Drill

**Interviewer:** Rapid fire 14: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S119 · Drill

**Interviewer:** Rapid fire 15: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S120 · Drill

**Interviewer:** Rapid fire 16: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S121 · Drill

**Interviewer:** Rapid fire 17: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S122 · Drill

**Interviewer:** Rapid fire 18: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S123 · Drill

**Interviewer:** Rapid fire 19: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## S124 · Drill

**Interviewer:** Rapid fire 20: name one implemented control and one accepted residual.

**Interrupts (if weak):**

- “That is brochure language. Show the trust boundary.”
- “Is that implemented or blueprint?”
- “What is the residual risk?”
- “Where is the evidence file?”
- “Would you put that number on a CWS listing?”

**Ideal response spine:** Example: scan rate 20/min implemented; ROT13 residual accepted.

**Expose-gap follow-ups:**

1. What would a hostile page do next?
2. What metric would change your mind?
3. What must you not claim under oath?

**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`

---

## Mastery exit criteria

- Complete 30 sessions without OCR/CWS/metric lies.
- Whiteboard paste path twice from memory.
- Recite dual verdict and three public blockers.
- Explain Phase B→C eval deltas including ROT13 drop.
- Demo HOLD on binary as a success case.
