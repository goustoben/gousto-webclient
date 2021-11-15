import { replaceSideRecipeIdWithBaseRecipeId } from "routes/Menu/selectors/recipeList"
import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { getMenuRecipeIdForDetails } from "routes/Menu/selectors/menuRecipeDetails"

export const menuRecipeDetailVisibilityChange = (recipeId, categoryId) =>
    (dispatch, getState) => {
        const {recipes} = getState()
        if (recipeId && !recipes.get(recipeId, null)) {
            return
        }

        // If the recipe is a side, then get the base recipe id associated with it and display that instead.
        const baseRecipeId = replaceSideRecipeIdWithBaseRecipeId(getState(), {recipeId})

        dispatch({
            type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
            recipeId: baseRecipeId,
            categoryId,
            trackingData: {
                actionType: trackingKeys.changeMenuRecipeDetailVisibility,
                recipeId: baseRecipeId || getMenuRecipeIdForDetails(getState()),
                show: Boolean(baseRecipeId),
            },
        })
    }
