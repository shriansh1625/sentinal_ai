# TECHNICAL_INTERVIEW_BIBLE.md

**Purpose:** Survive senior security interviews on Sentinel Shield AI.
**Rule:** Prefer evidence over rhetoric. Never claim OCR works, CWS-ready, or enterprise SOC.
**Canonical refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `blueprint/PART_08` · Freeze v1.0 · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `POST_REMEDIATION_EVALUATION.md` · `store/CERTIFICATION_STATUS.json`

## How to practice

1. Cover the question. 2. Answer aloud in 60–90s. 3. Compare to Ideal. 4. Drill Follow-ups until boring.

## Global weak patterns (always wrong)

- Claiming image/PDF OCR detection works today
- Marketing synthetic eval as production precision
- Conflating engineering RC GO with public CWS GO
- Saying scans are rate-limited without citing 20/min/tab (KI-022)
- Pretending `enterprise-backend` is shipped

---

## Architecture

### Q001 [Intern] — Why MV3 extension instead of a TLS-intercepting proxy?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q002 [Associate] — Explain the Coordinator-Processor model and why multi-agent was rejected.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q003 [Senior] — Draw the trust boundaries TB-1 through TB-4.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q004 [Staff] — Why is detection-engine forbidden from importing chrome or fetch?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q005 [Principal] — What does Architecture Freeze v1.0 authorize vs forbid?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q006 [Intern] — Why are host permissions limited to AI platforms?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q007 [Associate] — How does the Service Worker coordinate without CS talking to offscreen directly?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q008 [Senior] — What is the dual certification verdict and why must they not be conflated?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q009 [Staff] — Explain package boundaries in the monorepo.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q010 [Principal] — Why is enterprise-backend empty and how do you talk about it?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q011 [Intern] — What state lives in the SW vs chrome.storage vs encrypted KV?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q012 [Associate] — Why Lit instead of React for injected UI?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q013 [Senior] — What is ADR-036 and how did it change fail-open behavior?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q014 [Staff] — How would you evolve for Firefox without breaking freeze principles?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q015 [Principal] — Where is the single source of truth for numeric constants?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q016 [Intern] — Why MV3 extension instead of a TLS-intercepting proxy?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q017 [Associate] — Explain the Coordinator-Processor model and why multi-agent was rejected.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q018 [Senior] — Draw the trust boundaries TB-1 through TB-4.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q019 [Staff] — Why is detection-engine forbidden from importing chrome or fetch?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q020 [Principal] — What does Architecture Freeze v1.0 authorize vs forbid?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q021 [Intern] — Why are host permissions limited to AI platforms?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q022 [Associate] — How does the Service Worker coordinate without CS talking to offscreen directly?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q023 [Senior] — What is the dual certification verdict and why must they not be conflated?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q024 [Staff] — Explain package boundaries in the monorepo.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q025 [Principal] — Why is enterprise-backend empty and how do you talk about it?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q026 [Intern] — What state lives in the SW vs chrome.storage vs encrypted KV?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q027 [Associate] — Why Lit instead of React for injected UI?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q028 [Senior] — What is ADR-036 and how did it change fail-open behavior?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q029 [Staff] — How would you evolve for Firefox without breaking freeze principles?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q030 [Principal] — Where is the single source of truth for numeric constants?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q031 [Intern] — Why MV3 extension instead of a TLS-intercepting proxy?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q032 [Associate] — Explain the Coordinator-Processor model and why multi-agent was rejected.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q033 [Senior] — Draw the trust boundaries TB-1 through TB-4.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q034 [Staff] — Why is detection-engine forbidden from importing chrome or fetch?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q035 [Principal] — What does Architecture Freeze v1.0 authorize vs forbid?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q036 [Intern] — Why are host permissions limited to AI platforms?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q037 [Associate] — How does the Service Worker coordinate without CS talking to offscreen directly?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q038 [Senior] — What is the dual certification verdict and why must they not be conflated?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q039 [Staff] — Explain package boundaries in the monorepo.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q040 [Principal] — Why is enterprise-backend empty and how do you talk about it?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q041 [Intern] — What state lives in the SW vs chrome.storage vs encrypted KV?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q042 [Associate] — Why Lit instead of React for injected UI?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q043 [Senior] — What is ADR-036 and how did it change fail-open behavior?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q044 [Staff] — How would you evolve for Firefox without breaking freeze principles?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q045 [Principal] — Where is the single source of truth for numeric constants?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q046 [Intern] — Why MV3 extension instead of a TLS-intercepting proxy?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q047 [Associate] — Explain the Coordinator-Processor model and why multi-agent was rejected.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q048 [Senior] — Draw the trust boundaries TB-1 through TB-4.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q049 [Staff] — Why is detection-engine forbidden from importing chrome or fetch?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q050 [Principal] — What does Architecture Freeze v1.0 authorize vs forbid?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q051 [Intern] — Why are host permissions limited to AI platforms?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q052 [Associate] — How does the Service Worker coordinate without CS talking to offscreen directly?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q053 [Senior] — What is the dual certification verdict and why must they not be conflated?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q054 [Staff] — Explain package boundaries in the monorepo.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q055 [Principal] — Why is enterprise-backend empty and how do you talk about it?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q056 [Intern] — What state lives in the SW vs chrome.storage vs encrypted KV?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q057 [Associate] — Why Lit instead of React for injected UI?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q058 [Senior] — What is ADR-036 and how did it change fail-open behavior?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q059 [Staff] — How would you evolve for Firefox without breaking freeze principles?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q060 [Principal] — Where is the single source of truth for numeric constants?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q061 [Intern] — Why MV3 extension instead of a TLS-intercepting proxy?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q062 [Associate] — Explain the Coordinator-Processor model and why multi-agent was rejected.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q063 [Senior] — Draw the trust boundaries TB-1 through TB-4.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q064 [Staff] — Why is detection-engine forbidden from importing chrome or fetch?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q065 [Principal] — What does Architecture Freeze v1.0 authorize vs forbid?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q066 [Intern] — Why are host permissions limited to AI platforms?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q067 [Associate] — How does the Service Worker coordinate without CS talking to offscreen directly?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q068 [Senior] — What is the dual certification verdict and why must they not be conflated?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q069 [Staff] — Explain package boundaries in the monorepo.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

