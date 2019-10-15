import { createSelector } from 'reselect'
import { getMenuRecipes } from 'selectors/root'
import { getSortedRecipes } from 'routes/Menu/selectors/sorting'

const getCollectionId = (state, recipeListProps) => recipeListProps.menuCurrentCollectionId

export const getSortedRecipesForRecipeList = createSelector(
  [ getCollectionId, getMenuRecipes, getSortedRecipes ],
  (collectionId, menuRecipes, sortedRecipes) => {
    if (!collectionId) {
      return sortedRecipes
    }
  
    const recipesInCollection = menuRecipes.get(collectionId)
    const recipeIsInCollection = (recipe) => {
      const id = recipe.get('id')
  
      return recipesInCollection.includes(id)
    }
  
    return sortedRecipes.filter(recipeIsInCollection)
  }
)
