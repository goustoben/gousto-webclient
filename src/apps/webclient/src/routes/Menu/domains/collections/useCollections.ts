import { useSelector } from 'react-redux'

import { getMenuCollections } from '../../selectors/collections'
import { MenuCollection } from '../../types'
import { useChangeCollectionById } from './internal/useChangeCollectionById'
import { useCurrentCollection } from './internal/useCurrentCollection'
import { useDisplayedCollections } from './internal/useDisplayedCollections'

export const useAllCollections = () => useSelector(getMenuCollections)

export const useCollections = () => {
  const currentCollection = useCurrentCollection()
  const allCollections = useAllCollections()
  const displayedCollections = useDisplayedCollections()
  const changeCollectionById = useChangeCollectionById()

  const getCollectionBySlug = (slug: string, { visibleOnly = false }) => {
    const collectionList = visibleOnly ? displayedCollections : allCollections

    return collectionList.find((c: MenuCollection) => c?.get('slug') === slug) || null
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
