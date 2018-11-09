import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */

const status = {
  pending: (state = Immutable.Map({}), action) => {
    switch (action.type) {
    case actionTypes.PENDING:
      if (action.hasOwnProperty('key') && action.hasOwnProperty('value')) {
        return state.set(action.key, action.value)
      }

      return state
    default:
      return state
    }
  },
  error: (state = Immutable.Map({}), action) => {
    switch (action.type) {
    case actionTypes.ERROR:
      if (action.hasOwnProperty('key') && action.hasOwnProperty('value')) {
        let value = action.value
        if (value instanceof Error) {
          value = value.message
        }

        return state.set(action.key, value)
      }

      return state
    default:
      return state
    }
  },
}

export default status
