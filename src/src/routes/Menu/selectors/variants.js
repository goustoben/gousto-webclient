import Immutable from 'immutable'
import { createSelector } from 'reselect'
import { getBasketMenuId } from 'selectors/basket'
import { getRecipes } from 'selectors/root'
import { getCurrentMenuRecipes } from './menu'

const getMenuVariants = state => state.menu.get('menuVariants')
const getSelectedRecipeVariants = state => state.menu.get('selectedRecipeVariants')

const getCoreRecipeId = (state, props) => props.recipeId

const getCurrentMenuVariants = createSelector(
  [getMenuVariants, getBasketMenuId],
  (variants, menuId) => (variants.get(menuId) || null)
)

export const getCurrentMenuRecipesWithVariantsReplaced = createSelector(
  [getRecipes, getCurrentMenuRecipes, getSelectedRecipeVariants],
  (allRecipes, currentMenuRecipes, selectedVariants) => (
    currentMenuRecipes.reduce((acc, recipe) => {
      const id = recipe.get('id')
      const variantId = selectedVariants[id]

      if (variantId) {
        const variant = allRecipes.get(variantId)

        if (variant) {
          return acc.push(variant)
        }
      }

      return acc.push(recipe)
    }, Immutable.List())
  )
)

export const getVariantsForRecipe = createSelector(
  [getCurrentMenuVariants, getCoreRecipeId],
  (variants, coreRecipeId) => {
    if (!variants) {
      return null
    }

    const recipeVariants = variants.get(coreRecipeId)

    if (!recipeVariants) {
      return null
    }

    return recipeVariants.get('alternatives').toJS()
  }
)
