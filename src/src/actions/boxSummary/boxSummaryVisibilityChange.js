import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { okRecipes } from "utils/basket"
import { basketRecipeRemove } from "routes/Menu/actions/basketRecipes/basketRecipeRemove"

export const boxSummaryVisibilityChange = (show) => (
    (dispatch, getState) => {
        dispatch({
            type: actionTypes.BOXSUMMARY_VISIBILITY_CHANGE,
            show,
            trackingData: {
                actionType: trackingKeys.changeBoxSummaryVisibility,
                show,
            },
        })
        if (!show) {
            const state = getState()
            const recipes = state.basket.get('recipes')
            const okRecipeIds = okRecipes(recipes, state.menuRecipes, state.menuRecipeStock, state.basket.get('numPortions'))
            recipes
                .filter((amount, recipeId) => !okRecipeIds.has(recipeId))
                .forEach((amount, recipeId) => {
                    for (let x = 0; x < amount; x++) {
                        dispatch(basketRecipeRemove(recipeId))
                    }
                })
        }
    }
)
