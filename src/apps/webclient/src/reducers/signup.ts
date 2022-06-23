import Immutable, { Map, List } from 'immutable'

import { actionTypes } from 'actions/actionTypes'

interface SignupWizardState {
  steps: List<any>
  currentStepName: string
  currentStepNumber: number
  isLastStep: boolean
  amountOfCustomers: any | null // TODO: clarify exact type
  district: any | null // TODO: clarify exact type
}

interface SignupState {
  numberOfPeople: number | null
  isDiscountAppliedBarDismissed: boolean
  isInWizardFunnel: boolean
  wizard: SignupWizardState
}

type SignupStateKeys = keyof SignupState
type SignupStateValues = SignupState[SignupStateKeys]
export type ImmutableSignupState = Map<SignupStateKeys, SignupStateValues>

const initialState: ImmutableSignupState = Immutable.fromJS({
  wizard: {
    steps: Immutable.List(),
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

export interface SignupAction {
  currentStepName: string
  currentStepNumber: number
  isLastStep: boolean

  newLocation: any[] | string // TODO: clarify exact type
  type: string // TODO: clarify exact type
  steps: any[] // TODO: clarify exact step type

  payload: {
    [key: string]: any
    numberOfPeople: number
  }

  count: any // TODO: clarify exact type
  district: any // TODO: clarify exact type
  cookForKids: any // TODO: clarify exact type
}

const signup = {
  signup: (state = initialState, action: SignupAction) => {
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

  signupCookForKids: (state = false, action: SignupAction) => {
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
