import { actionTypes } from "actions/actionTypes"

export const trackCloseSide = (recipeId) => ({
    type: actionTypes.TRACKING,
    trackingData: {
        actionType: 'close_side',
        recipe_id: recipeId,
    }
})
