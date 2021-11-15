import { getFeLoggingCorrelationData } from "selectors/checkout"
import logger from "utils/logger"
import { log } from "apis/log/log"

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
      logger.debug({message: `Sending request to feLogging: ${level} - ${message}`, extra})
      await log(level, message, extra)
    } catch (err) {
      logger.error({message: `Failed to log '${level}' event`, errors: [err]})
    }
  }
