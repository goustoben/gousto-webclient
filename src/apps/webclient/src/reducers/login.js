import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'

export const initialState = () => Immutable.fromJS({
  login: false,
  helpPreLogin: false,
})

export const loginReducers = {
  loginVisibility: (state, action) => {
    if (!state) {
      return initialState()
    }

    switch (action.type) {
    case actionTypes.LOGIN_VISIBILITY_CHANGE: {
      return state.set('login', action.visibility)
    }

    case actionTypes.HELP_PRELOGIN_VISIBILITY_CHANGE: {
      return state.set('helpPreLogin', action.payload.visibility)
    }

    default:
      return state
    }
  },
}
