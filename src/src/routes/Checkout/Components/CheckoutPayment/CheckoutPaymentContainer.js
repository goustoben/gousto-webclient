import { getFormValues } from 'redux-form'
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
  }
}

const ConnectedCheckoutPaymentContainer = connect(
  mapStateToProps,
)(CheckoutPayment)

export const CheckoutPaymentContainer = formContainer(
  addInitialValues(ConnectedCheckoutPaymentContainer),
  getValidationRules(sectionName)
)
