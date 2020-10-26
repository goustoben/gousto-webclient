import { connect } from 'react-redux'
import actions from 'actions'
import { trackCheckoutButtonPressed } from 'actions/checkout'
import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'
import { changeRecaptcha } from 'actions/auth'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { getCheckoutRedesign } from 'selectors/features'
import { Checkout } from './Checkout'

function mapStateToProps(state, ownProps) {
  return {
    query: ownProps.location.query,
    params: ownProps.params,
    stepsOrder: state.basket.get('stepsOrder'),
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    browser: state.request.get('browser'),
    tariffId: state.basket.get('tariffId'),
    isCheckoutRedesignEnabled: getCheckoutRedesign(state),
  }
}

const CheckoutContainer = connect(mapStateToProps, {
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
})(Checkout)

export {
  CheckoutContainer
}
