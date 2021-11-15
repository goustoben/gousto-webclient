import { actionTypes } from "actions/actionTypes"

export function signupSetStep(step) {
  return (dispatch, getState) => {
    const signupState = getState().signup
    const steps = signupState.getIn(['wizard', 'steps'])

    if (step) {
      const newStepNumber = steps.findIndex(stepName => stepName === step.get('name'))
      const isLastStep = newStepNumber === steps.size - 1

      dispatch({
        type: actionTypes.SIGNUP_STEP_SET,
        currentStepName: step.get('name'),
        currentStepNumber: newStepNumber,
        isLastStep,
        trackingData: {
          type: actionTypes.SIGNUP_STEP_SET,
          step: step.get('slug'),
          stepName: step.get('name'),
        },
      })
    }
  }
}
