import { createSelector } from 'reselect'
import { getRecipes } from 'selectors/root'
import { formatRecipeTitle } from 'utils/recipe'

const getRecipeIdFromProps = (state, props) => props.recipeId

export const getRecipeTitle = createSelector(
  [getRecipes, getRecipeIdFromProps],
  (allRecipes, recipeId) => {
    if (!recipeId) {
      return null
    }

    const recipe = allRecipes.get(recipeId)

    if (!recipe) {
      return null
    }

    return formatRecipeTitle(recipe.get('title'), recipe.get('boxType', ''), recipe.get('dietType', ''))
  }
)
