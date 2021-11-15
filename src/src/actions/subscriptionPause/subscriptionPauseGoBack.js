import * as subUtils from "utils/subscription"
import GoustoException from "utils/GoustoException"
import { actionTypes } from "actions/actionTypes"
import { subscriptionTrackCategoriesViewed } from "actions/subscriptionPause/subscriptionTrackCategoriesViewed"
import { subscriptionPauseTrack } from "actions/subscriptionPause/subscriptionPauseTrack"
import { subscriptionPauseLoadStaticScreen } from "actions/subscriptionPause/subscriptionPauseLoadStaticScreen"
import { subscriptionPauseProceed } from "actions/subscriptionPause/subscriptionPauseProceed"
import { subscriptionPauseLoadReasons } from "actions/subscriptionPause/subscriptionPauseLoadReasons"
import { subscriptionPauseLoadReasonChoice } from "actions/subscriptionPause/subscriptionPauseLoadReasonChoice"
import { subscriptionPauseLoadError } from "actions/subscriptionPause/subscriptionPauseLoadError"

export function subscriptionPauseGoBack() {
  return (dispatch, getState) => {
    const errorPrefix = 'Subscription pause go back error:'

    try {
      dispatch(subscriptionPauseTrack('BACK'))

      const state = getState()
      const staticScreenId = state.subscriptionPause.get('staticScreenId')

      if (staticScreenId) {
        dispatch(subscriptionPauseLoadStaticScreen(undefined))
      } else {
        const activeStepId = state.subscriptionPause.get('activeStepId')
        let onInitialStep

        if (activeStepId) {
          const activeSteps = state.subscriptionPause.get('activeSteps')
          const activeStep = subUtils.getActivePauseStep(activeSteps, activeStepId)
          onInitialStep = activeStep.get('initial') || activeSteps.size === 1

          // load previous step
          if (!onInitialStep) {
            if (activeStep.get('previousStepId')) {
              dispatch(subscriptionPauseProceed('previous'))
            } else {
              throw new GoustoException(`${errorPrefix} can't find previous step to go back to`, {
                error: 'no-prev-step',
              })
            }
          }
        }

        // load previous reasons
        if (onInitialStep || !activeStepId) {
          const prevChosenReasonIds = state.subscriptionPause.get('chosenReasonIds').pop()
          const reasons = state.subscriptionPause.get('reasons')
          const prevReasons = subUtils.getReasonsFromStore(reasons, prevChosenReasonIds)

          if (prevReasons.size) {
            dispatch(subscriptionPauseLoadReasons(prevReasons))
            dispatch(subscriptionTrackCategoriesViewed())
            dispatch(subscriptionPauseLoadReasonChoice(prevChosenReasonIds))
          } else {
            throw new GoustoException(`${errorPrefix} can't find reasons to go back to`, {
              error: 'no-prev-reasons',
            })
          }
        }
      }
    } catch (err) {
      dispatch(subscriptionPauseLoadError(err, actionTypes.SUBSCRIPTION_PAUSE_REASON_GO_BACK))
    }
  }
}
