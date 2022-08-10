/**
 * Operate on a value that may or may not be a promise, only yielding the thread if necessary
 *
 * Calling 'await' on a non-promise value creates a context switching penalty, so this is a
 * optimisation for hot code
 */
export function withResolved<T, U>(
  value: T | Promise<T>,
  callback: (value: T) => U | Promise<U>
): U | Promise<U> {
  if (value instanceof Promise) {
    return value.then(callback)
  } else {
    return callback(value)
  }
}

export function isRealObject (u: unknown): u is Record<string | number, unknown> {
  return u !== null && typeof u === 'object'
}

export function hasProp <K extends string> (key: K, record: Record<string | number, unknown>): record is { [_ in K]: unknown } {
  return key in record
}
