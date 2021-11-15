import { getUTMAndPromoCode } from "selectors/tracking"
import * as trackingKeys from "actions/trackingKeys"
import { getPreviewOrderId } from "selectors/basket"

export const trackUnexpectedSignup = () => (dispatch, getState) => {
    const state = getState()
    const {user} = state
    const {promoCode, UTM} = getUTMAndPromoCode(getState())
    const type = trackingKeys.unexpectedSignup

    dispatch({
        type,
        trackingData: {
            actionType: type,
            ...UTM,
            promoCode,
            orderId: getPreviewOrderId(state),
            userId: user.get('id'),
        }
    })
}
