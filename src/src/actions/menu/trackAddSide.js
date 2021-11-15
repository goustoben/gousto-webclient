import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export const trackAddSide = (sideId, orderId) =>
  ({
    type: actionTypes.TRACK_ADD_SIDE,
    trackingData: {
      event_name: trackingKeys.sideModalAddSide,
      side_id: sideId,
      order_id: orderId,
    }
  })
