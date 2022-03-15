import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'

export const tempReducers = {
  temp: (state = Immutable.Map({}), action) => {
    switch (action.type) {
    case actionTypes.TEMP:
      if (Object.prototype.hasOwnProperty.call(action, 'key') && Object.prototype.hasOwnProperty.call(action, 'value')) {
        return state.set(action.key, action.value)
      }

      return state
    default:
      return state
    }
  },
}
