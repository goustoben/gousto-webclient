import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { useCollections } from 'routes/Menu/domains/collections'

const ALL_RECIPES_ID = 'ca8f71be-63ac-11e6-a693-068306404bab'
const RECOMMENDATIONS_ID = '97270056-cd65-11e8-a2d2-067a72dd5dba'

export const useShowRecommendationsHighlight = () => {
  const isRemoveCfyEnabled = useIsOptimizelyFeatureEnabled('kales_remove_cfy_collection')
  const { currentCollectionId } = useCollections()

  if (!isRemoveCfyEnabled) {
    return false
  }

  if (currentCollectionId !== ALL_RECIPES_ID && currentCollectionId !== RECOMMENDATIONS_ID) {
    return false
  }

  return true
}
