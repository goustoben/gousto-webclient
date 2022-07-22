import { connect } from 'react-redux'

import { trackSuccessfulCheckoutFlow, trackFailedCheckoutFlow } from 'actions/log'
import { trackUTMAndPromoCode } from 'actions/tracking'
import {
  firePayPalError,
  clearPayPalErrors,
  setPayPalDeviceData,
  setPayPalNonce,
} from 'routes/Checkout/checkoutActions'
import { getPayPalClientToken, isPayPalReady } from 'routes/Checkout/checkoutPaymentSelectors'

import { CheckoutPayPalDetails } from './CheckoutPayPalDetails'

const mapStateToProps = (state) => ({
  token: getPayPalClientToken(state),
  isPayPalSetupDone: isPayPalReady(state),
  hasErrors: state.checkout.get('paypalErrors', []).size > 0,
})

const mapDispatchToProps = {
  setPayPalDeviceData,
  trackEvent: trackUTMAndPromoCode,
  firePayPalError,
  clearPayPalErrors,
  trackSuccessfulCheckoutFlow,
  trackFailedCheckoutFlow,
  setPayPalNonce,
}

export const CheckoutPayPalDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutPayPalDetails)
