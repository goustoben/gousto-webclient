import { getIsGoustoOnDemandEnabled } from "selectors/features"
import { getIsAuthenticated } from "selectors/auth"
import { basketPromoCodeChange } from "actions/basket/basketPromoCodeChange"
import { menuLoadBoxPrices } from "actions/menu/menuLoadBoxPrices"
import { promoGet } from "./promoGet"
import { actionTypes } from "actions/actionTypes"
import { promoCurrentSet } from "./promoCurrentSet"

export const promoChange = code => (
  async (dispatch, getState) => {
    const state = getState()
    if (getIsGoustoOnDemandEnabled(state) && !getIsAuthenticated(state)) {
      dispatch(basketPromoCodeChange(code))
      await dispatch(menuLoadBoxPrices())
    }

    if (!state.promoStore.get(code, null)) {
      await dispatch(promoGet(code))
    }

    if (!state.error.get(actionTypes.PROMO_GET)) {
      dispatch(promoCurrentSet(code))
    }
  }
)