### Q070 [Principal] — Why is enterprise-backend empty and how do you talk about it?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `ARCH`

---

## Threat Modeling

### Q071 [Intern] — Walk STRIDE for the content script.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q072 [Associate] — What is ROOT2 in the attack tree and how do you mitigate it?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q073 [Senior] — Why is clipboard.readText() an accepted residual?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q074 [Staff] — Explain RR-09 user ignores warnings.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q075 [Principal] — How does closed Shadow DOM mitigate overlay spoofing?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q076 [Intern] — What threats does sender authorization address?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q077 [Associate] — How do rate limits map to DoS threats?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q078 [Senior] — Why is supply-chain still residual?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q079 [Staff] — Map paste of an AWS key to assets and mitigations.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q080 [Principal] — Difference between a fixed bypass and an accepted residual?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q081 [Intern] — How would a page race interception?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q082 [Associate] — Threat model OCR WASM integrity even if WASM is absent.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q083 [Senior] — Why is CWS publisher account compromise critical?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q084 [Staff] — Reason about memory dump during an active scan.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q085 [Principal] — Is fail-closed always better than fail-open?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q086 [Intern] — Walk STRIDE for the content script.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q087 [Associate] — What is ROOT2 in the attack tree and how do you mitigate it?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q088 [Senior] — Why is clipboard.readText() an accepted residual?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q089 [Staff] — Explain RR-09 user ignores warnings.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q090 [Principal] — How does closed Shadow DOM mitigate overlay spoofing?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q091 [Intern] — What threats does sender authorization address?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q092 [Associate] — How do rate limits map to DoS threats?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q093 [Senior] — Why is supply-chain still residual?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q094 [Staff] — Map paste of an AWS key to assets and mitigations.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q095 [Principal] — Difference between a fixed bypass and an accepted residual?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q096 [Intern] — How would a page race interception?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q097 [Associate] — Threat model OCR WASM integrity even if WASM is absent.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q098 [Senior] — Why is CWS publisher account compromise critical?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q099 [Staff] — Reason about memory dump during an active scan.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q100 [Principal] — Is fail-closed always better than fail-open?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q101 [Intern] — Walk STRIDE for the content script.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q102 [Associate] — What is ROOT2 in the attack tree and how do you mitigate it?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q103 [Senior] — Why is clipboard.readText() an accepted residual?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q104 [Staff] — Explain RR-09 user ignores warnings.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q105 [Principal] — How does closed Shadow DOM mitigate overlay spoofing?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q106 [Intern] — What threats does sender authorization address?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q107 [Associate] — How do rate limits map to DoS threats?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q108 [Senior] — Why is supply-chain still residual?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q109 [Staff] — Map paste of an AWS key to assets and mitigations.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q110 [Principal] — Difference between a fixed bypass and an accepted residual?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q111 [Intern] — How would a page race interception?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q112 [Associate] — Threat model OCR WASM integrity even if WASM is absent.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q113 [Senior] — Why is CWS publisher account compromise critical?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q114 [Staff] — Reason about memory dump during an active scan.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q115 [Principal] — Is fail-closed always better than fail-open?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q116 [Intern] — Walk STRIDE for the content script.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q117 [Associate] — What is ROOT2 in the attack tree and how do you mitigate it?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q118 [Senior] — Why is clipboard.readText() an accepted residual?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q119 [Staff] — Explain RR-09 user ignores warnings.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

### Q120 [Principal] — How does closed Shadow DOM mitigate overlay spoofing?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Name asset + STRIDE category + mitigation + residual ID if any (RR/KI). Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `TM`

---

## Detection

