import { getSlot } from "utils/deliveries"
import { basketSlotChange } from "actions/basket/basketSlotChange"

export const preselectFreeDeliverySlot = (dispatch, getState) => {
    const slotId = getState().basket.get('slotId')

    if (slotId) {
        return
    }

    const date = getState().basket.get('date')
    const deliveryDays = getState().boxSummaryDeliveryDays
    const slotTimeId = getSlot(deliveryDays, date, slotId)

    if (!slotTimeId) {
        return
    }
    dispatch(basketSlotChange(slotTimeId.get('id')))
}
