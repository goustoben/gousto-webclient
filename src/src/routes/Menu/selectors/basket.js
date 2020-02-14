import { createSelector } from 'reselect'
import { getMenuRecipeIds, getStock } from 'selectors/root'
import { getBasketRecipes, getNumPortions } from 'selectors/basket'
import { okRecipes } from 'utils/basket'

export const getOkRecipeIds = createSelector(
  getBasketRecipes,
  getMenuRecipeIds,
  getStock,
  getNumPortions,
  (basketRecipes, menuRecipeIds, stock, numPortions) => okRecipes(basketRecipes, menuRecipeIds, stock, numPortions)
)

export const getUnavailableRecipeIds = createSelector(
  getBasketRecipes,
  getOkRecipeIds,
  (basketRecipes, okRecipeIds) => basketRecipes.filter((obj, recipeId) => !okRecipeIds.has(recipeId))
)
