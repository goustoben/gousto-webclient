/* eslint no-use-before-define: ["error", { "functions": false }] */
import { fetchSubscription } from 'apis/subscription'
import { basketNumPortionChange } from './basket'
import actionTypes from './actionTypes'

export const subscriptionLoadData = () => (
  async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    const { data = {} } = await fetchSubscription(accessToken)
    const { box } = data

    dispatch({
      type: actionTypes.SUBSCRIPTION_LOAD_DATA,
      data,
    })

    if (data && box && box.numPortions) {
      dispatch(basketNumPortionChange(box.numPortions))
    }
  }
)

export const subActions = {
  subscriptionLoadData,
}

export default subActions
