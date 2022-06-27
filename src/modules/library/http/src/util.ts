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
