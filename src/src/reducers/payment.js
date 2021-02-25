import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { PaymentMethod } from 'config/signup'

export const initialState = () => Immutable.Map({
  challengeUrl: null,
  isModalVisible: false,
  paymentMethod: PaymentMethod.Card,
  paypalClientToken: null,
  paypalNonce: null,
  paypalDeviceData: null,
})

export const payment = (state = initialState(), action) => {
  switch (action.type) {
  case actionTypes.PAYMENT_SHOW_MODAL: {
    return state
      .set('isModalVisible', true)
      .set('challengeUrl', action.challengeUrl)
  }

  case actionTypes.PAYMENT_HIDE_MODAL: {
    return state
      .set('isModalVisible', false)
      .set('challengeUrl', null)
  }

  case actionTypes.PAYMENT_SET_PAYMENT_METHOD: {
    return state
      .set('paymentMethod', action.paymentMethod)
      .set('paypalNonce', null)
  }

  case actionTypes.PAYMENT_SET_PAYPAL_CLIENT_TOKEN: {
    const { token } = action

    return state.set('paypalClientToken', token)
  }

  case actionTypes.PAYMENT_SET_PAYPAL_NONCE: {
    const { nonce } = action

    return state.set('paypalNonce', nonce)
  }

  case actionTypes.PAYMENT_SET_PAYPAL_DEVICE_DATA: {
    const { deviceData } = action

    return state.set('paypalDeviceData', deviceData)
  }

  default:
    return state
  }
}
