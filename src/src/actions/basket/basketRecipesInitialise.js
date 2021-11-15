import { actionTypes } from "actions/actionTypes"
import { naiveLimitReached } from "utils/basket"
import { pricingRequest } from "actions/pricing/pricingRequest"

export const basketRecipesInitialise = (recipes) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.BASKET_RECIPES_INITIALISE,
    recipes,
  })

  const {basket} = getState()
  const reachedLimit = naiveLimitReached(basket)
  dispatch({
    type: actionTypes.BASKET_LIMIT_REACHED,
    limitReached: reachedLimit,
  })

  dispatch(pricingRequest())
}
