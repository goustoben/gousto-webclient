import { connect } from 'react-redux'
import DeliveryStep from './DeliveryStep'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import { getLandingDay } from 'utils/deliveries'

function mapStateToProps(state) {
  const landing = getLandingDay(
    state,
    true,
    true,
  )

  const tempDate = state.temp.get('date', landing.date)
  const tempSlotId = state.temp.get('slotId', landing.slotId)

  return {
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    tempDate,
    tempSlotId,
    menuFetchDataPending: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
    numPortions: state.basket.get('numPortions')
  }
}

const DeliveryStepContainer = connect(mapStateToProps, {
  setTempDate: date => actions.temp('date', date),
  setTempSlotId: slotId => actions.temp('slotId', slotId),
  boxSummaryDeliverySlotChosen: actions.boxSummaryDeliverySlotChosen,
  trackDeliveryDayDropDownOpened: actions.trackDeliveryDayDropDownOpened,
  trackDeliveryDayDropDownClosed: actions.trackDeliveryDayDropDownClosed,
  trackDeliverySlotDropDownOpened: actions.trackDeliverySlotDropDownOpened,
  trackDeliveryDayEdited: actions.trackDeliveryDayEdited,
  trackDeliverySlotEdited: actions.trackDeliverySlotEdited
})(DeliveryStep)

export default DeliveryStepContainer
