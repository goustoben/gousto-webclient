import { actionTypes } from "actions/actionTypes"

export const promoClear = () => ({
  type: actionTypes.PROMO_SET,
  code: '',
})
