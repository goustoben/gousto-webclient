import { createSelector } from 'reselect'
import { getBasketMenuId } from 'selectors/basket'

const getMenuVariants = state => state.menu.get('menuVariants')

const getCoreRecipeId = (state, props) => props.recipeId

const getCurrentMenuVariants = createSelector(
  [getMenuVariants, getBasketMenuId],
  (variants, menuId) => (variants.get(menuId) || null)
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
