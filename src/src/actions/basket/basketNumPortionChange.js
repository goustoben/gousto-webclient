import { push } from "react-router-redux"
import { actionTypes } from "actions/actionTypes"
import { limitReached } from "utils/basket"
import * as trackingKeys from "actions/trackingKeys"
import { getUTMAndPromoCode } from "selectors/tracking"
import { pricingRequest } from "actions/pricing/pricingRequest"

export const basketNumPortionChange = (numPortions) => (
  (dispatch, getState) => {
    const {routing} = getState()
    const prevLoc = routing ? routing.locationBeforeTransitions : null
    const query = prevLoc.query || null

    if (query && query.num_portions) {
      const newLoc = {
        ...prevLoc,
        num_portions: numPortions
      }

      dispatch(push(newLoc))
    }

    dispatch({
      type: actionTypes.BASKET_NUM_PORTION_CHANGE,
      numPortions,
    })

    const state = getState()
    const reachedLimit = limitReached(state.basket, state.menuRecipes, state.menuRecipeStock)
    dispatch({
      type: actionTypes.BASKET_LIMIT_REACHED,
      limitReached: reachedLimit,
      trackingData: {
        actionType: trackingKeys.basketLimit,
        source: trackingKeys.selectPortionSize,
        limitReached: reachedLimit,
      },
    })

    dispatch(pricingRequest())

    const {promoCode, UTM} = getUTMAndPromoCode(getState())
    dispatch({
      type: actionTypes.BOX_SIZE_CHANGED_TRACKING,
      trackingData: {
        actionType: trackingKeys.selectBoxSize,
        boxSize: `${numPortions} people`,
        ...UTM,
        promoCode
      },
    })
  }
)
