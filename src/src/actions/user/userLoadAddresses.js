import { error } from "actions/status/error"
import { actionTypes } from "actions/actionTypes"
import { pending } from "actions/status/pending"
import { errorLoad } from "actions/status/errorLoad"
import { fetchUserAddresses } from "apis/users/fetchUserAddresses"

export function userLoadAddresses() {
  return async (dispatch, getState) => {
    dispatch(error(actionTypes.USER_LOAD_ADDRESSES, null))
    dispatch(pending(actionTypes.USER_LOAD_ADDRESSES, true))

    try {
      const accessToken = getState().auth.get('accessToken')
      const userId = getState().user.get('id')
      const {data = {}} = await fetchUserAddresses(accessToken, userId)
      dispatch({
        type: actionTypes.USER_LOAD_ADDRESSES,
        data
      })
    } catch (err) {
      dispatch(errorLoad(actionTypes.USER_LOAD_ADDRESSES, err))
    } finally {
      dispatch(pending(actionTypes.USER_LOAD_ADDRESSES, false))
    }
  }
}
