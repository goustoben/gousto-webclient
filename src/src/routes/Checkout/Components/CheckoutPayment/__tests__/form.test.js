import { addPrefix } from 'validations/util'
import { addressRules } from 'validations/address'
import { validationRules } from 'validations/card-checkout'
import { getValidationRules } from '../form'

describe('given getValidationRules is called', () => {
  beforeEach(() => {})

  test('then it should return card validation rules', () => {
    const formValues = {}
    const actual = getValidationRules('payment')(formValues)

    const expected = addPrefix('payment', validationRules)

    expect(actual).toStrictEqual(expected)
  })

  describe('when isBillingAddressDifferent is true', () => {
    test('then it should return card and address validation rules', () => {
      const formValues = {
        payment: {
          isBillingAddressDifferent: true,
        },
      }
      const actual = getValidationRules('payment')(formValues)

      const expected = {
        ...addPrefix('payment', validationRules),
        ...addressRules('payment')(formValues),
      }

      expect(actual).toStrictEqual(expected)
    })
  })
})
