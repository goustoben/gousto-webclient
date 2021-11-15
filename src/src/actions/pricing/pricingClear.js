import { actionTypes } from "actions/actionTypes"

export const pricingReset = () => ({
  type: actionTypes.PRICING_RESET,
})
export const pricingClear = () => async (dispatch, getState) => {
  const prices = getState().pricing.get('prices').toJS()

  if (Object.keys(prices).length) {
    dispatch(pricingReset())
  }
}
