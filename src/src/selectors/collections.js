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

export const getCollectionDescritpion = (state, slug) => {
  const { menuCollections } = state
  const selectedCollection = menuCollections.find(collection => collection.get('slug') === slug)
  if(selectedCollection) {
    return selectedCollection.get('description')
  }

  return ''
}