### Q121 [Intern] — Describe the Tier-1 scanText pipeline step by step.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q122 [Associate] — Why run checksum validation after regex for PAN and IBAN?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q123 [Senior] — How was entropy hardened after Phase B false positives?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q124 [Staff] — Why was ROT13 not decoded in v1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q125 [Principal] — Explain collapseSpacedAlphanumerics and its FP trade-off.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q126 [Intern] — How does MAX_DECODE_DEPTH limit base64/hex recursion?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q127 [Associate] — Why require separators in US phone detection?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q128 [Senior] — What does decideAction return for MEDIUM vs HIGH risk?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q129 [Staff] — How does the research catalog relate to runtime matching?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q130 [Principal] — Would you remove detectors to improve precision? When?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q131 [Intern] — How do you merge overlapping spans?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q132 [Associate] — Why is malicious_exact optimistic in evaluation?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q133 [Senior] — Explain redaction tokens vs BLOCK.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q134 [Staff] — How would you detect a secret split across two pastes?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q135 [Principal] — Defend regex sufficiency for AWS access key IDs.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q136 [Intern] — Describe the Tier-1 scanText pipeline step by step.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q137 [Associate] — Why run checksum validation after regex for PAN and IBAN?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q138 [Senior] — How was entropy hardened after Phase B false positives?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q139 [Staff] — Why was ROT13 not decoded in v1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q140 [Principal] — Explain collapseSpacedAlphanumerics and its FP trade-off.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q141 [Intern] — How does MAX_DECODE_DEPTH limit base64/hex recursion?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q142 [Associate] — Why require separators in US phone detection?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q143 [Senior] — What does decideAction return for MEDIUM vs HIGH risk?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q144 [Staff] — How does the research catalog relate to runtime matching?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q145 [Principal] — Would you remove detectors to improve precision? When?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q146 [Intern] — How do you merge overlapping spans?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q147 [Associate] — Why is malicious_exact optimistic in evaluation?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q148 [Senior] — Explain redaction tokens vs BLOCK.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q149 [Staff] — How would you detect a secret split across two pastes?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q150 [Principal] — Defend regex sufficiency for AWS access key IDs.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q151 [Intern] — Describe the Tier-1 scanText pipeline step by step.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q152 [Associate] — Why run checksum validation after regex for PAN and IBAN?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q153 [Senior] — How was entropy hardened after Phase B false positives?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q154 [Staff] — Why was ROT13 not decoded in v1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q155 [Principal] — Explain collapseSpacedAlphanumerics and its FP trade-off.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q156 [Intern] — How does MAX_DECODE_DEPTH limit base64/hex recursion?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q157 [Associate] — Why require separators in US phone detection?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q158 [Senior] — What does decideAction return for MEDIUM vs HIGH risk?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q159 [Staff] — How does the research catalog relate to runtime matching?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q160 [Principal] — Would you remove detectors to improve precision? When?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q161 [Intern] — How do you merge overlapping spans?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q162 [Associate] — Why is malicious_exact optimistic in evaluation?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q163 [Senior] — Explain redaction tokens vs BLOCK.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q164 [Staff] — How would you detect a secret split across two pastes?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q165 [Principal] — Defend regex sufficiency for AWS access key IDs.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q166 [Intern] — Describe the Tier-1 scanText pipeline step by step.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q167 [Associate] — Why run checksum validation after regex for PAN and IBAN?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q168 [Senior] — How was entropy hardened after Phase B false positives?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q169 [Staff] — Why was ROT13 not decoded in v1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q170 [Principal] — Explain collapseSpacedAlphanumerics and its FP trade-off.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q171 [Intern] — How does MAX_DECODE_DEPTH limit base64/hex recursion?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q172 [Associate] — Why require separators in US phone detection?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q173 [Senior] — What does decideAction return for MEDIUM vs HIGH risk?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q174 [Staff] — How does the research catalog relate to runtime matching?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q175 [Principal] — Would you remove detectors to improve precision? When?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q176 [Intern] — How do you merge overlapping spans?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q177 [Associate] — Why is malicious_exact optimistic in evaluation?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q178 [Senior] — Explain redaction tokens vs BLOCK.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q179 [Staff] — How would you detect a secret split across two pastes?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q180 [Principal] — Defend regex sufficiency for AWS access key IDs.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q181 [Intern] — Describe the Tier-1 scanText pipeline step by step.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q182 [Associate] — Why run checksum validation after regex for PAN and IBAN?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q183 [Senior] — How was entropy hardened after Phase B false positives?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q184 [Staff] — Why was ROT13 not decoded in v1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q185 [Principal] — Explain collapseSpacedAlphanumerics and its FP trade-off.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q186 [Intern] — How does MAX_DECODE_DEPTH limit base64/hex recursion?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q187 [Associate] — Why require separators in US phone detection?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q188 [Senior] — What does decideAction return for MEDIUM vs HIGH risk?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q189 [Staff] — How does the research catalog relate to runtime matching?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

### Q190 [Principal] — Would you remove detectors to improve precision? When?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DET`

---

## Browser APIs / MV3

