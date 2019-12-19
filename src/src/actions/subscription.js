import { notice } from 'utils/logger'
import { fetchSubscription } from 'apis/subscription'
import { basketNumPortionChange } from './basket'
import actionTypes from './actionTypes'

export const subscriptionLoadData = () => (
  async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')

    try {
      const { data = {} } = await fetchSubscription(accessToken)
      const { box } = data

      dispatch({
        type: actionTypes.SUBSCRIPTION_LOAD_DATA,
        data,
      })

      if (data && box && box.numPortions) {
        dispatch(basketNumPortionChange(box.numPortions))
      }
    } catch (err) {
      notice(`Subscription load error: ${err}`)
    }
  }
)

export const subActions = {
  subscriptionLoadData,
}

export default subActions
