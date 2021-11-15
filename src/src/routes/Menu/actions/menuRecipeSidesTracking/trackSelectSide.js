import { actionTypes } from "actions/actionTypes"

export const trackSelectSide = (recipeId, variantRecipeId, screenName) => ({
    type: actionTypes.TRACKING,
    trackingData: {
        actionType: 'select_side',
        recipe_id: recipeId,
        variant_recipe_id: variantRecipeId,
        screen_name: screenName
    }
})
