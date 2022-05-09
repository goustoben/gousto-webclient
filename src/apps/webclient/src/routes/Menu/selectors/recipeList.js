import { createSelector } from 'reselect'
import Immutable from 'immutable'

import { getStock } from 'selectors/root'
import { getNumPortions, getBasketRecipes } from 'selectors/basket'
import { isRecipeInBasket } from 'utils/menu'
import { getCurrentMenuRecipes } from './menu'
import { isOutOfStock } from './recipe'
import { getCurrentMenuVariants } from './variants'

export const getInStockRecipes = createSelector(
  [getCurrentMenuRecipes, getStock, getBasketRecipes, getNumPortions],
  (recipes, stock, basketRecipes, numPortions) =>
    recipes.filter(
      (recipe) =>
        !isOutOfStock(recipe.get('id'), numPortions, stock) ||
        isRecipeInBasket(recipe, basketRecipes),
    ),
)

export const getBaseRecipeSides = createSelector([getCurrentMenuVariants], (currentMenuVariant) => {
  if (!currentMenuVariant) {
    return null
  }

  // Get all recipes with sides and return an object which has mappings between recipe side id and the base recipe id
  const baseRecipeSides = Object.entries(currentMenuVariant.toJS()).reduce(
    (acc, [baseRecipeId, recipeData]) => {
      const { sides = [] } = recipeData
      const [firstSide] = sides

      if (!firstSide) {
        return acc
      }

      const { coreRecipeId } = firstSide

      return {
        ...acc,
        [coreRecipeId]: baseRecipeId,
      }
    },
    {},
  )

  return Immutable.fromJS(baseRecipeSides)
})

export const getBasketRecipeWithSidesBaseId = createSelector(
  [getBasketRecipes, getBaseRecipeSides],
  (basketRecipes, baseRecipeSides) => {
    if (!baseRecipeSides) {
      return basketRecipes
    }

    let basketRecipeWithSidesBaseId = Immutable.Map({})

    basketRecipes.forEach((value, key) => {
      if (baseRecipeSides.get(key)) {
        basketRecipeWithSidesBaseId = basketRecipeWithSidesBaseId.set(
          baseRecipeSides.get(key),
          value,
        )
      } else {
        basketRecipeWithSidesBaseId = basketRecipeWithSidesBaseId.set(key, value)
      }
    })

    return basketRecipeWithSidesBaseId
  },
)

const getRecipeIdFromProps = (state, props) => props.recipeId

export const replaceSideRecipeIdWithBaseRecipeId = createSelector(
  [getRecipeIdFromProps, getBaseRecipeSides],
  (recipeId, baseRecipeSides) => {
    if (!baseRecipeSides) {
      return recipeId
    }

    const baseRecipeId = baseRecipeSides.get(recipeId) || recipeId

    return baseRecipeId
  },
)
