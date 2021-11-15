import { actionTypes } from "actions/actionTypes"

export const basketPromoCodeUrlChange = promoCodeUrl => ({
  type: actionTypes.BASKET_PROMO_CODE_URL_CHANGE,
  promoCodeUrl,
})
