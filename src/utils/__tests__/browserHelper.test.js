import browserHelper from '../browserHelper'

describe('Browser Helper', () => {
  describe('isChrome()', () => {
    let defaultUserAgent

    beforeAll(() => {
      defaultUserAgent = navigator.userAgent
    })

    afterEach(() => {
      navigator.__defineGetter__('userAgent', () => defaultUserAgent)
    })

    test('should exist', () => {
      expect(typeof browserHelper.isChrome).toBe('function')
    })

    test('should return true if userAgent is chrome', () => {
      const chromeUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
      navigator.__defineGetter__('userAgent', () => chromeUserAgent)

      expect(browserHelper.isChrome()).toBe(true)
    })

    test('should return false if userAgent is not chrome', () => {
      const firefoxUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:62.0) Gecko/20100101 Firefox/62.0'
      navigator.__defineGetter__('userAgent', () => firefoxUserAgent)

      expect(browserHelper.isChrome()).toBe(false)
    })
  })
})
