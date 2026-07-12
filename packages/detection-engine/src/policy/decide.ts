/**
 * Policy decision — PART_18 (default local policy).
 * WARN for medium+, BLOCK for critical secrets; never silent allow of HIGH+.
 */

import { PolicyAction, RiskLevel } from '@sentinel-shield/shared-types';

export function decideAction(risk: RiskLevel): PolicyAction {
  switch (risk) {
    case RiskLevel.NONE:
      return PolicyAction.ALLOW;
    case RiskLevel.LOW:
      return PolicyAction.WARN;
    case RiskLevel.MEDIUM:
      // PART_18: medium → force_redact when spans exist (applied in scan-bridge).
      return PolicyAction.REDACT;
    case RiskLevel.HIGH:
      return PolicyAction.BLOCK;
    case RiskLevel.CRITICAL:
      return PolicyAction.BLOCK;
    default: {
      const _exhaustive: never = risk;
      return _exhaustive;
    }
  }
}
