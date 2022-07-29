import { actionTypes } from 'actions/actionTypes'
import { promo } from 'routes/Home/homeConfig'
import { getPromoCode } from 'selectors/basket'
import { getPromoBannerCode, getIsSignupReductionEnabled } from 'selectors/features'

export const getPromoBannerState = (state, isTwoMonthPromoCodeEnabled = false) => {
  const isSignupReductionEnabled = getIsSignupReductionEnabled(state)
  const currentPromo = state.promoCurrent || ''
  const basketPromo = getPromoCode(state) || ''
  const isAuthenticated = state.auth.get('isAuthenticated')

  const promoCode =
    getPromoBannerCode(state) ||
    (isTwoMonthPromoCodeEnabled ? promo.twoMonthPromoCode : promo.defaultPromoCode)

  const hasBasketPromo = basketPromo.length > 0
  const hasCurrentPromo = currentPromo.length > 0

  const hasError =
    !!state.error.get(actionTypes.PROMO_GET) || !!state.error.get(actionTypes.PROMO_APPLY)

  const hide =
    isAuthenticated || hasError || hasBasketPromo || hasCurrentPromo || isSignupReductionEnabled

  const canApplyPromo = !hide

  return {
    promoCode,
    canApplyPromo,
    basketPromo,
  }
}
