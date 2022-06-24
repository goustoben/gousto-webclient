import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

const initialState = Immutable.fromJS({
  wizard: {
    stepNames: [],
    currentStepName: '',
    currentStepNumber: 0,
    isLastStep: false,
    amountOfCustomers: null,
    district: null,
  },
  numberOfPeople: null,
  isDiscountAppliedBarDismissed: false,
  isInWizardFunnel: false,
})

const signup = {
  signup: (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.SIGNUP_STEPS_RECEIVE: {
      return state.setIn(['wizard', 'stepNames'], Immutable.fromJS(action.stepNames))
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

    case actionTypes.SIGNUP_SET_SOCIAL_BELONGING_OPTIONS: {
      return state
        .setIn(['wizard', 'amountOfCustomers'], action.count || null)
        .setIn(['wizard', 'district'], action.district || null)
    }

    case actionTypes.WIZARD_SEEN: {
      return state.set('isInWizardFunnel', true)
    }

    case actionTypes.PAGE_CHANGED: {
      const funnelPaths = ['/menu', '/signup', '/check-out']
      const isInFunnelPage = funnelPaths.some((path) => action.newLocation.includes(path))

      const isWizardSeen = state.get('isInWizardFunnel')

      return state.set('isInWizardFunnel', isInFunnelPage && isWizardSeen)
    }

    case actionTypes.SIGNUP_SET_NUMBER_OF_PEOPLE: {
      return state.set('numberOfPeople', action.payload.numberOfPeople)
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
