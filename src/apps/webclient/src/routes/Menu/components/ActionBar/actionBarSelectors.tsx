import Immutable from 'immutable'
import { createSelector } from 'reselect'
import { getMenuBoxPrices } from 'routes/BoxPrices/boxPricesSelectors'
import { getNumPortions } from 'selectors/basket'
import { actionTypes } from 'actions/actionTypes'

export const createGetNextTierPricePerPortion = (numRecipes = 0) =>
  createSelector(getMenuBoxPrices, getNumPortions, (menuBoxPrices, numPortions): string | null => {
    if (!menuBoxPrices) {
      return null
    }

    const nextNumRecipes = numRecipes + 1

    const next = menuBoxPrices.getIn([
      numPortions.toString(),
      nextNumRecipes.toString(),
      'gourmet',
      'pricePerPortionDiscounted',
    ])

    return next
  })

export const getMenuBoxPricesLoading = (state: { pending: Immutable.Map<string, boolean> }) =>
  state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE)
