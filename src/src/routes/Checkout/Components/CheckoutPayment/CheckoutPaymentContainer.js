import { getFormAsyncErrors, getFormSyncErrors, getFormValues, touch } from 'redux-form'
import { connect } from 'react-redux'

import formContainer from '../formContainer'
import { addInitialValues, getValidationRules } from './form'
import { formName, sectionName } from './config'
import { CheckoutPayment } from './CheckoutPayment'
import { isBillingAddressValid } from './utils'

const mapStateToProps = state => {
  const formValues = getFormValues(formName)(state)

  return {
    isCardNameValid: formValues && formValues[sectionName] && formValues[sectionName].cardName ? true : false,
    isBillingAddressValid : isBillingAddressValid(formValues),
    formErrors: Object.assign({}, getFormSyncErrors(formName)(state), getFormAsyncErrors(formName)(state)),
    formName,
    sectionName,
  }
}

const mapDispatchToProps = {
  touch,
}

const ConnectedCheckoutPaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutPayment)

// export const CheckoutPaymentContainer = formContainer(
//   addInitialValues(ConnectedCheckoutPaymentContainer),
//   getValidationRules(sectionName)
// )

export const CheckoutPaymentContainer = addInitialValues(formContainer(ConnectedCheckoutPaymentContainer, getValidationRules(sectionName), {}), { sectionName })
