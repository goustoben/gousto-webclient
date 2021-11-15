import { actionTypes } from "actions/actionTypes"

export const trackNoSide = (recipeId) => ({
    type: actionTypes.TRACKING,
    trackingData: {
        actionType: 'no_side',
        recipe_id: recipeId,
    }
})
