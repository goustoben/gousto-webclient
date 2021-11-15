import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export const trackVariantListDisplay = (view) => ({
  type: actionTypes.TRACK_VARIANT_RECIPE_LIST_DISPLAY,
  trackingData: {
    actionType: trackingKeys.recipeVariantActionSheet,
    view
  }
})
