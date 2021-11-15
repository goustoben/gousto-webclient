import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { modalVisibilityChange } from "actions/onScreenRecovery/modalVisibilityChange"
import seActions from "middlewares/tracking/snowplow/pauseSubscription/seActions"
import logger from "utils/logger"
import { subscriptionDeactivate } from "actions/subscriptionPause/subscriptionDeactivate"
import { fetchSubscriptionPauseContent } from "apis/onScreenRecovery/fetchSubscriptionPauseContent"

export const getPauseRecoveryContent = (enableOffer = true) => (
    async (dispatch, getState) => {
        const accessToken = getState().auth.get('accessToken')
        const modalType = 'subscription'
        dispatch(pending(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, true))
        dispatch(error(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, null))
        try {
            const {data} = await fetchSubscriptionPauseContent(accessToken, enableOffer)

            if (data.intervene) {
                dispatch(modalVisibilityChange({
                    data,
                    modalType
                }))

                const offer = getState().onScreenRecovery.get('offer')
                const promoCode = offer ? offer.promoCode : null
                const hasPendingPromo = offer === null ? null : offer.formattedValue
                const hasPendingPromoWithSubCondition = offer === null ? null : offer.requireActiveSubscription
                dispatch({
                    type: actionTypes.TRACKING,
                    trackingData: {
                        actionType: seActions.SUBSCRIPTION_PAUSE_ATTEMPT,
                        hasPendingPromo,
                        hasPendingPromoWithSubCondition,
                        osrDiscount: promoCode,
                    },
                })
            } else {
                dispatch(subscriptionDeactivate())
            }
        } catch (err) {
            logger.error(err)
            dispatch(error(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, err))
        } finally {
            dispatch(pending(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, false))
        }
    }
)
