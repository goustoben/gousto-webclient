import { Map } from 'immutable'
import { useSelector } from 'react-redux'

import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

import { getProductsRecipePairings } from '../selectors/recipePairings'
import type { ProductRecipePairings } from '../types'

export const useIsPairingsEnabled = (): boolean | null => {
  const productRecipePairings: ProductRecipePairings = useSelector(getProductsRecipePairings)
  const userHasPairings = Map.isMap(productRecipePairings) && productRecipePairings.size > 0

  const isFeatureEnabled = useIsOptimizelyFeatureEnabled(
    userHasPairings ? 'etm_market_orderconfirmation_addingpairings_web_apr22' : null,
  )

  return isFeatureEnabled || false
}
