import { limitReached } from "utils/basket"
import { isOutOfStock } from "routes/Menu/selectors/recipe"
import { getCurrentCollectionId } from "routes/Menu/selectors/collections"
import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { pricingRequest } from "actions/pricing/pricingRequest"
import { getUTMAndPromoCode } from "selectors/tracking"
import { sendClientMetric } from "routes/Menu/apis/clientMetrics/sendClientMetric"

export const validBasketRecipeAdd = (recipeId, view, recipeInfo, maxRecipesNum, orderId) => (
    (dispatch, getState) => {
        const state = getState()
        const {basket, menuRecipeStock, menuRecipes} = state
        const numPortions = basket.get('numPortions')

        let reachedLimit = limitReached(basket, menuRecipes, menuRecipeStock, undefined, maxRecipesNum)
        const outOfStock = isOutOfStock(recipeId, numPortions, menuRecipeStock)
        if (reachedLimit || outOfStock) {
            return
        }

        const collection = getCurrentCollectionId(state)
        if (recipeInfo) {
            Object.assign(recipeInfo, {collection})
        }

        if (!orderId && !basket.get('hasAddedFirstRecipe')) {
            sendClientMetric('menu-first-recipe-add', 1, 'Count')
        }

        dispatch({
            type: actionTypes.BASKET_RECIPE_ADD,
            recipeId,
            ...recipeInfo,
            orderId,
            trackingData: {
                actionType: trackingKeys.addRecipe,
                recipeId,
                view,
                position: recipeInfo && recipeInfo.position,
                collection,
                recipe_count: basket.get('recipes').size + 1,// The action is performed in the same time so the size is not updated yet
            },
        })

        dispatch({
            type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
            stock: {
                [recipeId]: {
                    [numPortions]: -1,
                },
            },
        })

        const {basket: newBasket, menuRecipes: newMenuRecipes, menuRecipeStock: newMenuRecipeStock} = getState()
        reachedLimit = limitReached(newBasket, newMenuRecipes, newMenuRecipeStock, undefined, maxRecipesNum)
        if (reachedLimit) {
            dispatch({
                type: actionTypes.BASKET_LIMIT_REACHED,
                limitReached: reachedLimit,
                trackingData: {
                    actionType: trackingKeys.basketLimit,
                    limitReached: reachedLimit,
                    view,
                    source: actionTypes.RECIPE_ADDED,
                },
            })
        }

        dispatch(pricingRequest())

        const prevRecipes = basket.get('recipes')
        const slotId = newBasket.get('slotId')
        const recipes = newBasket.get('recipes')
        const {promoCode, UTM} = getUTMAndPromoCode(state)

        let recipesCount = 0

        recipes.forEach(count => {
            recipesCount += count
        })

        if (prevRecipes.size < 2 && recipesCount > 1 && slotId) {
            dispatch({
                type: actionTypes.BASKET_ELIGIBLE_TRACK,
                trackingData: {
                    actionType: trackingKeys.basketEligible,
                    ...UTM,
                    promoCode,
                    recipes,
                },
            })
        }
    }
)
