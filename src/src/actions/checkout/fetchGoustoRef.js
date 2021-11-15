import { actionTypes } from 'actions/actionTypes'
import { logLevels } from "actions/log/logLevels"
import { feLoggingLogEvent } from "actions/log/feLoggingLogEvent"
import { fetchReference } from "apis/customers/fetchReference"

export function fetchGoustoRef() {
  return async (dispatch, getState) => {
    let goustoRef = getState().checkout.get('goustoRef')
    if (!goustoRef) {
      const {data} = await fetchReference()
      goustoRef = data.goustoRef

      dispatch({
        type: actionTypes.CHECKOUT_SET_GOUSTO_REF,
        goustoRef,
      })
      dispatch(feLoggingLogEvent(logLevels.info, 'fetchGoustoRef: fetched'))
    } else {
      dispatch(feLoggingLogEvent(logLevels.info, 'fetchGoustoRef: already present'))
    }
  }
}
