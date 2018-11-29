import { getFormAsyncErrors, getFormSyncErrors } from 'redux-form'
import { connect } from 'react-redux'

import formContainer from '../formContainer'
import { addInitialValues, getValidationRules } from './form'
import { formName, sectionName } from './config'
import { CheckoutPayment } from './CheckoutPayment'
import { touchInputsInForm } from './utils'

const mapStateToProps = state => {
  return {
    formErrors: Object.assign({}, getFormSyncErrors(formName)(state), getFormAsyncErrors(formName)(state)),
    formName,
    sectionName,
    touchInputsInForm,
  }
}

const ConnectedCheckoutPaymentContainer = connect(
  mapStateToProps,
)(CheckoutPayment)

export const CheckoutPaymentContainer = addInitialValues(formContainer(ConnectedCheckoutPaymentContainer, getValidationRules(sectionName)))
