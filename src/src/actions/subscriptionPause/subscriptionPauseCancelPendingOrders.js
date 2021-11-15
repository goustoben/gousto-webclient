import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import GoustoException from "utils/GoustoException"
import { subscriptionPauseTrack } from "actions/subscriptionPause/subscriptionPauseTrack"
import { subscriptionPauseProceed } from "actions/subscriptionPause/subscriptionPauseProceed"
import { subscriptionPauseLoadError } from "actions/subscriptionPause/subscriptionPauseLoadError"
import { userLoadOrders } from "actions/user/userLoadOrders"
import { cancelExistingOrders } from "apis/orders/cancelExistingOrders"

export function subscriptionPauseCancelPendingOrders() {
    return async (dispatch, getState) => {
        dispatch(pending(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS, true))
        dispatch(error(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS, false))
        const errorPrefix = 'Subscription pause cancel pending order error:'

        try {
            const accessToken = getState().auth.get('accessToken')

            try {
                await cancelExistingOrders(accessToken)
                await dispatch(userLoadOrders())
            } catch (err) {
                throw new GoustoException(`${errorPrefix} cancel pending orders failed, ${err}`, {
                    error: 'cancel-pending-fail',
                })
            }

            dispatch(subscriptionPauseTrack('EXISTING_ORDERS_CANCELLED'))
            dispatch(subscriptionPauseProceed('pause', 'paused'))
        } catch (err) {
            dispatch(subscriptionPauseLoadError(err, actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS))
        } finally {
            dispatch(pending(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS, false))
        }
    }
}
