import { actionTypes } from 'actions/actionTypes'

export function trackSignupPageChange(step) {
  return (dispatch) => {
    dispatch({type: actionTypes.SIGNUP_TRACKING_STEP_CHANGE, step})
  }
}
