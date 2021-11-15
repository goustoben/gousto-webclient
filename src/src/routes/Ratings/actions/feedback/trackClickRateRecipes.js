import * as trackingKeys from "actions/trackingKeys"

export const trackClickRateRecipes = (location) => (dispatch) => {
    const type = trackingKeys.clickRateRecipes

    dispatch({
        type,
        trackingData: {
            actionType: type,
            location
        }
    })
}
