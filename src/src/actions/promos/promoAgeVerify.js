import { actionTypes } from "actions/actionTypes"

export const promoAgeVerify = ageVerified => ({
  type: actionTypes.PROMO_AGE_VERIFY,
  ageVerified,
})
