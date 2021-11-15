import { getUTMAndPromoCode } from "selectors/tracking"
import { getCurrentPaymentMethod } from "selectors/payment"
import { getPreviewOrderId } from "selectors/basket"
import { getIsDecoupledPaymentEnabled } from "selectors/features"
import * as trackingKeys from "actions/trackingKeys"

export const trackSubscriptionCreated = () => (dispatch, getState) => {
    const state = getState()
    const {UTM} = getUTMAndPromoCode(state)
    const promoCode = state.pricing.get('prices').get('promoCode')
    const paymentMethod = getCurrentPaymentMethod(state)
    const orderId = getPreviewOrderId(state)
    const userId = state.user.get('id')
    const subscriptionId = state.user.get('subscription').get('id')
    const type = getIsDecoupledPaymentEnabled(state)
        ? trackingKeys.subscriptionCreatedDecoupling
        : trackingKeys.subscriptionCreated

    dispatch({
        type,
        trackingData: {
            actionType: type,
            promoCode,
            ...UTM,
            paymentMethod,
            userId,
            orderId,
            subscriptionId,
        }
    })
}
