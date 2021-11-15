import { actionTypes } from "actions/actionTypes"

export const trackDeliveryPreferenceModalViewed = (date, dayOffset, deliverySlotId) => dispatch => {
    dispatch({
        type: actionTypes.DELIVERY_PREFERENCE_MODAL_VIEWED,
        trackingData: {
            actionType: 'DeliveryPreferenceModal Viewed',
            date,
            day_offset: dayOffset,
            delivery_slot_id: deliverySlotId
        }
    })
}
