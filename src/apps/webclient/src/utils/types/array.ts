/**
 * Utility type to return type of last element in tuple
 * For typed arrays i.e. string[] will return string
 *
 * @example
 * type Tup = [number, string, boolean]
 * LastOfTuple<Tup>: boolean
 */
export type LastOfTuple<Tuple extends unknown[]> = Tuple extends [...infer _Rest, infer Last]
  ? Last
  : Tuple extends Array<infer Last>
  ? Last
  : never

/**
 * Utility type to return type of first element in tuple
 * For typed arrays i.e. string[] will return string
 *
 * @example
 * type Tup = [number, string, boolean]
 * FirstOfTuple<Tup>: number
 */
export type FirstOfTuple<Tuple extends unknown[]> = Tuple extends [infer First, ...infer _Rest]
  ? First
  : Tuple extends Array<infer First>
  ? First
  : never
