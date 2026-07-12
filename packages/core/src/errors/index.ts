/**
 * Global error framework — fail closed, typed, no silent swallow.
 * Owner: PART_12 (errors) / PART_14 (security posture).
 */

export const ErrorCode = {
  UNKNOWN: 'UNKNOWN',
  VALIDATION: 'VALIDATION',
  CONFIG: 'CONFIG',
  STORAGE: 'STORAGE',
  MESSAGING: 'MESSAGING',
  RATE_LIMIT: 'RATE_LIMIT',
  BUDGET_EXCEEDED: 'BUDGET_EXCEEDED',
  NOT_INITIALIZED: 'NOT_INITIALIZED',
  FORBIDDEN: 'FORBIDDEN',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export interface ErrorContext {
  readonly code: ErrorCode;
  readonly message: string;
  readonly cause?: unknown;
  readonly details?: Readonly<Record<string, string | number | boolean | null>>;
  readonly retriable: boolean;
}

export class SentinelError extends Error {
  readonly code: ErrorCode;
  readonly retriable: boolean;
  readonly details: Readonly<Record<string, string | number | boolean | null>>;

  constructor(context: ErrorContext) {
    super(context.message, context.cause !== undefined ? { cause: context.cause } : undefined);
    this.name = 'SentinelError';
    this.code = context.code;
    this.retriable = context.retriable;
    this.details = context.details ?? {};
  }
}

export function isSentinelError(value: unknown): value is SentinelError {
  return value instanceof SentinelError;
}

export function toSentinelError(
  value: unknown,
  fallbackCode: ErrorCode = ErrorCode.UNKNOWN,
): SentinelError {
  if (isSentinelError(value)) {
    return value;
  }
  if (value instanceof Error) {
    return new SentinelError({
      code: fallbackCode,
      message: value.message,
      cause: value,
      retriable: false,
    });
  }
  return new SentinelError({
    code: fallbackCode,
    message: 'Unknown failure',
    cause: value,
    retriable: false,
  });
}
