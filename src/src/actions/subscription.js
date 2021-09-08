import logger from 'utils/logger'
import {
  getIsNewSubscriptionApiEnabled
} from 'selectors/features'
import {
  getUserId
} from 'selectors/user'
import { parseObjectKeysToCamelCase } from 'utils/jsonHelper'
import { fetchSubscription, fetchSubscriptionV2 } from '../routes/Account/apis/subscription'
import { basketNumPortionChange } from './basket'
import { actionTypes } from './actionTypes'
import { mapSubscriptionV2Payload } from '../routes/Account/Subscription/utils/mapping'

export const subscriptionLoadData = () => (
  async (dispatch, getState) => {
    const state = getState()
    const accessToken = state.auth.get('accessToken')

    try {
      let response = {}

      if (getIsNewSubscriptionApiEnabled(state)) {
        const userId = getUserId(state)
        const subscriptionV2Response = await fetchSubscriptionV2(accessToken, userId)
        response = parseObjectKeysToCamelCase(
          mapSubscriptionV2Payload(subscriptionV2Response.data.data.subscription)
        )
      } else {
        const subscriptionCoreResponse = await fetchSubscription(accessToken)
        response = subscriptionCoreResponse.data
      }

      dispatch({
        type: actionTypes.SUBSCRIPTION_LOAD_DATA,
        data: response,
      })

      if (response && response.box && response.box.numPortions) {
        dispatch(basketNumPortionChange(response.box.numPortions))
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
