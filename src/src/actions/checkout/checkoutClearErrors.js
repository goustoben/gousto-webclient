import { actionTypes } from 'actions/actionTypes'

export function checkoutClearErrors() {
  return {
    type: actionTypes.CHECKOUT_ERRORS_CLEAR,
  }
}
