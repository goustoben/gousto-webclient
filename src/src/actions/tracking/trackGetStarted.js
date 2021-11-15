import { getUTMAndPromoCode } from "selectors/tracking"
import * as trackingKeys from "actions/trackingKeys"

export const trackGetStarted = (section) => (dispatch, getState) => {
    const {promoCode, UTM} = getUTMAndPromoCode(getState())
    const type = trackingKeys.clickGetStarted

    dispatch({
        type,
        trackingData: {
            actionType: type,
            section,
            ...UTM,
            promoCode
        }
    })
}
