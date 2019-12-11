import { connect } from 'react-redux'
import { getCurrentBoxSummaryView } from 'utils/boxSummary'
import actionTypes from 'actions/actionTypes'
import pricing from 'actions/pricing'
import { getBasketDate, getBasketOrderId, getNumPortions, getBasketRecipes, getBasketSlotId, getBasketPostcode } from 'selectors/basket'
import { BoxSummaryContent } from './BoxSummaryContent'

function mapStateToProps(state) {
  return {
    date: getBasketDate(state),
    orderId: getBasketOrderId(state),
    numPortions: getNumPortions(state),
    recipes: getBasketRecipes(state),
    deliveryDays: state.boxSummaryDeliveryDays,
    deliveryDaysError: state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE),
    postcode: getBasketPostcode(state),
    postcodePending: state.basket.get('postcodePending'),
    slotId: getBasketSlotId(state),
    menuPending: state.menuRecieveMenuPending || state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE, false),
    boxSummaryCurrentView: getCurrentBoxSummaryView(state),
    prices: state.pricing.get('prices'),
    pricesLoading: state.pricing.get('pending'),
  }
}

const BoxSummaryContentContainer = connect(mapStateToProps, {
  loadPrices: pricing.pricingRequest.bind(pricing),
})(BoxSummaryContent)

export { BoxSummaryContentContainer }
