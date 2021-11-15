import { getUTMAndPromoCode } from "selectors/tracking"
import * as trackingKeys from "actions/trackingKeys"

export const trackCheckoutNavigationLinks = (checkoutStep) => (dispatch, getState) => {
    const {UTM, promoCode} = getUTMAndPromoCode(getState())
    // eslint-disable-next-line import/namespace
    const type = trackingKeys[`click${checkoutStep}Breadcrumb`]

    dispatch({
        type,
        trackingData: {
            actionType: type,
            ...UTM,
            promoCode
        }
    })
}
