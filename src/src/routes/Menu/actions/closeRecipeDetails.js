import { menuRecipeDetailVisibilityChange } from './menuRecipeDetails'

export const closeRecipeDetails = () => (
  async (dispatch) => {
    dispatch(menuRecipeDetailVisibilityChange())
  }
)
