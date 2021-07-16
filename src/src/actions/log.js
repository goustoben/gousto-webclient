import { log } from 'apis/log'
import { getCheckoutLogData } from 'selectors/checkout'
import logger from 'utils/logger'

const logEvent = async (level, message, data) => {
  try {
    await log(level, message, data)
  } catch (err) {
    logger.error({ message: `Failed to log '${level}' event`, errors: [err] })
  }
}

export const logInfo = (message, data = {}) => async () => logEvent('info', message, data)

export const logError = (message, error, data = {}) => async () => logEvent('error', message, {
  error: {
    message: error.message,
    name: error.name,
    stack: error.stack,
  },
  ...data,
})

export const logCritical = (message, error, data = {}) => async () => logEvent('critical', message, {
  error: {
    message: error.message,
    name: error.name,
    stack: error.stack,
  },
  ...data,
})

export const trackSuccessfulCheckoutFlow = (message, data = {}) => async (dispatch, getState) => {
  const logData = {
    ...data,
    ...getCheckoutLogData(getState()),
  }

  await dispatch(logInfo(message, logData))
}

export const trackFailedCheckoutFlow = (message, error, data = {}) => async (dispatch, getState) => {
  const logData = {
    ...data,
    ...getCheckoutLogData(getState()),
  }

  await dispatch(logError(message, error, logData))
}
