import { useSelector } from 'react-redux'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { MenuCollectionIMap } from 'routes/Menu/types'
import { List as ImmutableList, Map as ImmutableMap } from 'immutable'
import { getDisplayedCollections } from '../../../selectors/collections'
import { CollectionSlug } from '../constants'

export const useDisplayedCollections = (): ImmutableList<ImmutableMap<string, unknown>> => {
  const collections = useSelector(getDisplayedCollections)

  const shouldRemoveCfy = useIsOptimizelyFeatureEnabled('kales_remove_cfy_collection')

  if (shouldRemoveCfy) {
    return collections.filter(
      (c: MenuCollectionIMap) => c.get('slug') !== CollectionSlug.Recommendations
    )
  }

  return collections
}
