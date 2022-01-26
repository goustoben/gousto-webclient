import Immutable from 'immutable'
import { hasCheckoutError, getFeLoggingCorrelationData } from 'selectors/checkout'

jest.mock('utils/cookieHelper2', () => ({
  get: () => 'fake_session_id'
}))

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

  describe('getFeLoggingCorrelationData', () => {
    const state = {
      checkout: Immutable.fromJS({
        goustoRef: '105979923'
      }),
    }

    test('should return session id and gousto ref', () => {
      const expected = {
        session_id: 'fake_session_id',
        gousto_ref: '105979923',
      }

      const result = getFeLoggingCorrelationData(state)

      expect(result).toEqual(expected)
    })
  })
})
