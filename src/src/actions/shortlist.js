import { shortlistLimitReached } from 'utils/basket'
import actionTypes from './actionTypes'
import { getCurrentCollectionId } from '../selectors/filters'

export const shortlistRecipeAdd = (recipeId, force, recipeInfo) => (
  (dispatch, getState) => {
    const { basket, menuRecipes, menuRecipeStock } = getState()
    let shortList = basket.get('shortlist')
    const numPortions = basket.get('numPortions')

    if (force) {
      dispatch({
        type: actionTypes.SHORTLIST_RECIPE_ADD,
        recipeId,
        ...recipeInfo
      })

      const reachedLimit = shortlistLimitReached(shortList, menuRecipes, menuRecipeStock, numPortions)
      dispatch({
        type: actionTypes.SHORTLIST_LIMIT_REACHED,
        shortlistLimitReached: reachedLimit,
      })
    } else {
      let reachedLimit = shortlistLimitReached(shortList, menuRecipes, menuRecipeStock, numPortions)

      if (!reachedLimit) {
        if (recipeInfo) {
          Object.assign(recipeInfo, { collection: getCurrentCollectionId(getState()) })
        }

        dispatch({
          type: actionTypes.SHORTLIST_RECIPE_ADD,
          recipeId,
          ...recipeInfo
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
