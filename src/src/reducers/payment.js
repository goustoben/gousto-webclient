import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { PaymentMethod } from 'config/signup'

export const initialState = () => Immutable.Map({
  challengeUrl: null,
  isModalVisible: false,
  currentPaymentMethod: PaymentMethod.Unchosen
})

export const payment = (state = initialState(), action) => {
  switch (action.type) {
  case actionTypes.PAYMENT_SHOW_MODAL:
    return state
      .set('isModalVisible', true)
      .set('challengeUrl', action.challengeUrl)
  case actionTypes.PAYMENT_HIDE_MODAL:
    return state
      .set('isModalVisible', false)
      .set('challengeUrl', null)
  case actionTypes.PAYMENT_SET_CURRENT_PAYMENT_METHOD:
    return state
      .set('currentPaymentMethod', action.paymentMethod)
  default:
    return state
  }
}
