import { getIsAuthenticated } from "selectors/auth"
import { getBasketRecipes } from "selectors/basket"
import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import logger from "utils/logger"
import { trackingOrderCheckout } from "actions/tracking/trackingOrderCheckout"

export const basketCheckedOut = (view) => (dispatch, getState) => {
  const state = getState()
  const isAuthenticated = getIsAuthenticated(state)
  const recipes = getBasketRecipes(state)
  const numRecipes = recipes.size

  try {
    dispatch(pending(actionTypes.BASKET_CHECKOUT, true))

    if (isAuthenticated) {
      dispatch(trackingOrderCheckout())
    }

    dispatch({
      type: actionTypes.BASKET_CHECKOUT,
      trackingData: {
        actionType: trackingKeys.checkOutBasketAttempt,
        numRecipes,
        view,
      },
    })
  } catch (err) {
    dispatch(error(actionTypes.BASKET_CHECKOUT, true))
    logger.error(err)
  } finally {
    dispatch(pending(actionTypes.BASKET_CHECKOUT, false))
  }
}
