import { actionTypes } from "actions/actionTypes"

export function userReactivate(user) {
  return dispatch => {
    dispatch({
      type: actionTypes.USER_REACTIVATE,
      user
    })
  }
}
