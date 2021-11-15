import { getUTMAndPromoCode } from "selectors/tracking"
import * as trackingKeys from "actions/trackingKeys"
import { translateCheckoutErrorToMessageCode } from "utils/checkout"

export const trackCheckoutError = (errorName, errorValue, initiator) => (dispatch, getState) => {
    const {UTM, promoCode} = getUTMAndPromoCode(getState())
    const actionType = trackingKeys.checkoutError

    const messageCode = translateCheckoutErrorToMessageCode(errorName, errorValue)

    dispatch({
        type: actionType,
        trackingData: {
            actionType,
            ...UTM,
            promoCode,
            initiator,
            errorName,
            errorValue,
            messageCode,
        }
    })
}
