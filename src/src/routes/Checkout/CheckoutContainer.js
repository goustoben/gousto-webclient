import { connect } from 'react-redux'

import actions from 'actions'
import { changeRecaptcha } from 'actions/auth'
import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'
import { fetchPayPalClientToken, trackCheckoutButtonPressed, clearPayPalClientToken } from 'actions/checkout'
import { trackUTMAndPromoCode, trackCheckoutNavigationLinks } from 'actions/tracking'
import { getIsCheckoutOverhaulEnabled, getIsOldCheckoutFieldsEnabled } from 'selectors/features'
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
    isOldCheckoutFieldEnabled: getIsOldCheckoutFieldsEnabled(state),
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
})(Checkout)
