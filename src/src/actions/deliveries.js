import actionTypes from './actionTypes'

export const trackDeliveryDayDropDownOpened = (date, slotId) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_DAY_DROPDOWN_OPEN,
    trackingData: {
      actionType: 'DeliveryDayDropDown Opened',
      date,
      slotId
    }
  })
}

export const trackDeliveryDayDropDownClosed = (date, slotId) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_DAY_DROPDOWN_CLOSED,
    trackingData: {
      actionType: 'DeliveryDayDropDown Closed',
      date,
      slotId
    }
  })
}

export const trackDeliverySlotDropDownOpened = (date, slotId) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_SLOT_DROPDOWN_OPEN,
    trackingData: {
      actionType: 'DeliverySlotDropDown Opened',
      date,
      slotId
    }
  })
}

export const trackDeliveryDayEdited = (date, slotId) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_DAY_SELECTION_EDITED,
    trackingData: {
      actionType: 'DeliveryDay Edited',
      date,
      slotId
    }
  })
}

export const trackDeliverySlotEdited = (date, slotId) => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_SLOT_SELECTION_EDITED,
    trackingData: {
      actionType: 'DeliverySlot Edited',
      date,
      slotId
    }
  })
}
// set up action types in ./actionType.js
// set up other functions

export default {
  trackDeliveryDayDropDownOpened,
  trackDeliveryDayDropDownClosed,
  trackDeliverySlotDropDownOpened,
  trackDeliveryDayEdited,
  trackDeliverySlotEdited
}
