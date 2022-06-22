import Immutable from 'immutable'
import { useSelector } from "react-redux"
import { use_legacy_CurrentMenuRecipes } from "../recipes"

const CONFIG_STOCK_THRESHOLD = 3

const isOutOfStock = (
  recipeId: string,
  numPortions: number,
  recipesStock: Immutable.Map<string, any>
) => {
  if (recipesStock.size === 0) {
    return false
  }

  const stock = recipesStock.getIn([recipeId, String(numPortions)], 0)

  return stock <= CONFIG_STOCK_THRESHOLD
}

const getStock = (state: any) => state.menuRecipeStock
const getBasketRecipes = (state: any) => state.basket.get('recipes', Immutable.List([]))
const isRecipeInBasket = (recipe: Immutable.Map<string, any>, basketRecipes: Immutable.Map<string, number>) => basketRecipes.has(recipe.get('id'))

export function use_legacy_InStockRecipeIds({
  numPortions,
}: {
  numPortions: number,
}): Set<string> {
  const stock = useSelector(getStock)
  const basketRecipes = useSelector(getBasketRecipes)
  const recipes = use_legacy_CurrentMenuRecipes()

  const inStock = recipes.filter(
    (recipe) =>
      !!recipe && (
        !isOutOfStock(recipe.get('id'), numPortions, stock) ||
        isRecipeInBasket(recipe, basketRecipes)
      )
  )

  return new Set(
    inStock.map(r => r?.get('id')).toArray()
  )
}
