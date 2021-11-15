import { getUTMAndPromoCode } from "selectors/tracking"
import * as trackingKeys from "actions/trackingKeys"

export const trackDiscountVisibilityBannerAppearance = (wizardStep) => (dispatch, getState) => {
    const {UTM, promoCode} = getUTMAndPromoCode(getState())
    const type = trackingKeys.discountVisibilityBannerDisplayed

    dispatch({
        type,
        trackingData: {
            actionType: type,
            ...UTM,
            promoCode,
            step: wizardStep
        }
    })
}
