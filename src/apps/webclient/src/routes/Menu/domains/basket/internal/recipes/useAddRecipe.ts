import { Map } from 'immutable'
import { useSelector, useDispatch } from 'react-redux'
import { usePrevious } from 'react-use'

import { actionTypes } from 'actions/actionTypes'
import { trackUserAddRemoveRecipe } from 'actions/loggingmanager'
import status from 'actions/status'
import * as trackingKeys from 'actions/trackingKeys'
import { menuRecipeDetailVisibilityChange } from 'routes/Menu/actions/menuRecipeDetails'
import { sendClientMetric } from 'routes/Menu/apis/clientMetrics'
import { useCurrentCollectionId } from 'routes/Menu/domains/collections'
import { useStock } from 'routes/Menu/domains/menu'
import { getMenuLimitsForBasket } from 'routes/Menu/selectors/menu'
import { getMenuRecipeIdForDetails } from 'routes/Menu/selectors/menuRecipeDetails'
import { getBasketRecipes, isFirstRecipeAdded, getBasketSlotId } from 'selectors/basket'
import { getUTMAndPromoCode } from 'selectors/tracking'

import { useNumPortions } from '../useNumPortions'
import { useRecipeLimitReached } from '../useRecipeLimitReached'

const useAddValidRecipeToBasket = () => {
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

type menuLimitsForBasketType = {
  name: string
  limitProps: {
    value: number
    description: string
  }
  items: {
    core_recipe_id: string
  }[]
}[]

const useValidateMenuLimitsForBasket = () => {
  const basketRecipes: Map<string, number> = useSelector(getBasketRecipes)
  const menuLimitsForBasket: menuLimitsForBasketType = useSelector(getMenuLimitsForBasket)

  return (recipeId: string) => {
    const limitsReached = menuLimitsForBasket.map((limit) => {
      const { name, limitProps, items } = limit

      if (recipeId && !items.some((item) => item?.core_recipe_id === recipeId)) {
        return null
      }

      const recipesInBasketIds = basketRecipes.keySeq().toArray()
      const recipesFromLimitInBasket =
        recipesInBasketIds &&
        recipesInBasketIds.filter((recipe) => items.some((item) => item?.core_recipe_id === recipe))
      // we set the count to 1 if we trigger the validation at add and 0 if we do it at checkout
      let count = recipeId ? 1 : 0

      if (recipesFromLimitInBasket) {
        recipesFromLimitInBasket.forEach((recipe) => {
          if (basketRecipes.get(recipe)) {
            count += basketRecipes.get(recipe)
          }
        })
      }

      if (count > limitProps.value) {
        return {
          name,
          message: limitProps.description,
          items: recipesFromLimitInBasket,
        }
      }

      return null
    })

    return limitsReached.filter((item) => item !== null)
  }
}

export const useAddRecipe = () => {
  const menuLimitsForBasket = useValidateMenuLimitsForBasket()
  const menuRecipeIdForDetails = useSelector(getMenuRecipeIdForDetails)
  const addValidRecipeToBasket = useAddValidRecipeToBasket()
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
    const basketBreakingRules = {
      errorTitle: 'Oven Ready meals',
      recipeId,
      rules: menuLimitsForBasket(recipeId),
    }
    const shouldCloseDetailsScreen = basketBreakingRules.rules.length && menuRecipeIdForDetails()

    if (shouldCloseDetailsScreen) {
      dispatch(menuRecipeDetailVisibilityChange())
    }

    if (basketBreakingRules.rules.length) {
      dispatch(status.error(actionTypes.BASKET_NOT_VALID, basketBreakingRules))

      return
    }

    addValidRecipeToBasket(recipeId, view, recipeInfo, maxRecipesNum, orderId)
    dispatch(trackUserAddRemoveRecipe())
  }
}
