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

export const getRecommendationShortName = createSelector(
  [getMenuCollections],
  (menuCollections) => {
    const recommendationCollection = menuCollections.find(collection => collection.get('slug') === 'recommendations')
    const shortName = recommendationCollection && recommendationCollection.get('shortTitle')

    return shortName || ''
  }
)
