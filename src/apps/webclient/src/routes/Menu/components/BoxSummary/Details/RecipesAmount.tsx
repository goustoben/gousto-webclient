import { use5RecipesPaintedDoorTest } from 'components/FiveRecipesPaintedDoorTest/use5RecipesPaintedDoorTest'

export const RecipesAmount = () => {
  const { maxRecipes } = use5RecipesPaintedDoorTest()
  return maxRecipes
}
