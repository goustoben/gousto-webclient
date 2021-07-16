import { connect } from 'react-redux'
import {
  firePayPalError,
  clearPayPalErrors,
  setPayPalDeviceData,
  setPayPalNonce,
} from 'actions/checkout'
import { trackFailedCheckoutFlow } from 'actions/log'
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
  setPayPalNonce,
  trackEvent: trackUTMAndPromoCode,
  firePayPalError,
  clearPayPalErrors,
  trackFailedCheckoutFlow,
}

export const CheckoutPayPalDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutPayPalDetails)
