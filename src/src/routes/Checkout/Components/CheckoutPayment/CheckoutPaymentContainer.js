import { getFormAsyncErrors, getFormSyncErrors, touch } from 'redux-form'
import { connect } from 'react-redux'
import { storeSignupRecaptchaToken } from 'actions/auth'
import {
  trackingOrderPlaceAttemptSucceeded,
  trackingOrderPlaceAttempt,
  trackingOrderPlaceAttemptFailed,
  setCurrentPaymentMethod
} from 'actions/checkout'
import { getIsRecaptchaEnabled, getSignupRecaptchaToken } from 'selectors/auth'
import { getIs3DSForSignUpEnabled, getIsPayWithPaypalEnabled } from 'selectors/features'
import { getCurrentPaymentMethod } from 'selectors/payment'
import formContainer from '../formContainer'
import { addInitialValues, getValidationRules } from './form'
import { sectionName } from './config'
import { CheckoutPayment } from './CheckoutPayment'

const mapStateToProps = (state) => ({
  formErrors: {
    ...getFormSyncErrors(sectionName)(state),
    ...getFormAsyncErrors(sectionName)(state)
  },
  is3DSEnabled: getIs3DSForSignUpEnabled(state),
  isRecaptchaEnabled: getIsRecaptchaEnabled(state),
  recaptchaValue: getSignupRecaptchaToken(state),
  isPayWithPaypalEnabled: getIsPayWithPaypalEnabled(state),
  sectionName,
  currentPaymentMethod: getCurrentPaymentMethod(state)
})

const mapDispatchToProps = {
  storeSignupRecaptchaToken,
  touch,
  trackingOrderPlaceAttempt,
  trackingOrderPlaceAttemptFailed,
  trackingOrderPlaceAttemptSucceeded,
  setCurrentPaymentMethod
}

const ConnectedCheckoutPaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutPayment)

export const CheckoutPaymentContainer = addInitialValues(
  formContainer(ConnectedCheckoutPaymentContainer, getValidationRules(sectionName), sectionName),
  { sectionName }
)
