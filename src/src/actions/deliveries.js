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

export default {
  trackDeliveryDayDropDownOpened,
  trackDeliveryDayDropDownClosed,
  trackDeliverySlotDropDownOpened,
  trackDeliveryDayEdited,
  trackDeliverySlotEdited
}
