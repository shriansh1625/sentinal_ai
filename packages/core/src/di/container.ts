/**
 * Lightweight DI container — no global singleton abuse.
 * Owner: PART_28 foundation / Sprint 0.
 * Tokens are opaque symbols; factories are registered explicitly.
 */

export type ServiceToken<T> = symbol & { readonly __type?: T };

export function createToken<T>(description: string): ServiceToken<T> {
  return Symbol(description);
}
type Factory<T> = (container: Container) => T;

interface Registration<T> {
  readonly factory: Factory<T>;
  readonly lifetime: 'singleton' | 'transient';
  instance?: T;
}

export class Container {
  private readonly registrations = new Map<symbol, Registration<unknown>>();
  private readonly resolving = new Set<symbol>();

  registerSingleton<T>(token: ServiceToken<T>, factory: Factory<T>): void {
    this.registrations.set(token, { factory, lifetime: 'singleton' });
  }

  registerTransient<T>(token: ServiceToken<T>, factory: Factory<T>): void {
    this.registrations.set(token, { factory, lifetime: 'transient' });
  }

  resolve<T>(token: ServiceToken<T>): T {
    const registration = this.registrations.get(token);
    if (!registration) {
      throw new Error(`DI: no registration for ${token.description}`);
    }
    if (this.resolving.has(token)) {
      throw new Error(`DI: circular dependency involving ${token.description}`);
    }
    if (registration.lifetime === 'singleton' && registration.instance !== undefined) {
      return registration.instance as T;
    }
    this.resolving.add(token);
    try {
      const instance = registration.factory(this) as T;
      if (registration.lifetime === 'singleton') {
        registration.instance = instance;
      }
      return instance;
    } finally {
      this.resolving.delete(token);
    }
  }

  has(token: ServiceToken<unknown>): boolean {
    return this.registrations.has(token);
  }
}
