import { actionTypes } from "actions/actionTypes"

export const promoCurrentSet = code => ({
  type: actionTypes.PROMO_SET,
  code,
})
