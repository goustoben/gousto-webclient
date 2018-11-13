import { connect } from 'react-redux'
import actions from 'actions'
import Checkout from './Checkout'

function mapStateToProps(state, ownProps) {
  return {
    query: ownProps.location.query,
    params: ownProps.params,
    stepsOrder: state.basket.get('stepsOrder'),
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    browser: state.request.get('browser'),
    tariffId: state.basket.get('tariffId'),
    checkoutPayment: state.features.getIn(['checkoutPayment', 'value'])
  }
}

const CheckoutContainer = connect(mapStateToProps, {
  boxSummaryDeliveryDaysLoad: actions.boxSummaryDeliveryDaysLoad,
  menuLoadDays: actions.menuLoadDays,
  redirect: actions.redirect,
  submitOrder: actions.checkoutSignup,
  menuLoadBoxPrices: actions.menuLoadBoxPrices,
  loadPrices: actions.pricingRequest,
  trackSignupStep: actions.trackSignupPageChange,
})(Checkout)

export default CheckoutContainer
