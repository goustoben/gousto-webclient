import * as React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { actionTypes } from 'actions/actionTypes'
import { trackUserAddRemoveRecipe } from 'actions/loggingmanager'
import status from 'actions/status'
import { menuRecipeDetailVisibilityChange } from 'routes/Menu/actions/menuRecipeDetails'
import { getMenuRecipeIdForDetails } from 'routes/Menu/selectors/menuRecipeDetails'

import { useAddValidRecipeToBasket } from './useAddValidRecipeToBasket'
import { useValidateMenuLimitsForBasket } from './useValidateMenuLimitsForBasket'

export type AddRecipeFn = ReturnType<typeof useAddRecipe>
export const useAddRecipe = () => {
  const menuLimitsForBasket = useValidateMenuLimitsForBasket()
  const menuRecipeIdForDetails = useSelector(getMenuRecipeIdForDetails)
  const addValidRecipeToBasket = useAddValidRecipeToBasket()
  const dispatch = useDispatch()

  return React.useCallback(
    (
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
      const shouldCloseDetailsScreen = basketBreakingRules.rules.length && menuRecipeIdForDetails

      if (shouldCloseDetailsScreen) {
        dispatch(menuRecipeDetailVisibilityChange())
      }

      if (basketBreakingRules.rules.length) {
        dispatch(status.error(actionTypes.BASKET_NOT_VALID, basketBreakingRules))

        return
      }

      addValidRecipeToBasket(recipeId, view, recipeInfo, maxRecipesNum, orderId)
      dispatch(trackUserAddRemoveRecipe())
    },
    [dispatch, menuLimitsForBasket, addValidRecipeToBasket, menuRecipeIdForDetails],
  )
}
