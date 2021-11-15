import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import GoustoException from "utils/GoustoException"
import { subscriptionPauseProceed } from "actions/subscriptionPause/subscriptionPauseProceed"
import { subscriptionPauseLoadError } from "actions/subscriptionPause/subscriptionPauseLoadError"
import { userOrderCancelNext } from "actions/user/userOrderCancelNext"
import { userOrderSkipNextProjected } from "actions/user/userOrderSkipNextProjected"

export function subscriptionPauseSkipNextBox() {
  return async (dispatch, getState) => {
    dispatch(pending(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX, true))
    dispatch(error(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX, false))
    const errorPrefix = 'Subscription pause skip next box error:'

    try {
      await dispatch(userOrderCancelNext())
      const orderCancelError = getState().error.get(actionTypes.USER_ORDER_CANCEL_NEXT)

      if (orderCancelError) {
        if (orderCancelError === 'no-orders-found') {
          await dispatch(userOrderSkipNextProjected())
          const orderSkipError = getState().error.get(actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED)

          if (orderSkipError) {
            if (orderSkipError === 'no-orders-found') {
              throw new GoustoException(`${errorPrefix} no orders found to cancel or skip`, {
                error: 'no-orders-found',
                level: 'warning',
              })
            } else {
              throw new GoustoException(`${errorPrefix} failed to skip next box, ${orderSkipError}`, {
                error: 'failed-skip',
              })
            }
          }
        } else {
          throw new GoustoException(`${errorPrefix} failed to cancel next box, ${orderCancelError}`, {
            error: 'failed-cancel',
          })
        }
      }

      dispatch(subscriptionPauseProceed('next', 'recovered', 'quoteSkipNext'))
    } catch (err) {
      dispatch(subscriptionPauseLoadError(err, actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX))
    } finally {
      dispatch(pending(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX, false))
    }
  }
}
