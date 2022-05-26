import { OrderedMap as IOrderedMap } from 'immutable'
import { useSelector } from 'react-redux'

import { getDisplayedCollections } from 'routes/Menu/selectors/collections'
import { MenuCollection } from 'routes/Menu/types'

export const useDisplayedCollections = (): IOrderedMap<string, MenuCollection> => {
  const collections = useSelector(getDisplayedCollections)

  return collections
}
