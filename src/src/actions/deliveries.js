import actionTypes from './actionTypes'

export const trackDeliveryDayDropDownOpened = () => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_DAY_DROPDOWN_OPEN,
    trackingData: {
      actionType: 'DeliveryDayDropDown Opened'
    }
  })
}

export const trackDeliveryDayDropDownClosed = () => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_DAY_DROPDOWN_CLOSED,
    trackingData: {
      actionType: 'DeliveryDayDropDown Closed'
    }
  })
}

export const trackDeliverySlotDropDownOpened = () => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_SLOT_DROPDOWN_OPEN,
    trackingData: {
      actionType: 'DeliverySlotDropDown Opened'
    }
  })
}

export const trackDeliveryDayEdited = () => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_DAY_SELECTION_EDITED,
    trackingData: {
      actionType: 'DeliveryDay Edited'
    }
  })
}

export const trackDeliverySlotEdited = () => dispatch => {
  dispatch({
    type: actionTypes.DELIVERY_SLOT_SELECTION_EDITED,
    trackingData: {
      actionType: 'DeliverySlot Edited'
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
