import { connect } from 'react-redux'

import { addPrefix } from 'validations/util'
import addressRules from 'validations/address'
import { validationRules } from 'validations/card-checkout'

export const getValidationRules = (sectionName) => (
  (formValues) => {
    let rules = addPrefix(sectionName, validationRules)
    if (formValues[sectionName] && formValues[sectionName].isBillingAddressDifferent) {
      rules = { ...rules, ...addressRules(sectionName)(formValues) }
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
