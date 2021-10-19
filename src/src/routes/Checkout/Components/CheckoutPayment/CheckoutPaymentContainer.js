import React from 'react'
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
import { getIsGoustoOnDemandEnabled, getIsPaymentBeforeChoosingEnabled } from 'selectors/features'
import { getCurrentPaymentMethod, isPayPalReady } from 'selectors/payment'
import { formatOrderPrice } from 'utils/pricing'
import { getPricingTotalAmount } from 'selectors/pricing'
import { formContainer } from '../formContainer'
import { addInitialValues, getValidationRules } from './form'
import { sectionName } from './config'
import { CheckoutPayment } from './CheckoutPayment'

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

// eslint-disable-next-line react/jsx-props-no-spreading
const Plain = (props) => <ConnectedCheckoutPaymentContainer {...props} />

export const CheckoutPaymentContainer = addInitialValues(
  formContainer(Plain, getValidationRules(sectionName), sectionName),
  { sectionName }
)
