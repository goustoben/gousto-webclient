import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'

const initialState = Immutable.fromJS({
  wizard: {
    steps: Immutable.List(),
    currentStepName: false,
    currentStepNumber: 0,
    isLastStep: false,
  },
})

const signup = {
  signup: (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.SIGNUP_STEPS_RECEIVE: {
      return state.setIn(['wizard', 'steps'], Immutable.fromJS(action.steps))
    }

    case actionTypes.SIGNUP_STEP_SET: {
      const newState =
					state
					  .setIn(['wizard', 'currentStepName'], action.currentStepName)
					  .setIn(['wizard', 'currentStepNumber'], action.currentStepNumber)
					  .setIn(['wizard', 'isLastStep'], action.isLastStep)

      return newState
    }

    default: {
      return state
    }
    }
  },

  signupCookForKids: (state = false, action) => {
    switch (action.type) {
    case actionTypes.SIGNUP_COOK_FOR_KIDS: {
      return action.cookForKids
    }

    default: {
      return state
    }
    }
  },
}

export default signup