### Q191 [Intern] — Why must onMessage be registered synchronously at SW start?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q192 [Associate] — Explain registerContentScripts vs static content_scripts.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q193 [Senior] — What is an Offscreen Document and why does MV3 need it?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q194 [Staff] — How do optional host permissions interact with user gesture?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q195 [Principal] — What happens when the service worker is killed mid-scan?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q196 [Intern] — Explain WAR constraints for AI hosts.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q197 [Associate] — Why is allFrames false and what residual does that create?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q198 [Senior] — How does CSP wasm-unsafe-eval relate to ADR-031?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q199 [Staff] — Difference between extension page sender and tab sender for IPC.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q200 [Principal] — How do you test MV3 despite flaky load-extension SW observe?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q201 [Intern] — What Chrome APIs are intentionally not used and why?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q202 [Associate] — declarativeNetRequest vs content interception for this product.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q203 [Senior] — How would MV2 persistent background have changed the design?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q204 [Staff] — What is the approval nonce protecting against?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q205 [Principal] — How does the popup request permissions safely?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q206 [Intern] — Why must onMessage be registered synchronously at SW start?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q207 [Associate] — Explain registerContentScripts vs static content_scripts.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q208 [Senior] — What is an Offscreen Document and why does MV3 need it?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q209 [Staff] — How do optional host permissions interact with user gesture?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q210 [Principal] — What happens when the service worker is killed mid-scan?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q211 [Intern] — Explain WAR constraints for AI hosts.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q212 [Associate] — Why is allFrames false and what residual does that create?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q213 [Senior] — How does CSP wasm-unsafe-eval relate to ADR-031?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q214 [Staff] — Difference between extension page sender and tab sender for IPC.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q215 [Principal] — How do you test MV3 despite flaky load-extension SW observe?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q216 [Intern] — What Chrome APIs are intentionally not used and why?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q217 [Associate] — declarativeNetRequest vs content interception for this product.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q218 [Senior] — How would MV2 persistent background have changed the design?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q219 [Staff] — What is the approval nonce protecting against?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q220 [Principal] — How does the popup request permissions safely?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q221 [Intern] — Why must onMessage be registered synchronously at SW start?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q222 [Associate] — Explain registerContentScripts vs static content_scripts.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q223 [Senior] — What is an Offscreen Document and why does MV3 need it?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q224 [Staff] — How do optional host permissions interact with user gesture?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q225 [Principal] — What happens when the service worker is killed mid-scan?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q226 [Intern] — Explain WAR constraints for AI hosts.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q227 [Associate] — Why is allFrames false and what residual does that create?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q228 [Senior] — How does CSP wasm-unsafe-eval relate to ADR-031?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q229 [Staff] — Difference between extension page sender and tab sender for IPC.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q230 [Principal] — How do you test MV3 despite flaky load-extension SW observe?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q231 [Intern] — What Chrome APIs are intentionally not used and why?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q232 [Associate] — declarativeNetRequest vs content interception for this product.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q233 [Senior] — How would MV2 persistent background have changed the design?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q234 [Staff] — What is the approval nonce protecting against?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q235 [Principal] — How does the popup request permissions safely?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q236 [Intern] — Why must onMessage be registered synchronously at SW start?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q237 [Associate] — Explain registerContentScripts vs static content_scripts.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q238 [Senior] — What is an Offscreen Document and why does MV3 need it?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q239 [Staff] — How do optional host permissions interact with user gesture?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q240 [Principal] — What happens when the service worker is killed mid-scan?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q241 [Intern] — Explain WAR constraints for AI hosts.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q242 [Associate] — Why is allFrames false and what residual does that create?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q243 [Senior] — How does CSP wasm-unsafe-eval relate to ADR-031?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q244 [Staff] — Difference between extension page sender and tab sender for IPC.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q245 [Principal] — How do you test MV3 despite flaky load-extension SW observe?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q246 [Intern] — What Chrome APIs are intentionally not used and why?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q247 [Associate] — declarativeNetRequest vs content interception for this product.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q248 [Senior] — How would MV2 persistent background have changed the design?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q249 [Staff] — What is the approval nonce protecting against?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

### Q250 [Principal] — How does the popup request permissions safely?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Cite Chrome API constraint and how extension code obeys it; mention failure mode. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `MV3`

---

## Performance

### Q251 [Intern] — What is EXT_PEAK_MEM_MB — measured or contract?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q252 [Associate] — Explain PART_23 CI slack factor.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q253 [Senior] — Why is OCR P99 3000ms not currently empirical?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q254 [Staff] — How fast is Tier-1 on 1KB/10KB/100KB in benches?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q255 [Principal] — What would you optimize first if scan p99 doubled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q256 [Intern] — Why not enable WASM threads in v1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q257 [Associate] — How do worker idle timeouts protect memory?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q258 [Senior] — Relate MAX_CONCURRENT_SCANS to UX.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q259 [Staff] — Bundle size budget vs CWS limits.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q260 [Principal] — Cold start vs warm path — what must stay sync?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q261 [Intern] — What is EXT_PEAK_MEM_MB — measured or contract?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q262 [Associate] — Explain PART_23 CI slack factor.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q263 [Senior] — Why is OCR P99 3000ms not currently empirical?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q264 [Staff] — How fast is Tier-1 on 1KB/10KB/100KB in benches?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q265 [Principal] — What would you optimize first if scan p99 doubled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q266 [Intern] — Why not enable WASM threads in v1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q267 [Associate] — How do worker idle timeouts protect memory?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q268 [Senior] — Relate MAX_CONCURRENT_SCANS to UX.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q269 [Staff] — Bundle size budget vs CWS limits.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q270 [Principal] — Cold start vs warm path — what must stay sync?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q271 [Intern] — What is EXT_PEAK_MEM_MB — measured or contract?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q272 [Associate] — Explain PART_23 CI slack factor.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q273 [Senior] — Why is OCR P99 3000ms not currently empirical?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q274 [Staff] — How fast is Tier-1 on 1KB/10KB/100KB in benches?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q275 [Principal] — What would you optimize first if scan p99 doubled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q276 [Intern] — Why not enable WASM threads in v1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q277 [Associate] — How do worker idle timeouts protect memory?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q278 [Senior] — Relate MAX_CONCURRENT_SCANS to UX.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q279 [Staff] — Bundle size budget vs CWS limits.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q280 [Principal] — Cold start vs warm path — what must stay sync?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q281 [Intern] — What is EXT_PEAK_MEM_MB — measured or contract?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q282 [Associate] — Explain PART_23 CI slack factor.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q283 [Senior] — Why is OCR P99 3000ms not currently empirical?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q284 [Staff] — How fast is Tier-1 on 1KB/10KB/100KB in benches?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q285 [Principal] — What would you optimize first if scan p99 doubled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q286 [Intern] — Why not enable WASM threads in v1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q287 [Associate] — How do worker idle timeouts protect memory?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q288 [Senior] — Relate MAX_CONCURRENT_SCANS to UX.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q289 [Staff] — Bundle size budget vs CWS limits.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

### Q290 [Principal] — Cold start vs warm path — what must stay sync?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Separate design contract from measured bench; cite PART_23 / bench:budgets. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PERF`

---

## Security

