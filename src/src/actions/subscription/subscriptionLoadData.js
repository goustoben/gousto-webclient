import { getUserId } from "selectors/user"
import { mapSubscriptionPayload } from "routes/Account/Subscription/utils/mapping"
import { actionTypes } from "actions/actionTypes"
import { basketNumPortionChange } from "actions/basket/basketNumPortionChange"
import logger from "utils/logger"
import { fetchSubscription } from "routes/Account/apis/subscription/fetchSubscription"

export const subscriptionLoadData = () => (
    async (dispatch, getState) => {
        const state = getState()
        const accessToken = state.auth.get('accessToken')

        try {
            const userId = getUserId(state)
            const subscriptionResponse = await fetchSubscription(accessToken, userId)

            const {subscription} = subscriptionResponse.data.data
            const data = mapSubscriptionPayload(subscription)

            dispatch({
                type: actionTypes.SUBSCRIPTION_LOAD_DATA,
                data,
            })

            if (data && data.box && data.box.numPortions) {
                dispatch(basketNumPortionChange(data.box.numPortions))
            }
        } catch (err) {
            logger.notice(`Subscription load error: ${err}`)
        }
    }
)
