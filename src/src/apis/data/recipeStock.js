import { fetchRecipeStock } from 'apis/recipes'

export const getRecipeStock = async (accessToken, deliveryDay) => {
  const { data: recipeStock } = await fetchRecipeStock(accessToken, deliveryDay)

  return recipeStock
}
