import Immutable from 'immutable'
import { createSelector } from 'reselect'
import { getMenuCollections } from 'selectors/root'
import { getCurrentMenuRecipes } from 'routes/Menu/selectors/menu'
import { getHomePageRedesign } from 'selectors/features'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import { getRecipeId } from 'utils/recipe'
import { getRecipesInCollection } from '../../../Menu/selectors/collections'

const getRecipesFromAllRecipesCollection = createSelector(
  [getMenuCollections, getCurrentMenuRecipes, getHomePageRedesign],
  (menuCollections, allRecipes, isHomePageRedesignEnabled) => {
    if (allRecipes.size <= 0) {
      return Immutable.OrderedMap({})
    }

    const recipesIdsInCollection = getRecipesInCollection(menuCollections, ALL_RECIPES_COLLECTION_ID) || []

    const getRecipeDetailsById = (recipeId) => allRecipes.find(recipe => getRecipeId(recipe) === recipeId)

    // recipesInCollection is in recommended order whilst allRecipes is the default order of the menu
    let recipesOrderedByCollectionIds = recipesIdsInCollection.map(getRecipeDetailsById).filter(recipe => recipe !== undefined)
    if (isHomePageRedesignEnabled) {
      recipesOrderedByCollectionIds = recipesIdsInCollection.map(getRecipeDetailsById).filter(recipe => {
        const recipeSlug = recipe && recipe.getIn(['foodBrand', 'slug'])
        const isEveryDayFavourites = recipeSlug === 'everyday-favourites'
        const isOvenReady = recipe && recipe.get('title').includes("Charlie Bigham's")

        return (recipeSlug && !isOvenReady && !isEveryDayFavourites && recipe)
      })
    }

    return recipesOrderedByCollectionIds
      .reduce((reducerState, recipe) =>
        reducerState.set(recipe.get('id'), recipe), Immutable.OrderedMap({}))
  }
)

export {
  getRecipesFromAllRecipesCollection
}
