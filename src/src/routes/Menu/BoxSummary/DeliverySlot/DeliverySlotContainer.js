import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { boxSummaryNext } from 'actions/boxSummary'
import { getFullScreenBoxSummary } from 'selectors/features'
import { getDisabledSlotDates, userHasAvailableSlots } from 'routes/Menu/selectors/boxSummary'
import { getTempDeliveryOptions } from 'utils/deliverySlotHelper'
import { getIsAuthenticated } from 'selectors/auth'
import { getNumPortions } from 'selectors/basket'
import { getBoxSummaryTextProps } from 'selectors/boxSummary'
import { getLoadingStateForOrder } from 'selectors/user'
import { DeliverySlot } from './DeliverySlot'

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
    deliveryDays,
    menuPending: state.menuReceiveMenuPending || state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE, false),
    userOrders: state.user.get('orders'),
    menuFetchDataPending: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
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
  clearPostcode: actions.basketPostcodeClear,
  basketRestorePreviousValues: actions.basketRestorePreviousValues,
  boxSummaryNext,
})(DeliverySlot)

export { DeliverySlotContainer }
