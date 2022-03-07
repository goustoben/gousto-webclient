import Immutable from 'immutable'
import { PaymentMethod } from 'config/signup'
import routes from 'config/routes'
import { getPreviewOrderId } from 'selectors/basket'

export const getCurrentPaymentMethod = state => state.payment.get('paymentMethod')

export const getPayPalClientToken = state => state.payment.get('paypalClientToken')

export const getCardToken = state => Immutable.fromJS(state.form.payment.values.payment).get('token')

export const getChallengeUrl = state => state.payment.get('challengeUrl')

export const isModalOpen = state => state.payment.get('isModalVisible')

export const isPayPalReady = state => (
  getCurrentPaymentMethod(state) === PaymentMethod.PayPal
    && !!state.payment.get('paypalNonce')
)

export const isCardPayment = state => (
  getCurrentPaymentMethod(state) === PaymentMethod.Card
)

export const getCanSubmitPaymentDetails = state => (
  getCurrentPaymentMethod(state) === PaymentMethod.Card || isPayPalReady(state)
)

export const getPaymentProvider = state => (isCardPayment(state) ? 'checkout' : 'paypal')

export const getCardPaymentDetails = state => ({
  payment_provider: 'checkout',
  active: 1,
  card_token: getCardToken(state),
})

export const getPayPalPaymentDetails = state => ({
  payment_provider: 'paypal',
  active: 1,
  token: state.payment.get('paypalNonce'),
  device_data: state.payment.get('paypalDeviceData'),
})

export const getPaymentAuthData = (state, { pricing }) => {
  const { success, failure } = routes.client.payment
  const total = pricing.total || 0
  const amountInPence = Math.round(total * 100)

  return {
    order_id: state.basket.get('previewOrderId'),
    gousto_ref: state.checkout.get('goustoRef'),
    card_token: getCardToken(state),
    amount: amountInPence,
    '3ds': true,
    success_url: window.location.origin + success,
    failure_url: window.location.origin + failure,
    decoupled: true
  }
}

export const getPaymentData = state => {
  const { checkout } = state
  const result = {
    order_id: getPreviewOrderId(state),
    gousto_ref: checkout.get('goustoRef'),
  }

  if (isCardPayment(state)) {
    const cardPaymentDetails = getCardPaymentDetails(state)

    return {
      ...result,
      card_token: cardPaymentDetails.card_token,
      '3ds': true,
    }
  }

  const payPalPaymentDetails = getPayPalPaymentDetails(state)

  return {
    ...result,
    card_token: payPalPaymentDetails.token,
    device_data: payPalPaymentDetails.device_data,
  }
}
