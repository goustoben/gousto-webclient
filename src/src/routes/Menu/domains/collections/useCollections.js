import { useSelector } from 'react-redux'
import { getMenuCollections } from 'routes/Menu/selectors/collections'
import { useDisplayedCollections } from './internal/useDisplayedCollections'
import { useCurrentCollection } from './internal/useCurrentCollection'
import { useChangeCollectionById } from './internal/useChangeCollectionById'

export const useCollections = () => {
  const currentCollection = useCurrentCollection()
  const allCollections = useSelector(getMenuCollections)
  const displayedCollections = useDisplayedCollections()
  const changeCollectionById = useChangeCollectionById()

  const getCollectionBySlug = (slug, { visibleOnly = false }) => {
    const collectionList = visibleOnly ? displayedCollections : allCollections

    return collectionList.find(c => c.get('slug') === slug) || null
  }

  return {
    currentCollection,
    currentCollectionId: currentCollection ? currentCollection.get('id') : null,
    collections: displayedCollections,
    allCollections,
    changeCollectionById,
    getCollectionBySlug,
  }
}
