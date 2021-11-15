import { actionTypes } from "actions/actionTypes"

export function signupCookForKidsChange(cookForKids) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGNUP_COOK_FOR_KIDS,
      cookForKids,
      trackingData: {
        type: actionTypes.SIGNUP_COOK_FOR_KIDS,
        cookForKids,
      },
    })
  }
}
