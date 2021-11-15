import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { getUTMAndPromoCode } from "selectors/tracking"
import { boxSummaryDeliveryDaysLoad } from "actions/boxSummary/boxSummaryDeliveryDaysLoad"

export const basketPostcodeChange = (postcode, forgetPrevPostcode = false) => (
  async (dispatch, getState) => {
    const trimmedPostcode = postcode.trim()
    if (postcode) {
      dispatch({
        type: actionTypes.BASKET_POSTCODE_CHANGE,
        postcode: trimmedPostcode,
        forgetPrevPostcode,
        trackingData: {
          actionType: trackingKeys.changeBasketPostcode,
          postcode: trimmedPostcode,
        },
      })
      dispatch({
        type: actionTypes.BASKET_POSTCODE_PENDING,
        pending: true,
      })
      await dispatch(boxSummaryDeliveryDaysLoad())
      dispatch({
        type: actionTypes.BASKET_POSTCODE_PENDING,
        pending: false,
      })

      const {promoCode, UTM} = getUTMAndPromoCode(getState())
      dispatch({
        type: actionTypes.BASKET_SELECT_POSTCODE,
        trackingData: {
          actionType: trackingKeys.selectPostcode,
          ...UTM,
          promoCode,
          postcode: trimmedPostcode,
        },
      })
    }
  }
)
