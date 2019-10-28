import { createSelector } from 'reselect'
import { getMenuRecipes } from 'selectors/root'
import { getRecipes } from 'routes/Menu/selectors/sorting'

const getCollectionId = (state, recipeListProps) => recipeListProps.menuCurrentCollectionId

export const getSortedRecipesForRecipeList = createSelector(
  [ getCollectionId, getMenuRecipes, getRecipes ],
  (collectionId, menuRecipes, recipes) => {
    if (!collectionId) {
      return recipes
    }
  
    const recipesInCollection = menuRecipes.get(collectionId)
    const recipeIsInCollection = (recipe) => {
      const id = recipe.get('id')
  
      return recipesInCollection.includes(id)
    }
  
    return recipes.filter(recipeIsInCollection)
  }
)
