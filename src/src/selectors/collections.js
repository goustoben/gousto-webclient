import { getCurrentCollectionId } from './filters'
import { getMenuRecipes } from './root'

export const hasJustForYouCollection = ({ menuCollections }) => menuCollections.some(collection => collection.get('slug') === 'recommendations')

export const getRecipePosition = (state, recipeId) => {
  const menuCollectionRecipes = getMenuRecipes(state)
  const currentCollection = getCurrentCollectionId(state)
  const currentCollectionRecipes = menuCollectionRecipes.get(currentCollection)
  const indexOfRecipe = currentCollectionRecipes && currentCollectionRecipes.indexOf(recipeId)

  return (indexOfRecipe+1) || null
}
