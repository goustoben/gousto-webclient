import { actionTypes } from "actions/actionTypes"
import Immutable from "immutable"
import { subscriptionPauseOSRTrack } from "actions/subscriptionPause/subscriptionPauseOSRTrack"
import { subscriptionPauseLoadReasons } from "actions/subscriptionPause/subscriptionPauseLoadReasons"
import { subscriptionPauseLoadReasonChoice } from "actions/subscriptionPause/subscriptionPauseLoadReasonChoice"
import { subscriptionPauseLoadStep } from "actions/subscriptionPause/subscriptionPauseLoadStep"

export function subscriptionPauseLoadStartScreen() {
  return (dispatch, getState) => {
    dispatch(subscriptionPauseOSRTrack(actionTypes.PS_START_MODAL_VIEWED))
    const startScreen = getState().subscriptionPause.get('startScreen')
    const chosenReasonId = Immutable.List([startScreen.last().get('id')])
    const loadStepId = startScreen.last().get('steps').first()
    dispatch(subscriptionPauseLoadReasons(startScreen))
    dispatch(subscriptionPauseLoadReasonChoice(chosenReasonId))
    dispatch(subscriptionPauseLoadStep(loadStepId.get('id')))
  }
}
