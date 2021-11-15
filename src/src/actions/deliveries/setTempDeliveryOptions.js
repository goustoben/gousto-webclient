import { getIsAuthenticated } from "selectors/auth"
import { getDisabledSlotDates } from "routes/Menu/selectors/boxSummary"
import { getDeliveryDaysAndSlots, getTempDeliveryOptions } from "utils/deliverySlotHelper"
import { temp } from "actions/temp/temp"

export const setTempDeliveryOptions = (date, orderId) => (dispatch, getState) => {
    if (orderId) {
        dispatch(temp('date', date))
        dispatch(temp('orderId', orderId))

        return
    }

    const state = getState()
    const {user} = state
    const isAuthenticated = getIsAuthenticated(state)
    const disabledSlots = getDisabledSlotDates(state)
    const {tempDate, tempSlotId, deliveryDays} = getTempDeliveryOptions(state)
    const helperProps = {
        disabledSlots,
        isAuthenticated,
        isSubscriptionActive: user.getIn(['subscription', 'state'], false),
        userOrders: user.get('orders'),
        tempDate,
        tempSlotId,
        deliveryDaysProps: deliveryDays
    }
    const {slots} = getDeliveryDaysAndSlots(date, helperProps)
    const unblockedSlots = slots[date].filter(slot => !slot.disabled)
    const slotId = unblockedSlots[0] && unblockedSlots[0].value
    dispatch(temp('slotId', slotId))
    dispatch(temp('date', date))
    dispatch(temp('orderId', undefined))
}
