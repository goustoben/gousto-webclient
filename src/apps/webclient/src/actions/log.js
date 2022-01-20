import { log } from 'apis/log'
import { getFeLoggingCorrelationData } from 'selectors/checkout'
import logger from 'utils/logger'

export const logLevels = {
  info: 'info',
  error: 'error',
  critical: 'critical',
}

export const feLoggingLogEvent = (level, message, data = {}, error = null) =>
  async (dispatch, getState) => {
    const state = getState()
    const correlationData = getFeLoggingCorrelationData(state)

    const extra = {
      ...data,
      ...correlationData,
    }
    if (error) {
      extra.error = {
        message: error.message,
        name: error.name,
        stack: error.stack,
      }
    }
    try {
      logger.debug({ message: `Sending request to feLogging: ${level} - ${message}`, extra })
      await log(level, message, extra)
    } catch (err) {
      logger.error({ message: `Failed to log '${level}' event`, errors: [err] })
    }
  }

export const trackSuccessfulCheckoutFlow = (message, data = {}) =>
  async (dispatch) => {
    await dispatch(feLoggingLogEvent(logLevels.info, message, data))
  }

export const trackFailedCheckoutFlow = (message, error, data = {}) =>
  async (dispatch) => {
    await dispatch(feLoggingLogEvent(logLevels.error, message, data, error))
  }
