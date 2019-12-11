import { connect } from 'react-redux'
import { getFormValues, change } from 'redux-form'

import { hasCheckoutError } from 'selectors/checkout'
import {
  fireCheckoutError,
  checkoutClearErrors,
  fireCheckoutPendingEvent,
  trackingCardTokenisationSuccessfully,
  trackingCardTokenisationFailed
} from 'actions/checkout'
import { sectionName } from '../config'
import { getBillingAddress } from './utils'
import { CheckoutFrame } from './CheckoutFrame'

const mapStateToProps = state => {
  const formValues = getFormValues(sectionName)(state)

  return {
    sectionName,
    cardName: formValues && formValues[sectionName] && formValues[sectionName].cardName ? formValues[sectionName].cardName : '',
    billingAddress : getBillingAddress(formValues),
    hasCheckoutError:  hasCheckoutError(state),
  }
}

const mapDispatchToProps = {
  change,
  checkoutClearErrors,
  fireCheckoutError,
  fireCheckoutPendingEvent,
  trackingCardTokenisationSuccessfully,
  trackingCardTokenisationFailed,
}

export const CheckoutFrameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutFrame)
