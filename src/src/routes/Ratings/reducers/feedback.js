import Immutable from 'immutable'
import {actionTypes} from 'actions/actionTypes'

const initialState = Immutable.fromJS({
  feedbackCount: 0,
})

const feedback = {
  feedback: (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.FEEDBACK_COUNT_RECEIVED:
      return state.set('feedbackCount', action.feedbackCount)

    default: {
      return state
    }
    }
  },
}

export {feedback}
