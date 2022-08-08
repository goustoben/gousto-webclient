import { useSelector } from 'react-redux'

import { useBasket } from 'routes/Menu/domains/basket'
import { usePricing } from 'routes/Menu/domains/pricing'

import { getSummaryDataSelector } from '../boxDetailsHighlightSelectors'

export const useGetSummaryData = () => {
  const { numPortions } = useBasket()
  const { pricing } = usePricing()
  const { isGoustoOnDemandEnabled } = useSelector(getSummaryDataSelector)

  return {
    isGoustoOnDemandEnabled,
    // Just to be consistent while developing
    prices: pricing,
    numRecipes: numPortions,
  }
}
