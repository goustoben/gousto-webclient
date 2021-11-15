import { actionTypes } from "actions/actionTypes"

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