### Q291 [Intern] — Describe the MessageRouter security pipeline.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q292 [Associate] — How do you prevent a tab from calling CONFIG_SET?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q293 [Senior] — What is KI-022 and how was it closed?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q294 [Staff] — Explain AES-GCM IV handling requirements.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q295 [Principal] — Why allowlist logging instead of deny-list sanitizers?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q296 [Intern] — How does safe mode reduce blast radius?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q297 [Associate] — What stops unbounded scanText DoS?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q298 [Senior] — Respond to malicious content script compromise.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q299 [Staff] — Security implications of User Allow Anyway.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q300 [Principal] — Why pin WASM hashes before enabling OCR?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q301 [Intern] — Describe the MessageRouter security pipeline.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q302 [Associate] — How do you prevent a tab from calling CONFIG_SET?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q303 [Senior] — What is KI-022 and how was it closed?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q304 [Staff] — Explain AES-GCM IV handling requirements.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q305 [Principal] — Why allowlist logging instead of deny-list sanitizers?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q306 [Intern] — How does safe mode reduce blast radius?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q307 [Associate] — What stops unbounded scanText DoS?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q308 [Senior] — Respond to malicious content script compromise.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q309 [Staff] — Security implications of User Allow Anyway.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q310 [Principal] — Why pin WASM hashes before enabling OCR?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q311 [Intern] — Describe the MessageRouter security pipeline.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q312 [Associate] — How do you prevent a tab from calling CONFIG_SET?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q313 [Senior] — What is KI-022 and how was it closed?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q314 [Staff] — Explain AES-GCM IV handling requirements.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q315 [Principal] — Why allowlist logging instead of deny-list sanitizers?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q316 [Intern] — How does safe mode reduce blast radius?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q317 [Associate] — What stops unbounded scanText DoS?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q318 [Senior] — Respond to malicious content script compromise.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q319 [Staff] — Security implications of User Allow Anyway.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q320 [Principal] — Why pin WASM hashes before enabling OCR?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q321 [Intern] — Describe the MessageRouter security pipeline.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q322 [Associate] — How do you prevent a tab from calling CONFIG_SET?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q323 [Senior] — What is KI-022 and how was it closed?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q324 [Staff] — Explain AES-GCM IV handling requirements.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q325 [Principal] — Why allowlist logging instead of deny-list sanitizers?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q326 [Intern] — How does safe mode reduce blast radius?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q327 [Associate] — What stops unbounded scanText DoS?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q328 [Senior] — Respond to malicious content script compromise.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q329 [Staff] — Security implications of User Allow Anyway.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q330 [Principal] — Why pin WASM hashes before enabling OCR?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q331 [Intern] — Describe the MessageRouter security pipeline.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q332 [Associate] — How do you prevent a tab from calling CONFIG_SET?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q333 [Senior] — What is KI-022 and how was it closed?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q334 [Staff] — Explain AES-GCM IV handling requirements.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q335 [Principal] — Why allowlist logging instead of deny-list sanitizers?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q336 [Intern] — How does safe mode reduce blast radius?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q337 [Associate] — What stops unbounded scanText DoS?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q338 [Senior] — Respond to malicious content script compromise.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q339 [Staff] — Security implications of User Allow Anyway.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

### Q340 [Principal] — Why pin WASM hashes before enabling OCR?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Describe control, what it stops, what it does not stop, evidence test name. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `SEC`

---

## Privacy

### Q341 [Intern] — Why is history default off?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q342 [Associate] — What leaves the device in the default configuration?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q343 [Senior] — How do you discuss KI-018 in interviews?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q344 [Staff] — Why no chrome.storage.sync?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q345 [Principal] — What is cloud explain and why metadata-only if enabled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q346 [Intern] — How do feature flags encode privacy defaults?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q347 [Associate] — HOLD overlay preview vs storing plaintext history.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q348 [Senior] — Is on-device detection still private if telemetry were on?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q349 [Staff] — Why is history default off?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q350 [Principal] — What leaves the device in the default configuration?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q351 [Intern] — How do you discuss KI-018 in interviews?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q352 [Associate] — Why no chrome.storage.sync?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q353 [Senior] — What is cloud explain and why metadata-only if enabled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q354 [Staff] — How do feature flags encode privacy defaults?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q355 [Principal] — HOLD overlay preview vs storing plaintext history.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q356 [Intern] — Is on-device detection still private if telemetry were on?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q357 [Associate] — Why is history default off?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q358 [Senior] — What leaves the device in the default configuration?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q359 [Staff] — How do you discuss KI-018 in interviews?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q360 [Principal] — Why no chrome.storage.sync?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q361 [Intern] — What is cloud explain and why metadata-only if enabled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q362 [Associate] — How do feature flags encode privacy defaults?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q363 [Senior] — HOLD overlay preview vs storing plaintext history.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q364 [Staff] — Is on-device detection still private if telemetry were on?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q365 [Principal] — Why is history default off?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q366 [Intern] — What leaves the device in the default configuration?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q367 [Associate] — How do you discuss KI-018 in interviews?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q368 [Senior] — Why no chrome.storage.sync?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q369 [Staff] — What is cloud explain and why metadata-only if enabled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

### Q370 [Principal] — How do feature flags encode privacy defaults?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Default-off posture; what never leaves device; counsel items are blockers not eng code. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `PRIV`

---

## Cryptography

