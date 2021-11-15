import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import GoustoException from "utils/GoustoException"
import { subscriptionPauseLoadReasonChoice } from "actions/subscriptionPause/subscriptionPauseLoadReasonChoice"
import { subscriptionPauseOSRTrack } from "actions/subscriptionPause/subscriptionPauseOSRTrack"
import { subscriptionPauseLoadReasons } from "actions/subscriptionPause/subscriptionPauseLoadReasons"
import { subscriptionPauseTrack } from "actions/subscriptionPause/subscriptionPauseTrack"
import { subscriptionPauseProceed } from "actions/subscriptionPause/subscriptionPauseProceed"
import { subscriptionPauseReasonSubmit } from "actions/subscriptionPause/subscriptionPauseReasonSubmit"
import { subscriptionPauseLoadError } from "actions/subscriptionPause/subscriptionPauseLoadError"

export function subscriptionPauseReasonChoice(chosenReasonId) {
  return async (dispatch, getState) => {
    dispatch(pending(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE, true))
    dispatch(error(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE, false))
    const errorPrefix = 'Unable to choose reason:'
    let chosenReason
    let chosenReasonSlug

    try {
      if (!chosenReasonId) {
        throw new GoustoException(`${errorPrefix} reason id not provided`, {
          error: 'no-reason-found',
        })
      }

      let chosenReasonIds
      let chosenReasonSubReasons
      let activeReasons
      let type

      try {
        chosenReasonIds = getState().subscriptionPause.get('chosenReasonIds').push(chosenReasonId)
        activeReasons = getState().subscriptionPause.get('activeReasons')
        chosenReason = activeReasons.get(chosenReasonId)
        chosenReasonSlug = chosenReason.get('slug')
        chosenReasonSubReasons = chosenReason.get('children')
        type = chosenReasonSubReasons && chosenReasonSubReasons.size ? 'category' : 'reason'
      } catch (err) {
        throw new GoustoException(`${errorPrefix} data not available`, {
          error: 'data-unavailable',
        })
      }

      dispatch(subscriptionPauseLoadReasonChoice(chosenReasonIds, {type, chosenReasonSlug}))

      if (type === 'category') {
        dispatch(subscriptionPauseOSRTrack(actionTypes.PS_REASON_CATEGORY_SELECTED, {
          selectedCategory: chosenReasonSlug,
        }))
        dispatch(subscriptionPauseLoadReasons(chosenReasonSubReasons))
        dispatch(subscriptionPauseOSRTrack(actionTypes.PS_REASON_LIST_MODAL_VIEWED, {
          selectedCategory: chosenReasonSlug,
        }))
      } else {
        dispatch(subscriptionPauseOSRTrack(actionTypes.PS_REASON_SELECTED, {
          selectedReason: chosenReasonSlug,
        }))
        const chosenReasonSteps = getState().subscriptionPause.get('activeSteps')

        if (!chosenReasonSteps || !chosenReasonSteps.size) {
          throw new GoustoException(`${errorPrefix} no steps found for "${chosenReasonSlug}"`)
        }

        if (chosenReasonSteps.some(step => step.get('initial', false))) {
          // if there's an initial step, there is recovery
          const recoveryFeature = getState().features.get('recovery')
          if (recoveryFeature && recoveryFeature.get('experiment')) {
            dispatch(subscriptionPauseTrack('IN_RECOVERY_EXPERIMENT', {
              experiment: recoveryFeature.get('value'),
            }))
          }
          dispatch(subscriptionPauseProceed('initial'))
        } else {
          // if there's no initial step, there is no recovery
          await dispatch(subscriptionPauseReasonSubmit())
        }
      }
    } catch (err) {
      dispatch(subscriptionPauseLoadError(err, actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE))
    } finally {
      dispatch(pending(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE, false))
    }
  }
}
