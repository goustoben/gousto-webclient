import { useSelector } from 'react-redux'
import { OrderedMap as IOrderedMap } from 'immutable'
import { MenuCollection } from 'routes/Menu/types'
import { getDisplayedCollections } from 'routes/Menu/selectors/collections'

export const useDisplayedCollections = (): IOrderedMap<string, MenuCollection> => {
  const collections = useSelector(getDisplayedCollections)

  return collections
}
