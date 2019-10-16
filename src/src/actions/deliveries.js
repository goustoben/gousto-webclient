import { basketSlotChange } from 'actions/basket'
import { getSlot } from 'utils/deliveries'
import actionTypes from './actionTypes'

export const trackDeliveryDayDropDownOpened = (date, day_offset, delivery_slot_id) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_DAY_DROPDOWN_OPEN,
    trackingData: {
      actionType: 'DeliveryDayDropDown Opened',
      date,
      day_offset,
      delivery_slot_id
    }
  })
}

export const trackDeliveryDayDropDownClosed = (date, day_offset, delivery_slot_id) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_DAY_DROPDOWN_CLOSED,
    trackingData: {
      actionType: 'DeliveryDayDropDown Closed',
      date,
      day_offset,
      delivery_slot_id
    }
  })
}

export const trackDeliverySlotDropDownOpened = (date, day_offset, delivery_slot_id) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_SLOT_DROPDOWN_OPEN,
    trackingData: {
      actionType: 'DeliverySlotDropDown Opened',
      date,
      day_offset,
      delivery_slot_id
    }
  })
}

export const trackDeliveryDayEdited = (date, day_offset, delivery_slot_id) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_DAY_SELECTION_EDITED,
    trackingData: {
      actionType: 'DeliveryDay Edited',
      date,
      day_offset,
      delivery_slot_id
    }
  })
}

export const trackDeliverySlotEdited = (date, day_offset, delivery_slot_id) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_SLOT_SELECTION_EDITED,
    trackingData: {
      actionType: 'DeliverySlot Edited',
      date,
      day_offset,
      delivery_slot_id
    }
  })
}

export const trackDeliveryPreferenceModalViewed = (date, day_offset, delivery_slot_id) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_PREFERENCE_MODAL_VIEWED,
    trackingData: {
      actionType: 'DeliveryPreferenceModal Viewed',
      date,
      day_offset,
      delivery_slot_id
    }
  })
}

export const trackDeliveryPreferenceSelected = (date, day_offset, delivery_slot_id, delivery_preference) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_PREFERENCE_SELECTED,
    trackingData: {
      actionType: 'DeliveryPreference Selected',
      date,
      day_offset,
      delivery_slot_id,
      delivery_preference
    }
  })
}

export const trackDeliveryPreferenceModalClosed = (date, day_offset, delivery_slot_id, delivery_preference) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_PREFERENCE_MODAL_CLOSED,
    trackingData: {
      actionType: 'DeliveryPreferenceModal Closed',
      date,
      day_offset,
      delivery_slot_id,
      delivery_preference
    }
  })
}

export const preselectFreeDeliverySlot = (dispatch, getState) => {
  const date = getState().basket.get('date')
  const deliveryDays = getState().boxSummaryDeliveryDays
  const slotId = getState().basket.get('slotId')
  const slotTimeId = getSlot(deliveryDays, date, slotId)
  if (!slotId && slotTimeId) {
    dispatch(basketSlotChange(slotTimeId.get('id')))
  }
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
  preselectFreeDeliverySlot
}