### Q371 [Intern] — Why Argon2id parameters m=19MiB t=2 p=1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q372 [Associate] — When is PBKDF2-600k used?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q373 [Senior] — Why AES-256-GCM rather than AES-CBC?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q374 [Staff] — What did ADR-033 change vs CryptoKey-only session story?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q375 [Principal] — Where does key material live and what is RR-10?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q376 [Intern] — How would you rotate keys if history were enabled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q377 [Associate] — Why not keep secrets in SW globals long-term?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q378 [Senior] — Why Argon2id parameters m=19MiB t=2 p=1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q379 [Staff] — When is PBKDF2-600k used?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q380 [Principal] — Why AES-256-GCM rather than AES-CBC?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q381 [Intern] — What did ADR-033 change vs CryptoKey-only session story?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q382 [Associate] — Where does key material live and what is RR-10?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q383 [Senior] — How would you rotate keys if history were enabled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q384 [Staff] — Why not keep secrets in SW globals long-term?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q385 [Principal] — Why Argon2id parameters m=19MiB t=2 p=1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q386 [Intern] — When is PBKDF2-600k used?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q387 [Associate] — Why AES-256-GCM rather than AES-CBC?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q388 [Senior] — What did ADR-033 change vs CryptoKey-only session story?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q389 [Staff] — Where does key material live and what is RR-10?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q390 [Principal] — How would you rotate keys if history were enabled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q391 [Intern] — Why not keep secrets in SW globals long-term?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q392 [Associate] — Why Argon2id parameters m=19MiB t=2 p=1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q393 [Senior] — When is PBKDF2-600k used?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q394 [Staff] — Why AES-256-GCM rather than AES-CBC?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q395 [Principal] — What did ADR-033 change vs CryptoKey-only session story?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q396 [Intern] — Where does key material live and what is RR-10?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q397 [Associate] — How would you rotate keys if history were enabled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q398 [Senior] — Why not keep secrets in SW globals long-term?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q399 [Staff] — Why Argon2id parameters m=19MiB t=2 p=1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

### Q400 [Principal] — When is PBKDF2-600k used?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Primitive + parameters + threat (disk theft); session key residual RR-10. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CRYPTO`

---

## Concurrency / SW

### Q401 [Intern] — Avoid races between multiple pastes in one tab.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q402 [Associate] — What does sliding-window rate limiting guarantee and not?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q403 [Senior] — SW is single-threaded — where does concurrency appear?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q404 [Staff] — Design per-tab scan queues.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q405 [Principal] — Two tabs — rate limiter keying.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q406 [Intern] — Relate MAX_QUEUE_DEPTH_PER_WORKER to backpressure.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q407 [Associate] — How do MessageRouter timeouts fail closed?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q408 [Senior] — Avoid races between multiple pastes in one tab.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q409 [Staff] — What does sliding-window rate limiting guarantee and not?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q410 [Principal] — SW is single-threaded — where does concurrency appear?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q411 [Intern] — Design per-tab scan queues.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q412 [Associate] — Two tabs — rate limiter keying.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q413 [Senior] — Relate MAX_QUEUE_DEPTH_PER_WORKER to backpressure.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q414 [Staff] — How do MessageRouter timeouts fail closed?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q415 [Principal] — Avoid races between multiple pastes in one tab.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q416 [Intern] — What does sliding-window rate limiting guarantee and not?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q417 [Associate] — SW is single-threaded — where does concurrency appear?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q418 [Senior] — Design per-tab scan queues.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q419 [Staff] — Two tabs — rate limiter keying.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q420 [Principal] — Relate MAX_QUEUE_DEPTH_PER_WORKER to backpressure.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q421 [Intern] — How do MessageRouter timeouts fail closed?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q422 [Associate] — Avoid races between multiple pastes in one tab.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q423 [Senior] — What does sliding-window rate limiting guarantee and not?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q424 [Staff] — SW is single-threaded — where does concurrency appear?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q425 [Principal] — Design per-tab scan queues.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q426 [Intern] — Two tabs — rate limiter keying.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q427 [Associate] — Relate MAX_QUEUE_DEPTH_PER_WORKER to backpressure.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q428 [Senior] — How do MessageRouter timeouts fail closed?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q429 [Staff] — Avoid races between multiple pastes in one tab.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

### Q430 [Principal] — What does sliding-window rate limiting guarantee and not?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `CONC`

---

## Regex / Preprocess

### Q431 [Intern] — Why lookbehind digit boundaries in phone/SSN patterns?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q432 [Associate] — Catastrophic backtracking risk and how you avoid it.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q433 [Senior] — Catalog flags interacting with matchAll.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q434 [Staff] — Why HTML entity decode before regex?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q435 [Principal] — Trade-off of joining broken alnum lines when both sides >=6.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q436 [Intern] — Unicode normalization vs homoglyph residuals.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q437 [Associate] — When is entropy preferred over regex?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q438 [Senior] — Why lookbehind digit boundaries in phone/SSN patterns?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q439 [Staff] — Catastrophic backtracking risk and how you avoid it.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q440 [Principal] — Catalog flags interacting with matchAll.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q441 [Intern] — Why HTML entity decode before regex?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q442 [Associate] — Trade-off of joining broken alnum lines when both sides >=6.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q443 [Senior] — Unicode normalization vs homoglyph residuals.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q444 [Staff] — When is entropy preferred over regex?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q445 [Principal] — Why lookbehind digit boundaries in phone/SSN patterns?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q446 [Intern] — Catastrophic backtracking risk and how you avoid it.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q447 [Associate] — Catalog flags interacting with matchAll.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q448 [Senior] — Why HTML entity decode before regex?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q449 [Staff] — Trade-off of joining broken alnum lines when both sides >=6.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q450 [Principal] — Unicode normalization vs homoglyph residuals.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q451 [Intern] — When is entropy preferred over regex?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q452 [Associate] — Why lookbehind digit boundaries in phone/SSN patterns?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q453 [Senior] — Catastrophic backtracking risk and how you avoid it.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q454 [Staff] — Catalog flags interacting with matchAll.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q455 [Principal] — Why HTML entity decode before regex?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q456 [Intern] — Trade-off of joining broken alnum lines when both sides >=6.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q457 [Associate] — Unicode normalization vs homoglyph residuals.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q458 [Senior] — When is entropy preferred over regex?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q459 [Staff] — Why lookbehind digit boundaries in phone/SSN patterns?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

