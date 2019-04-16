import { createSelector } from 'reselect'

import { getMenuCollections } from 'selectors/root'
import { getCurrentCollectionId } from 'selectors/filters'

export const getCurrentCollectionSlug = createSelector(
  [getCurrentCollectionId, getMenuCollections],
  (collectionId, menuCollections) => {
    const currentCollection = menuCollections.get(collectionId)
    const currentCollectionSlug = (currentCollection && currentCollection.get('slug')) || null

    return currentCollectionSlug
  }
)

export const getCurrentCollectionIsRecommendation = createSelector(
  [getCurrentCollectionId, getCurrentCollectionSlug],
  (collectionId, slug) => {
    const currentCollectionSlug = (slug === 'recommendations')

    return currentCollectionSlug && collectionId
  }
)
