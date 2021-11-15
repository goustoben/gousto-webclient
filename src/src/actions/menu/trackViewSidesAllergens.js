import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { sideEventScreens } from "actions/menu/sideEventScreens"
import { sideEventTypes } from "actions/menu/sideEventTypes"

export const trackViewSidesAllergens = () =>
  ({
    type: actionTypes.TRACK_VIEW_ORDER_SIDES_ALLERGENS_SCREEN,
    trackingData: {
      event_name: trackingKeys.sideModalViewOrderSidesAllergensScreen,
      event_screen: sideEventScreens.orderSidesScreen,
      event_type: sideEventTypes.tertiaryAction
    }
  })
