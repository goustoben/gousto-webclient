import { isOsrOfferFeatureEnabled, isSubscriptionPauseOsrFeatureEnabled } from "selectors/features"
import { getPauseRecoveryContent } from "actions/onScreenRecovery/getPauseRecoveryContent"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { subscriptionTrackPauseAttempt } from "actions/subscriptionPause/subscriptionTrackPauseAttempt"
import { subscriptionTrackCategoriesViewed } from "actions/subscriptionPause/subscriptionTrackCategoriesViewed"
import { subscriptionPauseReset } from "actions/subscriptionPause/subscriptionPauseReset"
import { subscriptionPauseVisibilityChange } from "actions/subscriptionPause/subscriptionPauseVisibilityChange"
import { subscriptionPauseFetchReasons } from "actions/subscriptionPause/subscriptionPauseFetchReasons"
import { subscriptionPauseReasonsRefreshRequired } from "actions/subscriptionPause/subscriptionPauseReasonsRefreshRequired"
import { subscriptionPauseLoadStartScreen } from "actions/subscriptionPause/subscriptionPauseLoadStartScreen"
import { subscriptionPauseLoadReasons } from "actions/subscriptionPause/subscriptionPauseLoadReasons"
import { userLoadData } from "actions/user/userLoadData"

export function subscriptionPauseStart() {
  return async (dispatch, getState) => {
    const subscriptionPauseOsrFeatureValue = isSubscriptionPauseOsrFeatureEnabled(getState())
    const osrOfferFeatureValue = isOsrOfferFeatureEnabled(getState())
    if (subscriptionPauseOsrFeatureValue) {
      return getPauseRecoveryContent(osrOfferFeatureValue)(dispatch, getState)
    }

    await dispatch(userLoadData())
    dispatch(pending(actionTypes.SUBSCRIPTION_PAUSE_START, true))
    dispatch(subscriptionPauseReset())
    dispatch(subscriptionPauseVisibilityChange(true))

    if (getState().subscriptionPause.get('refreshRequired')) {
      await dispatch(subscriptionPauseFetchReasons())

      if (!getState().error.get(actionTypes.SUBSCRIPTION_PAUSE_FETCH)) {
        dispatch(subscriptionPauseReasonsRefreshRequired(false))
      }
    }

    const metaData = getState().subscriptionPause.get('metaData')
    if (getState().subscriptionPause.get('startScreen').size > 0) {
      dispatch(subscriptionPauseLoadStartScreen())
      dispatch(subscriptionTrackPauseAttempt(metaData))
    } else {
      const initialReasons = getState().subscriptionPause.get('reasons')
      if (initialReasons.size) {
        dispatch(subscriptionPauseLoadReasons(initialReasons))
        dispatch(subscriptionTrackPauseAttempt(metaData))
        dispatch(subscriptionTrackCategoriesViewed())
      }
    }

    dispatch(pending(actionTypes.SUBSCRIPTION_PAUSE_START, false))
  }
}
