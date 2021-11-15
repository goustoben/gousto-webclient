import { actionTypes } from "actions/actionTypes"

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
