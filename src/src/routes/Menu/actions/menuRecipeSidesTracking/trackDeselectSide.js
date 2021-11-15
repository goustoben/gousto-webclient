import { actionTypes } from "actions/actionTypes"

export const trackDeselectSide = (recipeId, variantRecipeId, screenName) => ({
    type: actionTypes.TRACKING,
    trackingData: {
        actionType: 'deselect_side',
        recipe_id: recipeId,
        variant_recipe_id: variantRecipeId,
        screen_name: screenName
    }
})
