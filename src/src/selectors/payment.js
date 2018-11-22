import Immutable from "immutable"
import { isCheckoutPaymentFeatureEnabled } from './features'

export const getCardDetails = state => {
  const payment = Immutable.fromJS(state.form.checkout.values.payment)
  if (isCheckoutPaymentFeatureEnabled(state)) {
    return {
      payment_provider: 'checkout',
      active: 1,
      card_token: payment.get('token') || 'card_tok_831367E8-9FE6-438F-AC49-57C7C5E69D5B'
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
