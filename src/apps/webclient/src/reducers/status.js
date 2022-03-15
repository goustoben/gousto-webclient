import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'

const status = {
  pending: (state = Immutable.Map({}), action) => {
    switch (action.type) {
    case actionTypes.PENDING:
      if (Object.prototype.hasOwnProperty.call(action, 'key') && Object.prototype.hasOwnProperty.call(action, 'value')) {
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
      if (Object.prototype.hasOwnProperty.call(action, 'key') && Object.prototype.hasOwnProperty.call(action, 'value')) {
        let { value } = action
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
