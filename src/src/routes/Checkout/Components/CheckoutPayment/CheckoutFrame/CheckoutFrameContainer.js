import { connect } from 'react-redux'
import { getFormValues, change } from 'redux-form'

import { hasCheckoutError } from 'selectors/checkout'
import {
  fireCheckoutError,
  checkoutClearErrors,
  fireCheckoutPendingEvent,
  trackingCardTokenizationSuccessfully,
  trackingCardTokenizationFailed
} from 'actions/checkout'
import {
  getIsCheckoutOverhaulCardFirstEnabled,
  getIsCheckoutOverhaulPayPalFirstEnabled,
} from 'selectors/features'
import { sectionName, deliveryAddressSectionName } from '../config'
import { getBillingAddress } from './utils'
import { CheckoutFrame } from './CheckoutFrame'

const mapStateToProps = state => {
  const formValues = {
    ...getFormValues(sectionName)(state),
    ...getFormValues(deliveryAddressSectionName)(state),
  }

  return {
    sectionName,
    cardName: formValues && formValues[sectionName] && formValues[sectionName].cardName ? formValues[sectionName].cardName : '',
    billingAddress: getBillingAddress(formValues),
    hasCheckoutError: hasCheckoutError(state),
    isCheckoutVariationEnabled: getIsCheckoutOverhaulCardFirstEnabled(state) || getIsCheckoutOverhaulPayPalFirstEnabled(state),
  }
}

const mapDispatchToProps = {
  change,
  checkoutClearErrors,
  fireCheckoutError,
  fireCheckoutPendingEvent,
  trackingCardTokenizationSuccessfully,
  trackingCardTokenizationFailed,
}

export const CheckoutFrameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutFrame)
