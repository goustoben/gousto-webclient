import actions from 'actions'
import { connect } from 'react-redux'

import { actionTypes } from 'actions/actionTypes'
import { boxSummaryDeliverySlotChosen } from 'actions/boxSummary'
import { trackSignupWizardAction, trackSocialBelongingBannerAppearance } from 'actions/signup'
import { getDisabledSlotDates, userHasAvailableSlots } from 'routes/Menu/selectors/boxSummary'
import { isNextDayDeliveryPaintedDoorFeatureEnabled } from 'selectors/features'
import { getLandingDay } from 'utils/deliveries'
import { addDisabledSlotIds } from 'utils/deliverySlotHelper'

import { DeliveryStep } from './DeliveryStep'

function mapStateToProps(state) {
  const deliveryDaysWithDisabled = addDisabledSlotIds(state.boxSummaryDeliveryDays)

  const landing = getLandingDay(state, {
    useCurrentSlot: true,
    cantLandOnOrderDate: true,
    useBasketDate: false,
  })

  const tempDate = state.temp.get('date', landing.date)
  const tempSlotId = state.temp.get('slotId', landing.slotId)
  const disabledSlots = getDisabledSlotDates(state)

  return {
    boxSummaryDeliveryDays: deliveryDaysWithDisabled,
    tempDate,
    tempSlotId,
    menuFetchDataPending: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
    nextDayDeliveryPaintedDoorFeature: isNextDayDeliveryPaintedDoorFeatureEnabled(state),
    disabledSlots,
    userHasAvailableSlots: userHasAvailableSlots(state),
    district: state.signup.getIn(['wizard', 'district']),
    amountOfCustomers: state.signup.getIn(['wizard', 'amountOfCustomers']),
  }
}

const DeliveryStepContainer = connect(mapStateToProps, {
  setTempDate: (date) => actions.temp('date', date),
  setTempSlotId: (slotId) => actions.temp('slotId', slotId),
  boxSummaryDeliverySlotChosen,
  trackDeliverySlotDropDownOpened: actions.trackDeliverySlotDropDownOpened,
  trackDeliveryDayEdited: actions.trackDeliveryDayEdited,
  trackDeliverySlotEdited: actions.trackDeliverySlotEdited,
  trackSignupWizardAction,
  trackSocialBelongingBannerAppearance,
})(DeliveryStep)

export { DeliveryStepContainer }
