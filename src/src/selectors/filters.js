export const getCurrentCollectionId = state => state.filters.get('currentCollectionId')

export const getShortTitle = (state) => {
  const { menuCollections } = state
  const currentCollectionId = getCurrentCollectionId(state)

  return menuCollections.getIn([
    currentCollectionId,
    'shortTitle',
  ], 'All Recipes')
}

export default {
  getCurrentCollectionId,
}
