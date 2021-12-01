import { actionTypes, trackingKeys } from './actionTypes'
import { getOrderId } from '../selectors/selectors'
import { getSelectedRecipeCards } from '../selectors/recipesSelectors'
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

export const trackPrintedRecipeCardClickRecipe = () => (dispatch, getState) => {
  const state = getState()
  const recipeIds = getSelectedRecipeCards(state)

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: trackingKeys.ssrPrintedRecipeCardsClickRecipe,
      no_of_recipe_cards: recipeIds.length,
      seCategory: SE_CATEGORY_HELP,
    }
  })
}

export const trackPrintedRecipeCardClickDone = () => (dispatch, getState) => {
  const state = getState()
  const orderId = getOrderId(state)
  const recipeIds = getSelectedRecipeCards(state)

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: trackingKeys.ssrPrintedRecipeCardsClickDone,
      order_id: orderId,
      no_of_recipe_cards: recipeIds.length,
      seCategory: SE_CATEGORY_HELP,
    }
  })
}

export const trackPrintedRecipeCardClickCookbook = () => (dispatch, getState) => {
  const state = getState()
  const orderId = getOrderId(state)
  const recipeIds = getSelectedRecipeCards(state)

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: trackingKeys.ssrPrintedRecipeCardsClickCookbook,
      order_id: orderId,
      no_of_recipe_cards: recipeIds.length,
      seCategory: SE_CATEGORY_HELP,
    }
  })
}
