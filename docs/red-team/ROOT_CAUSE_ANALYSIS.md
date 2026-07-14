# ROOT_CAUSE_ANALYSIS.md

## Phase C — Root causes for verified issues

### RC-01 Contiguous-token assumption

**Affected:** RT-SPACE-_, RT-TAB-_, RT-NL-*

Tier-1 regex detectors assume secrets appear as **contiguous** tokens. Attackers insert `\s` / `\t` / `\n` between characters.

**Why it existed:** PART_20 already stripped zero-width and bidi marks but did not defrag ordinary whitespace chunking.

**Fix class:** Preprocess defrag (still PART_20 adversarial normalize) — **not** an architecture change.

**ADR / requirement link:** PART_20 Guardrails; ADR-036 fail-closed detection posture; FR-DET secret paste detection.

---

### RC-02 Missing HTML entity decode

**Affected:** RT-HTML-AWS

Numeric entities (`&#65;`) are printable-safe obfuscation that bypasses prefix regexes.

**Fix class:** Decode basic numeric/hex entities before scan.

---

### RC-03 Encoding asymmetry (Base64 yes, Hex no)

**Affected:** RT-HEX-AWS

Base64 decode+rescan existed (`collectBase64Spans`); hex did not.

**Fix class:** Parallel hex decode+rescan with `MAX_DECODE_DEPTH`.

---

### RC-04 Over-broad entropy / AWS-40 heuristics

**Affected:** RT-FP-ALNUM40, RT-FP-SHORT-B64, Phase B hard-negative FPR ≈30%

Entropy treated any high-entropy ≥20–32 charset token as `API_KEY`, including pure alnum and assignment forms containing `=`.

Bare AWS secret detector matched any 40-char `[A-Za-z0-9/+=]` run.

**Fix class:** Tighten entropy charset gates; require `/+=` evidence for AWS-40 pattern.

**Trade-off:** Weaker catch for rare pure-alnum AWS secrets and some high-entropy opaque tokens → residual FNs possible; FP reduction prioritized for credibility.

---

### RC-05 ROT13 (accepted)

No normalization layer. Fixing via blind ROT13 decode is a net-negative for FP.

**Disposition:** Documented limitation.

---

### RC-06 Non-reproduced classes

Clipboard races, multi-tab SW races, permission revocation, concurrent uploads: **no automated reproduction** in this cycle. Multi-paste correlation is an **architectural** limit of single-intercept scan (not a missed if-statement).
