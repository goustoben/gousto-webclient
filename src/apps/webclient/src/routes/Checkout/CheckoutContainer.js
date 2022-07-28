import React from 'react'

import actions from 'actions'
import { connect } from 'react-redux'

import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'
import { trackFailedCheckoutFlow, trackSuccessfulCheckoutFlow } from 'actions/log'
import { trackUTMAndPromoCode, trackCheckoutNavigationLinks } from 'actions/tracking'
import {
  fetchPayPalClientToken,
  trackCheckoutButtonPressed,
  clearPayPalClientToken,
  checkoutStepIndexReached,
  fetchGoustoRef,
} from 'routes/Checkout/checkoutActions'
import { getCheckoutLastReachedStepIndex } from 'routes/Checkout/checkoutSelectors'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'

import { CheckoutWrapper } from './CheckoutWrapper'

function mapStateToProps(state, ownProps) {
  return {
    query: ownProps.location.query,
    params: ownProps.params,
    stepsOrder: state.basket.get('stepsOrder'),
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    isLoginOpen: state.loginVisibility.get('login'),
    isAuthenticated: state.auth && state.auth.get('isAuthenticated'),
    isMobile: state.request.get('browser') === 'mobile',
    lastReachedStepIndex: getCheckoutLastReachedStepIndex(state),
    isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
  }
}

const mapDispatchToProps = {
  menuLoadDays: actions.menuLoadDays,
  redirect: actions.redirect,
  menuLoadBoxPrices: actions.menuLoadBoxPrices,
  trackSignupStep: actions.trackSignupPageChange,
  loginVisibilityChange: actions.loginVisibilityChange,
  boxSummaryDeliveryDaysLoad,
  trackCheckoutButtonPressed,
  trackSuccessfulCheckoutFlow,
  trackFailedCheckoutFlow,
  trackUTMAndPromoCode,
  fetchPayPalClientToken,
  clearPayPalClientToken,
  trackCheckoutNavigationLinks,
  checkoutStepIndexReached,
  fetchGoustoRef,
}

export const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(CheckoutWrapper)
