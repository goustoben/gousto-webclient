import { useSelector } from 'react-redux'

import { useDiscountDescriptor } from 'routes/Menu/components/BoxSummary/Banner/PriceAndDiscountTip/priceAndDiscountTipUtils'
import { useBasket, useSupportedBoxTypes } from 'routes/Menu/domains/basket'
import { usePricing } from 'routes/Menu/domains/pricing'
import { formatDiscountTip } from 'routes/Signup/Components/DiscountAppliedBar/discountAppliedBarUtils'

import { getBasketRecipesSelector, getStoreRecipesSelector } from '../boxDetailsHighlightSelectors'

export const useGetYourBoxData = () => {
  const { recipesIds, recipes } = useSelector(getBasketRecipesSelector)
  const recipeStoreData = useSelector(getStoreRecipesSelector)
  const { numPortions } = useBasket()
  const { maxRecipesForPortion } = useSupportedBoxTypes()
  const maxRecipesNum = maxRecipesForPortion(numPortions)
  const recipesIdsList = new Array(maxRecipesNum)
    .fill(null)
    .map((value, index) => recipesIds[index] ?? value)

  return { maxRecipesNum, numPortions, recipesIdsList, recipes, ...recipeStoreData }
}

export const useGetDiscountData = () => {
  const discountDescriptor = useDiscountDescriptor()
  const { isDiscountEnabled } = discountDescriptor
  const discountTip = formatDiscountTip(discountDescriptor)
  const { pricing } = usePricing()

  return {
    isDiscountEnabled,
    discountTip,
    pricePerPortionDiscounted: pricing?.pricePerPortionDiscounted,
  }
}
