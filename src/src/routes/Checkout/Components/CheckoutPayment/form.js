import { addPrefix } from 'validations/util'
import deliveryRules from 'validations/delivery'
import { validationRules } from 'validations/card-checkout'

// TODO: Duplicate code - only rules are different
export const getValidationRules = (sectionName) => (
  (formValues) => {
    let rules = addPrefix(sectionName, validationRules)
    if (formValues[sectionName] && formValues[sectionName].isBillingAddressDifferent) {
      rules = { ...rules, ...deliveryRules(sectionName)(formValues) }
    }

    return rules
  }
)
