import { actionTypes } from "actions/actionTypes"

export const basketPostcodeChangePure = postcode => ({
  type: actionTypes.BASKET_POSTCODE_CHANGE,
  postcode: postcode.trim(),
})
