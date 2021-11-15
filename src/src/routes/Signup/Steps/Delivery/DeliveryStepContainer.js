import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { getLandingDay } from 'utils/deliveries'
import { getDisabledSlotDates, userHasAvailableSlots } from 'routes/Menu/selectors/boxSummary'
import {
  getIsPaymentBeforeChoosingEnabled,
  getIsTastePreferencesEnabled,
  isNextDayDeliveryPaintedDoorFeatureEnabled,
} from 'selectors/features'
import { addDisabledSlotIds } from 'utils/deliverySlotHelper'
import { DeliveryStep } from './DeliveryStep'
import { boxSummaryDeliverySlotChosen } from "actions/boxSummary/boxSummaryDeliverySlotChosen"
import { trackSignupWizardAction } from "actions/signup/trackSignupWizardAction"
import { trackSocialBelongingBannerAppearance } from "actions/signup/trackSocialBelongingBannerAppearance"
import { temp } from "actions/temp/temp"
import { trackDeliveryDayDropDownOpened } from "actions/deliveries/trackDeliveryDayDropDownOpened"
import { trackDeliveryDayDropDownClosed } from "actions/deliveries/trackDeliveryDayDropDownClosed"
import { trackDeliverySlotDropDownOpened } from "actions/deliveries/trackDeliverySlotDropDownOpened"
import { trackDeliveryDayEdited } from "actions/deliveries/trackDeliveryDayEdited"
import { trackDeliverySlotEdited } from "actions/deliveries/trackDeliverySlotEdited"

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
    isTastePreferencesEnabled: getIsTastePreferencesEnabled(state),
    isPaymentBeforeChoosingEnabled: getIsPaymentBeforeChoosingEnabled(state),
    showcaseMenuSeen: state.signup.get('showcaseMenuSeen'),
    district: state.signup.getIn(['wizard', 'district']),
    amountOfCustomers: state.signup.getIn(['wizard', 'amountOfCustomers']),
  }
}

const DeliveryStepContainer = connect(mapStateToProps, {
  setTempDate: (date) => temp('date', date),
  setTempSlotId: (slotId) => temp('slotId', slotId),
  boxSummaryDeliverySlotChosen,
  trackDeliveryDayDropDownOpened,
  trackDeliveryDayDropDownClosed,
  trackDeliverySlotDropDownOpened,
  trackDeliveryDayEdited,
  trackDeliverySlotEdited,
  trackSignupWizardAction,
  trackSocialBelongingBannerAppearance,
})(DeliveryStep)

export { DeliveryStepContainer }
