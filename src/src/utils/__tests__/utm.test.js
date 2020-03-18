import { getUTM } from '../utm'

function mockDocumentAndWindow(search, href, referrer) {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      search,
      href
    },
  })
  Object.defineProperty(document, 'referrer', {
    configurable: true,
    value: referrer,
  })
}

describe('utm', () => {
  let output
  beforeEach(() => {
    output = ''
  })

  describe('URL query params', () => {
    describe('when has utm_* params', () => {
      const search = '?promo_code=TWP100&utm_source=twitter&utm_medium=paidsocial&utm_campaign=page&utm_content=page_link'
      const expected = {
        utm_source: 'twitter',
        utm_medium: 'paidsocial',
        utm_campaign: 'page',
        utm_content: 'page_link',
        referral: undefined,
      }

      beforeEach(() => {
        mockDocumentAndWindow(search)
      })

      test('should return utm resutls', () => {
        output = getUTM()
        expect(output).toMatchObject(expected)
      })
    })
  })

  describe('referral', () => {
    describe('when referral is empty', () => {
      describe('and has no utm_*', () => {
        beforeEach(() => {
          output = ''
          mockDocumentAndWindow('', '', '')
        })
        test('then returns an empty value', () => {
          output = getUTM()
          expect(output.referral).toEqual('')
        })
      })
    })

    describe('when has referral', () => {
      describe('and differs from current location.href', () => {
        beforeEach(() => {
          output = ''
          mockDocumentAndWindow('', 'gousto.co.uk', 'google.com')
        })
        test('should return referrer', () => {
          output = getUTM()
          expect(output.referral).toEqual('google.com')
        })
      })

      describe('and no URL utm_* params', () => {
        const expected = 'google.com'
        beforeEach(() => {
          output = ''
          mockDocumentAndWindow('', '', expected)
        })
        test('should return external referral', () => {
          output = getUTM()
          expect(output.referral).toEqual(expected)
        })
      })
    })
  })
})
