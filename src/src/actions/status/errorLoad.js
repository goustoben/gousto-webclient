import logger from "utils/logger"

export function errorLoad(action, err, log = true) {
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
