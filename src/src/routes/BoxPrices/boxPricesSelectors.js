import { createSelector } from 'reselect'
import { numPersonsValues, numPortionsValues } from './boxPricesConfig'

export const getMenuBoxPrices = (state) => state.menuBoxPrices

const BOX_TYPE = 'gourmet'

export const getNumPersonsToBoxDescriptors = createSelector(getMenuBoxPrices, (menuBoxPrices) => {
  if (!menuBoxPrices) {
    return null
  }

  const result = numPersonsValues.map((numPersons) => {
    const boxDescriptors = numPortionsValues.map((numPortions) => ({
      num_portions: numPortions,
      price_per_portion: menuBoxPrices.getIn([
        numPersons,
        numPortions,
        BOX_TYPE,
        'pricePerPortion',
      ]),
      total: menuBoxPrices.getIn([numPersons, numPortions, BOX_TYPE, 'recipeTotal']),
    }))

    return [numPersons, boxDescriptors]
  }).reduce((numPersonsToBoxDescriptors, [numPersons, boxDescriptors]) =>
    // Note: this reduce() can be replaced with Object.fromEntries() when the
    // CI runs on version of Node that supports it.
    ({
      ...numPersonsToBoxDescriptors,
      [numPersons]: boxDescriptors
    }),
  {})

  return result
})

export const getPricePerServing = (state) => state.boxPrices.get('pricePerServing')
