import { promoToggleModalVisibility } from "./promoToggleModalVisibility"
import { promoClear } from "./promoClear"
import { error } from "actions/status/error"
import { actionTypes } from "actions/actionTypes"

export const promoCloseModal = () => (
  dispatch => {
    dispatch(promoToggleModalVisibility(false))
    setTimeout(() => {
      dispatch(promoClear())
      dispatch(error(actionTypes.PROMO_APPLY, ''))
      dispatch(error(actionTypes.PROMO_GET, ''))
    }, 750)
  }
)
