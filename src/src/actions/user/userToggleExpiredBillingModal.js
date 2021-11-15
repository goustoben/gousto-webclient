import { actionTypes } from "actions/actionTypes"

export function userToggleExpiredBillingModal(visibility) {
  return dispatch => {
    dispatch({
      type: actionTypes.EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE,
      visibility
    })
  }
}
