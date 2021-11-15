import { actionTypes } from "actions/actionTypes"

export function signupStepsReceive(steps) {
  return {
    type: actionTypes.SIGNUP_STEPS_RECEIVE,
    steps,
  }
}
