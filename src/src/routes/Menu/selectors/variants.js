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
  (variants, coreRecipeId, menuRecipes, collectionDietaryClaims) => getVariantsForRecipeForCurrentCollection(variants, coreRecipeId, menuRecipes, collectionDietaryClaims)
)

export const getAlternativesForRecipe = createSelector(
  [getCurrentMenuVariants, getRecipeIdFromProps, getCurrentMenuRecipes, getCurrentCollectionDietaryClaims],
  (variants, coreRecipeId, menuRecipes, collectionDietaryClaims) => {
    const variantsForRecipe = getVariantsForRecipeForCurrentCollection(variants, coreRecipeId, menuRecipes, collectionDietaryClaims)
    const alternatives = variantsForRecipe ? variantsForRecipe.alternatives : null

    return alternatives || null
  }
)

export const getSidesForRecipe = createSelector(
  [getCurrentMenuVariants, getRecipeIdFromProps, getCurrentMenuRecipes, getCurrentCollectionDietaryClaims],
  (variants, coreRecipeId, menuRecipes, collectionDietaryClaims) => {
    const variantsForRecipe = getVariantsForRecipeForCurrentCollection(variants, coreRecipeId, menuRecipes, collectionDietaryClaims)
    const sides = variantsForRecipe ? variantsForRecipe.sides : null

    return sides || null
  }
)

export const getSidesData = (state, props) => {
  const recipeVariants = getVariantsForRecipe(state, props)
  const hasSides = !!(recipeVariants && recipeVariants.type === 'sides')
  const sides = hasSides ? recipeVariants.variantsList.toJS() : []
  const firstSideRecipeId = sides[0] ? sides[0].coreRecipeId : null
  const hasSideAddedToBasket = !!state.basket.getIn(['recipes', firstSideRecipeId], 0)

  return {
    recipeVariants,
    hasSides,
    sides,
    firstSideRecipeId,
    hasSideAddedToBasket,
  }
}
