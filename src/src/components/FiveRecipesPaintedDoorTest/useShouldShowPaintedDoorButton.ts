import { useBasket } from 'routes/Menu/domains/basket'
import { use5RecipesPaintedDoorTest } from './use5RecipesPaintedDoorTest'

export const useShouldShowPaintedDoorButton = (recipeId: string) => {
  const { isEnabled, hasSeenOnMenu } = use5RecipesPaintedDoorTest()
  const { limitReached, isRecipeInBasket } = useBasket()
  const isInBasket = isRecipeInBasket(recipeId)
  const fiveRecipesEnabled = isEnabled && !hasSeenOnMenu && limitReached && !isInBasket

  return fiveRecipesEnabled
}
