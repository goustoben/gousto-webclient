import { menuRecipeDetailVisibilityChange } from "routes/Menu/actions/menuRecipeDetails/menuRecipeDetailVisibilityChange"

export const showDetailRecipe = (recipeId, categoryIds) =>
    (dispatch, getState) => {
        const {boxSummaryShow} = getState()

        if (!boxSummaryShow.get('show')) {
            menuRecipeDetailVisibilityChange(recipeId, categoryIds)(dispatch, getState)
        }
    }
