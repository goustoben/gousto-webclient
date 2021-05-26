import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

const initialState = Immutable.fromJS({
  wizard: {
    steps: Immutable.List(),
    currentStepName: '',
    currentStepNumber: 0,
    isLastStep: false,
  },
  isDiscountAppliedBarDismissed: false,
})

const signup = {
  signup: (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.SIGNUP_STEPS_RECEIVE: {
      return state.setIn(['wizard', 'steps'], Immutable.fromJS(action.steps))
    }

    case actionTypes.SIGNUP_STEP_SET: {
      const newState = state
        .setIn(['wizard', 'currentStepName'], action.currentStepName)
        .setIn(['wizard', 'currentStepNumber'], action.currentStepNumber)
        .setIn(['wizard', 'isLastStep'], action.isLastStep)

      return newState
    }

    case actionTypes.SIGNUP_DISMISS_DISCOUNT_APPLIED_BAR: {
      return state.set('isDiscountAppliedBarDismissed', true)
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

export { signup }
