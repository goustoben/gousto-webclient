import { connect } from 'react-redux'

import promoActions from 'actions/promos'
import { redirect } from 'actions/redirect'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { getPromoCode } from 'selectors/basket'
import {
  getPromoBannerText,
  getPromoBannerCode,
  getPromoBannerEnabled,
  getIsSignupReductionEnabled,
} from 'selectors/features'

import home from 'config/home'

import { PromoBanner } from './PromoBanner'

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

const mapStateToProps = (state, ownProps) => {
  const { linkText } = home.promo.banner
  const enabled = getPromoBannerEnabled(state)
  const isSignupReductionEnabled = getIsSignupReductionEnabled(state)
  const currentPromo = state.promoCurrent || ''
  const basketPromo = getPromoCode(state) || ''
  const isAuthenticated = state.auth.get('isAuthenticated')
  const text = getPromoBannerText(state) || home.promo.banner.mayText
  const promoCode = getPromoBannerCode(state) || ownProps.promoCode || home.promo.mayCode
  const queryStringPromo = (ownProps.location && ownProps.location.query && ownProps.location.query.promo_code) ? ownProps.location.query.promo_code : ''

  const hasBasketPromo = basketPromo.length > 0
  const hasCurrentPromo = currentPromo.length > 0
  const hasQueryStringPromo = queryStringPromo.length > 0

  const hide = !enabled
    || isAuthenticated
    || hasBasketPromo
    || hasQueryStringPromo
    || hasCurrentPromo
    || !promoCode
    || isSignupReductionEnabled

  const canApplyPromo = !(hasQueryStringPromo) && promoCode && promoApplicable(isAuthenticated, home.promo.applyIf)

  return {
    text,
    hide,
    linkText,
    promoCode,
    canApplyPromo,
  }
}

const mapDispatchToProps = {
  redirect,
  promoChange: promoActions.promoChange,
  promoToggleModalVisibility: promoActions.promoToggleModalVisibility,
  trackUTMAndPromoCode,
}

export const PromoBannerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PromoBanner)
