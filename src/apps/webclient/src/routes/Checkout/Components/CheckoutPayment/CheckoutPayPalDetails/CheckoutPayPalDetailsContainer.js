import { connect } from 'react-redux'

import { firePayPalError, clearPayPalErrors, setPayPalDeviceData } from 'actions/checkout'
import { trackSuccessfulCheckoutFlow, trackFailedCheckoutFlow } from 'actions/log'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { getPayPalClientToken, isPayPalReady } from 'selectors/payment'

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
}

export const CheckoutPayPalDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutPayPalDetails)
