import { actionTypes } from 'actions/actionTypes'
import { logLevels } from "actions/log/logLevels"
import { feLoggingLogEvent } from "actions/log/feLoggingLogEvent"

export function clearGoustoRef() {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CHECKOUT_SET_GOUSTO_REF,
      goustoRef: null
    })
    dispatch(feLoggingLogEvent(logLevels.info, 'clearGoustoRef'))
  }
}
