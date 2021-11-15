import { getCurrentCollectionId } from "routes/Menu/selectors/collections"
import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { limitReached } from "utils/basket"
import { pricingRequest } from "actions/pricing/pricingRequest"
import { trackUserAddRemoveRecipe } from "actions/loggingmanager/trackUserAddRemoveRecipe"

export const basketRecipeRemove = (recipeId, view, position) => (
    (dispatch, getState) => {
        let state = getState()
        const {basket} = state
        const collection = getCurrentCollectionId(state)
        dispatch({
            type: actionTypes.BASKET_RECIPE_REMOVE,
            recipeId,
            trackingData: {
                actionType: trackingKeys.removeRecipe,
                recipeId,
                view,
                position,
                collection,
                recipe_count: basket.get('recipes').size - 1,// The action is performed in the same time so the size is not updated yet
            },
        })

        const numPortions = getState().basket.get('numPortions')
        dispatch({
            type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
            stock: {[recipeId]: {[numPortions]: 1}},
        })

        state = getState()
        const reachedLimit = limitReached(state.basket, state.menuRecipes, state.menuRecipeStock)
        if (!reachedLimit) {
            dispatch({
                type: actionTypes.BASKET_LIMIT_REACHED,
                limitReached: reachedLimit,
                trackingData: {
                    actionType: trackingKeys.basketLimit,
                    limitReached: reachedLimit,
                    view,
                    source: actionTypes.RECIPE_REMOVED,
                },
            })
        }

        dispatch(pricingRequest())
        dispatch(trackUserAddRemoveRecipe())
    }
)
