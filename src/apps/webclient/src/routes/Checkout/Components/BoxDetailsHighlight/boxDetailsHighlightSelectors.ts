import Immutable from 'immutable'
import { createSelector } from 'reselect'

import { StateTypePlaceholder } from './types'

const getBasketRecipes = ({ basket }: StateTypePlaceholder) => basket.get('recipes')
export const getBasketRecipesSelector = createSelector(getBasketRecipes, (recipes) => ({
  recipes,
  recipesIds: (recipes as Immutable.Map<string, number>).keySeq().toArray(),
}))

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

const getOrderTotalData = ({ features }: StateTypePlaceholder) => ({
  isGoustoOnDemandEnabled: features && features.getIn(['isGoustoOnDemandEnabled', 'value'], false),
})
export const getOrderTotalDataSelector = createSelector(
  getOrderTotalData,
  ({ isGoustoOnDemandEnabled }) => ({
    isGoustoOnDemandEnabled,
  }),
)
