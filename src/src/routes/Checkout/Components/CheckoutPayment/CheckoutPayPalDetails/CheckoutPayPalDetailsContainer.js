import { connect } from 'react-redux'
import { PaymentMethod } from 'config/signup'
import { firePayPalError, setPayPalDeviceData, setPayPalNonce, setCurrentPaymentMethod } from 'actions/checkout'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { getPayPalClientToken, isPayPalReady } from 'selectors/payment'
import { CheckoutPayPalDetails } from './CheckoutPayPalDetails'

const mapStateToProps = (state) => ({
  token: getPayPalClientToken(state),
  isPayPalSetupDone: isPayPalReady(state)
})

const mapDispatchToProps = {
  setPayPalDeviceData,
  setPayPalNonce,
  resetPaymentMethod: setCurrentPaymentMethod.bind(null, PaymentMethod.Card),
  trackEvent: trackUTMAndPromoCode,
  firePayPalError,
}

export const CheckoutPayPalDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutPayPalDetails)
