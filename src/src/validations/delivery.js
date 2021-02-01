import { addPrefix } from 'validations/util'
import addressRules from 'validations/address'
import regExp from './regularExpressions'

const rules = (isCheckoutOverhaulEnabled) => ({
  phone: {
    field: 'phone number',
    rules: [
      { name: 'isLength', options: { min: 10 } },
      { name: 'isLength', options: { max: 10 } },
    ],
  },
  firstName: {
    field: 'first name',
    rules: [
      { name: 'isLength', options: { min: 1 } },
      { name: 'isLength', options: { max: 200 } },
      { name: 'matches', options: regExp.name },
    ],
  },
  lastName: {
    field: 'last name',
    rules: [
      { name: 'isLength', options: { min: 1 } },
      { name: 'isLength', options: { max: 200 } },
      { name: 'matches', options: regExp.name },
    ],
  },
  ...(isCheckoutOverhaulEnabled && {
    deliveryInstruction: {
      field: 'dropdown',
      rules: [(formValues) => {
        const isDeliveryInstruction = formValues && formValues.delivery
          && formValues.delivery.deliveryInstruction
          && (formValues.delivery.deliveryInstruction === 'Please select an option')

        return (isDeliveryInstruction ? { errorMessage: 'Delivery instruction is required' } : true)
      }]
    }
  }),
})

/**
 * Dynamic delivery rules, designed for
 * "other" value on the instruction dropdown
 * @param formValues
 * @returns {{}}
 */
const deliveryExtraRules = (formValues, formSectionName = 'delivery') => {
  const validationRules = {}
  if (!formValues || !formValues[formSectionName]) return validationRules
  const values = formValues[formSectionName]
  if (
    typeof values.addressType === 'string'
    && values.addressType.toLowerCase() === 'other'
  ) {
    validationRules.customAddressType = {
      rules: [
        { name: 'isLength', options: { min: 1 } },
        { name: 'isLength', options: { max: 200 } },
      ],
      field: 'address type',
    }
  }

  if (
    typeof values.deliveryInstruction === 'string'
    && ['neighbour', 'other'].includes(values.deliveryInstruction.toLowerCase())
  ) {
    validationRules.deliveryInstructionsCustom = {
      rules: [
        { name: 'isLength', options: { min: 5 } },
        { name: 'isLength', options: { max: 50 } },
      ],
      field: 'delivery instruction',
    }
  }

  return validationRules
}

/**
 * Validation rules
 * @param formValues
 * @param formSectionName
 * @returns {{}}
 */
export default formSectionName => (formValues, isCheckoutOverhaulEnabled) => {
  const combinedRulesWithPrefix = addPrefix(formSectionName, {
    ...rules(isCheckoutOverhaulEnabled),
    ...deliveryExtraRules(formValues, formSectionName),
  })
  const addressRulesWithPrefix = addressRules(formSectionName)(formValues)

  return {
    ...combinedRulesWithPrefix,
    ...addressRulesWithPrefix
  }
}
