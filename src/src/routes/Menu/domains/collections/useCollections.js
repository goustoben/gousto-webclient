import { useDisplayedCollections } from './internal/useDisplayedCollections'
import { useCurrentCollection } from './internal/useCurrentCollection'
import { useChangeCollectionById } from './internal/useChangeCollectionById'

export const useCollections = () => {
  const currentCollection = useCurrentCollection()
  const collections = useDisplayedCollections()
  const changeCollectionById = useChangeCollectionById()

  return {
    currentCollection,
    currentCollectionId: currentCollection ? currentCollection.get('id') : null,
    collections,
    changeCollectionById
  }
}
