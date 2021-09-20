import logger from 'utils/logger'
import { getUserId } from 'selectors/user'
import { fetchSubscription } from '../routes/Account/apis/subscription'
import { basketNumPortionChange } from './basket'
import { actionTypes } from './actionTypes'
import { mapSubscriptionPayload } from '../routes/Account/Subscription/utils/mapping'

export const subscriptionLoadData = () => (
  async (dispatch, getState) => {
    const state = getState()
    const accessToken = state.auth.get('accessToken')

    try {
      const userId = getUserId(state)
      const subscriptionResponse = await fetchSubscription(accessToken, userId)

      const { subscription } = subscriptionResponse.data.data
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

export const subActions = {
  subscriptionLoadData,
}

export default subActions
