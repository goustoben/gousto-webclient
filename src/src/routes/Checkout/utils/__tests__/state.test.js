import Immutable from 'immutable'
import { isSubmitting, isBillingAddressDifferent } from '../state'

let formValues = {}
const sectionName = 'payment'
let state = {}

describe('is submitting', () => {

  test('should return true if the form "submitting" value is true', () => {
    state = {
      pending: Immutable.Map({
        "CHECKOUT_CARD_SUBMIT": false
      }),
      form: {
        checkout: {
          "submitting": true
        }
      }
    }

    expect(isSubmitting(state)).toEqual(true)
  })

  describe('when the form "submitting" value is false', () => {

    test('and "CHECKOUT_CARD_SUBMIT" is pending it should return true', () => {
      state = {
        pending: Immutable.Map({
          "CHECKOUT_CARD_SUBMIT": true
        }),
        form: {
          checkout: {
            "submitting": false
          }
        }
      }
      expect(isSubmitting(state)).toEqual(true)
    })

    test('and "CHECKOUT_CARD_SUBMIT" is not pending it should return false', () => {
      state = {
        pending: Immutable.Map({
          "CHECKOUT_CARD_SUBMIT": false
        }),
        form: {
          checkout: {
            "submitting": false
          }
        }
      }

      expect(isSubmitting(state)).toEqual(false)
    })
  })

})

describe('is billing address different', () => {

  beforeEach(()=>{
    formValues = {
      delivery: {},
      payment: {},
    }
  })

  test('should return false if form values is empty', () => {
    expect(isBillingAddressDifferent({}, sectionName)).toEqual(false)
  })

  test('should return false if the section name is empty', () => {
    expect(isBillingAddressDifferent(formValues, sectionName)).toEqual(false)
  })

  test('should return false if the "isBillingAddressDifferent" value is false', () => {
    formValues.payment.isBillingAddressDifferent = false
    expect(isBillingAddressDifferent(formValues, sectionName)).toEqual(false)
  })

  test('should return true if the "isBillingAddressDifferent" value is true', () => {
    formValues.payment.isBillingAddressDifferent = true
    expect(isBillingAddressDifferent(formValues, sectionName)).toEqual(true)
  })
})
