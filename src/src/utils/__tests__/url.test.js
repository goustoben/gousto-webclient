import { addUserIdToHelpUrl, slugify } from 'utils/url'

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

describe('given addUserIdToHelpUrl is called', () => {
  describe('when the customer is authenticated', () => {
    let result

    beforeEach(() => {
      result = addUserIdToHelpUrl(true, '123')
    })

    test('user_id is added to the url', () => {
      expect(result).toContain('zendesk.com/hc/en-gb/?user_id=123')
    })
  })

  describe('when the customer is not authenticated', () => {
    let result

    beforeEach(() => {
      result = addUserIdToHelpUrl(false, null)
    })

    test('user_id is not added to the url', () => {
      expect(result).not.toContain('?user_id=123')
    })
  })
})
