import { actionTypes } from "actions/actionTypes"
import { trackUserAttributes } from "actions/tracking/trackUserAttributes"
import { subscriptionLoadData } from "actions/subscription/subscriptionLoadData"
import { fetchUser } from "apis/users/fetchUser"

export function userLoadData() {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    const {data = {}} = await fetchUser(accessToken)
    const {user} = data

    dispatch({
      type: actionTypes.USER_LOAD_DATA,
      user
    })

    if (__CLIENT__) {
      dispatch(trackUserAttributes())
    }

    dispatch(subscriptionLoadData())
  }
}
