import { actionTypes } from "actions/actionTypes"

export const basketPromoCodeChange = promoCode => ({
  type: actionTypes.BASKET_PROMO_CODE_CHANGE,
  promoCode,
})
