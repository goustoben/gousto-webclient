import { unselectRecipeSide } from '../../../actions/menu'
import { getMenuRecipeIdForDetails } from '../selectors/menuRecipeDetails'
import { getSelectedRecipeSidesFromMenu } from '../selectors/recipe'
import { menuRecipeDetailVisibilityChange } from './menuRecipeDetails'

const hasRecipeInBasket = (basketRecipes, recipeId) => basketRecipes.get(recipeId, 0) !== 0

export const closeRecipeDetails = () => (
  async (dispatch, getState) => {
    const detailRecipeId = getMenuRecipeIdForDetails(getState())

    dispatch(menuRecipeDetailVisibilityChange())

    const selectedSides = getSelectedRecipeSidesFromMenu(getState())
    const selectedSideId = selectedSides[detailRecipeId] || null

    if (!selectedSideId) {
      return
    }

    const basketRecipes = getState().basket.get('recipes')

    if (hasRecipeInBasket(basketRecipes, selectedSideId)) {
      return
    }

    dispatch(unselectRecipeSide(detailRecipeId))
  }
)
