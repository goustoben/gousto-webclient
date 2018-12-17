import Immutable from 'immutable'

import { isCheckoutPaymentFeatureEnabled } from './features'

export const getPaymentDetails = state => {
  let payment
  
  if (isCheckoutPaymentFeatureEnabled(state)) {
    payment = Immutable.fromJS(state.form.payment.values.payment)

    return {
      payment_provider: 'checkout',
      active: 1,
      card_token: payment.get('token')
    }
  }

  payment = Immutable.fromJS(state.form.checkout.values.payment)

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
