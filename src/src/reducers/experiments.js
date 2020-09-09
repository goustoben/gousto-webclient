import Immutable from 'immutable'
import { actionTypes } from '../actions/actionTypes'

export const initialState = Immutable.fromJS({
  experiments: Immutable.List(),
  fetchedExperiments: false,
})

export const experimentsReducer = {
  experiments: (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.EXPERIMENTS_RECEIVED: {
      return state
        .setIn(['experiments'], Immutable.List(action.payload.experiments))
        .setIn(['fetchedExperiments'], true)
    }

    case actionTypes.EXPERIMENTS_APPEND: {
      return state
        .updateIn(['experiments'], experiments => experiments.push(action.payload.experiment))
    }

    case actionTypes.EXPERIMENTS_REMOVE: {
      return initialState
    }

    default:
      return state
    }
  },
}
