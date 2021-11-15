import { getUTMAndPromoCode } from "selectors/tracking"
import * as trackingKeys from "actions/trackingKeys"

export const trackUTMAndPromoCode = (keyType, additionalData = {}) => (dispatch, getState) => {
    const {promoCode, UTM} = getUTMAndPromoCode(getState())
    // eslint-disable-next-line import/namespace
    const type = trackingKeys[keyType] || keyType

    dispatch({
        type,
        trackingData: {
            actionType: type,
            ...additionalData,
            ...UTM,
            promoCode,
        }
    })
}
