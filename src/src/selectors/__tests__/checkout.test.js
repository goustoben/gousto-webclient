import Immutable from 'immutable'
import { hasCheckoutError, getPromoCodeValidationDetails, getAboutYouFormName } from 'selectors/checkout'

function setDefaultState(browser) {
  return {
    request: Immutable.Map({
      browser
    })
  }
}

describe('checkout selectors', () => {
  describe('hasCheckoutError', () => {
    describe('when the checkout error state is empty ', () => {
      const state = {
        checkout: Immutable.Map({})
      }

      test('should return false', () => {
        expect(hasCheckoutError(state)).toBe(false)
      })
    })

    describe('when a checkout error exists', () => {
      const state = {
        checkout: Immutable.Map({
          errors: Immutable.Map({
            CHECKOUT_SIGNUP: '422-payment-failed',
          })
        })
      }

      test('should return true', () => {
        expect(hasCheckoutError(state)).toBe(true)
      })
    })

    describe('when a checkout error exists but the value is falsy', () => {
      const state = {
        checkout: Immutable.Map({
          errors: Immutable.Map({
            CHECKOUT_SIGNUP: null,
          })
        })
      }

      test('should return false', () => {
        expect(hasCheckoutError(state)).toBe(false)
      })
    })

    describe('when there is no checkout errors', () => {
      const state = {
        checkout: Immutable.Map({
          errors: Immutable.Map({
            CHECKOUT_SIGNUP: null,
            USER_SUBSCRIBE: null,
          })
        })
      }

      test('should return false', () => {
        expect(hasCheckoutError(state)).toBe(false)
      })
    })
  })

  describe('getPromoCodeValidationDetails', () => {
    const state = {
      basket: Immutable.fromJS({
        promoCode: 'DTI-SB-P30M'
      }),
      form: {
        delivery: {
          values: {
            delivery: Immutable.fromJS({
              phone: '7503075906',
              postcode: 'W3 7UP',
              houseNo: 'FLAT 12, MORRIS HOUSE',
            })
          }
        }
      },
      request: Immutable.fromJS({
        browser: 'desktop'
      })

    }

    test('should return promo code validation details', () => {
      const expected = {
        promo_code: 'DTI-SB-P30M',
        phone_number: '07503075906',
        postcode: 'W3 7UP',
        line1: 'FLAT 12, MORRIS HOUSE'
      }

      const result = getPromoCodeValidationDetails(state)

      expect(result).toEqual(expected)
    })
  })

  describe('getAboutYouFormName', () => {
    let aboutYouFormNameOutput
    let state
    let isCheckoutRedesignEnabled

    describe('when isCheckoutRedesign is true', () => {
      const expected = 'aboutyou'
      beforeEach(() => {
        isCheckoutRedesignEnabled = true
      })

      describe('and browser is mobile', () => {
        beforeEach(() => {
          state = setDefaultState('mobile')
          aboutYouFormNameOutput = getAboutYouFormName(state, isCheckoutRedesignEnabled)
        })

        test('then should return "aboutyou"', () => {
          expect(aboutYouFormNameOutput).toBe(expected)
        })
      })

      describe('and browser is not mobile', () => {
        beforeEach(() => {
          state = setDefaultState('web')
          aboutYouFormNameOutput = getAboutYouFormName(state, isCheckoutRedesignEnabled)
        })

        test('then should return "aboutyou"', () => {
          expect(aboutYouFormNameOutput).toBe(expected)
        })
      })
    })

    describe('when isCheckoutRedesign is false', () => {
      beforeEach(() => {
        isCheckoutRedesignEnabled = false
      })

      describe('and browser is mobile', () => {
        beforeEach(() => {
          state = setDefaultState('mobile')
          aboutYouFormNameOutput = getAboutYouFormName(state, isCheckoutRedesignEnabled)
        })

        test('then should return "yourdetails"', () => {
          const expected = 'yourdetails'
          expect(aboutYouFormNameOutput).toBe(expected)
        })
      })

      describe('and browser is not mobile', () => {
        beforeEach(() => {
          state = setDefaultState('web')
          aboutYouFormNameOutput = getAboutYouFormName(state, isCheckoutRedesignEnabled)
        })

        test('then should return "aboutyou"', () => {
          const expected = 'aboutyou'
          expect(aboutYouFormNameOutput).toBe(expected)
        })
      })
    })
  })
})
