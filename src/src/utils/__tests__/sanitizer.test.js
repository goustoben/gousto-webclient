import { sanitize } from '../sanitizer'

describe('sanitizer', () => {
  describe('sanitize', () => {
    const cases = [
      ['', ''],
      ["<div id='bob'></div>", '<div id="bob"></div>']
    ]

    describe.each(cases)("when call santize with '%s'", (input, expected) => {
      let result

      beforeEach(() => {
        result = sanitize(input)
      })

      test(`then result should equal '${expected}'`, () => {
        expect(result).toEqual(expected)
      })
    })
  })
})
