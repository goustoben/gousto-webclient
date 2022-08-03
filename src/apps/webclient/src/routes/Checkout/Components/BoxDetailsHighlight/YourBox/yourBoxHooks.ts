import { useSelector } from 'react-redux'

import {
  getBasketRecipesSelector,
  getStoreRecipesSelector,
} from 'routes/Checkout/Components/BoxDetailsHighlight/boxDetailsHighlightSelectors'
import { useBasket, useSupportedBoxTypes } from 'routes/Menu/domains/basket'

export const useGetYourBoxData = () => {
  const recipesIds = useSelector(getBasketRecipesSelector)
  const recipeStoreData = useSelector(getStoreRecipesSelector)
  console.log('NEWEXP2', recipeStoreData)
  const { numPortions } = useBasket()
  const { maxRecipesForPortion } = useSupportedBoxTypes()
  const maxRecipesNum = maxRecipesForPortion(numPortions)
  const recipesList = new Array(maxRecipesNum)
    .fill(null)
    .map((value, index) => recipesIds[index] ?? value)

  return { maxRecipesNum, numPortions, recipesList }
}
