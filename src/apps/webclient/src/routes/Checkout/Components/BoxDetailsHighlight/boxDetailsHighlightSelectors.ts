import Immutable from 'immutable'
import { createSelector } from 'reselect'

type StateTypePlaceholder = {
  basket: Immutable.Map<string, unknown>
  recipes: Immutable.Map<string, unknown>
  menuRecipesStore: Immutable.Map<string, unknown>
  menuRecipeStock: Immutable.Map<string, unknown>
  menuBoxPrices: Immutable.Map<string, unknown>
  boxSummaryDeliveryDays: Immutable.Map<string, unknown>
  deliveryDate: Immutable.Map<string, unknown>
  slotId: Immutable.Map<string, unknown>
  features: Immutable.Map<string, unknown>
}

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

type DeliveryDateData = {
  deliveryDays: unknown
  slotId: string
  date: string
}
const getDeliveryDateData = ({
  boxSummaryDeliveryDays,
  basket,
}: StateTypePlaceholder): DeliveryDateData => ({
  deliveryDays: boxSummaryDeliveryDays,
  slotId: basket.get('slotId') as string,
  date: basket.get('date') as string,
})
export const getDeliveryDateDataSelector = createSelector(
  getDeliveryDateData,
  ({ deliveryDays, slotId, date }) => ({ deliveryDays, slotId, date }),
)
