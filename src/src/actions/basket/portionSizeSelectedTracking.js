import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export const portionSizeSelectedTracking = (numPortion, orderId) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.PORTION_SIZE_SELECTED_TRACKING,
      trackingData: {
        actionType: trackingKeys.selectPortionSize,
        num_portion: numPortion,
        order_id: orderId || null,
      },
    })
  }
)
