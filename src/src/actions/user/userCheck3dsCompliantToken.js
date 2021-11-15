import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { feLoggingLogEvent } from "actions/log/feLoggingLogEvent"
import { logLevels } from "actions/log/logLevels"
import logger from "utils/logger"
import { get3DSCompliantToken } from "apis/payments/get3DSCompliantToken"

export const userCheck3dsCompliantToken = () => async (dispatch, getState) => {
  try {
    const {user} = getState()
    const goustoRef = user.get('goustoReference')
    dispatch(pending(actionTypes.USER_GET_3DS_COMPLIANT_TOKEN, true))
    const {data} = await get3DSCompliantToken(goustoRef)
    dispatch(feLoggingLogEvent(logLevels.info, 'fetch 3ds token success'))
    dispatch({
      type: actionTypes.USER_GET_3DS_COMPLIANT_TOKEN,
      isCardTokenNotCompliantFor3ds: data.displayModal,
    })
    dispatch(pending(actionTypes.USER_GET_3DS_COMPLIANT_TOKEN, false))
  } catch (err) {
    dispatch(feLoggingLogEvent(logLevels.error, `fetch 3ds token failed: ${err.message}`))
    logger.error({message: 'Failed to fetch 3ds compliant token', errors: [err]})
  }
}
