/** Engineering utilities — deterministic helpers with no I/O. */

export function assertNever(value: never, message = 'Unexpected value'): never {
  throw new Error(`${message}: ${String(value)}`);
}

export function freezeDeep<T extends object>(value: T): Readonly<T> {
  for (const key of Object.keys(value) as (keyof T)[]) {
    const child = value[key];
    if (child !== null && typeof child === 'object') {
      freezeDeep(child as object);
    }
  }
  return Object.freeze(value);
}

export function createRequestId(random: () => number = Math.random): string {
  const time = Date.now().toString(36);
  const entropy = Math.floor(random() * 1e9).toString(36);
  return `${time}-${entropy}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
