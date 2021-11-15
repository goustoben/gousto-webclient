import { basketPostcodeChange } from "actions/basket/basketPostcodeChange"
import { actionTypes } from "actions/actionTypes"
import { trackSignupWizardAction } from "actions/signup/trackSignupWizardAction"
import { completeWizardPostcode } from "actions/trackingKeys"
import { signupNextStep } from "actions/signup/signupNextStep"

export function signupChangePostcode(postcode, nextStepName) {
  return async (dispatch, getState) => {
    await dispatch(basketPostcodeChange(postcode))

    if (!getState().error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, false)) {
      dispatch(trackSignupWizardAction(completeWizardPostcode, {postcode}))
      signupNextStep(nextStepName)(dispatch, getState)
    }
  }
}
