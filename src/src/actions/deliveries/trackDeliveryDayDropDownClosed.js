import { actionTypes } from "actions/actionTypes"

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
