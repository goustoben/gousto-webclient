import { actionTypes } from "actions/actionTypes"

export function userToggleEditDateSection(orderId, editDeliveryMode) {
  return dispatch => {
    dispatch({
      type: actionTypes.USER_ORDER_EDIT_OPEN_CLOSE,
      orderId,
      editDeliveryMode
    })
  }
}
