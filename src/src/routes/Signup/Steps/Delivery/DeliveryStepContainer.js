import { connect } from 'react-redux'

import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { boxSummaryDeliverySlotChosen } from 'actions/boxSummary'
import { getLandingDay } from 'utils/deliveries'
import {
  isNextDayDeliveryPaintedDoorFeatureEnabled,
  getLogoutUserDisabledSlots,
} from 'selectors/features'
import { formatAndValidateDisabledSlots, addDisabledSlotIds } from 'utils/deliverySlotHelper'
import DeliveryStep from './DeliveryStep'

function mapStateToProps(state) {
  const deliveryDaysWithDisabled = addDisabledSlotIds(state.boxSummaryDeliveryDays)

  const landing = getLandingDay(
    state,
    true,
    true,
    deliveryDaysWithDisabled
  )

  const tempDate = state.temp.get('date', landing.date)
  const tempSlotId = state.temp.get('slotId', landing.slotId)
  const isNDDPaintedDoorOpened = state.temp.get('isNDDPaintedDoorOpened', false)
  const nonValidatedDisabledSlots = getLogoutUserDisabledSlots(state)
  const disabledSlots = formatAndValidateDisabledSlots(nonValidatedDisabledSlots)

  return {
    boxSummaryDeliveryDays: deliveryDaysWithDisabled,
    tempDate,
    tempSlotId,
    menuFetchDataPending: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
    nextDayDeliveryPaintedDoorFeature: isNextDayDeliveryPaintedDoorFeatureEnabled(state),
    isNDDPaintedDoorOpened,
    disabledSlots,
  }
}

const DeliveryStepContainer = connect(mapStateToProps, {
  setTempDate: date => actions.temp('date', date),
  setTempSlotId: slotId => actions.temp('slotId', slotId),
  openNDDPaintedDoor: () => actions.temp('isNDDPaintedDoorOpened', true),
  closeNDDPaintedDoor: () => actions.temp('isNDDPaintedDoorOpened', false),
  boxSummaryDeliverySlotChosen,
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
