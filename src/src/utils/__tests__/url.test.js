import { slugify } from 'utils/url'

describe('slugify', () => {
  const cases = [
    ['oneword', 'oneword'],
    ['hello-world', 'hello-world'],
    ['hello world', 'hello-world'],
    [' hello world ', 'hello-world'],
    ['multiple    spaces', 'multiple-spaces'],
    ['special characters!', 'special-characters'],
  ]

  describe.each(cases)("given an input of '%s'", (input, expected) => {
    describe('when request slug', () => {
      let result

      beforeEach(() => {
        result = slugify(input)
      })

      test(`then should equal '${expected}'`, () => {
        expect(result).toEqual(expected)
      })
    })
  })
})
