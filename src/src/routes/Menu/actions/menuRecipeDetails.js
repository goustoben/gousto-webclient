import { push } from 'react-router-redux'
import { actionTypes } from '../../../actions/actionTypes'
import * as trackingKeys from '../../../actions/trackingKeys'
import { getMenuRecipeIdForDetails } from '../selectors/menuRecipeDetails'
import { replaceSideRecipeIdWithBaseRecipeId } from '../selectors/recipeList'
import { locationQuery, locationBeforeTransitions } from '../../../selectors/routing'

export const menuRecipeDetailVisibilityChange = (recipeId, categoryId) =>
  (dispatch, getState) => {
    const { recipes } = getState()
    if (recipeId && !recipes.get(recipeId, null)) {
      return
    }

    // If the recipe is a side, then get the base recipe id associated with it and display that instead.
    const baseRecipeId = replaceSideRecipeIdWithBaseRecipeId(getState(), { recipeId })

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

export const showDetailRecipe = (recipeId, categoryIds) =>
  (dispatch, getState) => {
    const { boxSummaryShow } = getState()

    if (!boxSummaryShow.get('show')) {
      menuRecipeDetailVisibilityChange(recipeId, categoryIds)(dispatch, getState)
    }
  }

export const checkQueryParams = () => (dispatch, getState) => {
  const prevLoc = locationBeforeTransitions(getState())
  const queryParams = locationQuery(getState())
  const recipeId = queryParams.recipeDetailId

  if (recipeId) {
    delete queryParams.recipeDetailId
    const newLoc = { ...prevLoc, query: queryParams }
    dispatch(push(newLoc))
    dispatch(exports.showDetailRecipe(recipeId))
  }
}
