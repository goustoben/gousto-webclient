import { createSelector } from 'reselect'
import { getBasketMenuId } from 'selectors/basket'
import { getVariantsForRecipeForCurrentCollection , getRecipeIdFromProps } from './recipe'
import { getCurrentMenuRecipes } from './menu'
import { getCurrentCollectionDietaryClaims } from './collections'

const getMenuVariants = state => state.menu.get('menuVariants')
export const getSelectedRecipeVariants = state => state.menu.get('selectedRecipeVariants')

export const getCurrentMenuVariants = createSelector(
  [getMenuVariants, getBasketMenuId],
  (variants, menuId) => (variants.get(menuId) || null)
)

export const getVariantsForRecipe = createSelector(
  [getCurrentMenuVariants, getRecipeIdFromProps, getCurrentMenuRecipes, getCurrentCollectionDietaryClaims],
  (variants, coreRecipeId, menuRecipes, collectionDietaryClaims) => {
    const alternatives = getVariantsForRecipeForCurrentCollection(variants, coreRecipeId, menuRecipes, collectionDietaryClaims)

    return alternatives ? alternatives.toJS() : null
  }
)
