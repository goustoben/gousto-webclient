/* eslint no-use-before-define: ["error", { "functions": false }] */
import { fetchSubscription } from 'apis/subscription'
import actionTypes from './actionTypes'

const subActions = {
  subscriptionLoadData,
}

export function subscriptionLoadData() {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    const { data = {} } = await fetchSubscription(accessToken)
    dispatch({
      type: actionTypes.SUBSCRIPTION_LOAD_DATA,
      data,
    })
  }
}

export default subActions
