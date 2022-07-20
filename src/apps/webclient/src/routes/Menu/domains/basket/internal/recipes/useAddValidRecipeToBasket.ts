import { useSelector, useDispatch } from 'react-redux'
import { usePrevious } from 'react-use'

import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import { sendClientMetric } from 'routes/Menu/apis/clientMetrics'
import { useCurrentCollectionId } from 'routes/Menu/domains/collections'
import { getBasketRecipes, isFirstRecipeAdded, getBasketSlotId } from 'selectors/basket'
import { getUTMAndPromoCode } from 'selectors/tracking'

import { useStock } from '../../useStock'
import { useRecipeLimitReached } from '../limits'
import { useNumPortions } from '../useNumPortions'

export const useAddValidRecipeToBasket = () => {
  const menuRecipes = useSelector(getBasketRecipes)
  const firstRecipeAdded = useSelector(isFirstRecipeAdded)
  const slotId = useSelector(getBasketSlotId)
  const { promoCode, UTM } = useSelector(getUTMAndPromoCode)

  const { isRecipeOutOfStock } = useStock()
  const collection = useCurrentCollectionId()
  const { numPortions } = useNumPortions()
  const prevRecipes = usePrevious(menuRecipes)

  const reachedLimit = useRecipeLimitReached(menuRecipes)

  const dispatch = useDispatch()

  return (
    recipeId: string,
    view?: string,
    recipeInfo?: {
      position: string
    },
    maxRecipesNum?: number,
    orderId?: string,
  ) => {
    const outOfStock = isRecipeOutOfStock(recipeId)
    if (reachedLimit || outOfStock) {
      return
    }

    if (recipeInfo) {
      Object.assign(recipeInfo, { collection })
    }

    if (!orderId && !firstRecipeAdded) {
      sendClientMetric('menu-first-recipe-add', 1, 'Count')
    }

    dispatch({
      type: actionTypes.BASKET_RECIPE_ADD,
      recipeId,
      ...recipeInfo,
      orderId,
      trackingData: {
        actionType: trackingKeys.addRecipe,
        recipeId,
        view,
        position: recipeInfo && recipeInfo.position,
        collection,
        recipe_count: menuRecipes.size + 1, // The action is performed in the same time so the size is not updated yet
      },
    })

    dispatch({
      type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
      stock: {
        [recipeId]: {
          [numPortions]: -1,
        },
      },
    })

    if (reachedLimit) {
      dispatch({
        type: actionTypes.BASKET_LIMIT_REACHED,
        limitReached: reachedLimit,
        trackingData: {
          actionType: trackingKeys.basketLimit,
          limitReached: reachedLimit,
          view,
          source: actionTypes.RECIPE_ADDED,
        },
      })
    }

    let recipesCount = 0

    menuRecipes.forEach((count = 0) => {
      recipesCount += count
    })

    if (prevRecipes && prevRecipes.size < 2 && recipesCount > 1 && slotId) {
      dispatch({
        type: actionTypes.BASKET_ELIGIBLE_TRACK,
        trackingData: {
          actionType: trackingKeys.basketEligible,
          ...UTM,
          promoCode,
          menuRecipes,
        },
      })
    }
  }
}
