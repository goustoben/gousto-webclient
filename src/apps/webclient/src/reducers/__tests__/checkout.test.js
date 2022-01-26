import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { checkoutReducers } from '../checkout'

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
      const result = checkoutReducers.checkout(initialState, action)
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
      const result = checkoutReducers.checkout(initialState, action)
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

      const result = checkoutReducers.checkout(initialState, action)
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

      const result = checkoutReducers.checkout(state, action)
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

      const result = checkoutReducers.checkout(initialState, action)
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
        const nextState = checkoutReducers.checkout(state, action)
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
        const nextState = checkoutReducers.checkout(state, action)
        expect(nextState.get('lastReachedStepIndex')).toBe(1)
      })
    })
  })

  describe('given CHECKOUT_PASSWORD_VALIDATION_RULES_SET action type', () => {
    const password = 'ValidPassword!1'
    const state = Immutable.fromJS({
      passwordInfo: {
        errorCodes: [],
        value: password
      }
    })

    const action = {
      type: actionTypes.CHECKOUT_PASSWORD_VALIDATION_RULES_SET,
      errors: [],
      password,
    }

    describe('when validation rules are set', () => {
      test('then it should update errors and password value', () => {
        const nextState = checkoutReducers.checkout(state, action)
        expect(nextState.getIn(['passwordInfo', 'errorCodes'])).toHaveLength(0)
        expect(nextState.getIn(['passwordInfo', 'value'])).toBe(password)
      })
    })
  })
})