### Q460 [Principal] — Catastrophic backtracking risk and how you avoid it.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Precision/recall trade-off with concrete Phase C or phone-gate example. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `RX`

---

## OCR / WASM

### Q461 [Intern] — Does OCR work today? Give the precise answer.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q462 [Associate] — Why can ocrEnabled be true while images HOLD?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q463 [Senior] — What must happen before OCR is release-channel enabled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q464 [Staff] — Threats of vendoring unpinned WASM.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q465 [Principal] — How would OCR text re-enter Tier-1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q466 [Intern] — Why is NER off by default even if OCR arrives?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q467 [Associate] — OCR_P99_MS_1080P — design vs measured.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q468 [Senior] — Does OCR work today? Give the precise answer.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q469 [Staff] — Why can ocrEnabled be true while images HOLD?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q470 [Principal] — What must happen before OCR is release-channel enabled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q471 [Intern] — Threats of vendoring unpinned WASM.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q472 [Associate] — How would OCR text re-enter Tier-1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q473 [Senior] — Why is NER off by default even if OCR arrives?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q474 [Staff] — OCR_P99_MS_1080P — design vs measured.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q475 [Principal] — Does OCR work today? Give the precise answer.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q476 [Intern] — Why can ocrEnabled be true while images HOLD?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q477 [Associate] — What must happen before OCR is release-channel enabled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q478 [Senior] — Threats of vendoring unpinned WASM.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q479 [Staff] — How would OCR text re-enter Tier-1?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q480 [Principal] — Why is NER off by default even if OCR arrives?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q481 [Intern] — OCR_P99_MS_1080P — design vs measured.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q482 [Associate] — Does OCR work today? Give the precise answer.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q483 [Senior] — Why can ocrEnabled be true while images HOLD?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q484 [Staff] — What must happen before OCR is release-channel enabled?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

### Q485 [Principal] — Threats of vendoring unpinned WASM.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `OCR`

---

## Evaluation / Benchmarks

### Q486 [Intern] — Explain the eval seed contract.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q487 [Associate] — Why report holdout excluding malicious_exact?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q488 [Senior] — Interpret Phase B vs Phase C metric deltas without marketing.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q489 [Staff] — Why did ROT13 recall drop after remediations?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q490 [Principal] — What makes a benchmark scientifically weak?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q491 [Intern] — How do red-team probes differ from the eval harness?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q492 [Associate] — Would you trust FPR=0 on synthetic data?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q493 [Senior] — How should device-lab P99 be presented given KI-012?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q494 [Staff] — What does bench:budgets actually verify?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q495 [Principal] — How do you prevent overfitting detectors to the harness?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q496 [Intern] — Explain the eval seed contract.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q497 [Associate] — Why report holdout excluding malicious_exact?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q498 [Senior] — Interpret Phase B vs Phase C metric deltas without marketing.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q499 [Staff] — Why did ROT13 recall drop after remediations?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q500 [Principal] — What makes a benchmark scientifically weak?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q501 [Intern] — How do red-team probes differ from the eval harness?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q502 [Associate] — Would you trust FPR=0 on synthetic data?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q503 [Senior] — How should device-lab P99 be presented given KI-012?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q504 [Staff] — What does bench:budgets actually verify?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q505 [Principal] — How do you prevent overfitting detectors to the harness?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q506 [Intern] — Explain the eval seed contract.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q507 [Associate] — Why report holdout excluding malicious_exact?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q508 [Senior] — Interpret Phase B vs Phase C metric deltas without marketing.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q509 [Staff] — Why did ROT13 recall drop after remediations?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q510 [Principal] — What makes a benchmark scientifically weak?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q511 [Intern] — How do red-team probes differ from the eval harness?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q512 [Associate] — Would you trust FPR=0 on synthetic data?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q513 [Senior] — How should device-lab P99 be presented given KI-012?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q514 [Staff] — What does bench:budgets actually verify?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q515 [Principal] — How do you prevent overfitting detectors to the harness?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q516 [Intern] — Explain the eval seed contract.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q517 [Associate] — Why report holdout excluding malicious_exact?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q518 [Senior] — Interpret Phase B vs Phase C metric deltas without marketing.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q519 [Staff] — Why did ROT13 recall drop after remediations?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q520 [Principal] — What makes a benchmark scientifically weak?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q521 [Intern] — How do red-team probes differ from the eval harness?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q522 [Associate] — Would you trust FPR=0 on synthetic data?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q523 [Senior] — How should device-lab P99 be presented given KI-012?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q524 [Staff] — What does bench:budgets actually verify?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

### Q525 [Principal] — How do you prevent overfitting detectors to the harness?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Seed, synthetic, per-slice, holdout; never CWS-claim headline precision. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `EVAL`

---

## Design Decisions / Trade-offs

