import { getUTMAndPromoCode } from "selectors/tracking"
import * as trackingKeys from "actions/trackingKeys"

export const trackClickBuildMyBox = (boxSize, destination) => (dispatch, getState) => {
    const {UTM, promoCode} = getUTMAndPromoCode(getState())
    const type = trackingKeys.clickBuildMyBox

    dispatch({
        type,
        trackingData: {
            actionType: type,
            promoCode,
            ...UTM,
            boxSize,
            destination
        }
    })
}
