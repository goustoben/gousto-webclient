import routesConfig from "config/routes"
import { actionTypes } from "actions/actionTypes"
import { redirect } from "actions/redirect/redirect"
import logger from "utils/logger"
import { subscriptionPauseOSRTrack } from "actions/subscriptionPause/subscriptionPauseOSRTrack"
import { subscriptionPauseVisibilityChange } from "actions/subscriptionPause/subscriptionPauseVisibilityChange"

export function subscriptionPauseRedirect(location) {
  return async (dispatch, getState) => {
    if (location) {
      if (location === routesConfig.client.myDeliveries || location === routesConfig.client.help) {
        const state = getState().subscriptionPause
        const categoryId = state.get('chosenReasonIds').first()
        const categorySlug = state.get('reasons').filter(reason => reason.get('id') === categoryId).first()
          .get('slug')
        const reasonId = state.get('chosenReasonIds').last()
        const activeReasons = state.get('activeReasons')
        const reasonSlug = activeReasons.getIn([reasonId, 'slug'])
        let seRecoveryType
        if (location === routesConfig.client.myDeliveries) {
          seRecoveryType = 'change_delivery_day'
        }
        if (location === routesConfig.client.help) {
          seRecoveryType = 'contact_cc'
        }

        dispatch(subscriptionPauseOSRTrack(actionTypes.PS_SUBSCRIPTION_KEPT_ACTIVE, {
          categorySlug,
          reasonSlug,
          seRecoveryType,
          seModal: 'RecoveryAttemptModal',
        }))
      }
      dispatch(subscriptionPauseVisibilityChange(false))
      setTimeout(() => dispatch(redirect(location)), 300)
    } else {
      logger.warning('subscriptionPause: no location provided for redirect')
    }
  }
}
