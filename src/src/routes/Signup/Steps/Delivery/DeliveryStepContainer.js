import { connect } from 'react-redux'
import DeliveryStep from './DeliveryStep'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import { getLandingDay } from 'utils/deliveries'
import { isNextDayDeliveryPaintedDoorFeatureEnabled } from 'selectors/features'

function mapStateToProps(state) {
  const landing = getLandingDay(
    state,
    true,
    true,
  )

  const tempDate = state.temp.get('date', landing.date)
  const tempSlotId = state.temp.get('slotId', landing.slotId)
  const isNDDPaintedDoorOpened = state.temp.get('isNDDPaintedDoorOpened', false)
  const preferNDD = state.temp.get('preferNDD', '')

  return {
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    tempDate,
    tempSlotId,
    preferNDD,
    menuFetchDataPending: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
    nextDayDeliveryPaintedDoorFeature: isNextDayDeliveryPaintedDoorFeatureEnabled(state),
    isNDDPaintedDoorOpened,
  }
}

const DeliveryStepContainer = connect(mapStateToProps, {
  setTempDate: date => actions.temp('date', date),
  setTempSlotId: slotId => actions.temp('slotId', slotId),
  openNDDPaintedDoor: () => actions.temp('isNDDPaintedDoorOpened', true),
  closeNDDPaintedDoor: () => actions.temp('isNDDPaintedDoorOpened', false),
  setNDDPreference: answer => actions.temp('preferNDD', answer),
  boxSummaryDeliverySlotChosen: actions.boxSummaryDeliverySlotChosen,
  trackDeliveryDayDropDownOpened: actions.trackDeliveryDayDropDownOpened,
  trackDeliveryDayDropDownClosed: actions.trackDeliveryDayDropDownClosed,
  trackDeliverySlotDropDownOpened: actions.trackDeliverySlotDropDownOpened,
  trackDeliveryDayEdited: actions.trackDeliveryDayEdited,
  trackDeliverySlotEdited: actions.trackDeliverySlotEdited,
  trackDeliveryPreferenceModalViewed: actions.trackDeliveryPreferenceModalViewed,
  trackDeliveryPreferenceModalClosed: actions.trackDeliveryPreferenceModalClosed,
  trackDeliveryPreferenceSelected: actions.trackDeliveryPreferenceSelected,
})(DeliveryStep)

export default DeliveryStepContainer
