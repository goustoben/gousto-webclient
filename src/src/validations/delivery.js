import { addPrefix } from 'validations/util'
import addressRules from 'validations/address'

const rules = {
  phone: {
    field: 'phone number',
    rules: [
      { name: 'isLength', options: { min: 10 } },
      { name: 'isLength', options: { max: 10 } },
    ],
  },
}

/**
 * Dynamic delivery rules, designed for
 * "other" value on the instruction dropdown
 * @param formValues
 * @returns {{}}
 */
const deliveryExtraRules = (formValues, formSectionName = 'delivery', isCheckoutRedesignEnabled = false) => {
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
    const deliveryInstructionError = isCheckoutRedesignEnabled && { errorEnding: ' to ensure we deliver to the right place' }
    validationRules.deliveryInstructionsCustom = {
      rules: [
        { name: 'isLength', options: { min: 5, ...deliveryInstructionError } },
        { name: 'isLength', options: { max: 50 } },
      ],
      field: isCheckoutRedesignEnabled ? 'details' : 'delivery instruction',
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
export default formSectionName => (formValues, isCheckoutRedesignFlagEnabled) => {
  const combinedRulesWithPrefix = addPrefix(formSectionName, {
    ...rules,
    ...deliveryExtraRules(formValues, formSectionName, isCheckoutRedesignFlagEnabled),
  })
  const addressRulesWithPrefix = addressRules(formSectionName)(formValues)

  return {
    ...combinedRulesWithPrefix,
    ...addressRulesWithPrefix
  }
}
