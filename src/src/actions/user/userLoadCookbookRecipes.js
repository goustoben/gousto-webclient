import { getUserRecentRecipesIds } from "selectors/user"

export const userLoadCookbookRecipes = () => (dispatch, getState) => {
  const userRecipeIds = getUserRecentRecipesIds(getState(), 6)
  dispatch(recipesLoadRecipesById(userRecipeIds, true))
}
