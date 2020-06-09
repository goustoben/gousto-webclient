import { createSelector } from 'reselect'
import { getBasketMenuId } from 'selectors/basket'
import { getRecipeIdFromProps } from './recipe'

const getMenuVariants = state => state.menu.get('menuVariants')
export const getSelectedRecipeVariants = state => state.menu.get('selectedRecipeVariants')

export const getCurrentMenuVariants = createSelector(
  [getMenuVariants, getBasketMenuId],
  (variants, menuId) => (variants.get(menuId) || null)
)

export const getVariantsForRecipe = createSelector(
  [getCurrentMenuVariants, getRecipeIdFromProps],
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
