import React from 'react'
import { connect } from 'react-redux'
import actions from 'actions'
import { changeRecaptcha } from 'actions/auth'
import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'
import {
  fetchPayPalClientToken,
  trackCheckoutButtonPressed,
  clearPayPalClientToken,
  checkoutStepIndexReached,
  fetchGoustoRef,
} from 'actions/checkout'
import { trackFailedCheckoutFlow, trackSuccessfulCheckoutFlow } from 'actions/log'
import { trackUTMAndPromoCode, trackCheckoutNavigationLinks } from 'actions/tracking'
import { getCheckoutLastReachedStepIndex } from 'selectors/checkout'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { usePricing } from 'routes/Menu/domains/pricing'
import { Checkout } from './Checkout'
import { useSubmitOrder } from './useSubmitOrder'

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
const CheckoutPure = (props) => {
  const { pricing } = usePricing()
  const submitOrder = useSubmitOrder()

  /* eslint-disable react/jsx-props-no-spreading */
  return <Checkout {...props} prices={pricing} submitOrder={submitOrder} />
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
  changeRecaptcha,
  trackUTMAndPromoCode,
  fetchPayPalClientToken,
  clearPayPalClientToken,
  trackCheckoutNavigationLinks,
  checkoutStepIndexReached,
  fetchGoustoRef,
}

export const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(CheckoutPure)
