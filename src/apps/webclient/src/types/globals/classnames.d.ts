/**
 * Manually declare the `classnames` as version we use does not support typing out of the box.
 */

declare module 'classnames' {
  export type Value = string | number | boolean | undefined | null
  export type Mapping = Record<string, unknown>
  export interface ArgumentArray extends Array<Argument> {}
  export type Argument = Value | Mapping | ArgumentArray

  /**
   * A simple JavaScript utility for conditionally joining classNames together.
   */
  export default function classnames(...args: ArgumentArray): string
}
