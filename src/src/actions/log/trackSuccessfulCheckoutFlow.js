import { feLoggingLogEvent } from "actions/log/feLoggingLogEvent"
import { logLevels } from "actions/log/logLevels"

export const trackSuccessfulCheckoutFlow = (message, data = {}) =>
  async (dispatch) => {
    await dispatch(feLoggingLogEvent(logLevels.info, message, data))
  }
