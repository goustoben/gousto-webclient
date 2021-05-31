import Immutable from 'immutable'
import { hasCheckoutError, getPromoCodeValidationDetails } from 'selectors/checkout'

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
              lastName: 'Name'
            })
          }
        }
      },
      request: Immutable.fromJS({
        browser: 'desktop'
      }),
      features: Immutable.fromJS({
        isPromoCodeValidationEnabled: {
          value: true,
        },
      })
    }

    test('should return promo code validation details', () => {
      const expected = {
        promo_code: 'DTI-SB-P30M',
        phone_number: '07503075906',
        postcode: 'W3 7UP',
        line1: 'FLAT 12, MORRIS HOUSE',
        check_last_name: true,
        name_last: 'Name',
      }

      const result = getPromoCodeValidationDetails(state)

      expect(result).toEqual(expected)
    })
  })
})
