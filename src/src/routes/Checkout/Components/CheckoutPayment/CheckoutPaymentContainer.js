import { getFormAsyncErrors, getFormSyncErrors, touch } from 'redux-form'
import { connect } from 'react-redux'
import { storeSignupRecaptchaToken } from 'actions/auth'
import { trackingOrderPlaceAttemptSucceeded, trackingOrderPlaceAttempt, trackingOrderPlaceAttemptFailed } from 'actions/checkout'
import { getIsRecaptchaEnabled, getSignupRecaptchaToken } from 'selectors/auth'
import formContainer from '../formContainer'
import { addInitialValues, getValidationRules } from './form'
import { sectionName } from './config'
import { CheckoutPayment } from './CheckoutPayment'

const mapStateToProps = state => ({
  formErrors: { ...getFormSyncErrors(sectionName)(state), ...getFormAsyncErrors(sectionName)(state)},
  isRecaptchaEnabled: getIsRecaptchaEnabled(state),
  recaptchaValue: getSignupRecaptchaToken(state),
  sectionName,
})

const mapDispatchToProps = {
  storeSignupRecaptchaToken,
  touch,
  trackingOrderPlaceAttempt,
  trackingOrderPlaceAttemptFailed,
  trackingOrderPlaceAttemptSucceeded,
}

const ConnectedCheckoutPaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutPayment)

export const CheckoutPaymentContainer = addInitialValues(formContainer(ConnectedCheckoutPaymentContainer, getValidationRules(sectionName), sectionName), { sectionName })
