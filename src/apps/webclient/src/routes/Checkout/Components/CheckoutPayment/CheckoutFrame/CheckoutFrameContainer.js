import { connect } from 'react-redux'
import { getFormValues, change } from 'redux-form'

import { trackFailedCheckoutFlow } from 'actions/log'
import {
  fireCheckoutError,
  checkoutClearErrors,
  fireCheckoutPendingEvent,
  trackingCardTokenizationSuccessfully,
  trackingCardTokenizationFailed,
} from 'routes/Checkout/checkoutActions'
import { hasCheckoutError } from 'routes/Checkout/checkoutSelectors'

import { sectionName, deliveryAddressSectionName } from '../config'
import { CheckoutFrame } from './CheckoutFrame'
import { getBillingAddress } from './utils'

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
