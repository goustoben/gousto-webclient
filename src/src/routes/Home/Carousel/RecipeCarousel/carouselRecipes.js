import Immutable from 'immutable'
import { createSelector } from 'reselect'
import { getMenuRecipes as getMenuCollectionRecipes } from 'selectors/root'
import { getCurrentMenuRecipes } from 'routes/Menu/selectors/sorting'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import { getRecipeId } from 'utils/recipe'

const getRecipesFromAllRecipesCollection = createSelector(
  [getMenuCollectionRecipes, getCurrentMenuRecipes],
  (menuCollectionRecipeIds, allRecipes) => {
    if (allRecipes.size <= 0) {
      return Immutable.OrderedMap({})
    }

    const recipesIdsInCollection = menuCollectionRecipeIds.get(ALL_RECIPES_COLLECTION_ID) || []

    const getRecipeDetailsById = (recipeId) => allRecipes.find(recipe => getRecipeId(recipe) === recipeId)

    // recipesInCollection is in recommended order whilst allRecipes is the default order of the menu
    const recipesOrderedByCollectionIds = recipesIdsInCollection.map(getRecipeDetailsById).filter(recipe => recipe !== undefined)

    return recipesOrderedByCollectionIds
      .reduce((reducerState, recipe) =>
        reducerState.set(recipe.get('id'), recipe), Immutable.OrderedMap({}))
  }
)

export {
  getRecipesFromAllRecipesCollection
}
