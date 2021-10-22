import { useCollectionQuerySlug } from './useCollectionQuerySlug'
import { useDisplayedCollections } from './useDisplayedCollections'

const getCollectionBySlug = (collections, slug) => {
  if (!slug) {
    return null
  }

  const collection = collections.find(c => c.get('slug') === slug)

  return collection || null
}

const getCollectionSlug = collection => collection.get('slug')
const isCollectionDefault = collection => Boolean(collection.get('default'))
const isCollectionRecommendations = collection => getCollectionSlug(collection) === 'recommendations'

const getDefaultCollection = collections => {
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
