import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

const initialState = Immutable.fromJS({
  wizard: {
    steps: Immutable.List(),
    currentStepName: '',
    currentStepNumber: 0,
    isLastStep: false,
    amountOfCustomers: null,
    district: null,
  },
  isDiscountAppliedBarDismissed: false,
  showcaseMenuSeen: false,
})

const signup = {
  signup: (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.SIGNUP_STEPS_RECEIVE: {
      return state.setIn(['wizard', 'steps'], Immutable.fromJS(action.steps))
    }

    case actionTypes.SIGNUP_STEP_SET: {
      return state
        .setIn(['wizard', 'currentStepName'], action.currentStepName)
        .setIn(['wizard', 'currentStepNumber'], action.currentStepNumber)
        .setIn(['wizard', 'isLastStep'], action.isLastStep)
    }

    case actionTypes.SIGNUP_DISMISS_DISCOUNT_APPLIED_BAR: {
      return state.set('isDiscountAppliedBarDismissed', true)
    }

    case actionTypes.SHOWCASE_MENU_SEEN: {
      return state.set('showcaseMenuSeen', true)
    }

    case actionTypes.SIGNUP_SET_SOCIAL_BELONGING_OPTIONS: {
      return state
        .setIn(['wizard', 'amountOfCustomers'], action.count || null)
        .setIn(['wizard', 'district'], action.district || null)
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
