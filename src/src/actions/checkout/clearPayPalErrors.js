import { actionTypes } from 'actions/actionTypes'

export function clearPayPalErrors() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHECKOUT_PAYPAL_ERRORS_CLEAR
    })
  }
}
