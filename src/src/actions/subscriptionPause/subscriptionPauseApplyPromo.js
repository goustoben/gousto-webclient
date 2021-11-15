import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import GoustoException from "utils/GoustoException"
import { subscriptionPauseProceed } from "actions/subscriptionPause/subscriptionPauseProceed"
import { subscriptionPauseLoadError } from "actions/subscriptionPause/subscriptionPauseLoadError"
import { userPromoApplyCode } from "actions/user/userPromoApplyCode"

export function subscriptionPauseApplyPromo(promo) {
    return async (dispatch, getState) => {
        dispatch(pending(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY, true))
        dispatch(error(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY, false))

        const errorPrefix = 'Subscription pause promo error:'

        try {
            const state = getState()
            let activeSteps
            let activeStep
            let promoCode

            try {
                const activeStepId = state.subscriptionPause.get('activeStepId')
                activeSteps = state.subscriptionPause.get('activeSteps')
                activeStep = activeSteps.get(activeStepId)
                promoCode = !promo && activeStep ? activeStep.getIn(['context', 'promocode']) : promo
            } catch (err) {
                throw new GoustoException(`${errorPrefix} data not available`, {
                    error: 'data-unavailable',
                })
            }

            if (!promoCode) {
                throw new GoustoException(`${errorPrefix} promo code cannot be determined`, {
                    error: 'no-promo-code-found',
                })
            }

            await dispatch(userPromoApplyCode(promoCode))

            dispatch(subscriptionPauseProceed('next', 'recovered', 'promo', promoCode))
        } catch (err) {
            dispatch(subscriptionPauseLoadError(err, actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY))
        } finally {
            dispatch(pending(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY, false))
        }
    }
}
