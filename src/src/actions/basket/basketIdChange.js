import { actionTypes } from "actions/actionTypes"

export const basketIdChange = orderId => ({
  type: actionTypes.BASKET_ID_CHANGE,
  orderId,
})