### Q526 [Intern] — Defend accepting ROT13 as residual.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q527 [Associate] — Defend not flipping OCR_DEFAULT_ENABLED without ADR.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q528 [Senior] — Why capture-phase over bubble-phase?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q529 [Staff] — Why WARN maps to HOLD in the UI bridge.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q530 [Principal] — Trade-offs of dynamic vs static content scripts.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q531 [Intern] — Why reject remote model download?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q532 [Associate] — When would you reopen Architecture Freeze?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q533 [Senior] — Precision vs recall for phone numbers — defend the gate.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q534 [Staff] — Defend accepting ROT13 as residual.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q535 [Principal] — Defend not flipping OCR_DEFAULT_ENABLED without ADR.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q536 [Intern] — Why capture-phase over bubble-phase?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q537 [Associate] — Why WARN maps to HOLD in the UI bridge.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q538 [Senior] — Trade-offs of dynamic vs static content scripts.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q539 [Staff] — Why reject remote model download?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q540 [Principal] — When would you reopen Architecture Freeze?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q541 [Intern] — Precision vs recall for phone numbers — defend the gate.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q542 [Associate] — Defend accepting ROT13 as residual.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q543 [Senior] — Defend not flipping OCR_DEFAULT_ENABLED without ADR.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q544 [Staff] — Why capture-phase over bubble-phase?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q545 [Principal] — Why WARN maps to HOLD in the UI bridge.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q546 [Intern] — Trade-offs of dynamic vs static content scripts.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q547 [Associate] — Why reject remote model download?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q548 [Senior] — When would you reopen Architecture Freeze?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q549 [Staff] — Precision vs recall for phone numbers — defend the gate.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q550 [Principal] — Defend accepting ROT13 as residual.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q551 [Intern] — Defend not flipping OCR_DEFAULT_ENABLED without ADR.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q552 [Associate] — Why capture-phase over bubble-phase?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q553 [Senior] — Why WARN maps to HOLD in the UI bridge.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q554 [Staff] — Trade-offs of dynamic vs static content scripts.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q555 [Principal] — Why reject remote model download?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q556 [Intern] — When would you reopen Architecture Freeze?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q557 [Associate] — Precision vs recall for phone numbers — defend the gate.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q558 [Senior] — Defend accepting ROT13 as residual.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q559 [Staff] — Defend not flipping OCR_DEFAULT_ENABLED without ADR.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q560 [Principal] — Why capture-phase over bubble-phase?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q561 [Intern] — Why WARN maps to HOLD in the UI bridge.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q562 [Associate] — Trade-offs of dynamic vs static content scripts.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q563 [Senior] — Why reject remote model download?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q564 [Staff] — When would you reopen Architecture Freeze?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

### Q565 [Principal] — Precision vs recall for phone numbers — defend the gate.

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Problem → choice → rejected alternative → trade-off → reopen criteria. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `DD`

---

## Failure Cases

### Q566 [Intern] — SW dies during HOLD — what should the user see?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q567 [Associate] — Oversize paste — expected decision?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q568 [Senior] — Binary PDF upload — expected decision?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q569 [Staff] — Rate limited paste flood — behavior?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q570 [Principal] — Invalid envelope from page — response?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q571 [Intern] — Platform disabled — is paste intercepted?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q572 [Associate] — Safe mode enabled — which messages work?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q573 [Senior] — Demo fails to load unpacked — recovery?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q574 [Staff] — False positive on high-entropy UUID — debug approach?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q575 [Principal] — Live host DOM differs from fixture — KI-006 lesson?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q576 [Intern] — SW dies during HOLD — what should the user see?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q577 [Associate] — Oversize paste — expected decision?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q578 [Senior] — Binary PDF upload — expected decision?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q579 [Staff] — Rate limited paste flood — behavior?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q580 [Principal] — Invalid envelope from page — response?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q581 [Intern] — Platform disabled — is paste intercepted?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q582 [Associate] — Safe mode enabled — which messages work?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q583 [Senior] — Demo fails to load unpacked — recovery?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q584 [Staff] — False positive on high-entropy UUID — debug approach?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q585 [Principal] — Live host DOM differs from fixture — KI-006 lesson?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q586 [Intern] — SW dies during HOLD — what should the user see?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q587 [Associate] — Oversize paste — expected decision?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q588 [Senior] — Binary PDF upload — expected decision?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q589 [Staff] — Rate limited paste flood — behavior?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q590 [Principal] — Invalid envelope from page — response?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q591 [Intern] — Platform disabled — is paste intercepted?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q592 [Associate] — Safe mode enabled — which messages work?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q593 [Senior] — Demo fails to load unpacked — recovery?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q594 [Staff] — False positive on high-entropy UUID — debug approach?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q595 [Principal] — Live host DOM differs from fixture — KI-006 lesson?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q596 [Intern] — SW dies during HOLD — what should the user see?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q597 [Associate] — Oversize paste — expected decision?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q598 [Senior] — Binary PDF upload — expected decision?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q599 [Staff] — Rate limited paste flood — behavior?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

### Q600 [Principal] — Invalid envelope from page — response?

**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.

**Ideal answer:** Expected InterceptDecision / IPC error + user-visible consequence + recovery. Reject unimplemented claims. Name one residual.

**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.

**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.

**Follow-ups:**

1. What breaks if that assumption is false?
2. Where is the evidence in the repo?
3. What would you measure before changing the decision?
4. How does a hostile page attack this subsystem?

**Refs:** `blueprint/PART_04` · `PART_06` · `PART_08` · `packages/extension/src` · `packages/detection-engine/src` · `UPDATED_LIMITATIONS.md` · topic `FAIL`

---

## Scenario Drills (cross-cutting)

---

## Coverage checklist

- [ ] Architecture / Freeze / ADRs
- [ ] Trust boundaries and IPC
- [ ] Tier-1 pipeline and Phase C
- [ ] Eval honesty and red team
- [ ] OCR honesty
- [ ] Privacy defaults and crypto
- [ ] Dual verdict
- [ ] Live demo failure recovery

**Total questions:** 600
