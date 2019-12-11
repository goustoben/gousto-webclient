import Immutable from 'immutable'
import actionTypes from '../actions/actionTypes'

export const initialState = Immutable.fromJS({
  isPolicyAccepted: false,
})

const cookiesReducer = {
  cookies: (state = initialState, { type, ...data }) => {
    switch (type) {
    case actionTypes.COOKIE_POLICY_ACCEPTANCE_CHANGE: {
      return state.set('isPolicyAccepted', data.isAccepted)
    }

    default:
      return state
    }
  },
}

export default cookiesReducer
