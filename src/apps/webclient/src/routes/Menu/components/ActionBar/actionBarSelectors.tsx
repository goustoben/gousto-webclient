import { createSelector } from 'reselect'

import { getMenuBoxPrices } from 'routes/BoxPrices/boxPricesSelectors'
import { getNumPortions } from 'selectors/basket'

export const createGetBestTierPricePerPortion = () =>
  createSelector(getMenuBoxPrices, getNumPortions, (menuBoxPrices, numPortions): string | null => {
    if (!menuBoxPrices) {
      return null
    }

    const numRecipes = 4

    return menuBoxPrices.getIn([
      numPortions.toString(),
      numRecipes.toString(),
      'gourmet',
      'pricePerPortionDiscounted',
    ])
  })
