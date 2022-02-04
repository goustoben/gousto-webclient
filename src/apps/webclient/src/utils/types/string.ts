/**
 * Utility type to infer a tuple as a result of invoking string.split(separator)
 * @example
 * 'foo.bar.baz'.split('.') as Split<'foo.bar.baz', '.'> -> ['foo', 'bar', 'baz']
 */
export type Split<S extends string, Separator extends string> = S extends ''
  ? []
  : S extends `${infer T}${Separator}${infer Rest}`
  ? [T, ...Split<Rest, Separator>]
  : [S]
