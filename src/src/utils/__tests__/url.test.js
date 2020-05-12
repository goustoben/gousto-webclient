import { addUserIdToUrl, slugify } from 'utils/url'

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

describe('given addUserIdToUrl is called', () => {
  const URL = 'https://some-url'
  const USER_ID = '123'

  describe('when the customer id is passed', () => {
    let result

    beforeEach(() => {
      result = addUserIdToUrl(URL, USER_ID)
    })

    test('user_id is added to the url', () => {
      expect(result).toBe(`${URL}/?user_id=${USER_ID}`)
    })
  })

  describe('when the customer id is not passed', () => {
    let result

    beforeEach(() => {
      result = addUserIdToUrl(URL, '')
    })

    test('user_id is not added to the url', () => {
      expect(result).toBe(URL)
    })
  })
})
