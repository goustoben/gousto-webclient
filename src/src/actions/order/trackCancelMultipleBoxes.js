import { actionTypes } from "actions/actionTypes"
import { osrOrdersSkipped } from "actions/trackingKeys"

export const trackCancelMultipleBoxes = (orderIds = []) => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: osrOrdersSkipped,
    orders_skipped: orderIds
  }
})
