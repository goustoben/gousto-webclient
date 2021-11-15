import { actionTypes } from "actions/actionTypes"

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
