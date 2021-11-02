import { useSelector } from 'react-redux'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { getDisplayedCollections } from '../../../selectors/collections'
import { CollectionSlug } from '../constants'

export const useDisplayedCollections = () => {
  const collections = useSelector(getDisplayedCollections)

  const shouldRemoveCfy = useIsOptimizelyFeatureEnabled('kales_remove_cfy_collection')

  if (shouldRemoveCfy) {
    return collections.filter(c => c.get('slug') !== CollectionSlug.Recommendations)
  }

  return collections
}
