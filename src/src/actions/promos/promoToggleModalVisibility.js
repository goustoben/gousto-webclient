import { discountPopupDisplayed } from "actions/trackingKeys"
import { actionTypes } from "actions/actionTypes"
import { trackUTMAndPromoCode } from "actions/tracking/trackUTMAndPromoCode"

export const promoToggleModalVisibility = visible => dispatch => {
  if (visible) {
    dispatch(trackUTMAndPromoCode(discountPopupDisplayed))
  }

  dispatch({
    type: actionTypes.PROMO_MODAL_VISIBILITY_CHANGE,
    visible,
  })
}
