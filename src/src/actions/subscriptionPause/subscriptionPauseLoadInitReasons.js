import { actionTypes } from "actions/actionTypes"
import { subscriptionPauseReset } from "actions/subscriptionPause/subscriptionPauseReset"
import { subscriptionPauseLoadReasons } from "actions/subscriptionPause/subscriptionPauseLoadReasons"
import { subscriptionPauseOSRTrack } from "actions/subscriptionPause/subscriptionPauseOSRTrack"

export function subscriptionPauseLoadInitReasons() {
  return (dispatch, getState) => {
    dispatch(subscriptionPauseReset())
    const reasons = getState().subscriptionPause.get('reasons')
    dispatch(subscriptionPauseLoadReasons(reasons))
    dispatch(subscriptionPauseOSRTrack(actionTypes.PS_REASON_LIST_MODAL_VIEWED))
  }
}
