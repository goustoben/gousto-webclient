import { shortlistLimitReached } from 'utils/basket'
import actionTypes from './actionTypes'

export const shortlistRecipeAdd = (recipeId, force) => (
  (dispatch, getState) => {
    const { basket, menuRecipes, menuRecipeStock } = getState()
    let shortList = basket.get('shortlist')
    const numPortions = basket.get('numPortions')

    if (force) {
      dispatch({
        type: actionTypes.SHORTLIST_RECIPE_ADD,
        recipeId
      })
      const reachedLimit = shortlistLimitReached(shortList, menuRecipes, menuRecipeStock, numPortions)
      dispatch({
        type: actionTypes.SHORTLIST_LIMIT_REACHED,
        shortlistLimitReached: reachedLimit,
      })
    } else {
      let reachedLimit = shortlistLimitReached(shortList, menuRecipes, menuRecipeStock, numPortions)

      if (!reachedLimit) {
        dispatch({
          type: actionTypes.SHORTLIST_RECIPE_ADD,
          recipeId,
        })

        shortList = getState().basket.get('shortlist')
        reachedLimit = shortlistLimitReached(shortList, menuRecipes, menuRecipeStock, numPortions)

        if (reachedLimit) {
          dispatch({
            type: actionTypes.SHORTLIST_LIMIT_REACHED,
            shortlistLimitReached: reachedLimit,
          })
        }
      }
    }
  }
)
