import { connect } from 'react-redux'

import actions from 'actions'
import { changeRecaptcha } from 'actions/auth'
import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'
import { fetchPayPalClientToken, trackCheckoutButtonPressed, clearPayPalClientToken } from 'actions/checkout'
import { trackUTMAndPromoCode, trackCheckoutNavigationLinks } from 'actions/tracking'
import { getIsCheckoutOverhaulEnabled } from 'selectors/features'
import { Checkout } from './Checkout'

function mapStateToProps(state, ownProps) {
  return {
    query: ownProps.location.query,
    params: ownProps.params,
    stepsOrder: state.basket.get('stepsOrder'),
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    browser: state.request.get('browser'),
    tariffId: state.basket.get('tariffId'),
    isCheckoutOverhaulEnabled: getIsCheckoutOverhaulEnabled(state),
    prices: state.pricing.get('prices'),

    isLoginOpen: state.loginVisibility.get('login'),
    isAuthenticated: state.auth && state.auth.get('isAuthenticated'),
    isMobile: state.request.get('browser') === 'mobile',
  }
}

export const CheckoutContainer = connect(mapStateToProps, {
  menuLoadDays: actions.menuLoadDays,
  redirect: actions.redirect,
  submitOrder: actions.checkoutSignup,
  menuLoadBoxPrices: actions.menuLoadBoxPrices,
  loadPrices: actions.pricingRequest,
  trackSignupStep: actions.trackSignupPageChange,
  boxSummaryDeliveryDaysLoad,
  trackCheckoutButtonPressed,
  changeRecaptcha,
  trackUTMAndPromoCode,
  fetchPayPalClientToken,
  clearPayPalClientToken,
  trackCheckoutNavigationLinks,
  loginVisibilityChange: actions.loginVisibilityChange,
})(Checkout)
