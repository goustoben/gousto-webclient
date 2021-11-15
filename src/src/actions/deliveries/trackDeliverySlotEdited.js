import { actionTypes } from "actions/actionTypes"

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
