import { useSelector } from 'react-redux'

import { useBasket } from 'routes/Menu/domains/basket'
import { usePricing } from 'routes/Menu/domains/pricing'

import { getOrderTotalDataSelector } from './orderTotalSelectors'

export const useGetOrderTotalData = () => {
  const { numPortions } = useBasket()
  const { pricing } = usePricing()
  const { isGoustoOnDemandEnabled } = useSelector(getOrderTotalDataSelector)

  return {
    isGoustoOnDemandEnabled,
    // Just to be consistent while developing
    prices: pricing,
    numRecipes: numPortions,
  }
}
