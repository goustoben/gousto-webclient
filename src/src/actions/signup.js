import { push } from 'react-router-redux'
import routes, { client } from 'config/routes'
import redirectAction from 'actions/redirect'
import { stepByName } from 'utils/signup'
import { actionTypes } from './actionTypes'
import { basketPostcodeChange } from './basket'

export function signupStepsReceive(steps) {
  return {
    type: actionTypes.SIGNUP_STEPS_RECEIVE,
    steps,
  }
}

export function signupSetStep(step) {
  return (dispatch, getState) => {
    const signupState = getState().signup
    const steps = signupState.getIn(['wizard', 'steps'])

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

export function signupTracking() {
  return (dispatch, getState) => {
    const { basket } = getState()
    const postcode = basket.get('postcode')
    const numAdults = basket.get('numAdults')
    const numPortions = basket.get('numPortions')
    const date = basket.get('date')
    const slotId = basket.get('slotId')

    dispatch({
      type: actionTypes.SIGNUP_TRACKING,
      trackingData: {
        actionType: actionTypes.SIGNUP_TRACKING,
        postcode,
        numAdults,
        numPortions,
        date,
        slotId,
      },
    })
  }
}

export function signupNextStep(stepName) {
  return (dispatch, getState) => {
    const step = stepByName(stepName)
    if (step) {
      const signupState = getState().signup
      const isCurrentlyTheLastStep = signupState.getIn(['wizard', 'isLastStep'])
      if (isCurrentlyTheLastStep) {
        dispatch(signupTracking())

        return dispatch(redirectAction.redirect(routes.client.menu))
      }

      try {
        const { search } = getState().routing.locationBeforeTransitions
        dispatch(push(`${client.signup}/${step.get('slug')}${search}`))
      } catch (e) {
        dispatch(push(`${client.signup}/${step.get('slug')}`))
      }

      dispatch(signupSetStep(step))
    }

    return null
  }
}

export function signupChangePostcode(postcode, nextStepName) {
  return async (dispatch, getState) => {
    await dispatch(basketPostcodeChange(postcode))
    if (!getState().error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, false)) {
      signupNextStep(nextStepName)(dispatch, getState)
    }
  }
}

