import { textReducer } from 'utils/text'
import config from 'config/recipes'

export const getCurrentCollectionId = state => state.filters.get('currentCollectionId')
export const getCurrentDietTypes = state => state.filters.get('dietTypes')
export const getCurrentTotalTime = state => state.filters.get('totalTime', '0')
export const getDietaryAttributes = state => state.filters.get('dietaryAttributes')
export const getNewRecipesFilter = state => state.filters.get('newRecipes', false)
export const getFoodBrandFilter = state => state.filters.get('foodBrand')

export const getShortTitle = (menuCollections, currentCollectionId) => {

  return menuCollections.getIn([
    currentCollectionId,
    'shortTitle',
  ], 'All Recipes')
}

export const getFilterCTAText = ({ filters, menuCollections }) => ([
  getShortTitle(menuCollections, filters.get('currentCollectionId')),
  filters.get('dietTypes', []).reduce((text, dietType) => textReducer(text, config.dietTypes[dietType]), ''),
  filters.get('dietaryAttributes', []).reduce((text, dietaryAttribute) => textReducer(text, config.dietaryAttributes[dietaryAttribute]), ''),
  config.totalTime[filters.get('totalTime', 0)],
].reduce(textReducer))

export default {
  getCurrentCollectionId,
  getFilterCTAText,
}
