import { getPromoBannerState } from "utils/home"
import logger from "utils/logger"
import { promoChange } from "../promos/promoChange"
import { promoToggleModalVisibility } from "../promos/promoToggleModalVisibility"

export const applyPromoCodeAndShowModal = () => async (dispatch, getState) => {
  const state = getState()
  const {promoCode, canApplyPromo} = getPromoBannerState(state)

  if (!canApplyPromo) {
    return
  }

  try {
    await dispatch(promoChange(promoCode))
  } catch (err) {
    logger.warning(`error fetching promo code ${promoCode} - ${err.message}`, err)

    return
  }

  dispatch(promoToggleModalVisibility(true))
}
