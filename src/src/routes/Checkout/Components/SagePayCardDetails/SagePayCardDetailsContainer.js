import { connect } from 'react-redux'
import { getFormValues, change, untouch } from 'redux-form'
import actions from 'actions'

import deliveryRules from 'validations/delivery'
import { addPrefix } from 'validations/util'
import cardRules from 'validations/card'
import { SagePayCardDetails } from './SagePayCardDetails'

const form = 'checkout'

function mapStateToProps(sectionName) {
  return state => {
    const formValues = getFormValues(form)(state)
    const addressFormValues = getFormValues(form)(state)

    return ({
      form,
      formValues,
      deliveryAddress: addressFormValues && addressFormValues.delivery ? addressFormValues.delivery : {},
      formSectionName: sectionName,
    })
  }
}

function connectComponent(sectionName) {
  const SagePayCardDetailsContainer = connect(mapStateToProps(sectionName), {
    clearErrors: actions.checkoutClearErrors,
    change,
    untouch,
  })(SagePayCardDetails)

  return SagePayCardDetailsContainer
}

export default sectionName => connectComponent(sectionName)

export function addInitialValues(Component) {
  return connect(
    (state) => {
      const { checkout } = state.form
      const initialValues = checkout && checkout.initial ? checkout.initial : {}

      return ({
        initialValues,
      })
    }
    , {})(Component)
}

export function getValidationRules(sectionName) {
  return formValues => {
    let rules = addPrefix(sectionName, cardRules)
    if (formValues[sectionName] && formValues[sectionName].isBillingAddressDifferent) {
      rules = { ...rules, ...deliveryRules(sectionName)(formValues) }
    }

    return rules
  }
}
