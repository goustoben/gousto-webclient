import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */

export const subscriptionPauseInitialState = Immutable.fromJS({
	activeReasons: {},
	activeSteps: {},
	activeStepId: undefined,
	chosenReasonIds: [],
	startScreen: [],
	inProgress: false,
	reasons: [],
	refreshRequired: false,
	staticScreenId: undefined,
})

const subscriptionPause = {
	subscriptionPause: (state, action) => {
		if (!state) {
			return subscriptionPauseInitialState
		}

		switch (action.type) {
			case actionTypes.SUBSCRIPTION_PAUSE_VISIBILITY_CHANGE:
				return state.set('inProgress', action.visible)

			case actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_REASONS: {
				const reasons = Immutable.fromJS(action.reasons)
				let newState = state.set('activeReasons', reasons.reduce((workingReasons, reason) =>
					workingReasons.set(reason.get('id'), reason)
				, Immutable.OrderedMap({})))

				newState = newState.set('activeSteps', subscriptionPauseInitialState.get('activeSteps'))
				newState = newState.set('activeStepId', subscriptionPauseInitialState.get('activeStepId'))
				newState = newState.set('staticScreenId', subscriptionPauseInitialState.get('staticScreenId'))

				return newState
			}

			case actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE: {
				let newState = state.set('chosenReasonIds', action.chosenReasonIds)
				const steps = state.getIn(['activeReasons', action.chosenReasonIds.last(), 'steps'], [])
				newState = newState.set('activeSteps', steps.reduce((workingSteps, step) =>
					workingSteps.set(step.get('id'), step)
				, Immutable.OrderedMap({})))

				newState = newState.set('activeStepId', subscriptionPauseInitialState.get('activeStepId'))
				newState = newState.set('staticScreenId', subscriptionPauseInitialState.get('staticScreenId'))

				return newState
			}

			case actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_STATIC_SCREEN:
				return state.set('staticScreenId', action.screenType)

			case actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_STEP: {
				let newState = state.set('activeStepId', action.activeStepId)
				newState = newState.set('staticScreenId', subscriptionPauseInitialState.get('staticScreenId'))

				return newState
			}

			case actionTypes.SUBSCRIPTION_PAUSE_REASON_RESET: {
				let newState = state.set('activeReasons', subscriptionPauseInitialState.get('activeReasons'))
				newState = state.set('activeSteps', subscriptionPauseInitialState.get('activeSteps'))
				newState = newState.set('activeStepId', subscriptionPauseInitialState.get('activeStepId'))
				newState = state.set('chosenReasonIds', subscriptionPauseInitialState.get('chosenReasonIds'))
				newState = newState.set('staticScreenId', subscriptionPauseInitialState.get('staticScreenId'))

				return newState
			}

			case actionTypes.SUBSCRIPTION_PAUSE_REASONS_RECEIVE: {
				const reasons = action.reasons
				const filterInitial = reason => reason.initial
				let newState = state
				if (reasons.some(filterInitial)) {
					const startReason = Immutable.fromJS(reasons.splice(reasons.findIndex(filterInitial), 1))
					newState = newState.set('startScreen', startReason)
				}
				newState = newState.set('metaData', Immutable.fromJS(action.metaData))

				return newState.set('reasons', Immutable.fromJS(reasons))
			}

			case actionTypes.SUBSCRIPTION_PAUSE_REASONS_REFRESH_REQUIRED:
				return state.set('refreshRequired', action.refreshRequired)

			default:
				return state
		}
	},
}

export default subscriptionPause
