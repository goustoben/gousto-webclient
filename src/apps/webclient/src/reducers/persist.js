import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'

export const persistReducers = {
  persist: (state = Immutable.Map({}), action) => {
    switch (action.type) {
    case actionTypes.PERSIST_SIMPLE_HEADER:
      return state.set('simpleHeader', action.persist)

    default:
      return state
    }
  },
}
