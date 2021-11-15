import { actionTypes } from "actions/actionTypes"
import seActions from "middlewares/tracking/snowplow/pauseSubscription/seActions"

export const trackViewDiscountReminder = () => (dispatch) => dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
        actionType: seActions.VIEW_PAUSE_DISCOUNT_REMINDER_OFFER_SCREEN
    }
})
