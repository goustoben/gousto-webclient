import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"

export const cancelOrderModalToggleVisibility = (visibility, orderId) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.ORDER_CANCELLED_MODAL_VISIBILITY_CHANGE,
      data: {
        visibility,
        orderId,
      },
    })
    if (visibility === false) {
      dispatch(error(actionTypes.ORDER_CANCEL, null))
    }
  }
)
