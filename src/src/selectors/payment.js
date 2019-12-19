import Immutable from 'immutable'

export const getPaymentDetails = state => {
  const payment = Immutable.fromJS(state.form.payment.values.payment)
  
  return {
    payment_provider: 'checkout',
    active: 1,
    card_token: payment.get('token')
  }
}
