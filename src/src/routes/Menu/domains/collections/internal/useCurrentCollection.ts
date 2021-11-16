import { OrderedMap as ImmutableOrderedMap, Map as ImmutableMap } from 'immutable'

import { CollectionSlug } from '../constants'
import { useCollectionQuerySlug } from './useCollectionQuerySlug'
import { useDisplayedCollections } from './useDisplayedCollections'
import { Collection } from '../../../types/collection'

const getCollectionBySlug = (
  collections: ImmutableOrderedMap<string, Collection>,
  slug: string
) => {
  if (!slug) {
    return null
  }

  const collection = collections.find((c: Collection) => c.get('slug') === slug)

  return collection || null
}

const getCollectionSlug = (collection: Collection) => collection.get('slug')
const isCollectionDefault = (collection: Collection) => Boolean(collection.get('default'))
const isCollectionRecommendations = (collection: Collection) =>
  getCollectionSlug(collection) === CollectionSlug.Recommendations

const getDefaultCollection = (collections: ImmutableOrderedMap<string, Collection>) => {
  const defaultCollection = collections.find(isCollectionDefault)

  if (defaultCollection) {
    return defaultCollection
  }

  const recommendationsCollection = collections.find(isCollectionRecommendations)

  if (recommendationsCollection) {
    return recommendationsCollection
  }

  if (collections.size > 0) {
    return collections.first()
  }

  return null
}

export const useCurrentCollection = () => {
  const slug = useCollectionQuerySlug()
  const collections = useDisplayedCollections()

  if (slug) {
    const matchingCollection = getCollectionBySlug(collections, slug)

    if (matchingCollection) {
      return matchingCollection
    }
  }

  const defaultCollection = getDefaultCollection(collections)

  if (defaultCollection) {
    return defaultCollection
  }

  return null
}
