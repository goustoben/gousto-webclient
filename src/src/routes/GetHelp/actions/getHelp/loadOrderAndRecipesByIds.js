import { getAccessToken } from "selectors/auth"
import { getOrder, getRecipes } from "routes/GetHelp/selectors/selectors"
import { fetchOrder } from "apis/orders/fetchOrder"
import { transformRecipesWithIngredients } from "routes/GetHelp/actions/transformers/recipeTransform"
import { asyncAndDispatch } from "routes/GetHelp/actions/utils"
import { actionTypes } from "routes/GetHelp/actions/actionTypes"
import { fetchRecipesWithIngredients } from "routes/GetHelp/apis/menu/fetchRecipesWithIngredients"

export const loadOrderAndRecipesByIds = (orderId) => (
    async (dispatch, getState) => {
        const state = getState()
        const accessToken = getAccessToken(state)

        const getPayload = async () => {
            let order = getOrder(state)
            let recipes = getRecipes(state)
            // recipeItems in the store is an array of recipe IDs
            let {recipeItems: recipeIds, recipeUuids} = order

            if (recipeIds.length === 0) {
                const response = await fetchOrder(accessToken, orderId)
                // copying the object so we do not mutate test's mocked response
                order = {...response.data}
                recipeIds = order.recipeItems.map(item => item.recipeId)
                recipeUuids = order.recipeItems.map(item => item.recipeUuid)
                order.recipeItems = recipeIds
            }

            if (!recipes.length) {
                const response = await fetchRecipesWithIngredients(recipeUuids)
                recipes = transformRecipesWithIngredients(response.data, response.included)
            }

            return {order, recipes}
        }

        await asyncAndDispatch({
            dispatch,
            actionType: actionTypes.GET_HELP_LOAD_ORDER_AND_RECIPES_BY_IDS,
            getPayload,
            errorMessage: `Failed to loadOrderAndRecipesByIds for orderId: ${orderId}`,
        })
    }
)
