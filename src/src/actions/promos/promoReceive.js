import { actionTypes } from "actions/actionTypes"

export const promoReceive = promo => ({
  type: actionTypes.PROMO_RECEIVE,
  promo,
})
