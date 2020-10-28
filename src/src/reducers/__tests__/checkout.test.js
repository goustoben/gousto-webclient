import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import checkoutReducer from 'reducers/checkout'

describe('checkout reducer', () => {
  describe('initial state', () => {
    describe('CHECKOUT_ERRORS_CLEAR action type', () => {
      test('should reset isDuplicateUser and errors', () => {
        const action = {
          type: actionTypes.CHECKOUT_ERRORS_CLEAR,
        }

        const initialState = Immutable.Map({
          errors: {
            something: true,
          },
        })

        const result = checkoutReducer.checkout(initialState, action)
        expect(
          Immutable.is(
            result,
            Immutable.fromJS({
              errors: {},
            }),
          ),
        ).toBe(true)
      })
    })

    describe('CHECKOUT_SET_GOUSTO_REF action type', () => {
      test('should set goustoRef', () => {
        const action = {
          type: actionTypes.CHECKOUT_SET_GOUSTO_REF,
          goustoRef: 1234567
        }

        const initialState = Immutable.Map({
          goustoRef: null
        })

        const result = checkoutReducer.checkout(initialState, action)
        expect(
          Immutable.is(
            result,
            Immutable.fromJS({
              goustoRef: 1234567,
            }),
          ),
        ).toBe(true)
      })
    })

    describe('PAYMENT_SET_PAYMENT_METHOD action type', () => {
      test('should reset errors', () => {
        const action = {
          type: actionTypes.PAYMENT_SET_PAYMENT_METHOD,
        }
        const state = Immutable.fromJS({
          errors: {
            'generic-error': 'Generic error',
            'paypal-error': 'Payment failed',
          }
        })

        const result = checkoutReducer.checkout(state, action)
        const errors = result.get('errors').toJS()

        expect(errors).toEqual({})
      })
    })
  })
})
