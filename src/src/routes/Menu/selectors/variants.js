import { createSelector } from 'reselect'
import { getBasketMenuId } from 'selectors/basket'
import { getCurrentCollectionId } from './collections'

const getMenuVariants = state => state.menu.get('menuVariants')
const getSelectedRecipeVariants = state => state.menu.get('selectedRecipeVariants')

const getCoreRecipeId = (state, props) => props.recipeId

const getCurrentMenuVariants = createSelector(
  [getMenuVariants, getBasketMenuId],
  (variants, menuId) => (variants.get(menuId) || null)
)

export const getCurrentMenuRecipesWithVariantsReplaced = createSelector(
  [getSelectedRecipeVariants, getCurrentCollectionId],
  (selectedVariants, currentCollectionId) => (recipesInCollection) => (
    recipesInCollection.map((recipeId) => {
      const variantId = selectedVariants[currentCollectionId] && selectedVariants[currentCollectionId][recipeId]

      if (variantId) {
        return variantId
      }

      return recipeId
    })
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
