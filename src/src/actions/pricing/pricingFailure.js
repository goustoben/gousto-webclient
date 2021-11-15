import { actionTypes } from 'actions/actionTypes'

export const pricingFailure = (message) => ({
  type: actionTypes.PRICING_FAILURE,
  message,
})
