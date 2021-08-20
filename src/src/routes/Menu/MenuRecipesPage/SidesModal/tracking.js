import { snowplowTrackEvent } from 'routes/Menu/apis/_utils'
import * as trackingKeys from 'actions/trackingKeys'

// Tracking
const sideEventScreens = {
  orderSidesScreen: 'order_sides_screen',
  orderSidesAllergensScreen: 'order_sides_allergens_screen'
}

const sideEventTypes = {
  primaryAction: 'primary_action',
  screenView: 'screen_view',
  closeScreen: 'close_screen',
  tertiaryAction: 'tertiary_action',
}

export const trackSidesContinueClicked = (sidesIds, sidesTotalSurcharge, totalNumberOfSides) => {
  snowplowTrackEvent({
    name: trackingKeys.sideModalSidesContinueClicked,
    screen: sideEventScreens.orderSidesScreen,
    type: sideEventTypes.primaryAction,
    properties: {
      sides_ids: sidesIds,
      sides_total_surcharge: sidesTotalSurcharge,
      sides_counts: totalNumberOfSides
    }
  })
}

export const trackAddSide = (sideId, orderId) => {
  snowplowTrackEvent({
    name: trackingKeys.sideModalAddSide,
    properties: {
      side_id: sideId,
      order_id: orderId,
    },
  })
}

export const trackCloseSidesAllergens = () => {
  snowplowTrackEvent({
    name: trackingKeys.sideModalClose,
    screen: sideEventScreens.orderSidesAllergensScreen,
    type: sideEventTypes.closeScreen
  })
}

export const trackViewSidesAllergens = () => {
  snowplowTrackEvent({
    name: trackingKeys.sideModalViewOrderSidesAllergensScreen,
    screen: sideEventScreens.orderSidesScreen,
    type: sideEventTypes.tertiaryAction
  })
}
