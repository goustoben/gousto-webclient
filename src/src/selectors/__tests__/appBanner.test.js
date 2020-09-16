import Immutable from 'immutable'
import { getPlatformDetails, getIsPromoAppBannerEnabled } from 'selectors/appBanner'

describe('appBanner selectors', () => {
  let windowSpy

  beforeEach(() => {
    windowSpy = jest.spyOn(global, 'window', 'get')
  })

  afterEach(() => {
    windowSpy.mockRestore()
  })

  describe('given getPlatformDetails is called', () => {
    describe('when window is undefined', () => {
      beforeEach(() => {
        windowSpy.mockImplementation(() => undefined)
      })

      it('then an empty object should be returned', () => {
        const result = getPlatformDetails()

        expect(result).toEqual({})
      })
    })

    describe('when window.navigator.userAgent is android', () => {
      beforeEach(() => {
        windowSpy.mockImplementation(() => ({
          navigator: {
            userAgent: 'android',
          },
        }))
      })

      it('then the android details should be returned', () => {
        const result = getPlatformDetails()

        expect(result).toEqual({
          name: 'Android',
          ratings: '4,270',
        })
      })
    })

    describe('when window.navigator.userAgent is iOS', () => {
      beforeEach(() => {
        windowSpy.mockImplementation(() => ({
          navigator: {
            userAgent: 'iPhone',
          },
        }))
      })

      it('then the iOS details should be returned', () => {
        const result = getPlatformDetails()

        expect(result).toEqual({
          name: 'iOS',
          ratings: '63,700',
        })
      })
    })

    describe('when window.navigator.userAgent is desktop based', () => {
      beforeEach(() => {
        windowSpy.mockImplementation(() => ({
          navigator: {
            userAgent: 'Macintosh',
          },
        }))
      })

      it('then an empty object should be returned', () => {
        const result = getPlatformDetails()

        expect(result).toEqual({})
      })
    })
  })

  describe('given getIsPromoAppBannerEnabled is called', () => {
    let state

    beforeEach(() => {
      windowSpy.mockImplementation(() => ({
        navigator: {
          userAgent: 'android',
        },
      }))

      state = {
        routing: {
          locationBeforeTransitions: {
            pathname: '/my-gousto'
          },
        },
        features: Immutable.fromJS({
          isAppAwarenessEnabled: { value: true },
        }),
        appBanner: Immutable.fromJS({
          isDismissed: false,
        }),
      }
    })

    describe('when the user is authenticated', () => {
      beforeEach(() => {
        state = {
          ...state,
          auth: Immutable.fromJS({
            isAuthenticated: true,
          }),
        }
      })

      it('then getIsPromoAppBannerEnabled should return true', () => {
        const result = getIsPromoAppBannerEnabled({ state })

        expect(result).toEqual(true)
      })

      describe('and the path is invalid', () => {
        beforeEach(() => {
          state = {
            ...state,
            routing: {
              locationBeforeTransitions: {
                pathname: '/menu'
              },
            },
          }
        })

        it('then getIsPromoAppBannerEnabled should return false', () => {
          const result = getIsPromoAppBannerEnabled({ state })

          expect(result).toEqual(false)
        })
      })
    })

    describe('when the user is NOT authenticated', () => {
      beforeEach(() => {
        state = {
          ...state,
          auth: Immutable.fromJS({
            isAuthenticated: false,
          }),
          routing: {
            locationBeforeTransitions: {
              pathname: '/'
            },
          },
        }
      })

      it('then getIsPromoAppBannerEnabled should return false', () => {
        const result = getIsPromoAppBannerEnabled({ state })

        expect(result).toEqual(false)
      })
    })
  })
})
