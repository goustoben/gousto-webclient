import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { sideEventScreens } from "actions/menu/sideEventScreens"
import { sideEventTypes } from "actions/menu/sideEventTypes"

export const trackCloseSidesAllergens = () => ({
  type: actionTypes.TRACK_CLOSE_ORDER_SIDES_ALLERGENS_SCREEN,
  trackingData: {
    event_name: trackingKeys.sideModalClose,
    event_screen: sideEventScreens.orderSidesAllergensScreen,
    event_type: sideEventTypes.closeScreen
  }
})
