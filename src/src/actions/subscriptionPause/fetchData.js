import { subscriptionPauseLoadStartScreen } from "actions/subscriptionPause/subscriptionPauseLoadStartScreen"
import { subscriptionPauseLoadReasons } from "actions/subscriptionPause/subscriptionPauseLoadReasons"
import { subscriptionTrackPauseAttempt } from "actions/subscriptionPause/subscriptionTrackPauseAttempt"
import { subscriptionTrackCategoriesViewed } from "actions/subscriptionPause/subscriptionTrackCategoriesViewed"
import { userLoadOrders } from "actions/user/userLoadOrders"

export const fetchData = () => async (dispatch, getState) => {
    const {subscriptionPause, user} = getState()
    const reasons = subscriptionPause.get('reasons')

    dispatch(subscriptionTrackPauseAttempt(subscriptionPause.get('metaData')))

    if (subscriptionPause.get('startScreen').size > 0) {
        dispatch(subscriptionPauseLoadStartScreen())
    } else if (reasons.size > 0) {
        dispatch(subscriptionPauseLoadReasons(reasons))
        dispatch(subscriptionTrackCategoriesViewed())
    }

    if (user.get('orders').size < 1) {
        dispatch(userLoadOrders())
    }
}
