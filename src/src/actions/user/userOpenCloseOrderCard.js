import { actionTypes } from "actions/actionTypes"

export function userOpenCloseOrderCard(orderId, isCollapsed) {
  return dispatch => {
    dispatch({
      type: actionTypes.USER_ORDER_CARD_OPEN_CLOSE,
      orderId,
      isCollapsed
    })
  }
}
