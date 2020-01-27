
import { getCollectionIdWithName, getDefaultCollectionId } from 'utils/collections'
import { getCurrentCollectionIsRecommendation } from '../../selectors/menu'

export const getCollectionId = (state, query) => {
  const collectionName = (query && query.collection) ? query.collection : ''

  let collectionId = getCollectionIdWithName(state, collectionName)
  
  if (!collectionId) {
    if (getCurrentCollectionIsRecommendation(state)) {
      collectionId = getCurrentCollectionIsRecommendation(state)
    } else {
      collectionId = getDefaultCollectionId(state)
    }
  }

  return collectionId
}
