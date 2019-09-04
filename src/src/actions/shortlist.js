import { shortlistLimitReached } from 'utils/basket'
import { basketRecipeRemove } from 'actions/basket'
import actionTypes from './actionTypes'
import { getCurrentCollectionId } from '../selectors/filters'

export const shortlistRecipeAdd = (recipeId, force, recipeInfo) => (
  (dispatch, getState) => {
    const { basket, menuRecipes, menuRecipeStock } = getState()
    let shortList = basket.get('shortlist')
    let reachedLimit
    const numPortions = basket.get('numPortions')

    if (force) {
      dispatch({
        type: actionTypes.SHORTLIST_RECIPE_ADD,
        recipeId,
        ...recipeInfo
      })

      reachedLimit = shortlistLimitReached(shortList, menuRecipes, menuRecipeStock, numPortions)
      dispatch({
        type: actionTypes.SHORTLIST_LIMIT_REACHED,
        shortlistLimitReached: reachedLimit,
      })
    } else {
      reachedLimit = shortlistLimitReached(shortList, menuRecipes, menuRecipeStock, numPortions)

      if (!reachedLimit) {
        if (recipeInfo) {
          Object.assign(recipeInfo, { collection: getCurrentCollectionId(getState()) })
        }

        dispatch({
          type: actionTypes.SHORTLIST_RECIPE_ADD,
          recipeId,
          ...recipeInfo
        })
        if (getState().basket.hasIn(['recipes', recipeId])) {
          const numberOfRecipesInBasket = getState().basket.getIn(['recipes', recipeId])
          for (let idx = 0; idx < numberOfRecipesInBasket; idx++) {

            basketRecipeRemove(recipeId, '', force)(dispatch, getState)
          }
        }

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

export const shortlistRecipeRemove = (recipeId) => (
  (dispatch, getState) => {
    const { basket, menuRecipes, menuRecipeStock } = getState()
    let shortList = basket.get('shortlist')
    const numPortions = basket.get('numPortions')
    dispatch({
      type: actionTypes.SHORTLIST_RECIPE_REMOVE,
      recipeId
    })

    shortList = getState().basket.get('shortlist')
    const reachedLimit = shortlistLimitReached(shortList, menuRecipes, menuRecipeStock, numPortions)
    if (!reachedLimit) {
      dispatch({
        type: actionTypes.SHORTLIST_LIMIT_REACHED,
        shortlistLimitReached: reachedLimit
      })
    }
  }
)

export const shortlistRecipesClear = () => ({
  type: actionTypes.SHORTLIST_RECIPES_CLEAR,
})

export const shortlistRecipesPositionClear = () => ({
  type: actionTypes.SHORTLIST_RECIPES_POSITIONS_CLEAR,
})
