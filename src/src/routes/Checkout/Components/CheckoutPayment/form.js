import { connect } from 'react-redux'

import { addPrefix } from 'validations/util'
import deliveryRules from 'validations/delivery'
import { validationRules } from 'validations/card-checkout'

export const getValidationRules = (sectionName) => (
  (formValues) => {
    let rules = addPrefix(sectionName, validationRules)
    if (formValues[sectionName] && formValues[sectionName].isBillingAddressDifferent) {
      rules = { ...rules, ...deliveryRules(sectionName)(formValues) }
    }

    return rules
  }
)

export const addInitialValues = (Component) => (
  connect(() => ({
    cardName: '',
    isBillingAddressDifferent: false,
  }))(Component)
)
