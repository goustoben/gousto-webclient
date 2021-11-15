import { feLoggingLogEvent } from "actions/log/feLoggingLogEvent"
import { logLevels } from "actions/log/logLevels"

export const trackFailedCheckoutFlow = (message, error, data = {}) =>
  async (dispatch) => {
    await dispatch(feLoggingLogEvent(logLevels.error, message, data, error))
  }
