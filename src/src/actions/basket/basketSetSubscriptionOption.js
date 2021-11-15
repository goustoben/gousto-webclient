import { actionTypes } from "actions/actionTypes"

export const basketSetSubscriptionOption = subscriptionOption => ({
  type: actionTypes.BASKET_SET_SUBSCRIPTION_OPTION,
  subscriptionOption,
})
