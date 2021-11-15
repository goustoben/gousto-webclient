import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export const trackingUnavailableRecipeList = (unavailableRecipeList) => ({
    type: actionTypes.TRACKING_UNAVAILABLE_RECIPE_LIST,
    trackingData: {
        actionType: trackingKeys.unavailableRecipeList,
        unavailableRecipeList: unavailableRecipeList.keySeq().toArray()
    }
})
