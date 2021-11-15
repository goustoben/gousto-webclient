import { actionTypes } from "actions/actionTypes"
import seActions from "middlewares/tracking/snowplow/pauseSubscription/seActions"
import { userPromoApplyCode } from "actions/user/userPromoApplyCode"

export const keepSubscription = () => (
    async (dispatch, getState) => {
        const userId = getState().user.get('id')
        const offer = getState().onScreenRecovery.get('offer')
        const promoCode = offer ? offer.promoCode : null
        if (promoCode) {
            await dispatch(userPromoApplyCode(promoCode))
            const errorInApplyPromo = getState().error && getState().error.get(actionTypes.PROMO_APPLY)

            if (errorInApplyPromo) {
                dispatch({
                    type: actionTypes.TRACKING,
                    trackingData: {
                        actionType: 'Failed in applying OSR promo code',
                        osrDiscount: promoCode,
                    },
                })

                /*
                  Early return to prevent modal close
                  Because a user failed to apply OSR promo code.
                  // TODO show error message or notification
                */
                return
            }
        }
        dispatch({
            type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
            modalVisibility: false,
            trackingData: {
                actionType: seActions.SUBSCRIPTION_KEPT_ACTIVE,
                customerId: userId,
                osrDiscount: promoCode,
            },
        })
    }
)
