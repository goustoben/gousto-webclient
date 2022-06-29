import { createSelector } from 'reselect'

import { getMenuBoxPrices } from 'routes/BoxPrices/boxPricesSelectors'
import { getNumPortions } from 'selectors/basket'

export const createGetBestTierPricePerPortion = (maxRecipesNum = 4) =>
  createSelector(getMenuBoxPrices, getNumPortions, (menuBoxPrices, numPortions): string | null => {
    if (!menuBoxPrices) {
      return null
    }

    return menuBoxPrices.getIn([
      numPortions.toString(),
      maxRecipesNum.toString(),
      'gourmet',
      'pricePerPortionDiscounted',
    ])
  })
