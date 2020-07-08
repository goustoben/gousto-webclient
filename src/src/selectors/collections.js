import { getCurrentCollectionId, getMenuCollections, getRecipesInCollection } from '../routes/Menu/selectors/collections'

export const hasJustForYouCollection = ({ menuCollections }) => menuCollections.some(collection => collection.get('slug') === 'recommendations')

export const getRecipePosition = (state, recipeId) => {
  const menuCollections = getMenuCollections(state)
  const currentCollection = getCurrentCollectionId(state)
  const currentCollectionRecipes = getRecipesInCollection(menuCollections, currentCollection)
  const indexOfRecipe = currentCollectionRecipes && currentCollectionRecipes.indexOf(recipeId)

  return (indexOfRecipe + 1) || null
}

export const getMenuCollectionIdBySlug = (menuCollections, slug) => {
  const menuCollectionWithSlug = menuCollections.find(collection => collection.get('slug') === slug)
  const menuCollectionId = menuCollectionWithSlug && menuCollectionWithSlug.get('id')

  return menuCollectionId
}

export const getMenuCollectionRecipeIds = (menuCollections, allMenuCollectionRecipes, slug) => {
  const menuCollectionId = slug && getMenuCollectionIdBySlug(menuCollections, slug)
  const selectedCollectionRecipesIdArray = menuCollectionId && allMenuCollectionRecipes.get(menuCollectionId)

  return selectedCollectionRecipesIdArray
}

export const getCollectionDetailsBySlug = (state, slug) => {
  const { menuCollections } = state
  const selectedCollection = menuCollections.find(collection => collection.get('slug') === slug)
  if (selectedCollection) {
    return selectedCollection
  }

  return null
}
