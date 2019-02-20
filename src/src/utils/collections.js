import Immutable from 'immutable' /* eslint-disable new-cap */

export function isAllRecipes(collection) {
  return collection.get('shortTitle')
    .toLowerCase()
    .split(' ')
    .join('') === 'allrecipes'
}

export function isDefault(collection) {
  return collection.get('default')
}

export function getDefaultCollectionId(state) {
  return state.menuCollections
    .find(isDefault, null, Immutable.Map())
    .get('id', null)
}

export function getCollectionIdWithName(state, name) {
  if (!state || !state.menuCollections) {
    return null
  }

  const allowUnpub = state.features ? (state.features.getIn(['unpubCollections', 'value']) && !state.features.getIn(['forceCollections', 'value'])) : false
  const collectionToReturn = state.menuCollections
    .filter(collection => allowUnpub || collection.get('published'))
    .filter(collection => state.menuCollectionRecipes.get(collection.get('id'), []).size > 0)
    .find(collection => (collection.get('slug') === name), Immutable.Map())

  const collectionId = collectionToReturn && collectionToReturn.get('id', null)


  return collectionId
}

