import React from 'react'

import { connect } from 'react-redux'
import { getFormAsyncErrors, getFormSyncErrors, touch } from 'redux-form'

import { storeSignupRecaptchaToken } from 'actions/auth'
import { feLoggingLogEvent } from 'actions/log'
import {
  trackingOrderPlaceAttemptSucceeded,
  trackingOrderPlaceAttempt,
  trackingOrderPlaceAttemptFailed,
  setCurrentPaymentMethod,
} from 'routes/Checkout/checkoutActions'
import { getCurrentPaymentMethod, isPayPalReady } from 'routes/Checkout/checkoutPaymentSelectors'
import { usePricing } from 'routes/Menu/domains/pricing'
import { getIsRecaptchaEnabled, getSignupRecaptchaToken } from 'selectors/auth'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { getSignupLoginError } from 'selectors/status'
import { formatOrderPrice } from 'utils/pricing'

import { formContainer } from '../formContainer'
import { CheckoutPayment } from './CheckoutPayment'
import { sectionName } from './config'
import { addInitialValues, getValidationRules } from './form'

export const mapStateToProps = (state) => {
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
    hotjarTriggerName,
    isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
    signupLoginError: getSignupLoginError(state),
  }
}

const mapDispatchToProps = {
  storeSignupRecaptchaToken,
  touch,
  trackingOrderPlaceAttempt,
  trackingOrderPlaceAttemptFailed,
  trackingOrderPlaceAttemptSucceeded,
  setCurrentPaymentMethod,
  feLoggingLogEvent,
}

const ConnectedCheckoutPaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutPayment)

const Plain = (props) => {
  const pricingHookResponse = usePricing()
  const { pricing } = pricingHookResponse
  const isFreeBox = pricing ? formatOrderPrice(pricing.total) === 'FREE' : false

  return (
    <ConnectedCheckoutPaymentContainer
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      isFreeBox={isFreeBox}
      pricingHookResponse={pricingHookResponse}
    />
  )
}

export const CheckoutPaymentContainer = addInitialValues(
  formContainer(Plain, getValidationRules(sectionName), sectionName),
  { sectionName },
)
