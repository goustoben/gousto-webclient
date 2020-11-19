import { connect } from 'react-redux'
import { PaymentMethod } from 'config/signup'
import { firePayPalError, clearPayPalErrors, setPayPalDeviceData, setPayPalNonce, setCurrentPaymentMethod } from 'actions/checkout'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { isSubmitting } from 'routes/Checkout/utils/state'
import { getPayPalClientToken, isPayPalReady } from 'selectors/payment'
import { CheckoutPayPalDetails } from './CheckoutPayPalDetails'

const mapStateToProps = (state) => ({
  token: getPayPalClientToken(state),
  isPayPalSetupDone: isPayPalReady(state),
  hasErrors: state.checkout.get('paypalErrors').size > 0,
  isSubmitting: isSubmitting(state),
})

const mapDispatchToProps = {
  setPayPalDeviceData,
  setPayPalNonce,
  resetPaymentMethod: setCurrentPaymentMethod.bind(null, PaymentMethod.Card),
  trackEvent: trackUTMAndPromoCode,
  firePayPalError,
  clearPayPalErrors,
}

export const CheckoutPayPalDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutPayPalDetails)
