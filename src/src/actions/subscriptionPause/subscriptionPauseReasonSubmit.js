import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import GoustoException from "utils/GoustoException"
import windowUtil from "utils/window"
import { getModalType } from "actions/subscriptionPause/getModalType"
import { subscriptionDeactivate } from "actions/subscriptionPause/subscriptionDeactivate"
import { subscriptionPauseOSRTrack } from "actions/subscriptionPause/subscriptionPauseOSRTrack"
import { subscriptionPauseProceed } from "actions/subscriptionPause/subscriptionPauseProceed"
import { subscriptionPauseLoadStaticScreen } from "actions/subscriptionPause/subscriptionPauseLoadStaticScreen"
import { subscriptionPauseLoadError } from "actions/subscriptionPause/subscriptionPauseLoadError"

export function subscriptionPauseReasonSubmit(freeText) {
  return async (dispatch, getState) => {
    dispatch(pending(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT, true))
    dispatch(error(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT, false))
    const errorPrefix = 'Unable to submit reason:'
    let chosenReasonId
    let chosenReasonSlug

    try {
      const chosenReasonIds = getState().subscriptionPause.get('chosenReasonIds')

      if (!chosenReasonIds.size) {
        throw new GoustoException(`${errorPrefix} reason id not available`, {
          error: 'data-unavailable',
        })
      }

      try {
        chosenReasonId = chosenReasonIds.last()
        chosenReasonSlug = getState().subscriptionPause.getIn(['activeReasons', chosenReasonId, 'slug'])

        if (!chosenReasonSlug) {
          throw new GoustoException()
        }
      } catch (err) {
        throw new GoustoException(`${errorPrefix} data not available`, {
          error: 'data-unavailable',
        })
      }

      const reason = freeText || chosenReasonSlug
      await dispatch(subscriptionDeactivate())

      const subscriptionDeactivateError = getState().error.get(actionTypes.SUBSCRIPTION_DEACTIVATE)

      if (subscriptionDeactivateError) {
        throw new GoustoException(`${errorPrefix} ${subscriptionDeactivateError}`, {
          error: 'deactivate-fail',
        })
      }

      const modalType = getModalType(getState)
      dispatch(subscriptionPauseOSRTrack(actionTypes.PS_SUBSCRIPTION_PAUSED, {reason, modalType}))

      const orderState = getState().user.get('orders')
      const pendingOrderIds = orderState.filter(o => o.get('phase') === 'open')
      const committedOrderIds = orderState.filter(o => ['cutoff', 'delivery', 'packing', 'picking'].indexOf(o.get('phase')) >= 0)

      if (!(pendingOrderIds.size || committedOrderIds.size)) {
        dispatch(subscriptionPauseProceed('pause', 'paused'))
      } else {
        dispatch(subscriptionPauseLoadStaticScreen('pausedPendingBoxes'))
      }

      const windowObj = windowUtil.getWindow()
      if (windowObj && windowObj.toggleSubscriptionPage) {
        windowObj.toggleSubscriptionPage()
      }
    } catch (err) {
      dispatch(subscriptionPauseLoadError(err, actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT))
    } finally {
      dispatch(pending(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT, false))
    }
  }
}
