/**
 * One-shot generator for INTERVIEW_DEFENSE_PLAYBOOK.md
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');

const sessions = [
  [
    'Architecture',
    'Why should I trust an extension with paste content?',
    'Local-only Tier-1; no detection-engine network; history off; explain TB-3 vs TB-4.',
  ],
  [
    'Architecture',
    'Draw the system. I will interrupt.',
    'CS → SW → detection-engine; offscreen stub; no CS→offscreen.',
  ],
  [
    'Architecture',
    'Blueprint says OCR workers. Where are they?',
    'Flag armed; worker-pool fail-closed; KI-002; do not claim OCR.',
  ],
  [
    'Architecture',
    'Coordinator vs agents — prove you understand ADR-005.',
    'Determinism, rate limits, single observation; reject ADR-S1.',
  ],
  [
    'Architecture',
    'What does Freeze authorize today?',
    'Implement frozen arch; NOT CWS publish; NOT NER/CV on; NOT all_urls.',
  ],
  [
    'MV3',
    'Service worker died. Did you leak?',
    'ADR-036 HOLD; no silent release; cite input-pipelines.',
  ],
  [
    'MV3',
    'Why sync onMessage registration?',
    'Avoid Receiving end does not exist; background.ts pattern.',
  ],
  [
    'MV3',
    'Optional permissions theater — defend ADR-035.',
    'Least privilege; AI hosts only; user gesture enable.',
  ],
  [
    'MV3',
    'allFrames false — attack?',
    'Iframe AI embeds may bypass; accepted residual; document it.',
  ],
  [
    'MV3',
    'Offscreen justification if OCR absent?',
    'Architecture ready; fail-closed honest; handshake exists.',
  ],
  ['IPC', 'Forge CONFIG_SET from a tab.', 'Sender auth FORBIDDEN; phase3 tests.'],
  ['IPC', 'Flood INTERCEPT_EVENT.', 'IPC 30 + scan 20; KI-022 closed; RATE_LIMITED.'],
  ['IPC', 'Malformed envelope.', 'assertIpcEnvelope → INVALID_MESSAGE fail-closed.'],
  ['IPC', 'Safe mode purpose?', 'Blast radius reduction; allow health/config get only.'],
  ['IPC', 'SCAN_REQUEST vs INTERCEPT_EVENT?', 'Live path uses INTERCEPT_EVENT; both scan-limited.'],
  ['Detection', 'Walk scanText.', 'Size→prepare→regex/entropy→b64/hex→checksum→risk→policy.'],
  ['Detection', 'Show a bypass you accept.', 'ROT13 AWS; BYPASS_DATABASE; FP risk if decoded.'],
  [
    'Detection',
    'Show a bypass you fixed.',
    'Spaced AKIA; collapseSpacedAlphanumerics; spaced recall.',
  ],
  ['Detection', 'Why Luhn after regex?', 'Drop non-PAN digit strings; raise confidence.'],
  ['Detection', 'Entropy FP story.', 'Phase B hard-neg FPR ~0.30; Phase C charset gates.'],
  ['Detection', 'Phone precision gate.', 'Separators required; contiguous digits FN accepted.'],
  [
    'Detection',
    'Detector count flex.',
    'Reject; optimize precision; catalog is research metadata.',
  ],
  ['Detection', 'WARN vs HOLD.', 'Policy WARN; UI bridge HOLD for human decision.'],
  ['Detection', 'Oversize text.', 'MAX_TEXT_SCAN_BYTES 1MiB; BLOCK fail-closed.'],
  ['Detection', 'Secret in base64.', 'Depth-bounded decode+rescan; MAX_DECODE_DEPTH=3.'],
  [
    'Threat',
    'ROOT1 compromise extension.',
    'Update integrity, storage encryption, minimal telemetry.',
  ],
  ['Threat', 'ROOT2 bypass detection.', 'Encoding, clipboard API, native apps, Allow Anyway.'],
  ['Threat', 'Overlay spoof.', 'Closed Shadow DOM ADR-014 + approval nonce.'],
  ['Threat', 'WASM supply chain.', 'Must pin SHA-256 before enable; currently absent.'],
  ['Threat', 'User clicks Allow always.', 'RR-09 product limit; enterprise block future.'],
  ['Threat', 'Memory dump.', 'Minimize lifetime; history off; residual RR-03.'],
  [
    'Privacy',
    'What leaves device default?',
    'Nothing for detection; telemetry off; cloud explain off.',
  ],
  [
    'Privacy',
    'History on — consequences?',
    'Encrypted at rest; still sensitive; default off ADR-033.',
  ],
  ['Privacy', 'KI-018?', 'Counsel URL blocker; eng cannot invent policy.'],
  ['Privacy', 'storage.sync?', 'Forbidden ADR-020; would sync secrets config.'],
  ['Crypto', 'Why Argon2id params?', 'Ownership matrix; interactive KDF budget; PBKDF2 fallback.'],
  ['Crypto', 'AES-GCM IV reuse?', 'Random IV per record; never reuse with key.'],
  ['Crypto', 'RR-10 session key.', 'Session material risk; short-lived; history off mitigates.'],
  ['Perf', 'Is 256MB measured?', 'Design contract EXT_PEAK_MEM_MB; benches check constants/dist.'],
  ['Perf', 'OCR 3000ms?', 'Design only; N/A without WASM.'],
  ['Perf', 'Why no threads?', 'ADR-032 COI brittleness; SIMD single-thread.'],
  [
    'Perf',
    'If p99 regresses 10x?',
    'Rollback; profile prepare vs catalog; do not add complexity first.',
  ],
  ['Eval', 'Sell me 99% precision.', 'Refuse; synthetic; holdout; not production.'],
  ['Eval', 'Seed importance?', 'Reproducibility contract 1581719041.'],
  ['Eval', 'Phase C ROT13 recall drop.', 'Expected side effect of entropy harden; accepted.'],
  ['Eval', 'Red team vs eval.', 'Probes adversarial classes; eval aggregate metrics.'],
  ['Eval', 'Overfit risk.', 'malicious_exact; holdout excludes; still synthetic.'],
  ['Product', 'Production ready?', 'Eng RC yes; public NO-GO G3/KI-006/KI-018.'],
  ['Product', 'Better than enterprise DLP?', 'Different problem class; no superiority claim.'],
  ['Product', 'Typing next?', 'Out of freeze; high cost; incomplete coverage anyway.'],
  ['Product', 'Enterprise backend?', 'Placeholder 0.0.0; do not claim.'],
  ['Demo', 'Binary upload in demo.', 'Expect HOLD OCR unavailable — success if fail-closed.'],
  ['Demo', 'Demo extension fails to inject.', 'Check permission enable; reload; fixture host.'],
  ['Demo', 'Audience asks for ChatGPT live.', 'State KI-006; offer fixture + honest status.'],
  [
    'Hiring',
    'What would you not put on a resume?',
    'Production precision %; OCR capability; CWS ready.',
  ],
  [
    'Hiring',
    'Biggest engineering mistake in project?',
    'e.g. scan limiter unwired until gap board — fixed.',
  ],
  [
    'Hiring',
    'Why diminishing returns on code?',
    'Board statement; whitepaper/external validation next.',
  ],
  [
    'Staff',
    'Falsify local-first thesis.',
    'If detection required cloud to be useful — product fails thesis.',
  ],
  ['Staff', 'Reopen freeze criteria.', 'New threat class with measured evidence + ADR.'],
  [
    'Staff',
    'Maintainability risk.',
    'Doc/code drift blueprint vs handlers; mitigate with honesty docs.',
  ],
  [
    'Principal',
    'Innovation vs competence?',
    'Competence in MV3 privacy boundary; innovation limited — honest.',
  ],
  [
    'Principal',
    'Production credibility 5 — agree?',
    'Yes; public blockers + OCR absent + synthetic eval.',
  ],
  [
    'Principal',
    'What hires you from this?',
    'Judgment under constraints; evidence discipline; threat honesty.',
  ],
  [
    'Chrome',
    'Why not declarativeNetRequest?',
    'Need payload inspection before page consume; DNR wrong layer.',
  ],
  ['Chrome', 'WAR least privilege.', 'Match AI hosts; ADR-035.'],
  [
    'Chrome',
    'Ephemeral SW design implications.',
    'Externalize state; HOLD on death; early listeners.',
  ],
  [
    'PANW',
    'How is this not endpoint DLP?',
    'Browser event boundary; AI host scoped; local-first paste firewall.',
  ],
  ['PANW', 'Detection quality bar.', 'Checksum+entropy+red team; not signature count vanity.'],
  ['PANW', 'Residual risk communication.', 'BYPASS_DATABASE + UPDATED_LIMITATIONS.'],
  ['ApplePriv', 'On-device story holes?', 'Session keys; user override; clipboard API residual.'],
  ['ApplePriv', 'Preview text on overlay?', 'Minimization; history off; no telemetry.'],
  ['ToB', 'Attack the approval nonce.', 'Forged events without nonce fail; cite tests.'],
  ['ToB', 'Find a logic bug class.', 'WARN/HOLD mapping; rate limit keying; OCR flag confusion.'],
  [
    'PZ',
    'Weird machine / encoding bypass beyond ROT13.',
    'Chunk beyond heuristics; novel ciphers; disclose + defer.',
  ],
  ['PZ', 'Browser bug trust.', 'RR-02 WASM escape accepted; depend on Chrome.'],
  [
    'IEEE',
    'Related work honesty.',
    'Browser DLP extensions; enterprise DLP; secret scanners — different constraints.',
  ],
  [
    'IEEE',
    'Evaluation methodology critique.',
    'Synthetic imbalance risk; holdout helps; need external corpus.',
  ],
  ['EM', 'Ship decision tomorrow?', 'Load-unpacked beta yes; CWS no.'],
  [
    'EM',
    'Team composition if continuing.',
    'Detection research + WASM integrity + counsel + live QA.',
  ],
  ['EM', 'Docs vs code investment now?', 'Communication/mastery > code per board.'],
  ['Whiteboard', 'Sequence diagram paste secret.', 'Include rate limit + overlay + nonce.'],
  ['Whiteboard', 'Threat tree bypass.', 'Include clipboard API and Allow Anyway.'],
  [
    'Whiteboard',
    'Package dependency graph.',
    'shared-types root; detection pure; extension integrates.',
  ],
  ['Deep', 'joinBrokenAlnumLines FP case.', 'Short words; threshold ≥6; explain.'],
  ['Deep', 'Hex rescan vs entropy on hex.', 'Decode path vs skip pure hex in entropy.'],
  ['Deep', 'Policy CRITICAL always BLOCK?', 'decide.ts HIGH/CRITICAL BLOCK; yes.'],
  [
    'Deep',
    'Feature flag ocrEnabled read path.',
    'Flags service; still HOLD in handler for binary.',
  ],
  ['Deep', 'Manifest version vs root 0.0.0.', 'KI-003 low; extension 0.2.1 certified.'],
  ['Adversarial', 'ZWSP in AWS key.', 'Non-finding if probes pass; cite BYPASS_DATABASE.'],
  ['Adversarial', 'Homoglyph email.', 'Subset table residual KI-010.'],
  ['Adversarial', 'Double base64.', 'Depth path; may catch via entropy/decode.'],
  [
    'Adversarial',
    'Prompt injection wrapper around secret.',
    'Still detect secret if plaintext present.',
  ],
  ['Ops', 'Beta user reports always HOLD on PNG.', 'Expected KI-002; communicate fail-closed.'],
  ['Ops', 'Beta user wants history.', 'Opt-in; warn encryption threat model.'],
  ['Ops', 'CI SW observe flake.', 'KI-014; package-shape gates.'],
  ['Ops', 'Release language review.', 'G4 claims PASS; no CWS authorize.'],
  ['Meta', 'Stop coding — defend.', 'Diminishing returns; Category A closed; whitepaper next.'],
  [
    'Meta',
    'What is still Category A if anything?',
    'Only new evidence (live bypass / security defect).',
  ],
  [
    'Meta',
    'How do you avoid doc rot?',
    'CERTIFICATION_STATUS + limitations as SoT; blueprint aspirational tagged.',
  ],
  [
    'Meta',
    'Interview scoring yourself.',
    'Architecture high; production credibility low-mid; say so.',
  ],
  [
    'Close',
    'Ask me a question that would fail a weak candidate.',
    'Does OCR work? / Are you CWS ready? / What is your FPR in production?',
  ],
  [
    'Close',
    'Strongest evidence artifact?',
    'Dual verdict JSON + red-team 37/39 + eval seed reports.',
  ],
  [
    'Close',
    'Weakest subsystem to attack in interview?',
    'OCR narrative; live G3; synthetic eval marketing.',
  ],
  [
    'Close',
    'One-sentence thesis.',
    'Local-first MV3 paste firewall for AI hosts with Tier-1 on-device detection and explicit residuals.',
  ],
];

// Expand to 110+ by variations
const extra = [];
for (let i = 0; i < 20; i += 1) {
  extra.push([
    'Drill',
    `Rapid fire ${i + 1}: name one implemented control and one accepted residual.`,
    'Example: scan rate 20/min implemented; ROT13 residual accepted.',
  ]);
}

const all = [...sessions, ...extra];

const lines = [];
lines.push('# INTERVIEW_DEFENSE_PLAYBOOK.md');
lines.push('');
lines.push('**Mode:** Hostile interviewer. No encouragement. Interrupt weak answers.');
lines.push('**How to use:** Cover Ideal Response. Speak. Then read Interrupts. Retry until clean.');
lines.push(`**Sessions:** ${all.length}`);
lines.push('');
lines.push('## Rules of engagement');
lines.push('- If you claim OCR works → session fail.');
lines.push('- If you claim CWS-ready → session fail.');
lines.push('- If you invent metrics → session fail.');
lines.push('- If you cannot name a residual → session fail.');
lines.push('');

all.forEach((row, idx) => {
  const [domain, prompt, ideal] = row;
  const id = `S${String(idx + 1).padStart(3, '0')}`;
  lines.push('---');
  lines.push('');
  lines.push(`## ${id} · ${domain}`);
  lines.push('');
  lines.push(`**Interviewer:** ${prompt}`);
  lines.push('');
  lines.push('**Interrupts (if weak):**');
  lines.push('- “That is brochure language. Show the trust boundary.”');
  lines.push('- “Is that implemented or blueprint?”');
  lines.push('- “What is the residual risk?”');
  lines.push('- “Where is the evidence file?”');
  lines.push('- “Would you put that number on a CWS listing?”');
  lines.push('');
  lines.push(`**Ideal response spine:** ${ideal}`);
  lines.push('');
  lines.push('**Expose-gap follow-ups:**');
  lines.push('1. What would a hostile page do next?');
  lines.push('2. What metric would change your mind?');
  lines.push('3. What must you not claim under oath?');
  lines.push('');
  lines.push(
    '**Refs:** `PROJECT_KNOWLEDGE_GRAPH.md` · `ARCHITECTURE_DEFENSE_GUIDE.md` · `UPDATED_LIMITATIONS.md` · `BYPASS_DATABASE.md` · `store/CERTIFICATION_STATUS.json`',
  );
  lines.push('');
});

lines.push('---');
lines.push('');
lines.push('## Mastery exit criteria');
lines.push('- Complete 30 sessions without OCR/CWS/metric lies.');
lines.push('- Whiteboard paste path twice from memory.');
lines.push('- Recite dual verdict and three public blockers.');
lines.push('- Explain Phase B→C eval deltas including ROT13 drop.');
lines.push('- Demo HOLD on binary as a success case.');
lines.push('');

writeFileSync(join(root, 'INTERVIEW_DEFENSE_PLAYBOOK.md'), lines.join('\n'), 'utf8');
console.log('sessions', all.length);
