import { getFormAsyncErrors, getFormSyncErrors, touch } from 'redux-form'
import { connect } from 'react-redux'
import { storeSignupRecaptchaToken } from 'actions/auth'
import {
  trackingOrderPlaceAttemptSucceeded,
  trackingOrderPlaceAttempt,
  trackingOrderPlaceAttemptFailed,
  setCurrentPaymentMethod,
} from 'actions/checkout'
import { getIsRecaptchaEnabled, getSignupRecaptchaToken } from 'selectors/auth'
import { getIsPaymentBeforeChoosingEnabled } from 'selectors/features'
import { getCurrentPaymentMethod, isPayPalReady } from 'selectors/payment'
import { formContainer } from '../formContainer'
import { addInitialValues, getValidationRules } from './form'
import { sectionName } from './config'
import { CheckoutPayment } from './CheckoutPayment'

const mapStateToProps = (state) => {
  const isPaymentBeforeChoosingEnabled = getIsPaymentBeforeChoosingEnabled(state)
  const ribbonTriggerName = isPaymentBeforeChoosingEnabled ? 'variant_payment' : 'control_payment'
  const hotjarTriggerName = 'psd2_modal'

  return {
    formErrors: {
      ...getFormSyncErrors(sectionName)(state),
      ...getFormAsyncErrors(sectionName)(state),
    },
    isRecaptchaEnabled: getIsRecaptchaEnabled(state),
    recaptchaValue: getSignupRecaptchaToken(state),
    sectionName,
    currentPaymentMethod: getCurrentPaymentMethod(state),
    isPayPalReady: isPayPalReady(state),
    ribbonTriggerName,
    hotjarTriggerName,
  }
}

const mapDispatchToProps = {
  storeSignupRecaptchaToken,
  touch,
  trackingOrderPlaceAttempt,
  trackingOrderPlaceAttemptFailed,
  trackingOrderPlaceAttemptSucceeded,
  setCurrentPaymentMethod,
}

const ConnectedCheckoutPaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutPayment)

export const CheckoutPaymentContainer = addInitialValues(
  formContainer(ConnectedCheckoutPaymentContainer, getValidationRules(sectionName), sectionName),
  { sectionName }
)
