import { fetchUserExperiments, removeUserExperiments } from 'actions/experiments'
import { actionTypes } from 'actions/actionTypes'

const ACTION_TYPES_TO_TRIGGER_EXPERIMENTS_REFETCH = [
  actionTypes.USER_LOGGED_IN,
  actionTypes.USER_LOGGED_OUT
]

export const experimentsMiddleware = store => next => action => {
  if (ACTION_TYPES_TO_TRIGGER_EXPERIMENTS_REFETCH.includes(action.type)) {
    store.dispatch(removeUserExperiments())
    store.dispatch(fetchUserExperiments())
  }

  next(action)
}
