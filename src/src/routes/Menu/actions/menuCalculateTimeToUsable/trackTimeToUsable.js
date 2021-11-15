import { actionTypes } from "actions/actionTypes"
import { menuTimeToUsable } from "actions/trackingKeys"

export const trackTimeToUsable = (timeToFirstByte, timeToUsable, menuPrefetched) => ({
    type: actionTypes.MENU_SET_CALCULATED_TIME_TO_USABLE,
    trackingData: {
        actionType: menuTimeToUsable,
        timeToFirstByte,
        timeToUsable,
        menuPrefetched
    }
})
