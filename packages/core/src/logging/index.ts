/**
 * Allowlist logging — PART_26.
 * Never logs raw user content, secrets, or PII payloads.
 */

export const LogLevel = {
  DEBUG: 10,
  INFO: 20,
  WARN: 30,
  ERROR: 40,
  SILENT: 100,
} as const;

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

export type LogFieldPrimitive = string | number | boolean | null;

/** Allowed structured fields only — no free-form blobs. */
export type LogFields = Readonly<Record<string, LogFieldPrimitive>>;

export interface LogRecord {
  readonly level: LogLevel;
  readonly message: string;
  readonly timestampMs: number;
  readonly fields: LogFields;
}

export interface LogSink {
  write(record: LogRecord): void;
}

export interface Logger {
  debug(message: string, fields?: LogFields): void;
  info(message: string, fields?: LogFields): void;
  warn(message: string, fields?: LogFields): void;
  error(message: string, fields?: LogFields): void;
  child(fields: LogFields): Logger;
}

const FORBIDDEN_FIELD_KEYS = new Set([
  'password',
  'secret',
  'token',
  'apiKey',
  'api_key',
  'content',
  'payload',
  'clipboard',
  'raw',
  'pii',
]);

function sanitizeFields(fields: LogFields | undefined): LogFields {
  if (!fields) {
    return {};
  }
  const out: Record<string, LogFieldPrimitive> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (FORBIDDEN_FIELD_KEYS.has(key)) {
      continue;
    }
    out[key] = value;
  }
  return out;
}

export class ConsoleLogSink implements LogSink {
  write(record: LogRecord): void {
    const line = {
      level: record.level,
      message: record.message,
      timestampMs: record.timestampMs,
      ...record.fields,
    };
    if (record.level >= LogLevel.ERROR) {
      console.error(line);
      return;
    }
    if (record.level >= LogLevel.WARN) {
      console.warn(line);
      return;
    }
    console.info(line);
  }
}

export class MemoryLogSink implements LogSink {
  readonly records: LogRecord[] = [];

  write(record: LogRecord): void {
    this.records.push(record);
  }
}

export class AllowlistLogger implements Logger {
  constructor(
    private readonly sink: LogSink,
    private readonly minLevel: LogLevel,
    private readonly baseFields: LogFields = {},
  ) {}

  debug(message: string, fields?: LogFields): void {
    this.emit(LogLevel.DEBUG, message, fields);
  }

  info(message: string, fields?: LogFields): void {
    this.emit(LogLevel.INFO, message, fields);
  }

  warn(message: string, fields?: LogFields): void {
    this.emit(LogLevel.WARN, message, fields);
  }

  error(message: string, fields?: LogFields): void {
    this.emit(LogLevel.ERROR, message, fields);
  }

  child(fields: LogFields): Logger {
    return new AllowlistLogger(this.sink, this.minLevel, {
      ...this.baseFields,
      ...sanitizeFields(fields),
    });
  }

  private emit(level: LogLevel, message: string, fields?: LogFields): void {
    if (level < this.minLevel) {
      return;
    }
    this.sink.write({
      level,
      message,
      timestampMs: Date.now(),
      fields: { ...this.baseFields, ...sanitizeFields(fields) },
    });
  }
}
