import { actionTypes } from 'actions/actionTypes'

export const pricingSuccess = (prices) => ({
  type: actionTypes.PRICING_SUCCESS,
  prices,
})
