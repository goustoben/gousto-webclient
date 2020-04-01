import { connect } from 'react-redux'
import actions from 'actions'
import { trackCheckoutButtonPressed } from 'actions/checkout'
import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'
import { changeRecaptcha } from 'actions/auth'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { Checkout } from './Checkout'

function mapStateToProps(state, ownProps) {
  return {
    query: ownProps.location.query,
    params: ownProps.params,
    stepsOrder: state.basket.get('stepsOrder'),
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    browser: state.request.get('browser'),
    tariffId: state.basket.get('tariffId'),
    queueItFeature: state.features.getIn(['queueIt', 'value']),
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

export default CheckoutContainer
