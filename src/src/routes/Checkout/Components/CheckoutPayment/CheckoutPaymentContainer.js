import { getFormAsyncErrors, getFormSyncErrors, touch } from 'redux-form'
import { connect } from 'react-redux'
import { getIsRecaptchaEnabled, getSignupRecaptchaToken } from 'selectors/auth'
import { getIsGoustoOnDemandEnabled, getIsPaymentBeforeChoosingEnabled } from 'selectors/features'
import { getCurrentPaymentMethod, isPayPalReady } from 'selectors/payment'
import { formatOrderPrice } from 'utils/pricing'
import { getPricingTotalAmount } from 'selectors/pricing'
import { formContainer } from '../formContainer'
import { addInitialValues, getValidationRules } from './form'
import { sectionName } from './config'
import { CheckoutPayment } from './CheckoutPayment'
import { authStoreSignupRecaptchaToken } from "actions/auth/authStoreSignupRecaptchaToken"
import { setCurrentPaymentMethod } from "actions/checkout/setCurrentPaymentMethod"
import { trackingOrderPlaceAttemptSucceeded } from "actions/checkout/trackingOrderPlaceAttemptSucceeded"
import { trackingOrderPlaceAttemptFailed } from "actions/checkout/trackingOrderPlaceAttemptFailed"
import { trackingOrderPlaceAttempt } from "actions/checkout/trackingOrderPlaceAttempt"

export const mapStateToProps = (state) => {
  const isPaymentBeforeChoosingEnabled = getIsPaymentBeforeChoosingEnabled(state)
  const ribbonTriggerName = isPaymentBeforeChoosingEnabled ? 'variant_payment' : 'control_payment'
  const hotjarTriggerName = 'psd2_modal'
  const totalPrice = getPricingTotalAmount(state)

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
    isFreeBox: formatOrderPrice(totalPrice) === 'FREE',
    isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
  }
}

const mapDispatchToProps = {
  storeSignupRecaptchaToken: authStoreSignupRecaptchaToken,
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
