import { getFoodBrand } from 'utils/recipe'

export const getCurrentCollectionId = state => state.filters.get('currentCollectionId')
export const getRecipeGroupFilter = state => state.filters.get('recipeGroup')

export const getShortTitle = (menuCollections, currentCollectionId) => {

  return menuCollections.getIn([
    currentCollectionId,
    'shortTitle',
  ], 'All Recipes')
}

export const getFoodBrandDetails = state => {
  const { routing, recipes } = state
  const { query } = routing.locationBeforeTransitions
  const recipeSelected = recipes.find(recipe => getFoodBrand(recipe).get('slug') === query.foodBrand)
  const foodBrand = getFoodBrand(recipeSelected)

  return ({
    name: foodBrand.get('name'),
    slug: foodBrand.get('slug'),
    borderColor: foodBrand && foodBrand.get('properties') && foodBrand.get('properties').get('ribbonColor')
  })
}

export default {
  getCurrentCollectionId,
}
