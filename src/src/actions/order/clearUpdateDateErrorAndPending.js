import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"

export const clearUpdateDateErrorAndPending = () => (
  (dispatch) => {
    dispatch(pending(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, null))
    dispatch(error(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, null))
  }
)
