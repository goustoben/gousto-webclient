import { actionTypes } from "actions/actionTypes"
import logger from "utils/logger"
import { subscriptionPauseTrack } from "actions/subscriptionPause/subscriptionPauseTrack"
import { subscriptionPauseLoadStaticScreen } from "actions/subscriptionPause/subscriptionPauseLoadStaticScreen"

export function subscriptionPauseLoadError(err = '', actionType = actionTypes.SUBSCRIPTION_PAUSE_ERROR) {
  return dispatch => {
    const message = err.message || err
    const error = err.error || message
    const logLevel = err.level || 'error'

    logger[logLevel](message)

    if (actionType) {
      dispatch(error(actionType, error))
    }

    dispatch(subscriptionPauseTrack('ERROR', {error: message}))
    dispatch(subscriptionPauseLoadStaticScreen('error'))
  }
}
