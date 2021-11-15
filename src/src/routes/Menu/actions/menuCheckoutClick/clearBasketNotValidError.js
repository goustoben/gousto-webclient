import { error } from "actions/status/error"
import { actionTypes } from "actions/actionTypes"

export const clearBasketNotValidError = () => (dispatch) => {
    dispatch(error(actionTypes.BASKET_NOT_VALID, null))
}
