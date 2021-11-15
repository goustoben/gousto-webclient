import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import moment from "moment"
import { getUserId } from "selectors/user"
import { deactivateSubscription } from "routes/Account/apis/subscription/deactivateSubscription"

export function subscriptionDeactivate() {
    return async (dispatch, getState) => {
        dispatch(pending(actionTypes.SUBSCRIPTION_DEACTIVATE, true))
        dispatch(error(actionTypes.SUBSCRIPTION_DEACTIVATE, false))
        const accessToken = getState().auth.get('accessToken')

        try {
            const state = getState()
            const pauseDate = moment().format('YYYY-MM-DD')
            const userId = getUserId(state)

            await deactivateSubscription(accessToken, pauseDate, userId)
        } catch (err) {
            dispatch(error(actionTypes.SUBSCRIPTION_DEACTIVATE, 'deactivate-fail'))
        } finally {
            dispatch(pending(actionTypes.SUBSCRIPTION_DEACTIVATE, false))
        }
    }
}
