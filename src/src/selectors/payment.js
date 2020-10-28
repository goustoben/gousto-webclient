import Immutable from 'immutable'
import { PaymentMethod } from 'config/signup'

export const getCurrentPaymentMethod = state => state.payment.get('paymentMethod')

export const getPayPalClientToken = state => state.payment.get('paypalClientToken')

export const getCardToken = state => Immutable.fromJS(state.form.payment.values.payment).get('token')

export const getChallengeUrl = state => state.payment.get('challengeUrl')

export const isModalOpen = state => state.payment.get('isModalVisible')

export const isPayPalReady = state => (
  getCurrentPaymentMethod(state) === PaymentMethod.PayPal
    && !!state.payment.get('paypalNonce')
)

export const getCanSubmitPaymentDetails = state => (
  getCurrentPaymentMethod(state) === PaymentMethod.Card || isPayPalReady(state)
)

export const getPaymentDetails = state => ({
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
