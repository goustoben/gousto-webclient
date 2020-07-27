import { addUserIdToUrl, slugify, getUrlParams } from 'utils/url'

describe('URL utils',() => {
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

  describe('getUrlParams', () => {
    describe('when URL does not contain any params', () => {
      it('should return empty object', () => {
        const expected = {}

        const result = getUrlParams('https://gousto.co.uk/')

        expect(result).toEqual(expected)
      })
    })

    describe('when URL does contain one params', () => {
      it('should return object with hey/value', () => {
        const expected = { foo: 'bar' }

        const result = getUrlParams('https://gousto.co.uk/?foo=bar')

        expect(result).toEqual(expected)
      })
    })

    describe('when URL does contain several params', () => {
      it('should return object with hey/value', () => {
        const expected = { param1: 'value1', param2: '123' }

        const result = getUrlParams('https://gousto.co.uk/?param1=value1&param2=123')

        expect(result).toEqual(expected)
      })
    })
  })
})
