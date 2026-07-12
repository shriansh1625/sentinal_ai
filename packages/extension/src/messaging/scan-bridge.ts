/**
 * Map scan policy → intercept decision — PART_18 / PART_20 / ADR-036.
 */

import { prepareForDetection, redactText } from '@sentinel-shield/detection-engine';
import { PolicyAction, type ScanResult } from '@sentinel-shield/shared-types';
import { InterceptDecision, type InterceptOutcome } from '@sentinel-shield/shared-types';

export function scanResultToInterceptOutcome(
  interceptId: string,
  result: ScanResult,
  originalText?: string,
): InterceptOutcome {
  // Spans are on PART_20-prepared text; redact the same prepared form.
  const prepared = originalText !== undefined ? prepareForDetection(originalText) : undefined;
  const redaction =
    prepared && result.spans.length > 0 ? redactText(prepared, result.spans) : undefined;

  const base = {
    interceptId,
    riskLevel: result.riskLevel,
    spanCount: result.spans.length,
    ...(redaction ? { redactedText: redaction.redactedText, preview: redaction.preview } : {}),
  };

  switch (result.action) {
    case PolicyAction.ALLOW:
      return {
        ...base,
        decision: InterceptDecision.ALLOW,
        reason: 'Tier-1 clean',
      };
    case PolicyAction.WARN:
      return {
        ...base,
        decision: InterceptDecision.HOLD,
        reason: `Warn: risk=${result.riskLevel} spans=${result.spans.length}`,
      };
    case PolicyAction.BLOCK:
      return {
        ...base,
        decision: InterceptDecision.BLOCK,
        reason: `Block: risk=${result.riskLevel}`,
      };
    case PolicyAction.REDACT:
      return {
        ...base,
        decision: InterceptDecision.REDACT,
        reason: `Redact: risk=${result.riskLevel}`,
      };
    default: {
      const _never: never = result.action;
      return _never;
    }
  }
}
