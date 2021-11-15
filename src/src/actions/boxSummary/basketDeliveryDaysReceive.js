import { actionTypes } from "actions/actionTypes"

export const basketDeliveryDaysReceive = (days) => ({
    type: actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE,
    days,
})
