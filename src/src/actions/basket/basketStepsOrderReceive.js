import { actionTypes } from "actions/actionTypes"

export const basketStepsOrderReceive = stepsOrder => ({
  type: actionTypes.BASKET_STEPS_ORDER_RECEIVE,
  stepsOrder,
})
