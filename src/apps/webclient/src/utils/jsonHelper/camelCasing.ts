/**
 * Types
 * ============================================================================
 */

/**
 * Maps any snake_case string literal to its camelCased equivalent via recursive transformation
 * Template literal types were introduced in TypeScript 4.1
 */
export type SnakeToCamelCase<Input extends string> = Input extends `${infer Head}_${infer Tail}`
  ? Tail extends ''
    ? `${Head}_` // For an input like 'suffixed_'
    : `${Head}${Capitalize<SnakeToCamelCase<Tail>>}` // 'head_tail' -> 'headTail'
  : Input

type CamelCaseIfString<Input> = Input extends string ? SnakeToCamelCase<Input> : Input

/**
 * For mapping object properties, e.g. { snake_case: type } => { camelCase: type }, or arrays thereof
 */

export type CamelCasedValue<T> = T extends Record<string, unknown>
  ? SnakeToCamelCaseRecord<T>
  : T extends Array<infer U>
  ? Array<CamelCasedValue<U>>
  : T

type SnakeToCamelCaseRecord<Input extends Record<any, any>> = {
  [Property in keyof Input as CamelCaseIfString<Property>]: CamelCasedValue<Input[Property]>
}

/**
 * Internals
 * ============================================================================
 */

/**
 * Transform a single snake_case string to camelCase
 */
function snakeToCamelCase<S extends string>(str: S) {
  return str.replace(/([_][a-zA-Z\d])/g, (group) =>
    group.toUpperCase().replace('_', '')
  ) as SnakeToCamelCase<S>
}

/**
 * Module
 * ============================================================================
 */

export function parseObjectKeysToCamelCase<T>(obj: T): CamelCasedValue<T> {
  /**
   * This function uses quite a few type assertions. Ideally we would only rarely
   * do that in most of our application code. At a future point we should try
   * refactor this function to reduce the number of `as` clauses.
   */

  // Bail out when we reach leaf nodes
  if (typeof obj !== 'object') return obj as CamelCasedValue<T>

  return Object.keys(obj).reduce((camelCaseObject, currentKey) => {
    const currentValue = (obj as Record<string, unknown>)[currentKey]
    let parsedValue

    switch (true) {
      case Array.isArray(currentValue):
        parsedValue = (currentValue as unknown[]).map(parseObjectKeysToCamelCase)
        break
      case typeof currentValue === 'object' && currentValue !== null:
        parsedValue = { ...parseObjectKeysToCamelCase(currentValue as Record<string, unknown>) }
        break
      default:
        parsedValue = currentValue
    }

    return {
      ...camelCaseObject,
      [snakeToCamelCase(currentKey)]: parsedValue,
    }
  }, {} as SnakeToCamelCaseRecord<T>) as CamelCasedValue<T>
}
