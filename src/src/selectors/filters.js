export const getCurrentCollectionId = state => state.filters.get('currentCollectionId')

export const getShortTitle = (menuCollections, currentCollectionId) => menuCollections.getIn([
  currentCollectionId,
  'shortTitle',
], 'All Recipes')

export default {
  getCurrentCollectionId,
}
