import { push } from 'react-router-redux'
import { actionTypes } from '../../../actions/actionTypes'
import * as trackingKeys from '../../../actions/trackingKeys'
import { getMenuRecipeIdForDetails } from '../selectors/menuRecipeDetails'
import { locationQuery, locationBeforeTransitions } from '../../../selectors/routing'

export const menuRecipeDetailVisibilityChange = (recipeId, isViewMoreDetailsClicked) =>
  (dispatch, getState) => {
    const { recipes } = getState()
    if (recipeId && !recipes.get(recipeId, null)) {
      return
    }

    dispatch({
      type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
      recipeId,
      trackingData: {
        actionType: trackingKeys.changeMenuRecipeDetailVisibility,
        recipeId: recipeId || getMenuRecipeIdForDetails(getState()),
        show: Boolean(recipeId),
      },
    })

    if (isViewMoreDetailsClicked) {
      dispatch({
        type: actionTypes.TRACKING_VIEW_RECIPE_DETAILS,
        trackingData: {
          actionType: 'View Details clicked',
        }
      })
    }
  }

export const showDetailRecipe = (recipeId, isViewMoreDetailsClicked) =>
  (dispatch, getState) => {
    const { boxSummaryShow } = getState()

    if (!boxSummaryShow.get('show')) {
      menuRecipeDetailVisibilityChange(recipeId, isViewMoreDetailsClicked)(dispatch, getState)
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
