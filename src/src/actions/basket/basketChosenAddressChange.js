import { actionTypes } from "actions/actionTypes"

export const basketChosenAddressChange = address => ({
  type: actionTypes.BASKET_CHOSEN_ADDRESS_CHANGE,
  address,
})
