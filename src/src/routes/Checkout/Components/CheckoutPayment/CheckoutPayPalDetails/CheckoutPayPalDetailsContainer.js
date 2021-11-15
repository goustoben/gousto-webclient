import { connect } from 'react-redux'
import { getPayPalClientToken, isPayPalReady } from 'selectors/payment'
import { CheckoutPayPalDetails } from './CheckoutPayPalDetails'
import { firePayPalError } from "actions/checkout/firePayPalError"
import { setPayPalNonce } from "actions/checkout/setPayPalNonce"
import { setPayPalDeviceData } from "actions/checkout/setPayPalDeviceData"
import { clearPayPalErrors } from "actions/checkout/clearPayPalErrors"
import { trackFailedCheckoutFlow } from "actions/log/trackFailedCheckoutFlow"
import { trackUTMAndPromoCode } from "actions/tracking/trackUTMAndPromoCode"

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
