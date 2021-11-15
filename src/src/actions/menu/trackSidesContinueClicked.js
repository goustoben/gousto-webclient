import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { sideEventScreens } from "actions/menu/sideEventScreens"
import { sideEventTypes } from "actions/menu/sideEventTypes"

export const trackSidesContinueClicked = (sidesIds, sidesTotalSurcharge, totalNumberOfSides) => ({
  type: actionTypes.TRACK_CONTINUE_WITH_SIDES_CLICKED,
  trackingData: {
    event_name: trackingKeys.sideModalSidesContinueClicked,
    event_screen: sideEventScreens.orderSidesScreen,
    event_type: sideEventTypes.primaryAction,
    sides_ids: sidesIds,
    sides_total_surcharge: sidesTotalSurcharge,
    sides_counts: totalNumberOfSides
  }
})
