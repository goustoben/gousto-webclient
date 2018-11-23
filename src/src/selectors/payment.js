import Immutable from 'immutable'

import { isCheckoutPaymentFeatureEnabled } from './features'

export const getPaymentDetails = state => {
  const payment = Immutable.fromJS(state.form.checkout.values.payment)
  if (isCheckoutPaymentFeatureEnabled(state)) {
    return {
      payment_provider: 'checkout',
      active: 1,
      card_token: payment.get('token') || 'card_tok_E7A25A30-B600-4FE2-AD06-DC39A0E3DAC2'
    }
  }

  return {
    type: payment.get('cardType'),
    number: payment.get('cardNumber'),
    cvv2: payment.get('cv2'),
    holder: payment.get('cardName'),
    expiry_month: payment.get('cardExpiryMonth'),
    expiry_year: `20${payment.get('cardExpiryYear')}`,
    active: 1,
  }
}
