import { actionTypes } from "actions/actionTypes"

export const basketReset = (chosenAddress = null) => ({
  type: actionTypes.BASKET_RESET,
  payload: {
    chosenAddress
  }
})
