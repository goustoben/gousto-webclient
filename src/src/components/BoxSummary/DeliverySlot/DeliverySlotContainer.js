import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Immutable from 'immutable' /* eslint-disable new-cap */
import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import { getLandingDay } from 'utils/deliveries'
import DeliverySlot from './DeliverySlot'
import { formatDateAndSlot } from './deliverySlotHelper'

function mapStateToProps(state) {
  let disableNewDatePicker = !state.auth.get('isAuthenticated')
  if (disableNewDatePicker) { // if not logged in
    disableNewDatePicker = !state.features.getIn(['newDatePicker', 'value']) // allow enabling via feature flag
  }
  const blockedDateString = state.features.getIn(['features', 'unavailableSlots', 'value']) || []
  const deliveryDaysWithBlockedSlots = formatDateAndSlot(state.boxSummaryDeliveryDays)
  
  const canLandOnOrder = state.features.getIn(['landingOrder', 'value'], false)

  const landing = getLandingDay(
    state,
    true,
    !canLandOnOrder,
    deliveryDaysWithBlockedSlots
  )

  const tempDate = state.temp.get('date', landing.date)
  const tempSlotId = state.temp.get('slotId', landing.slotId)
  const tempOrderId = state.temp.get('orderId', landing.orderId)

  return {
    address: state.basket.get('address'),
    date: state.basket.get('date'),
    prevDate: state.basket.get('prevDate'),
    deliveryDays: deliveryDaysWithBlockedSlots,
    postcode: state.basket.get('postcode'),
    menuPending: state.menuRecieveMenuPending || state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE, false),
    prevSlotId: state.basket.get('prevSlotId'),
    userOrders: state.user.get('orders'),
    disableNewDatePicker,
    menuFetchDataPending: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
    basketRecipeNo: state.basket.get('recipes', Immutable.Map({})).size,
    tempDate,
    tempSlotId,
    tempOrderId,
    numPortions: state.basket.get('numPortions'),
    unavailableSlots: state.features.get('unavailableSlots').value, 
    isAuthenticated: state.auth.get('isAuthenticated'), 
    isSubscriptionActive: state.user.getIn(['subscription', 'state']),
    blockedDateString
  }
}

const DeliverySlotContainer = connect(mapStateToProps, {
  deliverySlotChosen: actions.boxSummaryDeliverySlotChosen,
  clearPostcode: actions.basketPostcodeClear,
  basketRestorePreviousValues: actions.basketRestorePreviousValues,
  menuLoadMenu: actions.menuLoadMenu,
  menuLoadStock: actions.menuLoadStock,
  pushOrderEdit: orderId => push(`/menu/${orderId}`),
  boxSummaryVisibilityChange: actions.boxSummaryVisibilityChange,
  setTempDate: date => actions.temp('date', date),
  setTempSlotId: slotId => actions.temp('slotId', slotId),
  setTempOrderId: orderId => actions.temp('orderId', orderId),
  boxSummaryNext: actions.boxSummaryNext,
})(DeliverySlot)
export default DeliverySlotContainer
