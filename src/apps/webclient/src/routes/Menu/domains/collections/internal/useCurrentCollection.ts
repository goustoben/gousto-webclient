import { OrderedMap as IOrderedMap } from 'immutable'

import { MenuCollection } from 'routes/Menu/types'

import { CollectionSlug } from '../constants'
import { useCollectionQuerySlug } from './useCollectionQuerySlug'
import { useDisplayedCollections } from './useDisplayedCollections'

const getCollectionBySlug = (collections: IOrderedMap<string, MenuCollection>, slug: string) => {
  if (!slug) {
    return null
  }

  const collection = collections.find((c) => c?.get('slug') === slug)

  return collection || null
}

const getCollectionSlug = (collection?: MenuCollection) =>
  collection !== undefined && collection.get('slug')
const isCollectionDefault = (collection?: MenuCollection) =>
  collection !== undefined && Boolean(collection.get('default'))
const isCollectionRecommendations = (collection?: MenuCollection) =>
  getCollectionSlug(collection) === CollectionSlug.Recommendations

const getDefaultCollection = (collections: IOrderedMap<string, MenuCollection>) => {
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

export const useCurrentCollection = (): MenuCollection | null => {
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

export const useCurrentCollectionId = () => {
  const currentCollection = useCurrentCollection()

  return currentCollection ? currentCollection.get('id') : null
}
