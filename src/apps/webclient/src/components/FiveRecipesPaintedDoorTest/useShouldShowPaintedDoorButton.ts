import { useBasket, useIsRecipeInBasket } from 'routes/Menu/domains/basket'
import { use5RecipesPaintedDoorTest } from './use5RecipesPaintedDoorTest'

export const useShouldShowPaintedDoorButton = (recipeId: string) => {
  const { isEnabled, hasSeenOnMenu } = use5RecipesPaintedDoorTest()
  const { reachedLimit } = useBasket()
  const isRecipeInBasket = useIsRecipeInBasket()
  const isInBasket = isRecipeInBasket(recipeId)
  const fiveRecipesEnabled = isEnabled && !hasSeenOnMenu && reachedLimit && !isInBasket

  return fiveRecipesEnabled
}
