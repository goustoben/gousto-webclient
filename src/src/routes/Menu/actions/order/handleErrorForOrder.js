import { error } from "actions/status/error"
import { actionTypes } from "actions/actionTypes"
import { pending } from "actions/status/pending"

export const handleErrorForOrder = (message) => (dispatch) => {
    dispatch(error(actionTypes.ORDER_SAVE, message))
    dispatch(pending(actionTypes.BASKET_CHECKOUT, false))

    dispatch(pending(actionTypes.ORDER_SAVE, false))
}
