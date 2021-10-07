import { actionTypes } from 'actions/actionTypes'

export const getLowestPrice = (data, nPeople, key) => {
  if (!(data && data[nPeople])) {
    return null
  }

  const pricesForThisNumberOfPeople = data[nPeople]

  const allPrices = Object.values(pricesForThisNumberOfPeople)
    .map((cuisineToPrices) => {
      if (cuisineToPrices && cuisineToPrices.gourmet && cuisineToPrices.gourmet[key]) {
        return Number(cuisineToPrices.gourmet[key])
      }

      return null
    })
    .filter((x) => !!x)

  if (allPrices.length === 0) {
    return null
  }

  const lowestPrice = Math.min(...allPrices)

  return String(lowestPrice)
}

export const setLowestPricePerPortion = (data = {}) => ({
  type: actionTypes.BOXPRICE_SET_PRICE_PER_SERVING,
  lowestPricePerPortion: {
    forTwo: {
      price: getLowestPrice(data, 2, 'pricePerPortion'),
      priceDiscounted: getLowestPrice(data, 2, 'pricePerPortionDiscounted'),
    },
    forFour: {
      price: getLowestPrice(data, 4, 'pricePerPortion'),
      priceDiscounted: getLowestPrice(data, 4, 'pricePerPortionDiscounted'),
    },
  },
})
