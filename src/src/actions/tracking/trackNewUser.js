import { getUTMAndPromoCode } from "selectors/tracking"
import { getCurrentPaymentMethod } from "selectors/payment"
import { getNewRecordStatus } from "actions/tracking/getNewRecordStatus"
import * as trackingKeys from "actions/trackingKeys"

export const trackNewUser = (userId) => (dispatch, getState) => {
    const state = getState()
    const {UTM, promoCode} = getUTMAndPromoCode(state)
    const paymentMethod = getCurrentPaymentMethod(state)
    const status = getNewRecordStatus(userId)
    const type = trackingKeys.createUser

    dispatch({
        type,
        trackingData: {
            actionType: type,
            promoCode,
            ...UTM,
            paymentMethod,
            userId,
            status,
        }
    })
}
