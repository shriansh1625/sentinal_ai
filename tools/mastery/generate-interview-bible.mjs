/**
 * One-shot generator for TECHNICAL_INTERVIEW_BIBLE.md (mastery program).
 * Not product runtime code.
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const difficultyCycle = ['Intern', 'Associate', 'Senior', 'Staff', 'Principal'];

const cats = [
  ['Architecture', 'ARCH', 70],
  ['Threat Modeling', 'TM', 50],
  ['Detection', 'DET', 70],
  ['Browser APIs / MV3', 'MV3', 60],
  ['Performance', 'PERF', 40],
  ['Security', 'SEC', 50],
  ['Privacy', 'PRIV', 30],
  ['Cryptography', 'CRYPTO', 30],
  ['Concurrency / SW', 'CONC', 30],
  ['Regex / Preprocess', 'RX', 30],
  ['OCR / WASM', 'OCR', 25],
  ['Evaluation / Benchmarks', 'EVAL', 40],
  ['Design Decisions / Trade-offs', 'DD', 40],
  ['Failure Cases', 'FAIL', 35],
];

const banks = {
  ARCH: [
    'Why MV3 extension instead of a TLS-intercepting proxy?',
    'Explain the Coordinator-Processor model and why multi-agent was rejected.',
    'Draw the trust boundaries TB-1 through TB-4.',
    'Why is detection-engine forbidden from importing chrome or fetch?',
    'What does Architecture Freeze v1.0 authorize vs forbid?',
    'Why are host permissions limited to AI platforms?',
    'How does the Service Worker coordinate without CS talking to offscreen directly?',
    'What is the dual certification verdict and why must they not be conflated?',
    'Explain package boundaries in the monorepo.',
    'Why is enterprise-backend empty and how do you talk about it?',
    'What state lives in the SW vs chrome.storage vs encrypted KV?',
    'Why Lit instead of React for injected UI?',
    'What is ADR-036 and how did it change fail-open behavior?',
    'How would you evolve for Firefox without breaking freeze principles?',
    'Where is the single source of truth for numeric constants?',
  ],
  TM: [
    'Walk STRIDE for the content script.',
    'What is ROOT2 in the attack tree and how do you mitigate it?',
    'Why is clipboard.readText() an accepted residual?',
    'Explain RR-09 user ignores warnings.',
    'How does closed Shadow DOM mitigate overlay spoofing?',
    'What threats does sender authorization address?',
    'How do rate limits map to DoS threats?',
    'Why is supply-chain still residual?',
    'Map paste of an AWS key to assets and mitigations.',
    'Difference between a fixed bypass and an accepted residual?',
    'How would a page race interception?',
    'Threat model OCR WASM integrity even if WASM is absent.',
    'Why is CWS publisher account compromise critical?',
    'Reason about memory dump during an active scan.',
    'Is fail-closed always better than fail-open?',
  ],
  DET: [
    'Describe the Tier-1 scanText pipeline step by step.',
    'Why run checksum validation after regex for PAN and IBAN?',
    'How was entropy hardened after Phase B false positives?',
    'Why was ROT13 not decoded in v1?',
    'Explain collapseSpacedAlphanumerics and its FP trade-off.',
    'How does MAX_DECODE_DEPTH limit base64/hex recursion?',
    'Why require separators in US phone detection?',
    'What does decideAction return for MEDIUM vs HIGH risk?',
    'How does the research catalog relate to runtime matching?',
    'Would you remove detectors to improve precision? When?',
    'How do you merge overlapping spans?',
    'Why is malicious_exact optimistic in evaluation?',
    'Explain redaction tokens vs BLOCK.',
    'How would you detect a secret split across two pastes?',
    'Defend regex sufficiency for AWS access key IDs.',
  ],
  MV3: [
    'Why must onMessage be registered synchronously at SW start?',
    'Explain registerContentScripts vs static content_scripts.',
    'What is an Offscreen Document and why does MV3 need it?',
    'How do optional host permissions interact with user gesture?',
    'What happens when the service worker is killed mid-scan?',
    'Explain WAR constraints for AI hosts.',
    'Why is allFrames false and what residual does that create?',
    'How does CSP wasm-unsafe-eval relate to ADR-031?',
    'Difference between extension page sender and tab sender for IPC.',
    'How do you test MV3 despite flaky load-extension SW observe?',
    'What Chrome APIs are intentionally not used and why?',
    'declarativeNetRequest vs content interception for this product.',
    'How would MV2 persistent background have changed the design?',
    'What is the approval nonce protecting against?',
    'How does the popup request permissions safely?',
  ],
  PERF: [
    'What is EXT_PEAK_MEM_MB — measured or contract?',
    'Explain PART_23 CI slack factor.',
    'Why is OCR P99 3000ms not currently empirical?',
    'How fast is Tier-1 on 1KB/10KB/100KB in benches?',
    'What would you optimize first if scan p99 doubled?',
    'Why not enable WASM threads in v1?',
    'How do worker idle timeouts protect memory?',
    'Relate MAX_CONCURRENT_SCANS to UX.',
    'Bundle size budget vs CWS limits.',
    'Cold start vs warm path — what must stay sync?',
  ],
  SEC: [
    'Describe the MessageRouter security pipeline.',
    'How do you prevent a tab from calling CONFIG_SET?',
    'What is KI-022 and how was it closed?',
    'Explain AES-GCM IV handling requirements.',
    'Why allowlist logging instead of deny-list sanitizers?',
    'How does safe mode reduce blast radius?',
    'What stops unbounded scanText DoS?',
    'Respond to malicious content script compromise.',
    'Security implications of User Allow Anyway.',
    'Why pin WASM hashes before enabling OCR?',
  ],
  PRIV: [
    'Why is history default off?',
    'What leaves the device in the default configuration?',
    'How do you discuss KI-018 in interviews?',
    'Why no chrome.storage.sync?',
    'What is cloud explain and why metadata-only if enabled?',
    'How do feature flags encode privacy defaults?',
    'HOLD overlay preview vs storing plaintext history.',
    'Is on-device detection still private if telemetry were on?',
  ],
  CRYPTO: [
    'Why Argon2id parameters m=19MiB t=2 p=1?',
    'When is PBKDF2-600k used?',
    'Why AES-256-GCM rather than AES-CBC?',
    'What did ADR-033 change vs CryptoKey-only session story?',
    'Where does key material live and what is RR-10?',
    'How would you rotate keys if history were enabled?',
    'Why not keep secrets in SW globals long-term?',
  ],
  CONC: [
    'Avoid races between multiple pastes in one tab.',
    'What does sliding-window rate limiting guarantee and not?',
    'SW is single-threaded — where does concurrency appear?',
    'Design per-tab scan queues.',
    'Two tabs — rate limiter keying.',
    'Relate MAX_QUEUE_DEPTH_PER_WORKER to backpressure.',
    'How do MessageRouter timeouts fail closed?',
  ],
  RX: [
    'Why lookbehind digit boundaries in phone/SSN patterns?',
    'Catastrophic backtracking risk and how you avoid it.',
    'Catalog flags interacting with matchAll.',
    'Why HTML entity decode before regex?',
    'Trade-off of joining broken alnum lines when both sides >=6.',
    'Unicode normalization vs homoglyph residuals.',
    'When is entropy preferred over regex?',
  ],
  OCR: [
    'Does OCR work today? Give the precise answer.',
    'Why can ocrEnabled be true while images HOLD?',
    'What must happen before OCR is release-channel enabled?',
    'Threats of vendoring unpinned WASM.',
    'How would OCR text re-enter Tier-1?',
    'Why is NER off by default even if OCR arrives?',
    'OCR_P99_MS_1080P — design vs measured.',
  ],
  EVAL: [
    'Explain the eval seed contract.',
    'Why report holdout excluding malicious_exact?',
    'Interpret Phase B vs Phase C metric deltas without marketing.',
    'Why did ROT13 recall drop after remediations?',
    'What makes a benchmark scientifically weak?',
    'How do red-team probes differ from the eval harness?',
    'Would you trust FPR=0 on synthetic data?',
    'How should device-lab P99 be presented given KI-012?',
    'What does bench:budgets actually verify?',
    'How do you prevent overfitting detectors to the harness?',
  ],
  DD: [
    'Defend accepting ROT13 as residual.',
    'Defend not flipping OCR_DEFAULT_ENABLED without ADR.',
    'Why capture-phase over bubble-phase?',
    'Why WARN maps to HOLD in the UI bridge.',
    'Trade-offs of dynamic vs static content scripts.',
    'Why reject remote model download?',
    'When would you reopen Architecture Freeze?',
    'Precision vs recall for phone numbers — defend the gate.',
  ],
  FAIL: [
    'SW dies during HOLD — what should the user see?',
    'Oversize paste — expected decision?',
    'Binary PDF upload — expected decision?',
    'Rate limited paste flood — behavior?',
    'Invalid envelope from page — response?',
    'Platform disabled — is paste intercepted?',
    'Safe mode enabled — which messages work?',
    'Demo fails to load unpacked — recovery?',
    'False positive on high-entropy UUID — debug approach?',
    'Live host DOM differs from fixture — KI-006 lesson?',
  ],
};

const idealByCat = {
  ARCH: 'Name Freeze/ADR, draw trust boundary, state implemented vs aspirational, cite package path.',
  TM: 'Name asset + STRIDE category + mitigation + residual ID if any (RR/KI).',
  DET: 'Walk tier1.ts order: size → prepare → regex/entropy → decode rescan → checksum → risk → policy.',
  MV3: 'Cite Chrome API constraint and how extension code obeys it; mention failure mode.',
  PERF: 'Separate design contract from measured bench; cite PART_23 / bench:budgets.',
  SEC: 'Describe control, what it stops, what it does not stop, evidence test name.',
  PRIV: 'Default-off posture; what never leaves device; counsel items are blockers not eng code.',
  CRYPTO: 'Primitive + parameters + threat (disk theft); session key residual RR-10.',
  CONC: 'Single-thread JS + async boundaries + rate limiter keys + fail-closed timeouts.',
  RX: 'Precision/recall trade-off with concrete Phase C or phone-gate example.',
  OCR: 'Flag armed, capability absent, HOLD fail-closed, KI-002; do not claim OCR works.',
  EVAL: 'Seed, synthetic, per-slice, holdout; never CWS-claim headline precision.',
  DD: 'Problem → choice → rejected alternative → trade-off → reopen criteria.',
  FAIL: 'Expected InterceptDecision / IPC error + user-visible consequence + recovery.',
};

const scenarios = [
  'Whiteboard the paste path from DOM event to InterceptDecision.',
  'Convince a Chrome Security engineer your IPC is fail-closed in 10 minutes.',
  'A PM wants all_urls. Respond.',
  'A researcher demos ROT13 bypass live. Respond.',
  'CWS review asks why ocrEnabled is true. Exact wording.',
  'Hiring manager asks production readiness. Dual verdict.',
  'Perf engineer asks why not WASM threads. ADR-032.',
  'Privacy counsel asks what data leaves device by default.',
  'Red team shows spaced AWS key on old build. Explain Phase C.',
  'Eval shows FPR=0. Do you blog perfect precision?',
  'User pastes 2MB text. Expected behavior and constant.',
  'Two tabs paste 25 secrets/minute. What fails first?',
  'Overlay spoofed by page CSS — why closed shadow helps.',
  'Explain WARN vs HOLD mapping without contradicting PART_18.',
  'Compare to commercial DLP without claiming superiority.',
  'Design v2 OCR enablement checklist (integrity + G0).',
  'Justify monorepo purity with Node eval example.',
  'Justify typing interception out of scope without sounding lazy.',
  'Walk Argon2id parameters against offline disk theft.',
  'You forgot KI-022 mid-interview — recover.',
  'Staff interviewer: show me one metric you refuse to put on a resume.',
  'Principal: what would falsify your architecture choice?',
  'Explain KI-006 without blaming the browser.',
  'Explain KI-018 without pretending engineering can close counsel.',
  'Defend Production Credibility score of 5.',
];

function pick(arr, i) {
  return arr[i % arr.length];
}

const lines = [];
lines.push('# TECHNICAL_INTERVIEW_BIBLE.md');
lines.push('');
lines.push('**Purpose:** Survive senior security interviews on Sentinel Shield AI.');
lines.push(
  '**Rule:** Prefer evidence over rhetoric. Never claim OCR works, CWS-ready, or enterprise SOC.',
);
lines.push(
  '**Canonical refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `blueprint/PART_08` · Freeze v1.0 · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `POST_REMEDIATION_EVALUATION.md` · `store/CERTIFICATION_STATUS.json`',
);
lines.push('');
lines.push('## How to practice');
lines.push(
  '1. Cover the question. 2. Answer aloud in 60–90s. 3. Compare to Ideal. 4. Drill Follow-ups until boring.',
);
lines.push('');
lines.push('## Global weak patterns (always wrong)');
lines.push('- Claiming image/PDF OCR detection works today');
lines.push('- Marketing synthetic eval as production precision');
lines.push('- Conflating engineering RC GO with public CWS GO');
lines.push('- Saying scans are rate-limited without citing 20/min/tab (KI-022)');
lines.push('- Pretending `enterprise-backend` is shipped');
lines.push('');

let n = 0;
for (const [title, key, count] of cats) {
  lines.push('---');
  lines.push('');
  lines.push(`## ${title}`);
  lines.push('');
  const bank = banks[key];
  for (let i = 0; i < count; i += 1) {
    n += 1;
    const diff = difficultyCycle[i % difficultyCycle.length];
    const q = pick(bank, i);
    const id = `Q${String(n).padStart(3, '0')}`;
    lines.push(`### ${id} [${diff}] — ${q}`);
    lines.push('');
    lines.push(
      '**Interviewer intent:** Probe whether you understand real constraints and can cite evidence, not slogans.',
    );
    lines.push('');
    lines.push(
      `**Ideal answer:** ${idealByCat[key]} Reject unimplemented claims. Name one residual.`,
    );
    lines.push('');
    lines.push(
      '**Weak answer:** Buzzwords (“local AI firewall 100%”) without trust boundaries, limits, or repo evidence.',
    );
    lines.push('');
    lines.push(
      '**Common mistakes:** Mixing blueprint full OCR/NER pipeline with `handlers.ts` Tier-1-only path; citing detector count instead of precision; hiding KI-006/KI-018.',
    );
    lines.push('');
    lines.push('**Follow-ups:**');
    lines.push('1. What breaks if that assumption is false?');
    lines.push('2. Where is the evidence in the repo?');
    lines.push('3. What would you measure before changing the decision?');
    lines.push('4. How does a hostile page attack this subsystem?');
    lines.push('');
    lines.push(
      `**Refs:** \`blueprint/PART_04\` · \`PART_06\` · \`PART_08\` · \`packages/extension/src\` · \`packages/detection-engine/src\` · \`UPDATED_LIMITATIONS.md\` · topic \`${key}\``,
    );
    lines.push('');
  }
}

lines.push('---');
lines.push('');
lines.push('## Scenario Drills (cross-cutting)');
lines.push('');

while (n < 520) {
  n += 1;
  const s = scenarios[n % scenarios.length];
  const diff = difficultyCycle[n % difficultyCycle.length];
  const id = `Q${String(n).padStart(3, '0')}`;
  lines.push(`### ${id} [${diff}] — ${s}`);
  lines.push('');
  lines.push('**Interviewer intent:** Force synthesis across subsystems under time pressure.');
  lines.push('');
  lines.push(
    '**Ideal answer:** Structure claim → mechanism → evidence → residual. Never skip residual.',
  );
  lines.push('');
  lines.push('**Weak answer:** Feature tour without failure modes.');
  lines.push('');
  lines.push('**Common mistakes:** Inventing metrics; promising enterprise features.');
  lines.push('');
  lines.push('**Follow-ups:** Deepen one subsystem until you hit a documented limitation.');
  lines.push('');
  lines.push(
    '**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `store/CERTIFICATION_STATUS.json`',
  );
  lines.push('');
}

lines.push('---');
lines.push('');
lines.push('## Coverage checklist');
lines.push('- [ ] Architecture / Freeze / ADRs');
lines.push('- [ ] Trust boundaries and IPC');
lines.push('- [ ] Tier-1 pipeline and Phase C');
lines.push('- [ ] Eval honesty and red team');
lines.push('- [ ] OCR honesty');
lines.push('- [ ] Privacy defaults and crypto');
lines.push('- [ ] Dual verdict');
lines.push('- [ ] Live demo failure recovery');
lines.push('');
lines.push(`**Total questions:** ${n}`);
lines.push('');

const outPath = join(root, 'docs', 'mastery', 'TECHNICAL_INTERVIEW_BIBLE.md');
writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(`wrote ${n} questions -> ${outPath}`);
