import { client as clientRoutes } from "config/routes"
import { actionTypes } from "actions/actionTypes"
import seActions from "middlewares/tracking/snowplow/pauseSubscription/seActions"
import * as windowUtils from "utils/window"
import { subscriptionDeactivate } from "actions/subscriptionPause/subscriptionDeactivate"

export const pauseSubscription = () => (
    async (dispatch, getState) => {
        await dispatch(subscriptionDeactivate())

        const {user, onScreenRecovery} = getState()
        const userId = user.get('id')
        const offer = onScreenRecovery.get('offer')
        const promoCode = offer ? offer.promoCode : null
        const subscriptionPageURL = clientRoutes.mySubscription

        dispatch({
            type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
            modalVisibility: false,
            trackingData: {
                actionType: seActions.SUBSCRIPTION_PAUSED,
                customerId: userId,
                osrDiscount: promoCode,
            },
        })

        windowUtils.redirect(subscriptionPageURL)
    }
)
