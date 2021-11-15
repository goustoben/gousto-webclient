import { connect } from 'react-redux'

import { getCheckoutLastReachedStepIndex } from 'selectors/checkout'
import {
  getIsGoustoOnDemandEnabled,
  getIsPaymentBeforeChoosingEnabled,
  getIsPaymentBeforeChoosingV3Enabled,
} from 'selectors/features'
import { Checkout } from './Checkout'
import { authChangeRecaptcha } from "actions/auth/authChangeRecaptcha"
import { boxSummaryDeliveryDaysLoad } from "actions/boxSummary/boxSummaryDeliveryDaysLoad"
import { checkoutStepIndexReached } from "actions/checkout/checkoutStepIndexReached"
import { clearPayPalClientToken } from "actions/checkout/clearPayPalClientToken"
import { fetchPayPalClientToken } from "actions/checkout/fetchPayPalClientToken"
import { trackCheckoutButtonPressed } from "actions/checkout/trackCheckoutButtonPressed"
import { fetchGoustoRef } from "actions/checkout/fetchGoustoRef"
import { trackSuccessfulCheckoutFlow } from "actions/log/trackSuccessfulCheckoutFlow"
import { trackFailedCheckoutFlow } from "actions/log/trackFailedCheckoutFlow"
import { trackUTMAndPromoCode } from "actions/tracking/trackUTMAndPromoCode"
import { trackCheckoutNavigationLinks } from "actions/tracking/trackCheckoutNavigationLinks"
import { menuLoadDays } from "actions/menu/menuLoadDays"
import { checkoutSignup } from "actions/checkout/checkoutSignup"
import { menuLoadBoxPrices } from "actions/menu/menuLoadBoxPrices"
import { trackSignupPageChange } from "actions/checkout/trackSignupPageChange"
import { loginVisibilityChange } from "actions/login/loginVisibilityChange"
import { redirect } from "actions/redirect/redirect"

function mapStateToProps(state, ownProps) {
  return {
    query: ownProps.location.query,
    params: ownProps.params,
    stepsOrder: state.basket.get('stepsOrder'),
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    prices: state.pricing.get('prices'),
    isLoginOpen: state.loginVisibility.get('login'),
    isAuthenticated: state.auth && state.auth.get('isAuthenticated'),
    isMobile: state.request.get('browser') === 'mobile',
    lastReachedStepIndex: getCheckoutLastReachedStepIndex(state),
    isPaymentBeforeChoosingEnabled: getIsPaymentBeforeChoosingEnabled(state),
    isPaymentBeforeChoosingV3Enabled: getIsPaymentBeforeChoosingV3Enabled(state),
    isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
  }
}

const mapDispatchToProps = {
  menuLoadDays,
  redirect,
  submitOrder: checkoutSignup,
  menuLoadBoxPrices,
  trackSignupStep: trackSignupPageChange,
  loginVisibilityChange,
  boxSummaryDeliveryDaysLoad,
  trackCheckoutButtonPressed,
  trackSuccessfulCheckoutFlow,
  trackFailedCheckoutFlow,
  changeRecaptcha: authChangeRecaptcha,
  trackUTMAndPromoCode,
  fetchPayPalClientToken,
  clearPayPalClientToken,
  trackCheckoutNavigationLinks,
  checkoutStepIndexReached,
  fetchGoustoRef,
}

export const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout)
