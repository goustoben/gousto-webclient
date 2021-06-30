import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import checkoutReducer from '../checkout'

describe('checkout reducer', () => {
  describe('given CHECKOUT_ERRORS_CLEAR action type', () => {
    const action = {
      type: actionTypes.CHECKOUT_ERRORS_CLEAR,
    }
    let initialState

    beforeEach(() => {
      initialState = Immutable.fromJS({
        errors: {
          something: true,
        },
      })
    })

    test('should reset errors', () => {
      const result = checkoutReducer.checkout(initialState, action)
      const errors = result.get('errors').toJS()

      expect(errors).toEqual({})
    })
  })

  describe('given CHECKOUT_PAYPAL_ERRORS_CLEAR action type', () => {
    const action = {
      type: actionTypes.CHECKOUT_PAYPAL_ERRORS_CLEAR,
    }
    let initialState

    beforeEach(() => {
      initialState = Immutable.fromJS({
        paypalErrors: {
          'paypal-error': true,
        },
      })
    })

    test('should reset PayPal errors', () => {
      const result = checkoutReducer.checkout(initialState, action)
      const errors = result.get('paypalErrors').toJS()

      expect(errors).toEqual({})
    })
  })

  describe('given CHECKOUT_SET_GOUSTO_REF action type', () => {
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

  describe('given PAYMENT_SET_PAYMENT_METHOD action type', () => {
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

  describe('given PAYMENT_SET_PAYPAL_CLIENT_TOKEN action type', () => {
    test('should reset PayPal errors', () => {
      const action = {
        type: actionTypes.PAYMENT_SET_PAYPAL_CLIENT_TOKEN,
      }
      const initialState = Immutable.fromJS({
        paypalErrors: {
          [actionTypes.PAYPAL_TOKEN_FETCH_FAILED]: true,
        },
      })

      const result = checkoutReducer.checkout(initialState, action)
      const errors = result.get('paypalErrors').toJS()

      expect(errors).toEqual({})
    })
  })

  describe('given CHECKOUT_STEP_INDEX_REACHED action type', () => {
    const state = Immutable.fromJS({
      lastReachedStepIndex: 1
    })

    let action = {
      type: actionTypes.CHECKOUT_STEP_INDEX_REACHED,
      stepIndex: 2
    }

    describe('when the step is further than the lastReachedStepIndex', () => {
      test('then it should update the lastReachedStepIndex', () => {
        const nextState = checkoutReducer.checkout(state, action)
        expect(nextState.get('lastReachedStepIndex')).toBe(2)
      })
    })

    describe('when the step is earlier than the lastReachedStepIndex', () => {
      beforeEach(() => {
        action = {
          ...action,
          stepIndex: 0,
        }
      })

      test('then it should not update the lastReachedStepIndex', () => {
        const nextState = checkoutReducer.checkout(state, action)
        expect(nextState.get('lastReachedStepIndex')).toBe(1)
      })
    })
  })
})
