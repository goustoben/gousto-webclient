import Immutable from 'immutable'
import {
  getIsCheckoutUrgencyEnabled,
  getCheckoutUrgencyStartSeconds,
  getCheckoutUrgencyModalSeconds,
  getCheckoutUrgencyCurrentStatus,
} from '../checkoutSelectors'

describe('checkoutSelectors', () => {
  let state

  describe('given checkout urgency feature-related selectors are called', () => {
    describe('when feature value is false', () => {
      beforeAll(() => {
        state = {
          features: Immutable.fromJS({
            checkoutUrgency: {
              value: false,
            },
          }),
        }
      })

      test('then getIsCheckoutUrgencyEnabled should return false', () => {
        expect(getIsCheckoutUrgencyEnabled(state)).toBe(false)
      })

      test('then getCheckoutUrgencyStartSeconds should return default value', () => {
        expect(getCheckoutUrgencyStartSeconds(state)).toBe(25 * 60)
      })

      test('then getCheckoutUrgencyModalSeconds should return default value', () => {
        expect(getCheckoutUrgencyModalSeconds(state)).toBe(3 * 60)
      })
    })

    describe('when feature value is true', () => {
      beforeAll(() => {
        state = {
          features: Immutable.fromJS({
            checkoutUrgency: {
              value: true,
            },
          }),
        }
      })

      test('then getIsCheckoutUrgencyEnabled should return true', () => {
        expect(getIsCheckoutUrgencyEnabled(state)).toBe(true)
      })

      test('then getCheckoutUrgencyStartSeconds should return default value', () => {
        expect(getCheckoutUrgencyStartSeconds(state)).toBe(25 * 60)
      })

      test('then getCheckoutUrgencyModalSeconds should return default value', () => {
        expect(getCheckoutUrgencyModalSeconds(state)).toBe(3 * 60)
      })
    })

    describe('when feature value is time values', () => {
      beforeAll(() => {
        state = {
          features: Immutable.fromJS({
            checkoutUrgency: {
              value: '5,2',
            },
          }),
        }
      })

      test('then getIsCheckoutUrgencyEnabled should return true', () => {
        expect(getIsCheckoutUrgencyEnabled(state)).toBe(true)
      })

      test('then getCheckoutUrgencyStartSeconds should return first overridden value', () => {
        expect(getCheckoutUrgencyStartSeconds(state)).toBe(5 * 60)
      })

      test('then getCheckoutUrgencyModalSeconds should return second overridden value', () => {
        expect(getCheckoutUrgencyModalSeconds(state)).toBe(2 * 60)
      })

      describe('and when time values are invalid', () => {
        beforeAll(() => {
          state = {
            features: Immutable.fromJS({
              checkoutUrgency: {
                value: 'abc',
              },
            }),
          }
        })

        test('then getCheckoutUrgencyStartSeconds should return default value', () => {
          expect(getCheckoutUrgencyStartSeconds(state)).toBe(25 * 60)
        })

        test('then getCheckoutUrgencyModalSeconds should return default value', () => {
          expect(getCheckoutUrgencyModalSeconds(state)).toBe(3 * 60)
        })
      })
    })
  })

  describe('given getCheckoutUrgencyCurrentStatus is called', () => {
    beforeEach(() => {
      state = {
        checkoutUrgency: Immutable.fromJS({
          currentStatus: 'running',
        }),
      }
    })

    test('then it should return current status', () => {
      expect(getCheckoutUrgencyCurrentStatus(state)).toBe('running')
    })
  })
})
