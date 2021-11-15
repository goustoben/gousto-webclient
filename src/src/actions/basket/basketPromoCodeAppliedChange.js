import { actionTypes } from "actions/actionTypes"

export const basketPromoCodeAppliedChange = promoCodeApplied => ({
  type: actionTypes.BASKET_PROMO_CODE_APPLIED_CHANGE,
  promoCodeApplied,
})
