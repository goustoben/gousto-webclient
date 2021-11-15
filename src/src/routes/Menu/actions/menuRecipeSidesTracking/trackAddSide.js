import { actionTypes } from "actions/actionTypes"

export const trackAddSide = (recipeId, variantRecipeId) => ({
    type: actionTypes.TRACKING,
    trackingData: {
        actionType: 'add_side',
        recipe_id: recipeId,
        variant_recipe_id: variantRecipeId
    }
})
