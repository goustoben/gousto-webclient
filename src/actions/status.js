import logger from 'utils/logger'
import actionTypes from './actionTypes'

const statusActions = {
  pending,
  error,
  errorLoad,
}

function pending(key, value) {
  return {
    type: actionTypes.PENDING,
    key: actionTypes[key],
    value,
  }
}

function error(key, value) {
  return {
    type: actionTypes.ERROR,
    key: actionTypes[key],
    value,
  }
}

function errorLoad(action, err, log = true) {
  return dispatch => {
    const message = err.message || err
    const error = err.error || message
    const logLevel = err.level || 'error'

    if (log) {
      logger[logLevel](message)
    }

    dispatch(statusActions.error(action, error))
  }
}

export default statusActions
