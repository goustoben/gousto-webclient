import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import logger from "utils/logger"
import { fetchRecipes } from "apis/recipes/fetchRecipes"

export const recipesLoadRecipesById = (recipeIds = [], isCookbook) => (
  async (dispatch, getState) => {
    const actionType = isCookbook ? actionTypes.COOKBOOK_RECIPES_RECEIVE : actionTypes.RECIPES_RECEIVE
    const newRecipeIds = recipeIds.filter(recipeId => !getState().recipes.has(recipeId)).sort()
    const recipeCount = newRecipeIds.length

    if (recipeCount) {
      dispatch(pending(actionType, true))
      try {
        const params = {
          includes: ['ingredients', 'allergens', 'taxonomy'],
          'filters[recipe_ids]': isCookbook ? recipeIds : newRecipeIds,
        }
        const accessToken = getState().auth.get('accessToken')
        const {data: recipes} = await fetchRecipes(accessToken, '', params)

        dispatch({type: actionType, recipes})
      } catch (err) {
        dispatch(error(actionType, err.message))
        logger.error(err)
      } finally {
        dispatch(pending(actionType, false))
      }
    }
  }
)
