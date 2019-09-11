import { connect } from 'react-redux'
import { getCurrentBoxSummaryView } from 'utils/boxSummary'
import actionTypes from 'actions/actionTypes'
import pricing from 'actions/pricing'
import BoxSummary from './BoxSummary'

function mapStateToProps(state) {
  return {
    date: state.basket.get('date'),
    orderId: state.basket.get('orderId'),
    numPortions: state.basket.get('numPortions'),
    recipes: state.basket.get('recipes'),
    deliveryDays: state.boxSummaryDeliveryDays,
    deliveryDaysError: state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE),
    postcode: state.basket.get('postcode'),
    postcodePending: state.basket.get('postcodePending'),
    slotId: state.basket.get('slotId'),
    menuPending: state.menuRecieveMenuPending || state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE, false),
    boxSummaryCurrentView: getCurrentBoxSummaryView(state),
    prices: state.pricing.get('prices'),
    pricesLoading: state.pricing.get('pending'),
  }
}

const BoxSummaryContainer = connect(mapStateToProps, {
  loadPrices: pricing.pricingRequest.bind(pricing),
})(BoxSummary)

export default BoxSummaryContainer
