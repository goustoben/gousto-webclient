import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { menuRecipeMapper } from "apis/transformers/recipes"
import logger from "utils/logger"
import { fetchRecipesFromMenu } from "apis/recipes/fetchRecipesFromMenu"

export const recipesLoadFromMenuRecipesById = (recipeIds = []) => (
  async (dispatch, getState) => {
    const actionType = actionTypes.RECIPES_RECEIVE
    const newRecipeIds = recipeIds.filter(recipeId => !getState().recipes.has(recipeId)).sort()
    const recipeCount = newRecipeIds.length

    if (recipeCount) {
      dispatch(pending(actionType, true))
      try {
        const params = {
          recipeIds: (recipeIds || newRecipeIds).join(','),
        }
        const accessToken = getState().auth.get('accessToken')
        const {data: recipes} = await fetchRecipesFromMenu(accessToken, params)
        dispatch({type: actionType, recipes: menuRecipeMapper(recipes)})
      } catch (err) {
        dispatch(error(actionType, err.message))
        logger.error(err)
      } finally {
        dispatch(pending(actionType, false))
      }
    }
  }
)
