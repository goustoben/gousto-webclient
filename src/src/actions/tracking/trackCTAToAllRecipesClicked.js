import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export const trackCTAToAllRecipesClicked = () => (
    (dispatch) => {
        dispatch({
            type: actionTypes.TRACKING_CTA_TO_ALL_RECIPES_CLICKED,
            trackingData: {
                actionType: trackingKeys.clickAllRecipes,
            }
        })
    }
)
