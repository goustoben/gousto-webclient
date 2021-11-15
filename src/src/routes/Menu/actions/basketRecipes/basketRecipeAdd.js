import { validateMenuLimitsForBasket } from "routes/Menu/selectors/menu"
import { getMenuRecipeIdForDetails } from "routes/Menu/selectors/menuRecipeDetails"
import { error } from "actions/status/error"
import { actionTypes } from "actions/actionTypes"
import { trackUserAddRemoveRecipe } from "actions/loggingmanager/trackUserAddRemoveRecipe"
import { menuRecipeDetailVisibilityChange } from "routes/Menu/actions/menuRecipeDetails/menuRecipeDetailVisibilityChange"

export const basketRecipeAdd = (recipeId, view, recipeInfo, maxRecipesNum, orderId) => (
    (dispatch, getState) => {
        const state = getState()
        const basketBreakingRules = {
            errorTitle: 'Oven Ready meals',
            recipeId,
            rules: validateMenuLimitsForBasket(state, recipeId)
        }
        const shouldCloseDetailsScreen = basketBreakingRules.rules.length && getMenuRecipeIdForDetails(state)

        if (shouldCloseDetailsScreen) {
            dispatch(menuRecipeDetailVisibilityChange())
        }

        if (basketBreakingRules.rules.length) {
            dispatch(error(actionTypes.BASKET_NOT_VALID, basketBreakingRules))

            return
        }

        dispatch(exports.validBasketRecipeAdd(recipeId, view, recipeInfo, maxRecipesNum, orderId))
        dispatch(trackUserAddRemoveRecipe())
    }
)
