import { getPromoCode } from 'selectors/basket'
import {
  getPromoBannerCode,
  getIsSignupReductionEnabled,
} from 'selectors/features'
import { promo } from 'config/home'
import { actionTypes } from 'actions/actionTypes'

export const getPromoBannerState = (state) => {
  const isSignupReductionEnabled = getIsSignupReductionEnabled(state)
  const currentPromo = state.promoCurrent || ''
  const basketPromo = getPromoCode(state) || ''
  const isAuthenticated = state.auth.get('isAuthenticated')
  const promoCode = getPromoBannerCode(state) || promo.defaultPromoCode

  const hasBasketPromo = basketPromo.length > 0
  const hasCurrentPromo = currentPromo.length > 0

  const hasError = !!state.error.get(actionTypes.PROMO_GET) || !!state.error.get(actionTypes.PROMO_APPLY)

  const hide = isAuthenticated
    || hasError
    || hasBasketPromo
    || hasCurrentPromo
    || isSignupReductionEnabled

  const canApplyPromo = !hide

  return {
    promoCode,
    canApplyPromo
  }
}
