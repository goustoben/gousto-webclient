import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { actionTypes } from 'actions/actionTypes'
import { trackUserAddRemoveRecipe } from 'actions/loggingmanager'
import * as trackingKeys from 'actions/trackingKeys'
import { useCurrentCollectionId } from 'routes/Menu/domains/collections'
import { getBasketRecipes } from 'selectors/basket'

import { useRecipeLimitReached } from '../limits'
import { useNumPortions } from '../useNumPortions'

export type RemoveRecipeFn = ReturnType<typeof useRemoveRecipe>
export const useRemoveRecipe = () => {
  const { numPortions } = useNumPortions()
  const menuRecipes = useSelector(getBasketRecipes)
  const reachedLimit = useRecipeLimitReached(menuRecipes)

  const collection = useCurrentCollectionId()
  const dispatch = useDispatch()

  return useCallback(
    (recipeId: string, view?: string, position?: string) => {
      dispatch({
        type: actionTypes.BASKET_RECIPE_REMOVE,
        recipeId,
        trackingData: {
          actionType: trackingKeys.removeRecipe,
          recipeId,
          view,
          position,
          collection,
          recipe_count: menuRecipes.size - 1, // The action is performed in the same time so the size is not updated yet
        },
      })

      dispatch({
        type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
        stock: { [recipeId]: { [numPortions]: 1 } },
      })

      if (!reachedLimit) {
        dispatch({
          type: actionTypes.BASKET_LIMIT_REACHED,
          limitReached: reachedLimit,
          trackingData: {
            actionType: trackingKeys.basketLimit,
            limitReached: reachedLimit,
            view,
            source: actionTypes.RECIPE_REMOVED,
          },
        })
      }

      dispatch(trackUserAddRemoveRecipe())
    },
    [menuRecipes, numPortions, collection, reachedLimit, dispatch],
  )
}
