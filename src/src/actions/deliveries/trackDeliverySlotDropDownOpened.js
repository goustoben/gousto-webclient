import { actionTypes } from "actions/actionTypes"

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
