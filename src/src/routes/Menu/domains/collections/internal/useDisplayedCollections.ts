import { useSelector } from 'react-redux'
import { OrderedMap as IOrderedMap } from 'immutable'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { MenuCollection } from '../../../types'
import { getDisplayedCollections } from '../../../selectors/collections'
import { CollectionSlug } from '../constants'

export const useDisplayedCollections = (): IOrderedMap<string, MenuCollection> => {
  const collections = useSelector(getDisplayedCollections)

  const shouldRemoveCfy = useIsOptimizelyFeatureEnabled('kales_remove_cfy_collection')

  if (shouldRemoveCfy) {
    return collections.filter(
      (c: MenuCollection) => c.get('slug') !== CollectionSlug.Recommendations
    )
  }

  return collections
}
