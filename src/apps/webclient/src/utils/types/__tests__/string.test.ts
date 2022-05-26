import type { TypesEqual } from '_testing/typesEqual'

import { Split } from '../string'

describe('string type utils', () => {
  describe('Split', () => {
    it('Successful split: string "foo.bar.baz", separator "." -> ["foo", "bar", "baz"]', () => {
      const Input = 'foo.bar.baz'
      type Output = Split<typeof Input, '.'>

      const _typeCheck: TypesEqual<Output, ['foo', 'bar', 'baz']> = true
    })

    it('Unsuccessful split: string "foobar", separator "." -> ["foobar"]', () => {
      const Input = 'foobar'
      type Output = Split<typeof Input, '.'>

      const _typeCheck: TypesEqual<Output, ['foobar']> = true
    })
  })
})
