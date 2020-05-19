import { createSelector } from 'reselect'
import { getRecipes, getStock, getBasket } from 'selectors/root'
import { formatRecipeTitle } from 'utils/recipe'
import { getNumPortions } from 'selectors/basket'
import config from 'config/menu'

export const getRecipeIdFromProps = (state, props) => props.recipeId

export const getRecipeTitle = createSelector(
  [getRecipes, getRecipeIdFromProps],
  (allRecipes, recipeId) => {
    if (!recipeId) {
      return null
    }

    const recipe = allRecipes.get(recipeId)

    if (!recipe) {
      return null
    }

    return formatRecipeTitle(recipe.get('title'), recipe.get('boxType', ''), recipe.get('dietType', ''))
  }
)

const getRecipeIdInBasket = createSelector(
  [getBasket, getRecipeIdFromProps],
  (basket, recipeId) => basket.hasIn(['recipes', recipeId])
)

export const getRecipeOutOfStock = createSelector(
  [getRecipeIdFromProps, getStock, getNumPortions, getRecipeIdInBasket],
  (recipeId, menuRecipeStock, numPortions, inBasket) => {
    const stock = menuRecipeStock.getIn([recipeId, String(numPortions)], 0)

    return (stock <= config.stockThreshold && stock !== null && !inBasket)
  })
