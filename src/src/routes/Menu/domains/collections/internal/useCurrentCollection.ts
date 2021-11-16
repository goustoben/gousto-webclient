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

  const collection = collections.find((c) => c !== undefined && c.get('slug') === slug)

  return collection || null
}

const getCollectionSlug = (collection: Collection | undefined) =>
  collection !== undefined && collection.get('slug')
const isCollectionDefault = (collection: Collection | undefined) =>
  collection !== undefined && Boolean(collection.get('default'))
const isCollectionRecommendations = (collection: Collection | undefined) =>
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

// eslint-disable-next-line no-unused-vars
export function useCurrentCollection<Type extends Collection>(): Collection | null {
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
