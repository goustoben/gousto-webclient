import { useSelector } from 'react-redux'

import {
  getBasketRecipesSelector,
  getStoreRecipesSelector,
} from 'routes/Checkout/Components/BoxDetailsHighlight/boxDetailsHighlightSelectors'
import { useBasket, useSupportedBoxTypes } from 'routes/Menu/domains/basket'

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
