import { anyUnset } from '../object'

describe('Object utils', () => {
  describe('anyUnset', () => {
    describe.each([
      [[true, '', {}], false],
      [[false, 'undefined', 0], false],
      [[null, 1, []], true],
      [['1', undefined, true], true],
      [[], true],
    ])('Given anyUnset is passed passed arguments %p', (args, expected) => {
      test(`Then ${expected} is returned`, () => {
        expect(anyUnset(...args)).toEqual(expected)
      })
    })
  })
})
