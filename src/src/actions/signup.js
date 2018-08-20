/* eslint no-use-before-define: ["error", { "functions": false }] */
import { push } from 'react-router-redux'
import routes, { client } from 'config/routes'
import redirectAction from 'actions/redirect'
import { stepByName } from 'utils/signup'
import actionTypes from './actionTypes'
import basketActions from './basket'

const signupActions = {
	signupStepsReceive,
	signupCookForKidsChange,
	signupChangePostcode,
	signupSetStep,
	signupTracking,
	signupNextStep,
}

function signupStepsReceive(steps) {
	return {
		type: actionTypes.SIGNUP_STEPS_RECEIVE,
		steps,
	}
}

function signupSetStep(step) {
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

function signupNextStep(stepName) {
	return (dispatch, getState) => {
		const step = stepByName(stepName)
		if (step) {
			const signupState = getState().signup
			const isCurrenltyTheLastStep = signupState.getIn(['wizard', 'isLastStep'])
			if (isCurrenltyTheLastStep) {
				dispatch(signupTracking())

				return dispatch(redirectAction.redirect(routes.client.menu))
			}

			try {
				const search = getState().routing.locationBeforeTransitions.search
				dispatch(push(`${client.signup}/${step.get('slug')}${search}`))
			} catch (e) {
				dispatch(push(`${client.signup}/${step.get('slug')}`))
			}

			dispatch(signupSetStep(step))
		}

		return null
	}
}

function signupChangePostcode(postcode, nextStepName) {
	return async (dispatch, getState) => {
		await dispatch(basketActions.basketPostcodeChange(postcode))
		if (!getState().error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, false)) {
			signupActions.signupNextStep(nextStepName)(dispatch, getState)
		}
	}
}

function signupCookForKidsChange(cookForKids) {
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

function signupTracking() {
	return (dispatch, getState) => {
		const basket = getState().basket
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

export default signupActions
