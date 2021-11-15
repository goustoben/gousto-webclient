import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { sideEventTypes } from "actions/menu/sideEventTypes"

export const trackCancelSide = () =>
  ({
    type: actionTypes.TRACK_ORDER_SIDES_CANCEL,
    trackingData: {
      event_name: trackingKeys.sideModalOrderSidesCancel,
      event_type: sideEventTypes.closeScreen
    }
  })
