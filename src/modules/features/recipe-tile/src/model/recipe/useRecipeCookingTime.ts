
import { useRecipe } from '../context'
import { useBasketHook } from '../context/useBasket'

export const useRecipeCookingTime = (): number | null => {
  const recipe = useRecipe()
  const useBasket = useBasketHook()

  const { numPortions } = useBasket()

  if (!recipe) {
    return null
  }

  const cookingTime =
    numPortions === 4 ? recipe.cookingTimeFamily : recipe.cookingTime

  return cookingTime as number
}
