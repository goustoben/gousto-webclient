import Immutable from 'immutable'

import { actionTypes } from 'actions/actionTypes'

import { isSubmitting, isBillingAddressDifferent } from '../state'

describe('Checkout state selectors', () => {
  describe('isSubmitting', () => {
    let state

    beforeEach(() => {
      state = {
        pending: Immutable.Map({
          [actionTypes.CHECKOUT_CARD_SUBMIT]: false,
          [actionTypes.CHECKOUT_SIGNUP]: false,
        }),
        form: {
          checkout: {
            submitting: false,
          },
        },
      }
    })

    describe('when the form "submitting" value is true', () => {
      test('should return true', () => {
        state.form.checkout.submitting = true

        const result = isSubmitting(state)

        expect(result).toBe(true)
      })
    })

    describe('when CHECKOUT_CARD_SUBMIT is pending', () => {
      test('should return true', () => {
        state.pending = state.pending.set(actionTypes.CHECKOUT_CARD_SUBMIT, true)

        const result = isSubmitting(state)

        expect(result).toBe(true)
      })
    })

    describe('when CHECKOUT_SIGNUP is pending', () => {
      test('should return true', () => {
        state.pending = state.pending.set(actionTypes.CHECKOUT_SIGNUP, true)

        const result = isSubmitting(state)

        expect(result).toBe(true)
      })
    })

    describe('in any other case', () => {
      test('should return false', () => {
        const result = isSubmitting(state)

        expect(result).toBe(false)
      })
    })
  })

  describe('isBillingAddressDifferent', () => {
    let formValues
    const sectionName = 'payment'

    beforeEach(() => {
      formValues = {
        delivery: {},
        payment: {},
      }
    })

    test('should return false if form values is empty', () => {
      expect(isBillingAddressDifferent({}, sectionName)).toBe(false)
    })

    test('should return false if the section name is empty', () => {
      expect(isBillingAddressDifferent(formValues, sectionName)).toBe(false)
    })

    test('should return false if the "isBillingAddressDifferent" value is false', () => {
      formValues.payment.isBillingAddressDifferent = false

      expect(isBillingAddressDifferent(formValues, sectionName)).toBe(false)
    })

    test('should return true if the "isBillingAddressDifferent" value is true', () => {
      formValues.payment.isBillingAddressDifferent = true

      expect(isBillingAddressDifferent(formValues, sectionName)).toBe(true)
    })
  })
})
