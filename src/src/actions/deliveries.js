import { basketSlotChange } from 'actions/basket'
import tempActions from 'actions/temp'
import { getSlot } from 'utils/deliveries'
import { getDeliveryDaysAndSlots, formatAndValidateDisabledSlots, getTempDeliveryOptions } from 'utils/deliverySlotHelper'
import { getDisabledSlots, getLogoutUserDisabledSlots, getIsSubscriberDisabledSlotsEnabled } from 'selectors/features'
import { getIsAuthenticated } from 'selectors/auth'
import { actionTypes } from './actionTypes'

export const trackDeliveryDayDropDownOpened = (date, dayOffset, deliverySlotId) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_DAY_DROPDOWN_OPEN,
    trackingData: {
      actionType: 'DeliveryDayDropDown Opened',
      date,
      day_offset: dayOffset,
      delivery_slot_id: deliverySlotId
    }
  })
}

export const trackDeliveryDayDropDownClosed = (date, dayOffset, deliverySlotId) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_DAY_DROPDOWN_CLOSED,
    trackingData: {
      actionType: 'DeliveryDayDropDown Closed',
      date,
      day_offset: dayOffset,
      delivery_slot_id: deliverySlotId
    }
  })
}

export const trackDeliverySlotDropDownOpened = (date, dayOffset, deliverySlotId) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_SLOT_DROPDOWN_OPEN,
    trackingData: {
      actionType: 'DeliverySlotDropDown Opened',
      date,
      day_offset: dayOffset,
      delivery_slot_id: deliverySlotId
    }
  })
}

export const trackDeliveryDayEdited = (date, dayOffset, deliverySlotId) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_DAY_SELECTION_EDITED,
    trackingData: {
      actionType: 'DeliveryDay Edited',
      date,
      day_offset: dayOffset,
      delivery_slot_id: deliverySlotId
    }
  })
}

export const trackDeliverySlotEdited = (date, dayOffset, deliverySlotId) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_SLOT_SELECTION_EDITED,
    trackingData: {
      actionType: 'DeliverySlot Edited',
      date,
      day_offset: dayOffset,
      delivery_slot_id: deliverySlotId
    }
  })
}

export const trackDeliveryPreferenceModalViewed = (date, dayOffset, deliverySlotId) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_PREFERENCE_MODAL_VIEWED,
    trackingData: {
      actionType: 'DeliveryPreferenceModal Viewed',
      date,
      day_offset: dayOffset,
      delivery_slot_id: deliverySlotId
    }
  })
}

export const trackDeliveryPreferenceSelected = (date, dayOffset, deliverySlotId, deliveryPreference) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_PREFERENCE_SELECTED,
    trackingData: {
      actionType: 'DeliveryPreference Selected',
      date,
      day_offset: dayOffset,
      delivery_slot_id: deliverySlotId,
      delivery_preference: deliveryPreference
    }
  })
}

export const trackDeliveryPreferenceModalClosed = (date, dayOffset, deliverySlotId, deliveryPreference) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_PREFERENCE_MODAL_CLOSED,
    trackingData: {
      actionType: 'DeliveryPreferenceModal Closed',
      date,
      day_offset: dayOffset,
      delivery_slot_id: deliverySlotId,
      delivery_preference: deliveryPreference
    }
  })
}

export const preselectFreeDeliverySlot = (dispatch, getState) => {
  const slotId = getState().basket.get('slotId')

  if (slotId) {
    return
  }

  const date = getState().basket.get('date')
  const deliveryDays = getState().boxSummaryDeliveryDays
  const slotTimeId = getSlot(deliveryDays, date, slotId)

  if (!slotTimeId) {
    return
  }
  dispatch(basketSlotChange(slotTimeId.get('id')))
}

export const setTempDeliveryOptions = (date, orderId) => (dispatch, getState) => {
  if (orderId) {
    dispatch(tempActions.temp('date', date))
    dispatch(tempActions.temp('orderId', orderId))

    return
  }

  const { user } = getState()
  const isAuthenticated = getIsAuthenticated(getState())
  const isSubscriberDisabledSlotsEnabled = getIsSubscriberDisabledSlotsEnabled(getState())
  const nonValidatedDisabledSlots = isAuthenticated ? getDisabledSlots(getState()) : getLogoutUserDisabledSlots(getState())
  const disabledSlots = formatAndValidateDisabledSlots(nonValidatedDisabledSlots)
  const { tempDate, tempSlotId, deliveryDays } = getTempDeliveryOptions(getState())
  const helperProps = {
    disabledSlots,
    isAuthenticated,
    isSubscriptionActive: user.getIn(['subscription', 'state'], false),
    userOrders: user.get('orders'),
    tempDate,
    tempSlotId,
    deliveryDaysProps: deliveryDays
  }
  const { slots } = getDeliveryDaysAndSlots(date, helperProps, isSubscriberDisabledSlotsEnabled)
  const unblockedSlots = slots[date].filter(slot => !slot.disabled)
  const slotId = unblockedSlots[0] && unblockedSlots[0].value
  dispatch(tempActions.temp('slotId', slotId))
  dispatch(tempActions.temp('date', date))
  dispatch(tempActions.temp('orderId', undefined))
}

export default {
  trackDeliveryDayDropDownOpened,
  trackDeliveryDayDropDownClosed,
  trackDeliverySlotDropDownOpened,
  trackDeliveryDayEdited,
  trackDeliverySlotEdited,
  trackDeliveryPreferenceModalViewed,
  trackDeliveryPreferenceSelected,
  trackDeliveryPreferenceModalClosed,
  preselectFreeDeliverySlot,
  setTempDeliveryOptions
}
