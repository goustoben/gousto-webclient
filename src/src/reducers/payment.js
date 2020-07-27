import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

export const initialState = () => Immutable.Map({
  challengeUrl: null,
  isModalVisible: false,
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
  default:
    return state
  }
}
