import Immutable from 'immutable'
import { getDisplayedCollections } from '../routes/Menu/selectors/collections'

export function isAllRecipes(collection) {
  return collection.get('shortTitle')
    .toLowerCase()
    .split(' ')
    .join('') === 'allrecipes'
}

export function getCollectionIdWithName(state, name) {
  if (!state || !state.menuCollections || !name) {
    return null
  }

  const collectionToReturn = getDisplayedCollections(state)
    .find(collection => (collection.get('slug') === name), Immutable.Map())

  const collectionId = collectionToReturn ? collectionToReturn.get('id', null) : null

  return collectionId
}
