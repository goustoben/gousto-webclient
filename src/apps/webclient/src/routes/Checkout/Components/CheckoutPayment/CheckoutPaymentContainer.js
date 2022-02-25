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
import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { getCurrentPaymentMethod, isPayPalReady } from 'selectors/payment'
import { formatOrderPrice } from 'utils/pricing'
import { usePricing } from 'routes/Menu/domains/pricing'
import { formContainer } from '../formContainer'
import { addInitialValues, getValidationRules } from './form'
import { sectionName } from './config'
import { CheckoutPayment } from './CheckoutPayment'

export const mapStateToProps = (state) => {
  const ribbonTriggerName = 'control_payment'
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

const Plain = (props) => {
  const { pricing } = usePricing()
  const isFreeBox = formatOrderPrice(pricing?.total) === 'FREE'

  return (
    <ConnectedCheckoutPaymentContainer
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      isFreeBox={isFreeBox}
      pricing={pricing}
    />
  )
}

export const CheckoutPaymentContainer = addInitialValues(
  formContainer(Plain, getValidationRules(sectionName), sectionName),
  { sectionName }
)
