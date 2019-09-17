import { createSelector } from 'reselect'
import { getMenuRecipeIds, getStock } from 'selectors/root'
import { getBasketRecipes, getNumPortions, getShortlistRecipeIds } from 'selectors/basket'
import { okRecipes } from 'utils/basket'

export const getOkRecipeIds = createSelector(
  getBasketRecipes,
  getMenuRecipeIds,
  getStock,
  getNumPortions,
  (basketRecipes, menuRecipeIds, stock, numPortions) => {
    return okRecipes(basketRecipes, menuRecipeIds, stock, numPortions)
  }
)

export const getOkShortlistRecipeIds = createSelector(
  getShortlistRecipeIds,
  getMenuRecipeIds,
  getStock,
  getNumPortions,
  (shortlistRecipes, menuRecipeIds, stock, numPortions) => {
    return okRecipes(shortlistRecipes, menuRecipeIds, stock, numPortions)
  }
)

export const getUnavailableRecipeIds = createSelector(
  getBasketRecipes,
  getOkRecipeIds,
  (basketRecipes, okRecipeIds) => {
    return basketRecipes.filter((obj, recipeId) => !okRecipeIds.has(recipeId))
  }
)
