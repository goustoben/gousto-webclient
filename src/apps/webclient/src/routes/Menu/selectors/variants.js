import { createSelector } from 'reselect'
import { getBasketMenuId } from 'selectors/basket'
import { getVariantsForRecipeForCurrentCollection, getRecipeIdFromProps } from './recipe'
import { getCurrentMenuRecipes } from './menu'
import { getCurrentCollectionId, getMenuCollections } from './collections'

const getMenuVariants = (state) => state.menu.get('menuVariants')
export const getSelectedRecipeVariants = (state) => state.menu.get('selectedRecipeVariants')

export const getCurrentCollectionDietaryClaims = createSelector(
  [getMenuCollections, getCurrentCollectionId],
  (menuCollections, currentCollectionId) =>
    menuCollections.getIn([currentCollectionId, 'requirements', 'dietary_claims'], null),
)

export const getCurrentMenuVariants = createSelector(
  [getMenuVariants, getBasketMenuId],
  (variants, menuId) => variants.get(menuId) || null,
)

export const getVariantsForRecipe = createSelector(
  [
    getCurrentMenuVariants,
    getRecipeIdFromProps,
    getCurrentMenuRecipes,
    getCurrentCollectionDietaryClaims,
  ],
  (variants, coreRecipeId, menuRecipes, collectionDietaryClaims) =>
    getVariantsForRecipeForCurrentCollection(
      variants,
      coreRecipeId,
      menuRecipes,
      collectionDietaryClaims,
    ),
)
