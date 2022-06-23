// import { RootStateOrAny } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { promo } from 'config/home'
import { ImmutableSignupState } from 'reducers/signup'
import { getPromoCode } from 'selectors/basket'
import { getPromoBannerCode, getIsSignupReductionEnabled } from 'selectors/features'

// NOT SURE. This is just example, were do we need to store it?
interface RootState {
  [key: string]: any
  features: any
  signup: ImmutableSignupState
}

export interface PromoBannerState {
  promoCode: any
  canApplyPromo: boolean
  basketPromo: any
}

export const getPromoBannerState = (
  state: RootState,
  isTwoMonthPromoCodeEnabled = false,
): PromoBannerState => {
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
