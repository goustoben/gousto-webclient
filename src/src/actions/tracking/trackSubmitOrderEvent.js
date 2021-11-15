import { getUTMAndPromoCode } from "selectors/tracking"
import { getCurrentPaymentMethod } from "selectors/payment"
import * as trackingKeys from "actions/trackingKeys"

export const trackSubmitOrderEvent = () => (dispatch, getState) => {
    const state = getState()
    const {promoCode, UTM} = getUTMAndPromoCode(state)
    const paymentMethod = getCurrentPaymentMethod(state)
    const type = trackingKeys.clickSubmitOrder

    dispatch({
        type,
        trackingData: {
            actionType: type,
            ...UTM,
            promoCode,
            paymentMethod,
        }
    })
}
