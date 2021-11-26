import { actionTypes, trackingKeys } from './actionTypes'
import { getOrderId, getSelectedRecipeCards } from '../selectors/selectors'
import { SE_CATEGORY_HELP } from './getHelp'

export const trackContinueToRecipeCardsIssues = () => (dispatch, getState) => {
  const state = getState()
  const orderId = getOrderId(state)
  const recipeIds = getSelectedRecipeCards(state)

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: trackingKeys.ssrPrintedRecipeCardsContinue,
      order_id: orderId,
      recipe_ids: recipeIds,
      no_of_recipe_cards: recipeIds.length,
      seCategory: SE_CATEGORY_HELP,
    }
  })
}

export const setSelectedRecipeCards = (recipeIds) => ({
  type: actionTypes.GET_HELP_SET_SELECTED_RECIPE_CARDS,
  payload: {
    recipeIds
  }
})
