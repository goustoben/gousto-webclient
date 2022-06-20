import { JSDOM } from 'jsdom'
import { browserHelperUtils, canUseDom } from '../browserHelper'

let windowSpy

Object.defineProperty(
  navigator,
  'userAgent',
  ((initialValue) => {
    let value = initialValue

    return {
      get() {
        return value
      },
      set(v) {
        value = v
      },
    }
  })(navigator.userAgent)
)

describe('Browser Helper', () => {
  describe('isChrome()', () => {
    let defaultUserAgent

    beforeAll(() => {
      defaultUserAgent = navigator.userAgent
    })

    afterEach(() => {
      navigator.userAgent = defaultUserAgent
    })

    test('should exist', () => {
      expect(typeof browserHelperUtils.isChrome).toBe('function')
    })

    test('should return true if userAgent is chrome', () => {
      const chromeUserAgent =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
      navigator.userAgent = chromeUserAgent

      expect(browserHelperUtils.isChrome()).toBe(true)
    })

    test('should return false if userAgent is not chrome', () => {
      const firefoxUserAgent =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:62.0) Gecko/20100101 Firefox/62.0'
      navigator.userAgent = firefoxUserAgent

      expect(browserHelperUtils.isChrome()).toBe(false)
    })
  })

  describe('canUseDom', () => {
    beforeEach(() => {
      windowSpy = jest.spyOn(global, 'window', 'get')
    })

    afterEach(() => {
      windowSpy.mockRestore()
    })

    describe('Given window is undefined', () => {
      beforeEach(() => {
        windowSpy.mockReturnValue(undefined)
      })

      test('Then canUseDom returns false', () => {
        expect(canUseDom()).toBeFalsy()
      })
    })

    describe('Given document is undefined', () => {
      beforeEach(() => {
        windowSpy.mockImplementation(() => ({
          document: undefined,
        }))
      })

      test('Then canUseDom returns false', () => {
        expect(canUseDom()).toBeFalsy()
      })
    })

    describe('Given createElement is undefined', () => {
      beforeEach(() => {
        windowSpy.mockImplementation(() => ({
          document: {
            createElement: undefined,
          },
        }))
      })

      test('Then canUseDom returns false', () => {
        expect(canUseDom()).toBeFalsy()
      })
    })

    describe('Given browser criteria are met', () => {
      beforeEach(() => {
        const { window } = new JSDOM()
        windowSpy.mockImplementation(() => window)
      })

      test('Then canUseDom returns true', () => {
        expect(canUseDom()).toBeTruthy()
      })
    })
  })
})
