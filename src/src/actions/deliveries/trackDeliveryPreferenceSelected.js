import { actionTypes } from "actions/actionTypes"

export const trackDeliveryPreferenceSelected = (date, dayOffset, deliverySlotId, deliveryPreference) => dispatch => {
    dispatch({
        type: actionTypes.DELIVERY_PREFERENCE_SELECTED,
        trackingData: {
            actionType: 'DeliveryPreference Selected',
            date,
            day_offset: dayOffset,
            delivery_slot_id: deliverySlotId,
            delivery_preference: deliveryPreference
        }
    })
}
