import { connect } from 'react-redux'
import { getFormValues, change } from 'redux-form'

import { hasCheckoutError } from 'selectors/checkout'
import { sectionName, deliveryAddressSectionName } from '../config'
import { getBillingAddress } from './utils'
import { CheckoutFrame } from './CheckoutFrame'
import { checkoutClearErrors } from "actions/checkout/checkoutClearErrors"
import { fireCheckoutPendingEvent } from "actions/checkout/fireCheckoutPendingEvent"
import { fireCheckoutError } from "actions/checkout/fireCheckoutError"
import { trackingCardTokenizationSuccessfully } from "actions/checkout/trackingCardTokenizationSuccessfully"
import { trackingCardTokenizationFailed } from "actions/checkout/trackingCardTokenizationFailed"
import { trackFailedCheckoutFlow } from "actions/log/trackFailedCheckoutFlow"

const mapStateToProps = (state) => {
  const formValues = {
    ...getFormValues(sectionName)(state),
    ...getFormValues(deliveryAddressSectionName)(state),
  }

  return {
    sectionName,
    cardName:
      formValues && formValues[sectionName] && formValues[sectionName].cardName
        ? formValues[sectionName].cardName
        : '',
    billingAddress: getBillingAddress(formValues),
    hasCheckoutError: hasCheckoutError(state),
  }
}

const mapDispatchToProps = {
  change,
  checkoutClearErrors,
  fireCheckoutError,
  fireCheckoutPendingEvent,
  trackingCardTokenizationSuccessfully,
  trackingCardTokenizationFailed,
  trackFailedCheckoutFlow,
}

export const CheckoutFrameContainer = connect(mapStateToProps, mapDispatchToProps)(CheckoutFrame)
