import { getUTMAndPromoCode } from "selectors/tracking"
import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export const basketCheckoutClicked = section => (
  (dispatch, getState) => {
    const {basket} = getState()
    const recipes = basket.get('recipes')
    const {promoCode, UTM} = getUTMAndPromoCode(getState())
    dispatch({
      type: actionTypes.BASKET_CHECKOUT_CLICKED,
      trackingData: {
        actionType: trackingKeys.clickCheckout,
        ...UTM,
        promoCode,
        section,
        recipes,
      },
    })
  }
)
