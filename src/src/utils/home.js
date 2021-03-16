import { getPromoCode } from 'selectors/basket'
import {
  getPromoBannerCode,
  getIsSignupReductionEnabled,
} from 'selectors/features'
import { promo } from 'config/home'
import { actionTypes } from 'actions/actionTypes'

export const promoApplicable = (isAuthenticated, criteria) => {
  switch (criteria) {
  case 'loggedIn':
    return isAuthenticated === true
  case 'loggedOut':
    return isAuthenticated === false
  case 'any':
    return true
  default:
    return false
  }
}

export const getPromoBannerState = (state, ownPromoCode, propsLocation) => {
  const isSignupReductionEnabled = getIsSignupReductionEnabled(state)
  const currentPromo = state.promoCurrent || ''
  const basketPromo = getPromoCode(state) || ''
  const isAuthenticated = state.auth.get('isAuthenticated')
  const promoCode = getPromoBannerCode(state) || ownPromoCode || promo.mayCode
  const queryStringPromo = (propsLocation && propsLocation.query && propsLocation.query.promo_code) ? propsLocation.query.promo_code : ''

  const hasBasketPromo = basketPromo.length > 0
  const hasCurrentPromo = currentPromo.length > 0
  const hasQueryStringPromo = queryStringPromo.length > 0

  const hasError = !!state.error.get(actionTypes.PROMO_GET) || !!state.error.get(actionTypes.PROMO_APPLY)

  const hide = isAuthenticated
    || hasError
    || hasBasketPromo
    || hasQueryStringPromo
    || hasCurrentPromo
    || !promoCode
    || isSignupReductionEnabled

  const canApplyPromo = !(hasQueryStringPromo) && promoCode && promoApplicable(isAuthenticated, promo.applyIf)

  return {
    hide,
    promoCode,
    canApplyPromo
  }
}
