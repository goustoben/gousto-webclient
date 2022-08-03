import Immutable from 'immutable'
import { createSelector } from 'reselect'

type StateTypePlaceholder = {
  basket: Immutable.Map<string, unknown>
  recipes: Immutable.Map<string, unknown>
  menuRecipesStore: Immutable.Map<string, unknown>
  menuRecipeStock: Immutable.Map<string, unknown>
  menuBoxPrices: Immutable.Map<string, unknown>
}

const getBasketRecipes = ({ basket }: StateTypePlaceholder) => basket.get('recipes')
export const getBasketRecipesSelector = createSelector(getBasketRecipes, (recipes) =>
  (recipes as Immutable.Map<string, number>).keySeq().toArray(),
)

const getStoreRecipes = ({ menuRecipeStock, menuBoxPrices, recipes }: StateTypePlaceholder) => ({
  menuRecipeStock,
  menuBoxPrices,
  menuRecipesStore: recipes,
})
export const getStoreRecipesSelector = createSelector(
  getStoreRecipes,
  ({ menuRecipeStock, menuBoxPrices, menuRecipesStore }) => ({
    menuRecipeStock,
    menuBoxPrices,
    menuRecipesStore,
  }),
)
