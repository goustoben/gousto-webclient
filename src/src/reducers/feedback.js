import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

export const initialState = Immutable.fromJS({
  feedbackCount: 0,
})

export const feedback = {
  feedback: (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.FEEDBACK_COUNT_RECEIVED:
      return state.set('feedbackCount', action.payload)

    default:
      return state
    }
  }
}
