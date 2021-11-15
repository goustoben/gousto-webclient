import { actionTypes } from "actions/actionTypes"

export const basketAddressChange = address => ({
  type: actionTypes.BASKET_ADDRESS_CHANGE,
  address,
})
