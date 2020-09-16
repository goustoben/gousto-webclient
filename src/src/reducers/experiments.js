import Immutable from 'immutable'
import { actionTypes } from '../actions/actionTypes'

export const initialState = () => Immutable.fromJS({
  experiments: Immutable.Map(),
  fetchedExperiments: false,
})

export const experimentsReducer = {
  experiments: (state = initialState(), action) => {
    switch (action.type) {
    case actionTypes.EXPERIMENTS_RECEIVED: {
      const { experiments } = action.payload

      return state
        .setIn(['experiments'], experiments.reduce((acc, experiment) => acc.set(experiment.name, Immutable.fromJS(experiment)), Immutable.Map()))
        .setIn(['fetchedExperiments'], true)
    }

    case actionTypes.EXPERIMENTS_APPEND: {
      const { experiment } = action.payload

      return state
        .setIn(['experiments', experiment.name], Immutable.fromJS(experiment))
    }

    case actionTypes.USER_LOGGED_IN:
    case actionTypes.USER_LOGGED_OUT:
    case actionTypes.EXPERIMENTS_REMOVE: {
      return initialState()
    }

    default:
      return state
    }
  },
}
