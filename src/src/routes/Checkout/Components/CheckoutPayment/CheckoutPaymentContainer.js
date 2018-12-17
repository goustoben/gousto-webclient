import { getFormAsyncErrors, getFormSyncErrors, touch } from 'redux-form'
import { connect } from 'react-redux'

import formContainer from '../formContainer'
import { addInitialValues, getValidationRules } from './form'
import { sectionName } from './config'
import { CheckoutPayment } from './CheckoutPayment'

const mapStateToProps = state => {
  return {
    formErrors: Object.assign({}, getFormSyncErrors(sectionName)(state), getFormAsyncErrors(sectionName)(state)),
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

export const CheckoutPaymentContainer = addInitialValues(formContainer(ConnectedCheckoutPaymentContainer, getValidationRules(sectionName), sectionName), { sectionName })
