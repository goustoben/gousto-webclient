import { shortlistLimitReached } from 'utils/basket'
import actionTypes from './actionTypes'

export const shortlistRecipeAdd = (recipeId, force) => (
  (dispatch) => {

    if (force) {

      dispatch({
        type: actionTypes.SHORTLIST_RECIPE_ADD,
        recipeId
      })
      const reachedLimit = shortlistLimitReached()
      dispatch({
        type: actionTypes.SHORTLIST_LIMIT_REACHED,
        limitReached: reachedLimit,
      })
    } else {
      let reachedLimit = shortlistLimitReached()

      if (!reachedLimit) {
        dispatch({
          type: actionTypes.SHORTLIST_RECIPE_ADD,
          recipeId,
        })

        reachedLimit = shortlistLimitReached()
        if (reachedLimit) {
          dispatch({
            type: actionTypes.SHORTLIST_LIMIT_REACHED,
            limitReached: reachedLimit,
          })
        }
      }
    }
  }
)
