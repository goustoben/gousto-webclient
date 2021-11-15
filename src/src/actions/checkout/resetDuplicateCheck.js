import { actionTypes } from 'actions/actionTypes'
import { getPromoCode } from 'selectors/basket'
import { isValidPromoCode } from 'utils/order'
import { basketPromoCodeChange } from 'actions/basket/basketPromoCodeChange'
import { basketPromoCodeAppliedChange } from 'actions/basket/basketPromoCodeAppliedChange'
import { error } from "actions/status/error"
import { pricingRequest } from "actions/pricing/pricingRequest"

export function resetDuplicateCheck() {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(error(actionTypes.CHECKOUT_ERROR_DUPLICATE, null))
    if (getPromoCode(state)) {
      const {pricing} = state

      if (!isValidPromoCode(pricing.get('prices'))) {
        dispatch(basketPromoCodeChange(''))
        dispatch(basketPromoCodeAppliedChange(false))
        dispatch(error(actionTypes.CHECKOUT_ERROR_DUPLICATE, true))
        dispatch(pricingRequest())
      }
    }
  }
}
