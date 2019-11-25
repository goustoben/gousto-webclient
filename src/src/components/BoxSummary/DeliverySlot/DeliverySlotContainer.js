import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Immutable from 'immutable'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import { getLandingDay } from 'utils/deliveries'
import { getDisabledSlots } from 'selectors/features'
import { getNumPortions, getBasketDate, getBasketPostcode } from 'selectors/basket'
import DeliverySlot from './DeliverySlot'
import { addDisabledSlotIds, formatAndValidateDisabledSlots } from './deliverySlotHelper'

function mapStateToProps(state) {
  let disableNewDatePicker = !state.auth.get('isAuthenticated')
  if (disableNewDatePicker) { // if not logged in
    disableNewDatePicker = !state.features.getIn(['newDatePicker', 'value']) // allow enabling via feature flag
  }

  const nonValidatedDisabledSlots = getDisabledSlots(state)
  const disabledSlots = formatAndValidateDisabledSlots(nonValidatedDisabledSlots)
  const deliveryDays = addDisabledSlotIds(state.boxSummaryDeliveryDays)
  const canLandOnOrder = state.features.getIn(['landingOrder', 'value'], false)

  const landing = getLandingDay(
    state,
    true,
    !canLandOnOrder,
    deliveryDays
  )

  const tempDate = state.temp.get('date', landing.date)
  const tempSlotId = state.temp.get('slotId', landing.slotId)
  const tempOrderId = state.temp.get('orderId', landing.orderId)

  return {
    address: state.basket.get('address'),
    date: getBasketDate(state),
    prevDate: state.basket.get('prevDate'),
    deliveryDays: deliveryDays,
    postcode: getBasketPostcode(state),
    menuPending: state.menuRecieveMenuPending || state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE, false),
    prevSlotId: state.basket.get('prevSlotId'),
    userOrders: state.user.get('orders'),
    disableNewDatePicker,
    menuFetchDataPending: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
    basketRecipeNo: state.basket.get('recipes', Immutable.Map({})).size,
    tempDate,
    tempSlotId,
    tempOrderId,
    numPortions: getNumPortions(state),
    disabledSlots,
    isAuthenticated: state.auth.get('isAuthenticated'),
    isSubscriptionActive: state.user.getIn(['subscription', 'state']),
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
