import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { getFullScreenBoxSummary } from 'selectors/features'
import { getDisabledSlotDates, userHasAvailableSlots } from 'routes/Menu/selectors/boxSummary'
import { getTempDeliveryOptions } from 'utils/deliverySlotHelper'
import { getIsAuthenticated } from 'selectors/auth'
import { getBasketDate, getBasketPostcode, getNumPortions } from 'selectors/basket'
import { getBoxSummaryTextProps } from 'selectors/boxSummary'
import { getLoadingStateForOrder } from 'selectors/user'
import { DeliverySlot } from './DeliverySlot'
import { boxSummaryNext } from "actions/boxSummary/boxSummaryNext"
import { basketPostcodeClear } from "actions/basket/basketPostcodeClear"
import { basketRestorePreviousValues } from "actions/basket/basketRestorePreviousValues"

function mapStateToProps(state) {
  const isAuthenticated = getIsAuthenticated(state)
  const disabledSlots = getDisabledSlotDates(state)
  const {
    deliveryDays,
    tempDate,
    tempSlotId,
    tempOrderId,
  } = getTempDeliveryOptions(state)

  return {
    address: state.basket.get('address'),
    date: getBasketDate(state),
    prevDate: state.basket.get('prevDate'),
    deliveryDays,
    postcode: getBasketPostcode(state),
    menuPending: state.menuReceiveMenuPending || state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE, false),
    prevSlotId: state.basket.get('prevSlotId'),
    userOrders: state.user.get('orders'),
    menuFetchDataPending: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
    basketRecipeNo: state.basket.get('recipes', Immutable.Map({})).size,
    tempDate,
    tempSlotId,
    tempOrderId,
    numPortions: getNumPortions(state),
    disabledSlots,
    isAuthenticated,
    isSubscriptionActive: state.user.getIn(['subscription', 'state']),
    shouldDisplayFullScreenBoxSummary: getFullScreenBoxSummary(state),
    getBoxSummaryTextProps: (slots) => getBoxSummaryTextProps(state, tempDate, tempSlotId, tempOrderId, slots),
    userHasAvailableSlots: userHasAvailableSlots(state),
    userOrderLoadingState: getLoadingStateForOrder(state),
  }
}

const DeliverySlotContainer = connect(mapStateToProps, {
  pushOrderEdit: orderId => push(`/menu/${orderId}`),
  clearPostcode: basketPostcodeClear,
  basketRestorePreviousValues,
  boxSummaryNext,
})(DeliverySlot)

export { DeliverySlotContainer }
