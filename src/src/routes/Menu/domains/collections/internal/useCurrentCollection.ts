import { CollectionSlug } from '../constants'
import { useCollectionQuerySlug } from './useCollectionQuerySlug'
import { useDisplayedCollections } from './useDisplayedCollections'
import { MenuCollectionIMap, MenuCollectionsIOrderedMap} from '../../../types'

const getCollectionBySlug = (collections: MenuCollectionsIOrderedMap, slug: string) => {
  if (!slug) {
    return null
  }

  const collection = collections.find((c) => c !== undefined && c.get('slug') === slug)

  return collection || null
}

const getCollectionSlug = (collection?: MenuCollectionIMap) =>
  collection !== undefined && collection.get('slug')
const isCollectionDefault = (collection?: MenuCollectionIMap) =>
  collection !== undefined && Boolean(collection.get('default'))
const isCollectionRecommendations = (collection?: MenuCollectionIMap) =>
  getCollectionSlug(collection) === CollectionSlug.Recommendations

const getDefaultCollection = (collections: MenuCollectionsIOrderedMap) => {
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

export const useCurrentCollection = (): MenuCollectionIMap | null => {
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
