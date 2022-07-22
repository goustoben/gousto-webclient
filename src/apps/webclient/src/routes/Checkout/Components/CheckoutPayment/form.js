import { connect } from 'react-redux'
import { addPrefix } from 'validations/util'

import { addressRules, validationRules } from 'routes/Checkout/checkoutValidations'

export const getValidationRules = (sectionName) => (formValues) => {
  let rules = addPrefix(sectionName, validationRules)
  if (formValues[sectionName] && formValues[sectionName].isBillingAddressDifferent) {
    rules = { ...rules, ...addressRules(sectionName)(formValues) }
  }

  return rules
}

export const addInitialValues = (Component, { sectionName }) =>
  connect((state, ownProps) => {
    const { payment } = state.form
    const initialValues = payment && payment.initial ? payment.initial : {}

    return {
      // needed for hacked custom validation in validation/address.js
      sectionName,
      initialValues: {
        ...ownProps.initialValues,
        ...initialValues,
        [sectionName]: {
          cardName: '',
          isBillingAddressDifferent: false,
        },
      },
    }
  })(Component)
